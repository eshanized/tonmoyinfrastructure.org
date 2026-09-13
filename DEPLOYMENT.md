# TIV Website Deployment & Operations Guide

This guide describes the operational prerequisites, build procedures, and deployment strategies for the Tonmoy Infrastructure and Vision (TIV) website.

---

## 1. Hosting Environment Options

The TIV platform is designed to be hosted across multiple environments:

### Option A: Static Output (Independent / Self-Hosted NGINX)
Ideal for sovereign self-hosting on TIV compute instances:
- Set `output: 'export'` in `next.config.js` (if purely static without node headers).
- Alternatively, run `npm run build` with standard Next.js standalone output:
  ```bash
  npm run build
  ```
- Deploy the resulting `.next/standalone` directory behind an NGINX reverse proxy with HTTP/2 or HTTP/3 termination.

### Option B: Cloudflare Pages / Vercel / Netlify
The platform features an existing `@netlify/plugin-nextjs` configuration:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `>= 18.17.0`

### Option C: Shared Hosting / 20i StackCP / cPanel (Static Export to `public_html`)
When hosting on shared Linux platforms (e.g. 20i StackCP, cPanel, DirectAdmin):
1. Run `npm run build` to generate the static files in the `out/` directory.
2. Upload the contents of `out/` into `/public_html/`.
3. **Important for Existing Subdomains**:
   - If subdomains (such as `email` and `openmail`) exist as subfolders inside `/public_html/`, **do not delete or overwrite them**.
   - `public/.htaccess` includes explicit subdomain isolation (`RewriteCond %{HTTP_HOST} !^(www\.)?tonmoyinfrastructure\.org$ [NC]`) so root rewrites will never interfere with subdomains.
   - `public/.htaccess` is pre-configured with proxy-aware HTTPS redirection (`X-Forwarded-Proto`) to prevent `ERR_TOO_MANY_REDIRECTS` loops when behind StackCDN or Cloudflare.
4. **Recommended Architecture**: In 20i StackCP or cPanel "Subdomains", map subdomain Document Roots outside `/public_html` (e.g. `/email` and `/openmail`) for total file isolation.

---

## 2. Environment Variables

The core platform is intentionally static and does not depend on secret database connections for content delivery. Any optional runtime keys should be documented in `.env.example`:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | Optional | Set to `production` in build pipelines. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL (`https://tonmoyinfrastructure.org/` or similar) for OpenGraph and sitemap generation. |

---

## 3. Pre-Deployment Verification Checklist

Before deploying changes to production, execute the automated validation suite:

```bash
# 1. Type check all TypeScript files
npm run typecheck

# 2. Verify code styling and lint rules
npm run lint

# 3. Verify test assertions (e.g. status integrity)
npm test

# 4. Perform full production build
npm run build
```

---

## 4. Security Headers & Caching Directives

When deploying behind a reverse proxy (e.g. NGINX or Caddy), configure the following headers:

```nginx
# Security Headers
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';" always;

# Static Asset Caching
location /_next/static {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```
