import { sql } from '@vercel/postgres';

export async function createTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        ip VARCHAR(255),
        path VARCHAR(255),
        timestamp BIGINT,
        status VARCHAR(50),
        user_agent TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        audio_url TEXT,
        duration FLOAT,
        timestamp BIGINT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS resources (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        url TEXT,
        type VARCHAR(50),
        size BIGINT,
        downloads INT DEFAULT 0,
        uploaded_at BIGINT
      );
    `;

    await sql`
       CREATE TABLE IF NOT EXISTS showcase_items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        image TEXT,
        sort_order INT
       );
    `;

    await sql`
       CREATE TABLE IF NOT EXISTS frozen_ips (
        ip VARCHAR(255) PRIMARY KEY
       );
    `;

    await sql`
       CREATE TABLE IF NOT EXISTS music (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        artist VARCHAR(255),
        url TEXT,
        duration FLOAT,
        timestamp BIGINT
       );
    `;

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

export { sql };
