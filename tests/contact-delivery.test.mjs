import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('Contact Form: Serverless Delivery & Abuse Protection Architecture', async () => {
  const serviceFile = fs.readFileSync(path.join(ROOT, 'lib/contact/service.ts'), 'utf8');
  const validationFile = fs.readFileSync(path.join(ROOT, 'lib/contact/validation.ts'), 'utf8');
  const contactPage = fs.readFileSync(path.join(ROOT, 'app/contact/page.tsx'), 'utf8');
  const netlifyFunc = fs.readFileSync(path.join(ROOT, 'netlify/functions/contact.ts'), 'utf8');
  const cfFunc = fs.readFileSync(path.join(ROOT, 'functions/api/contact.ts'), 'utf8');

  // 1. Zod Validation Rules
  assert.match(validationFile, /name:\s*z[\s\S]*?\.min\(1[\s\S]*?\.max\(100/, 'Name must be validated 1-100 chars');
  assert.match(validationFile, /email:\s*z[\s\S]*?\.email\(/, 'Email must be validated as email format');
  assert.match(validationFile, /VALID_CONTACT_CATEGORIES/, 'Valid categories must be an enumerated whitelist');
  assert.match(validationFile, /'general'/, 'Categories must include general');
  assert.match(validationFile, /'hosting'/, 'Categories must include hosting');
  assert.match(validationFile, /message:\s*z[\s\S]*?\.min\(10[\s\S]*?\.max\(5000/, 'Message must be validated 10-5000 chars');
  assert.match(validationFile, /hp:\s*z\.string\(\)\.max\(0/, 'Honeypot field must strictly reject non-empty values');

  // 2. Abuse Defense & Rate Limiting
  assert.match(serviceFile, /RATE_LIMIT_WINDOW_MS\s*=\s*15\s*\*\s*60\s*\*\s*1000/, 'Rate limit window must be 15 minutes');
  assert.match(serviceFile, /MAX_REQUESTS_PER_WINDOW\s*=\s*5/, 'Max requests must be capped at 5 per window');
  assert.match(serviceFile, /checkRateLimit/, 'Service must enforce checkRateLimit');
  assert.match(serviceFile, /RATE_LIMITED/, 'Must return RATE_LIMITED error code on abuse');
  assert.match(serviceFile, /Too many submissions received/, 'Must return rate limit exceeded message on abuse');

  // 3. Provider Fail-Safe & Truthful Delivery States
  assert.match(serviceFile, /UNCONFIGURED/, 'Must return UNCONFIGURED status code when provider secrets are missing');
  assert.match(serviceFile, /503/, 'Must return HTTP 503 when delivery provider is unconfigured');
  assert.doesNotMatch(serviceFile, /Math\.random/, 'Delivery service must never simulate delivery success');

  // 4. Serverless Endpoints Implementation
  assert.match(netlifyFunc, /export const handler/, 'Netlify native function handler must exist');
  assert.match(netlifyFunc, /413/, 'Netlify function must enforce 10KB payload limit');
  assert.match(cfFunc, /onRequestPost/, 'Cloudflare Pages native onRequestPost handler must exist');

  // 5. Client Form UX & Accessibility
  assert.match(contactPage, /aria-hidden="true"/, 'Honeypot must be hidden from screen readers');
  assert.match(contactPage, /tabIndex=\{-1\}/, 'Honeypot must be removed from tab navigation');
  assert.match(contactPage, /disabled=\{status === 'submitting'\}/, 'Submit button must disable during submitting');
  assert.match(contactPage, /role="alert"/, 'Error and status banners must have role="alert"');
  assert.match(contactPage, /getOfficeAddress\(\)/, 'Contact page must query centralized office details');
  assert.match(contactPage, /office\.phone/, 'Fallback office phone must be provided');
  assert.match(contactPage, /office\.street/, 'Fallback office address must be provided');
});
