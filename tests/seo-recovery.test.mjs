import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('SEO-1: Sitemap URL Uniqueness, Canonical Formatting & Absence of Date Churn', () => {
  const sitemapContent = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');

  // Verify non-indexable routes are excluded
  assert.match(sitemapContent, /!url\.pathname\.startsWith\('\/search'\)/, 'Sitemap must exclude /search');
  assert.match(sitemapContent, /!url\.pathname\.startsWith\('\/internal\/'\)/, 'Sitemap must exclude /internal routes');
  assert.match(sitemapContent, /!url\.pathname\.startsWith\('\/api\/'\)/, 'Sitemap must exclude /api routes');

  // Verify no wholesale "lastModified: new Date()" churn on static pages
  // Match lines in staticPages: they should either have a static milestone date or omit lastModified
  const staticPagesChunk = sitemapContent.slice(
    sitemapContent.indexOf('const staticPages'),
    sitemapContent.indexOf('const projectPages')
  );
  assert.doesNotMatch(
    staticPagesChunk,
    /lastModified:\s*new Date\(\s*\)/,
    'Static pages must NOT assign new Date() at build time'
  );

  // Verify canonical project routes exist in sitemap
  assert.match(sitemapContent, /\/projects\/\$\{project\.slug\}/, 'Sitemap must index canonical project routes');

  // Verify infrastructure routes mapping
  assert.match(sitemapContent, /\/infrastructure\//, 'Sitemap must index infrastructure routes');
});

test('SEO-2: Redirects & Canonical Directives Correctness', () => {
  const redirectsContent = fs.readFileSync(path.join(ROOT, 'public/_redirects'), 'utf8');
  const htaccessContent = fs.readFileSync(path.join(ROOT, 'public/.htaccess'), 'utf8');

  // Required product shortcuts to canonical targets
  const requiredProductRedirects = ['openmail', 'mercura', 'm31a', 'octate', 'm31genesis', 'm31tesla', 'm31entropy'];
  for (const slug of requiredProductRedirects) {
    assert.match(
      redirectsContent,
      new RegExp(`/${slug}\\s+/projects/${slug}/\\s+301`),
      `_redirects must have 301 redirect for /${slug} to /projects/${slug}/`
    );
    assert.match(
      htaccessContent,
      new RegExp(`RewriteRule \\^${slug}/\\?\\$ https://%\\{HTTP_HOST\\}/projects/${slug}/ \\[R=301,L\\]`),
      `.htaccess must have 301 rule for /${slug}`
    );
  }

  // Optical systems alias redirect
  assert.match(
    redirectsContent,
    /\/infrastructure\/optical-systems\s+\/infrastructure\/optical\/\s+301/,
    '_redirects must redirect optical-systems alias to canonical /infrastructure/optical/'
  );
  assert.match(
    htaccessContent,
    /RewriteRule \^infrastructure\/optical-systems/,
    '.htaccess must redirect optical-systems alias'
  );
});

test('SEO-3: Robots.txt Crawl Budget & Disallow Directives', () => {
  const robotsContent = fs.readFileSync(path.join(ROOT, 'app/robots.ts'), 'utf8');

  assert.match(robotsContent, /sitemap\.xml/, 'Robots must declare sitemap URL');
  assert.match(robotsContent, /\/api\//, 'Robots must disallow /api/');
  assert.match(robotsContent, /\/admin\//, 'Robots must disallow /admin/');
  assert.match(robotsContent, /\/private\//, 'Robots must disallow /private/');
  assert.match(robotsContent, /\/internal\//, 'Robots must disallow /internal/');
});

test('SEO-4: Metadata Helper & Canonical URL Normalization', () => {
  const seoContent = fs.readFileSync(path.join(ROOT, 'lib/seo.ts'), 'utf8');

  // buildCanonicalUrl must enforce trailing slash
  assert.match(seoContent, /function buildCanonicalUrl/, 'lib/seo.ts must export buildCanonicalUrl');

  // generateProjectMetadata must support project.seoTitle
  assert.match(seoContent, /project\.seoTitle/, 'generateProjectMetadata must check project.seoTitle');
  assert.match(seoContent, /const canonicalPath = `\/projects\/\$\{project\.slug\}`/, 'Canonical path must be /projects/${project.slug}');
});

test('SEO-5: Structured Data Schema Semantic Accuracy', () => {
  const sdContent = fs.readFileSync(path.join(ROOT, 'lib/structured-data.ts'), 'utf8');

  assert.match(sdContent, /generateOrganizationSchema/, 'Must export generateOrganizationSchema');
  assert.match(sdContent, /generateWebSiteSchema/, 'Must export generateWebSiteSchema');
  assert.match(sdContent, /generateSoftwareApplicationSchema/, 'Must export generateSoftwareApplicationSchema');
  assert.match(sdContent, /generateScholarlyArticleSchema/, 'Must export generateScholarlyArticleSchema');

  // Verify Organization author handling in ScholarlyArticle
  assert.match(sdContent, /#organization/, 'Must link Organization schema ID when author is TIV');
});

test('SEO-6: Public Claims Reconciliation & Editorial Accuracy', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');
  const contentDoc = fs.readFileSync(path.join(ROOT, 'CONTENT.md'), 'utf8');

  // Data centers: verify confirmed Jayapura sovereign facility, status Production, and removal of unverified claims
  const dcChunkStart = contentFile.indexOf("slug: 'data-centers'");
  assert.ok(dcChunkStart !== -1, 'data-centers must exist in lib/content.ts');
  const dcChunk = contentFile.slice(dcChunkStart, dcChunkStart + 2500);

  assert.match(dcChunk, /status:\s*'Production'/, 'data-centers status must be Production');
  assert.match(dcChunk, /classification:\s*'Internal'/, 'data-centers classification must be Internal');
  assert.match(dcChunk, /Jayapura/, 'data-centers must identify confirmed Jayapura location');
  assert.match(dcChunk, /Papua,\s*Indonesia/, 'data-centers must specify Papua, Indonesia');
  assert.doesNotMatch(dcChunk, /planned architecture|not yet established|proposed facility/i, 'data-centers must NOT downgrade facility to planned/unestablished');
  assert.doesNotMatch(dcChunk, /845 PB/, 'data-centers must NOT claim unverified 845 PB storage fleet');
  assert.doesNotMatch(dcChunk, /99\.999%/, 'data-centers must NOT claim unverified 99.999% uptime SLA');
  assert.doesNotMatch(dcChunk, /16 dedicated sites across 11 countries/, 'data-centers must NOT claim 16 dedicated operated sites');

  // Courier / Logistics: verify removal of unverified 50,000+ parcels and 48-hr SLA claims
  const courierChunkStart = contentFile.indexOf("slug: 'courier'");
  assert.ok(courierChunkStart !== -1, 'courier must exist in lib/content.ts');
  const courierChunk = contentFile.slice(courierChunkStart, courierChunkStart + 1500);

  assert.match(courierChunk, /status:\s*'Research'/, 'courier status must be Research');
  assert.doesNotMatch(courierChunk, /50,000\+ parcels/, 'courier must NOT claim 50,000+ parcels daily');
  assert.doesNotMatch(courierChunk, /48-hour delivery SLA/, 'courier must NOT claim 48-hour delivery SLA');

  // CONTENT.md: verify operational claims policy exists and acknowledges Jayapura data center
  assert.match(contentDoc, /Infrastructure & Operational Claims/, 'CONTENT.md must have Section 1 item 5 policy');
  assert.match(contentDoc, /Jayapura, Papua, Indonesia/, 'CONTENT.md must document confirmed Jayapura data center');
});

test('SEO-7: Product SEO Title & Description Enrichment', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');

  const products = ['openmail', 'mercura', 'm31a', 'octate'];
  for (const slug of products) {
    const slugIdx = contentFile.indexOf(`slug: '${slug}'`);
    assert.ok(slugIdx !== -1, `${slug} must exist in lib/content.ts`);
    const chunk = contentFile.slice(slugIdx, slugIdx + 500);

    assert.match(chunk, /seoTitle:/, `${slug} must have explicit seoTitle defined`);
    assert.match(chunk, /seoDescription:/, `${slug} must have explicit seoDescription defined`);
  }
});

test('SEO-8: Internal Navigation & Canonical Cross-Linking', () => {
  const navContent = fs.readFileSync(path.join(ROOT, 'components/navigation/site-nav.tsx'), 'utf8');
  const detailViewContent = fs.readFileSync(path.join(ROOT, 'components/projects/project-detail-view.tsx'), 'utf8');

  // Site navigation must link products to their canonical /projects/ route
  assert.match(navContent, /href:\s*'\/projects\/openmail'/, 'SiteNav must link OpenMail to /projects/openmail');
  assert.match(navContent, /href:\s*'\/projects\/mercura'/, 'SiteNav must link Mercura to /projects/mercura');
  assert.match(navContent, /href:\s*'\/projects\/m31a'/, 'SiteNav must link M31A to /projects/m31a');
  assert.match(navContent, /href:\s*'\/projects\/octate'/, 'SiteNav must link Octate to /projects/octate');

  // ProjectDetailView must link related items to canonical /projects/
  assert.match(detailViewContent, /href=\{`\/projects\/\$\{rel\.slug\}\/?`\}/, 'Detail view must link related items to /projects/${rel.slug}');
});

test('SEO-9: Homepage Architecture & Headings Structure', () => {
  const homeContent = fs.readFileSync(path.join(ROOT, 'app/page.tsx'), 'utf8');

  // Single primary H1 tag
  const h1Matches = homeContent.match(/<h1[^>]*>/g);
  assert.ok(h1Matches && h1Matches.length === 1, 'Homepage must contain exactly one H1 tag');

  // Title and metadata positioning
  assert.match(homeContent, /Enterprise Infrastructure & Systems Engineering/, 'Homepage title must reflect enterprise systems positioning');
  assert.match(homeContent, /sovereign software platforms/, 'Homepage description must reflect software platforms');

  // Commercial & technical discovery CTAs
  assert.match(homeContent, /href="\/products\/?\/"?/, 'Homepage hero must link to /products');
  assert.match(homeContent, /href="\/infrastructure\/?\/"?/, 'Homepage hero must link to /infrastructure');
  assert.match(homeContent, /href="\/contact\/?\/"?/, 'Homepage hero must link to /contact for inquiries');
});
