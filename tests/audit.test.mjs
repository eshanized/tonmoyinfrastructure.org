import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('1. Core Truth & Product Status Integrity', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');

  // Verify all 4 products are defined as Stable Release
  const stableProducts = ['openmail', 'mercura', 'm31a', 'octate'];

  for (const slug of stableProducts) {
    // Assert slug exists
    assert.match(contentFile, new RegExp(`slug:\\s*['"]${slug}['"]`), `${slug} must exist in lib/content.ts`);

    // Extract product chunk
    const slugIdx = contentFile.indexOf(`slug: '${slug}'`);
    assert.ok(slugIdx !== -1, `${slug} must have slug definition`);
    const chunk = contentFile.slice(slugIdx, slugIdx + 1200);

    // Assert status is strictly 'Stable Release'
    assert.match(chunk, /status:\s*'Stable Release'/, `${slug} must have status: 'Stable Release'`);

    // Assert developmentStage is 'active'
    assert.match(chunk, /developmentStage:\s*['"]active['"]/i, `${slug} must have developmentStage: 'active'`);

    // Assert prohibited words are not applied as product status or description
    assert.doesNotMatch(chunk, /status:\s*'Upcoming'/i, `${slug} must not be marked Upcoming`);
    assert.doesNotMatch(chunk, /status:\s*'Concept'/i, `${slug} must not be marked Concept`);
    assert.doesNotMatch(chunk, /status:\s*'Prototype'/i, `${slug} must not be marked Prototype`);
    assert.doesNotMatch(chunk, /status:\s*'Experimental'/i, `${slug} must not be marked Experimental`);
  }
});

test('2. Founder & Governance Verification', () => {
  const peopleFile = fs.readFileSync(path.join(ROOT, 'lib/people.ts'), 'utf8');

  assert.match(peopleFile, /name:\s*'Eshan Roy'/, 'Founder must be Eshan Roy');
  assert.match(peopleFile, /handle:\s*'eshanized'/, 'Founder handle must be eshanized');
  assert.match(peopleFile, /role:\s*'Founder'/, 'Role must be Founder');
});

test('3. Canonical Routes Coverage', () => {
  const requiredRoutes = [
    'app/page.tsx',
    'app/products/page.tsx',
    'app/products/[slug]/page.tsx',
    'app/projects/page.tsx',
    'app/projects/[slug]/page.tsx',
    'app/work/page.tsx',
    'app/work/[slug]/page.tsx',
    'app/infrastructure/page.tsx',
    'app/infrastructure/[slug]/page.tsx',
    'app/research/page.tsx',
    'app/research/areas/page.tsx',
    'app/research/experiments/page.tsx',
    'app/research/publications/page.tsx',
    'app/research/publications/[slug]/page.tsx',
    'app/research/whitepaper/page.tsx',
    'app/open-source/page.tsx',
    'app/transparency/page.tsx',
    'app/transparency/financials/page.tsx',
    'app/transparency/governance/page.tsx',
    'app/transparency/security/page.tsx',
    'app/transparency/annual-reports/page.tsx',
    'app/security/page.tsx',
    'app/legal/page.tsx',
    'app/legal/privacy/page.tsx',
    'app/legal/terms/page.tsx',
    'app/legal/accessibility/page.tsx',
    'app/legal/licenses/page.tsx',
    'app/privacy/page.tsx',
    'app/terms/page.tsx',
    'app/accessibility/page.tsx',
    'app/about/page.tsx',
    'app/about/leadership/page.tsx',
    'app/technology/page.tsx',
    'app/contact/page.tsx',
  ];

  for (const route of requiredRoutes) {
    const fullPath = path.join(ROOT, route);
    assert.ok(fs.existsSync(fullPath), `Route file must exist: ${route}`);
  }
});

test('4. Required Public Assets', () => {
  const assets = [
    'public/favicon.svg',
    'public/logo.svg',
    'public/site.webmanifest',
  ];

  for (const asset of assets) {
    const fullPath = path.join(ROOT, asset);
    assert.ok(fs.existsSync(fullPath), `Asset file must exist: ${asset}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 0, `Asset file must not be empty: ${asset}`);
  }
});

test('5. Repository Documentation Suite', () => {
  const docs = [
    'README.md',
    'ARCHITECTURE.md',
    'DEPLOYMENT.md',
    'CONTENT.md',
    'DESIGN_SYSTEM.md',
    'SECURITY.md',
    'CONTRIBUTING.md',
  ];

  for (const doc of docs) {
    const fullPath = path.join(ROOT, doc);
    assert.ok(fs.existsSync(fullPath), `Documentation file must exist: ${doc}`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.ok(content.length > 200, `Documentation file must have comprehensive content: ${doc}`);
  }
});

test('6. Financial Data Honesty & Disclaimer', () => {
  const institutionalFile = fs.readFileSync(path.join(ROOT, 'lib/institutional.ts'), 'utf8');
  assert.match(
    institutionalFile,
    /Management Estimate|unaudited/i,
    'Financials must be explicitly labeled as management estimate or unaudited'
  );
});

test('7. Technical Diagrams Coverage', () => {
  const diagramFiles = [
    'components/technology/technology-stack-diagram.tsx',
    'components/infrastructure/network-diagram.tsx',
    'components/infrastructure/optical-path.tsx',
    'components/infrastructure/system-map.tsx',
    'components/infrastructure/infrastructure-map.tsx',
    'components/shared/hero-diagram.tsx',
  ];

  for (const diag of diagramFiles) {
    const fullPath = path.join(ROOT, diag);
    assert.ok(fs.existsSync(fullPath), `Technical diagram component must exist: ${diag}`);
  }
});

test('8. Navigation & Footer Route Integrity', () => {
  const navFile = fs.readFileSync(path.join(ROOT, 'components/navigation/site-nav.tsx'), 'utf8');
  const footerFile = fs.readFileSync(path.join(ROOT, 'components/layout/site-footer.tsx'), 'utf8');

  // Verify all primary categories are in nav
  assert.match(navFile, /Work/, 'Work must be in SiteNav');
  assert.match(navFile, /Infrastructure/, 'Infrastructure must be in SiteNav');
  assert.match(navFile, /Research/, 'Research must be in SiteNav');
  assert.match(navFile, /Open Source/, 'Open Source must be in SiteNav');
  assert.match(navFile, /Transparency/, 'Transparency must be in SiteNav');
  assert.match(navFile, /About/, 'About must be in SiteNav');

  // Verify footer links
  assert.match(footerNavExtract(footerFile), /\/products/, 'Footer must link to /products');
  assert.match(footerNavExtract(footerFile), /\/projects/, 'Footer must link to /projects');
  assert.match(footerNavExtract(footerFile), /\/research\/areas/, 'Footer must link to /research/areas');
  assert.match(footerNavExtract(footerFile), /\/security/, 'Footer must link to /security');
});

test('9. SEO, Canonical, Sitemap & Structured Data Architecture', () => {
  // 1. Documentation
  const seoDocPath = path.join(ROOT, 'SEO.md');
  assert.ok(fs.existsSync(seoDocPath), 'SEO.md must exist in root');
  assert.ok(fs.statSync(seoDocPath).size > 1000, 'SEO.md must be comprehensive');

  // 2. Centralized Site Configuration
  const siteConfigFile = fs.readFileSync(path.join(ROOT, 'lib/site-config.ts'), 'utf8');
  assert.match(siteConfigFile, /tonmoyinfrastructure\.org/, 'Site config must specify canonical domain tonmoyinfrastructure.org');
  assert.match(siteConfigFile, /Eshan Roy/, 'Site config must declare founder Eshan Roy');
  assert.match(siteConfigFile, /eshanized/, 'Site config must declare handle eshanized');

  // 3. SEO & Structured Data Modules
  const seoFile = fs.readFileSync(path.join(ROOT, 'lib/seo.ts'), 'utf8');
  assert.match(seoFile, /buildCanonicalUrl/, 'SEO module must export buildCanonicalUrl');
  assert.match(seoFile, /generatePageMetadata/, 'SEO module must export generatePageMetadata');

  const sdFile = fs.readFileSync(path.join(ROOT, 'lib/structured-data.ts'), 'utf8');
  assert.match(sdFile, /generatePageGraph/, 'Structured data module must export generatePageGraph');
  assert.match(sdFile, /generateOrganizationSchema/, 'Structured data module must export generateOrganizationSchema');
  assert.match(sdFile, /generateSoftwareApplicationSchema/, 'Structured data module must export generateSoftwareApplicationSchema');

  // 4. Robots & Sitemap
  const robotsFile = fs.readFileSync(path.join(ROOT, 'app/robots.ts'), 'utf8');
  assert.match(robotsFile, /sitemap\.xml/, 'Robots must reference sitemap.xml');
  assert.match(robotsFile, /\/api\//, 'Robots must disallow /api/');

  const sitemapFile = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');
  assert.doesNotMatch(sitemapFile, /'\/search'/, 'Sitemap must exclude /search');
  assert.match(sitemapFile, /\/projects\/\$\{p\.slug\}/, 'Sitemap must index canonical project routes');

  // 5. Canonical Consolidation on Project Detail Variants
  assert.match(seoFile, /\/projects\/\$\{project\.slug\}/, 'SEO helper must enforce canonical path /projects/${project.slug}');

  const productDetailPage = fs.readFileSync(path.join(ROOT, 'app/products/[slug]/page.tsx'), 'utf8');
  assert.match(productDetailPage, /generateProjectMetadata\(project/, 'Product detail page must use generateProjectMetadata');

  const workDetailPage = fs.readFileSync(path.join(ROOT, 'app/work/[slug]/page.tsx'), 'utf8');
  assert.match(workDetailPage, /generateProjectMetadata\(project/, 'Work detail page must use generateProjectMetadata');

  // 6. Search Page NoIndex
  const searchLayout = fs.readFileSync(path.join(ROOT, 'app/search/layout.tsx'), 'utf8');
  assert.match(searchLayout, /noIndex:\s*true/, 'Search layout must enforce noIndex: true');
});

function footerNavExtract(file) {
  return file;
}
