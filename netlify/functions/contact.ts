interface HandlerEvent {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string | undefined>;
}

interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string | undefined>;
  body: string;
}

type Handler = (event: HandlerEvent) => Promise<HandlerResponse>;

import { processContactSubmission } from '../../lib/contact/service';

export const handler: Handler = async (event: HandlerEvent) => {
  // Restrict to POST
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Method not allowed. Use POST.' }),
    };
  }

  // Request size limit (< 10KB)
  if ((event.body || '').length > 10240) {
    return {
      statusCode: 413,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Payload exceeds size limit (10KB).' }),
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Malformed JSON payload.' }),
    };
  }

  const clientIp =
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    event.headers['client-ip'] ||
    'unknown';

  const result = await processContactSubmission(parsed, clientIp);

  return {
    statusCode: result.status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
    },
    body: JSON.stringify(result),
  };
};
