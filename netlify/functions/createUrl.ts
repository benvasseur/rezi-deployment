import pool from '@utils/db';
import type { Handler, HandlerEvent } from "@netlify/functions";

export const handler: Handler = async (event: HandlerEvent) => {
  const { url } = JSON.parse(event.body || '{}');

  if (!url) {
    return {
      statusCode: 400,
      body: 'Invalid URL',
    };
  }

  const client = await pool.connect();

  try {
    const result = await client.query('INSERT INTO urls(url) VALUES($1) RETURNING id', [url]);

    const shortId = Buffer.from(result.rows[0].id.toString()).toString('base64').substring(0, 4);

    return {
      statusCode: 200,
      body: JSON.stringify({ shortId }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'Error creating shortened URL',
    };
  } finally {
    client.release();
  }
};