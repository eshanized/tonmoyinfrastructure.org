import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('Canonical Routes & Static Redirect Rules Consolidation', () => {
  const redirectsFile = fs.readFileSync(path.join(ROOT, 'public/_redirects'), 'utf8');
  const htaccessFile = fs.readFileSync(path.join(ROOT, 'public/.htaccess'), 'utf8');
  const whitepaperFile = fs.readFileSync(path.join(ROOT, 'lib/whitepaper.ts'), 'utf8');
  const timelinePage = fs.readFileSync(path.join(ROOT, 'app/about/timeline/page.tsx'), 'utf8');
  const licensesPage = fs.readFileSync(path.join(ROOT, 'app/licenses/page.tsx'), 'utf8');
  const aiPortal = fs.readFileSync(path.join(ROOT, 'components/ai/ai-portal-view.tsx'), 'utf8');

  // 1. Static 301 Redirect Rules in _redirects
  assert.match(redirectsFile, /\/products\/:slug\s+\/projects\/:slug\/\s+301/, '_redirects must redirect /products/:slug to /projects/:slug/');
  assert.match(redirectsFile, /\/work\/:slug\s+\/projects\/:slug\/\s+301/, '_redirects must redirect /work/:slug to /projects/:slug/');

  // Category hubs remain accessible; only detail paths should redirect.
  assert.doesNotMatch(redirectsFile, /^\/products\/?\s+/m, '_redirects must preserve the /products category hub');
  assert.doesNotMatch(redirectsFile, /^\/work\/?\s+/m, '_redirects must preserve the /work category hub');

  // 2. Apache .htaccess 301 Rewrite Rules
  assert.match(htaccessFile, /RewriteRule\s+\^products\/\(\[\^\/\]\+\)\/\?\$ https:\/\/\%\{HTTP_HOST\}\/projects\/\$1\/ \[R=301,L\]/, '.htaccess must rewrite /products/ to /projects/');
  assert.match(htaccessFile, /RewriteRule\s+\^work\/\(\[\^\/\]\+\)\/\?\$ https:\/\/\%\{HTTP_HOST\}\/projects\/\$1\/ \[R=301,L\]/, '.htaccess must rewrite /work/ to /projects/');

  // 3. Internal Application Links Standardized to /projects/
  assert.doesNotMatch(whitepaperFile, /\[OpenMail\]\(\/work\//, 'Whitepaper must not link OpenMail to /work/');
  assert.match(whitepaperFile, /\[OpenMail\]\(\/projects\/openmail\/?\)/, 'Whitepaper must link OpenMail to canonical /projects/openmail');
  assert.match(whitepaperFile, /\[Mercura\]\(\/projects\/mercura\/?\)/, 'Whitepaper must link Mercura to canonical /projects/mercura');
  assert.match(whitepaperFile, /\[M31A\]\(\/projects\/m31a\/?\)/, 'Whitepaper must link M31A to canonical /projects/m31a');
  assert.match(whitepaperFile, /\[Octate\]\(\/projects\/octate\/?\)/, 'Whitepaper must link Octate to canonical /projects/octate');

  assert.match(timelinePage, /\/projects\/\$\{project\.slug\}/, 'Timeline page must link directly to /projects/${project.slug}');
  assert.doesNotMatch(timelinePage, /\/work\/\$\{project\.slug\}/, 'Timeline page must not link to /work/');

  assert.match(licensesPage, /\/projects\/\$\{repo\.slug\}/, 'Licenses page must link directly to /projects/${repo.slug}');
  assert.doesNotMatch(licensesPage, /\/work\/\$\{repo\.slug\}/, 'Licenses page must not link to /work/');

  assert.match(aiPortal, /\/projects\/\$\{system\.slug\}/, 'AI Portal view must link to canonical /projects/${system.slug}');
  assert.doesNotMatch(aiPortal, /\/products\/\$\{system\.slug\}/, 'AI Portal view must not link to /products/');
});
