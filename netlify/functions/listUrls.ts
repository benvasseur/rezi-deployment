import pool from '@utils/db';
import type { Handler, HandlerEvent } from "@netlify/functions";

export const handler: Handler = async (event: HandlerEvent) => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT id, url FROM urls');

    const urls = result.rows.map((row) => ({
      shortId: Buffer.from(row.id.toString()).toString('base64').substring(0, 4),
    }));

    return {
      statusCode: 200,     
      body: JSON.stringify({ urls }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'Error fetching URLs',
    };
  } finally {
    client.release();
  }
};