import { processContactSubmission } from '../../lib/contact/service';

interface PagesContext {
  request: Request;
  env: Record<string, string>;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const request = context.request;

  // Enforce Content-Type
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Content-Type must be application/json' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Enforce size limit
  const bodyText = await request.text();
  if (bodyText.length > 10240) {
    return new Response(
      JSON.stringify({ success: false, error: 'Payload exceeds size limit (10KB).' }),
      {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Malformed JSON payload.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';

  const result = await processContactSubmission(parsed, clientIp);

  return new Response(JSON.stringify(result), {
    status: result.status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
