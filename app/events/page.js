import { sql } from '@vercel/postgres';
import Link from 'next/link';

async function getEvents() {
  try {
    const { rows } = await sql`
      SELECT id, title, description, event_date, location, source, creator, status
      FROM events 
      WHERE status = 'published' 
        AND event_date >= NOW() - INTERVAL '1 day'
      ORDER BY event_date ASC
      LIMIT 50
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDateForInput(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}

export default async function EventsPage() {
  const events = await getEvents();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Events in Bend, Oregon
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what's happening in Bend. From community gatherings to local festivals, 
            find the perfect event for your visit.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                min={today}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="music">Music</option>
                <option value="arts">Arts & Culture</option>
                <option value="food">Food & Drink</option>
                <option value="outdoor">Outdoor</option>
                <option value="community">Community</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Filter Events
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Event Date Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {formatDate(event.event_date)}
                  </span>
                  {event.source && (
                    <span className="text-xs text-gray-500">
                      {event.source}
                    </span>
                  )}
                </div>

                {/* Event Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  <Link href={`/events/${event.id}`} className="hover:text-blue-600">
                    {event.title}
                  </Link>
                </h3>

                {/* Event Location */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>

                {/* Event Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </p>

                {/* Action Button */}
                <Link
                  href={`/events/${event.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View Details
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Events Message */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              Check back soon for upcoming events in Bend, Oregon.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to add your event?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Submit your Bend, Oregon event to reach thousands of locals and visitors.
            </p>
            <Link
              href="/business-signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Your Event
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Events in Bend, Oregon - Good Day Bend',
    description: 'Discover upcoming events in Bend, Oregon. Find concerts, festivals, community gatherings, and local activities.',
    openGraph: {
      title: 'Events in Bend, Oregon - Good Day Bend',
      description: 'Discover upcoming events in Bend, Oregon. Find concerts, festivals, community gatherings, and local activities.',
      type: 'website',
    },
  };
}
