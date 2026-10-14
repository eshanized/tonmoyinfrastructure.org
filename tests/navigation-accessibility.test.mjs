import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('Navigation & Interactive Controls Accessibility', () => {
  const siteNav = fs.readFileSync(path.join(ROOT, 'components/navigation/site-nav.tsx'), 'utf8');
  const mobileNav = fs.readFileSync(path.join(ROOT, 'components/navigation/mobile-nav.tsx'), 'utf8');
  const courierMap = fs.readFileSync(path.join(ROOT, 'components/solutions/courier-network-explorer.tsx'), 'utf8');
  const dcExplorer = fs.readFileSync(path.join(ROOT, 'components/solutions/data-center-explorer.tsx'), 'utf8');
  const techMap = fs.readFileSync(path.join(ROOT, 'components/technology/technology-map.tsx'), 'utf8');
  const newsList = fs.readFileSync(path.join(ROOT, 'components/news/news-list.tsx'), 'utf8');
  const searchPage = fs.readFileSync(path.join(ROOT, 'app/search/page.tsx'), 'utf8');

  // 1. Desktop Navigation Accessibility
  assert.match(siteNav, /aria-expanded/, 'Desktop nav dropdowns must expose aria-expanded');
  assert.match(siteNav, /aria-haspopup="true"/, 'Desktop nav dropdowns must expose aria-haspopup');
  assert.match(siteNav, /e\.key === 'Escape'/, 'Desktop nav must handle Escape key to close dropdowns');
  assert.doesNotMatch(siteNav, /group-hover:opacity-100/i, 'Desktop nav must not rely on hover-only CSS to display menus');

  // 2. Mobile Navigation Modal Dialog & Focus Trap
  assert.match(mobileNav, /role="dialog"/, 'Mobile nav drawer must have role="dialog"');
  assert.match(mobileNav, /aria-modal="true"/, 'Mobile nav drawer must have aria-modal="true"');
  assert.match(mobileNav, /e\.key === 'Escape'/, 'Mobile nav must handle Escape key');
  assert.match(mobileNav, /document\.body\.style\.overflow\s*=\s*'hidden'/, 'Mobile nav must trap background scroll');
  assert.doesNotMatch(mobileNav, /\/products\/openmail/, 'Mobile nav must not link to legacy /products/ routes');
  assert.match(mobileNav, /\/projects\/openmail/, 'Mobile nav must link to canonical /projects/ route');

  // 3. Interactive SVG Pin Accessibility (Courier & Datacenter Maps)
  assert.match(courierMap, /role="button"/, 'Courier map SVG pins must have role="button"');
  assert.match(courierMap, /tabIndex=\{0\}/, 'Courier map SVG pins must be keyboard focusable');
  assert.match(courierMap, /aria-pressed/, 'Courier map SVG pins must expose aria-pressed');
  assert.match(courierMap, /onKeyDown/, 'Courier map SVG pins must handle Enter/Space keyboard events');

  assert.match(dcExplorer, /role="button"/, 'Datacenter map SVG pins must have role="button"');
  assert.match(dcExplorer, /tabIndex=\{0\}/, 'Datacenter map SVG pins must be keyboard focusable');
  assert.match(dcExplorer, /aria-pressed/, 'Datacenter map SVG pins must expose aria-pressed');
  assert.match(dcExplorer, /onKeyDown/, 'Datacenter map SVG pins must handle Enter/Space keyboard events');

  // 4. Technology Map Node Accessibility
  assert.match(techMap, /role="button"/, 'Technology map SVG nodes must have role="button"');
  assert.match(techMap, /tabIndex=\{0\}/, 'Technology map SVG nodes must be keyboard focusable');
  assert.match(techMap, /onKeyDown/, 'Technology map SVG nodes must handle Enter/Space keyboard events');
  assert.match(techMap, /\/projects\/openmail/, 'Technology map nodes must link to canonical /projects/ routes');

  // 5. News Filter & Search Accessibility
  assert.match(newsList, /type="button"/, 'News category filters must use button elements');
  assert.match(newsList, /aria-pressed/, 'News category filters must declare aria-pressed state');
  assert.match(newsList, /Clear filter/, 'News list must provide a clear filter mechanism');

  assert.match(searchPage, /aria-label="Clear search query"/, 'Search page must provide accessible clear button');
  assert.match(searchPage, /href:\s*`\/projects\/\$\{p\.slug\}`/, 'Search must return canonical /projects/ routes');
  assert.match(searchPage, /\/whitepaper/, 'Search must index whitepaper');
  assert.match(searchPage, /\/status/, 'Search must index operational status');
});
