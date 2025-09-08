require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function runSchema() {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: true
    });
    const client = await pool.connect();
    console.log('Connected to database');

    // Read schema.sql file
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');

    // Execute schema
    await client.query(schemaSQL);
    console.log('Database schema created successfully');
    
    // Create admin user if not exists
    await client.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ('Admin', 'admin@gooddaybend.com', $1, 'admin')
       ON CONFLICT (email) DO NOTHING`,
      [process.env.ADMIN_PASSWORD]
    );
    console.log('Admin user created');

    // Disconnect
    await client.end();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

runSchema();
