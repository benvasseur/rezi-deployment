import pool from '@utils/db';
import type { Handler, HandlerEvent } from "@netlify/functions";

export const handler: Handler = async (event: HandlerEvent) => {
  const { shortId } = event.queryStringParameters || {};

  if (!shortId) {
    return {
      statusCode: 400,
      body: 'Short ID is required',
    };
  }

  const client = await pool.connect();

  try {
    const id = parseInt(Buffer.from(shortId, 'base64').toString('ascii'));

    const result = await client.query('SELECT url FROM urls WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: 'URL not found',
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: result.rows[0].url }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'Error fetching the URL',
    };
  } finally {
    client.release();
  }
};