import { connect } from '@tidbcloud/serverless';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

export const db = connect({ url: connectionString });

// Example of a query function (optional, can be expanded later)
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const conn = db; // In a real app, you might manage connections differently
    const result = await conn.execute(query, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw new Error('Database query failed.');
  }
}
