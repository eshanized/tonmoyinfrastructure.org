import {
  ContactSubmissionSchema,
  type ContactSubmissionInput,
  type ContactDeliveryResult,
} from './validation';

// Sliding window in-memory rate limiter per client IP
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((entry, key) => {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  });
}, 5 * 60 * 1000).unref?.();

export function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(clientId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function resetRateLimits(): void {
  rateLimitMap.clear();
}

/**
 * Validates, checks abuse controls, and dispatches contact submission.
 * Fails safely if no receiving provider is configured on the server.
 */
export async function processContactSubmission(
  rawPayload: unknown,
  clientIp = 'unknown'
): Promise<ContactDeliveryResult> {
  // 1. Rate limiting
  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      status: 429,
      error: 'Too many submissions received. Please wait a few minutes before trying again.',
      code: 'RATE_LIMITED',
    };
  }

  // 2. Validate payload structure & size
  const parseResult = ContactSubmissionSchema.safeParse(rawPayload);
  if (!parseResult.success) {
    const firstError = parseResult.error.errors[0]?.message || 'Invalid form input';
    return {
      success: false,
      status: 400,
      error: firstError,
      code: 'INVALID_INPUT',
    };
  }

  const data: ContactSubmissionInput = parseResult.data;

  // 3. Honeypot & bot detection
  if (data.hp && data.hp.trim().length > 0) {
    return {
      success: false,
      status: 400,
      error: 'Form submission rejected by abuse filter.',
      code: 'SPAM_REJECTED',
    };
  }

  // Bot speed check: human takes at least 1.5 seconds to fill form
  if (data.submittedAt && Date.now() - data.submittedAt < 1500) {
    return {
      success: false,
      status: 400,
      error: 'Form submitted too rapidly. Please review your message before sending.',
      code: 'SPAM_REJECTED',
    };
  }

  // 4. Server-side delivery dispatch
  const webhookUrl = process.env.CONTACT_FORWARD_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

  // Scenario A: Webhook delivery (Slack, Discord, internal ticketing service)
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TIV-Contact-Delivery/1.0',
        },
        body: JSON.stringify({
          source: 'tonmoyinfrastructure.org',
          category: data.category,
          name: data.name,
          email: data.email,
          message: data.message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        return {
          success: false,
          status: 502,
          error: 'Delivery upstream service returned an error. Please try again or contact via phone.',
          code: 'PROVIDER_ERROR',
        };
      }

      return {
        success: true,
        status: 200,
        message: 'Message delivered successfully.',
      };
    } catch {
      return {
        success: false,
        status: 502,
        error: 'Failed to deliver message to receiving service. Please reach out via official phone or address.',
        code: 'PROVIDER_ERROR',
      };
    }
  }

  // Scenario B: Resend email provider
  if (resendApiKey && recipientEmail) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'TIV Contact Form <notifications@tonmoyinfrastructure.org>',
          to: [recipientEmail],
          reply_to: data.email,
          subject: `[TIV Contact] [${data.category.toUpperCase()}] Inquiry from ${data.name}`,
          text: `Category: ${data.category}\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
        }),
      });

      if (!response.ok) {
        return {
          success: false,
          status: 502,
          error: 'Email dispatch provider returned an error.',
          code: 'PROVIDER_ERROR',
        };
      }

      return {
        success: true,
        status: 200,
        message: 'Message delivered successfully.',
      };
    } catch {
      return {
        success: false,
        status: 502,
        error: 'Email dispatch failed. Please reach out via official telephone or office address.',
        code: 'PROVIDER_ERROR',
      };
    }
  }

  // Scenario C: No delivery provider is configured on server
  // Principle: Never lie or produce false success state when unconfigured!
  return {
    success: false,
    status: 503,
    error:
      'Contact delivery endpoint is not currently configured with delivery credentials. Please contact TIV directly via official office telephone +62 (0967) 551888 or in person at Pusat Bisnis Jayapura.',
    code: 'UNCONFIGURED',
  };
}
