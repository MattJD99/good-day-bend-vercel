import { NextResponse } from 'next/server';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
import Parser from 'rss-parser';

const parser = new Parser();

// RSS feeds to sync - you can add more feeds here
const RSS_FEEDS = [
  'https://www.visitbend.com/events/feed/', // Visit Bend events
  'https://www.bendsource.com/events/rss/', // Bend Source events
  // Add more RSS feeds as needed
];

async function parseEventFromItem(item, source) {
  // Try to extract event details from RSS item
  // This is a basic implementation - you may need to adjust based on feed structure
  const title = item.title || 'Untitled Event';
  const description = item.content || item.summary || item.description || '';
  const link = item.link || '';
  const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
  const creator = item.creator || item.author || 'Unknown';
  
  // Try to extract location from description or title
  let location = 'Bend, OR'; // Default location
  const locationMatch = description.match(/Location:\s*([^\n]+)/i) || title.match(/at\s+([^,\n]+)/i);
  if (locationMatch) {
    location = locationMatch[1].trim();
  }

  // Try to extract date from title or description if pubDate is not reliable
  let eventDate = pubDate;
  const dateMatch = title.match(/(\w+\s+\d{1,2},?\s+\d{4})/i) || description.match(/(\w+\s+\d{1,2},?\s+\d{4})/i);
  if (dateMatch) {
    const parsedDate = new Date(dateMatch[1]);
    if (!isNaN(parsedDate)) {
      eventDate = parsedDate;
    }
  }

  return {
    title: title.trim(),
    description: description.trim(),
    link: link.trim(),
    event_date: eventDate,
    location: location.trim(),
    source: source,
    creator: creator.trim(),
    status: 'published'
  };
}

export async function GET(request) {
  // Add authentication to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.RSS_SYNC_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results = {
      success: 0,
      failed: 0,
      errors: []
    };

    for (const feedUrl of RSS_FEEDS) {
      try {
        console.log(`Processing RSS feed: ${feedUrl}`);
        const feed = await parser.parseURL(feedUrl);
        
        for (const item of feed.items) {
          try {
            const eventData = await parseEventFromItem(item, feed.title || feedUrl);
            
            // Check if event already exists using parameterized query
            const eventExists = await pool.query(
              `SELECT id FROM events 
               WHERE title = $1 AND event_date = $2`,
              [eventData.title, eventData.event_date.toISOString()]
            );

            if (eventExists.rows.length === 0) {
              // Insert new event using parameterized query
              await pool.query(
                `INSERT INTO events (title, description, link, event_date, location, source, creator, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                  eventData.title,
                  eventData.description,
                  eventData.link,
                  eventData.event_date,
                  eventData.location,
                  eventData.source,
                  eventData.creator,
                  eventData.status
                ]
              );
              results.success++;
            } else {
              // Update existing event using parameterized query
              await pool.query(
                `UPDATE events 
                 SET description = $1, 
                     link = $2, 
                     location = $3, 
                     source = $4, 
                     creator = $5,
                     updated_at = NOW()
                 WHERE id = $6`,
                [
                  eventData.description,
                  eventData.link,
                  eventData.location,
                  eventData.source,
                  eventData.creator,
                  eventExists.rows[0].id
                ]
              );
              results.success++;
            }
          } catch (itemError) {
            console.error(`Error processing item from ${feedUrl}:`, itemError);
            results.failed++;
            results.errors.push(`Error in ${feedUrl}: ${itemError.message}`);
          }
        }
      } catch (feedError) {
        console.error(`Error processing feed ${feedUrl}:`, feedError);
        results.failed++;
        results.errors.push(`Feed error ${feedUrl}: ${feedError.message}`);
      }
    }

    return NextResponse.json({
      message: 'RSS sync completed',
      results: results
    });

  } catch (error) {
    console.error('RSS sync error:', error);
    return NextResponse.json({ 
      error: 'RSS sync failed', 
      details: error.message 
    }, { status: 500 });
  }
}

// Also support POST for manual triggering
export async function POST(request) {
  return GET(request);
}
