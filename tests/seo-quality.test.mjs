import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('Sitemap filters non-indexable content and prevents duplicate URL entries', () => {
  const sitemap = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');

  assert.match(sitemap, /uniqueEntries/, 'sitemap must deduplicate URLs');
  assert.match(sitemap, /filter\(\(project\) => !project\.noIndex\)/, 'noindex projects must be excluded');
  assert.match(sitemap, /publication\.status !== 'Draft'/, 'draft publications must be excluded');
  assert.match(sitemap, /report\.status === 'Published'/, 'only published reports must be included');
  assert.match(sitemap, /canonicalOrigin/, 'sitemap must enforce canonical origin');
  assert.match(sitemap, /pathname\.startsWith\('\/search'\)/, 'runtime search must be excluded');
  assert.match(sitemap, /pathname\.startsWith\('\/internal\/'\)/, 'internal routes must be excluded');
  assert.match(sitemap, /pathname\.startsWith\('\/api\/'\)/, 'API routes must be excluded');
});

test('Product metadata titles target distinct, descriptive search intent', () => {
  const content = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');
  const expected = {
    openmail: /OpenMail — Self-Hosted Email Server/,
    mercura: /Mercura — Self-Hosted Mercurial Code Hosting/,
    m31a: /M31A — Open-Source Rust AI Coding Agent Runtime/,
    octate: /Octate — AI Code Review CLI/,
    runstead: /Runstead — Hosting Business Management/,
  };

  for (const [slug, titlePattern] of Object.entries(expected)) {
    const start = content.indexOf(`slug: '${slug}'`);
    assert.notEqual(start, -1, `missing project entry for ${slug}`);
    const end = content.indexOf('\n  {', start + 5);
    const project = content.slice(start, end === -1 ? undefined : end);
    assert.match(project, titlePattern, `${slug} needs a descriptive SEO title`);
    assert.match(project, /seoDescription:/, `${slug} needs an SEO description`);
  }
});
