import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('KYRO-1: project registration and truthful pre-release status', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');
  const kyroIdx = contentFile.indexOf("slug: 'kyro'");
  assert.ok(kyroIdx !== -1, 'Kyro must be registered in lib/content.ts');
  const nextProject = contentFile.indexOf("slug: '", kyroIdx + 12);
  const kyroChunk = contentFile.slice(kyroIdx, nextProject === -1 ? kyroIdx + 12000 : nextProject);
  assert.match(kyroChunk, /status:\s*'Development'/, 'Kyro must remain in development');
  assert.match(kyroChunk, /productStatus:\s*'preview'/, 'Kyro must remain preview');
  assert.match(kyroChunk, /releaseStatus:\s*'pre-release'/, 'Kyro must remain pre-release');
  assert.match(kyroChunk, /repository:\s*'https:\/\/github\.com\/eshanized\/Kyro'/, 'Kyro source URL must be present');
  assert.match(kyroChunk, /observe–reason–act–verify/i, 'Kyro approach should be documented');
  assert.match(kyroChunk, /release qualification/i, 'Kyro must not be claimed as fully release-qualified');
});

test('KYRO-2: discovery, static route and SEO indexing integration', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');
  const homepage = fs.readFileSync(path.join(ROOT, 'app/page.tsx'), 'utf8');
  const projectIndex = fs.readFileSync(path.join(ROOT, 'app/projects/page.tsx'), 'utf8');
  const projectRoute = fs.readFileSync(path.join(ROOT, 'app/projects/[slug]/page.tsx'), 'utf8');
  const sitemap = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');
  const structuredData = fs.readFileSync(path.join(ROOT, 'lib/structured-data.ts'), 'utf8');

  assert.match(contentFile, /slug:\s*'kyro'/, 'canonical catalogue must include Kyro');
  assert.match(homepage, /Kyro — Desktop AI Assistant/, 'homepage must feature Kyro');
  assert.match(homepage, /href="\/projects\/kyro"/, 'homepage must link to the project profile');
  assert.match(homepage, /https:\/\/github\.com\/eshanized\/Kyro/, 'homepage must link to the GitHub repository');
  assert.match(projectIndex, /getProjects\(\)\.filter\(\(p\) => p\.status === 'Development'\)/, 'development venture list must be catalogue-driven');
  assert.match(projectRoute, /getProjects\(\)\.map\(\(p\) => \(\{ slug: p\.slug \}\)\)/, 'static params must include all project slugs');
  assert.match(sitemap, /getProjects\(\)/, 'sitemap must derive project URLs from project catalogue');
  assert.match(structuredData, /generateSoftwareApplicationSchema/, 'project route should have software structured-data support');
});


test('KYRO-3: project metadata and sitemap discoverability', () => {
  const content = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');
  const route = fs.readFileSync(path.join(ROOT, 'app/projects/[slug]/page.tsx'), 'utf8');
  const structuredData = fs.readFileSync(path.join(ROOT, 'lib/structured-data.ts'), 'utf8');
  const sitemap = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');
  const kyroIdx = content.indexOf("slug: 'kyro'");
  const nextProject = content.indexOf("\n  {", kyroIdx + 10);
  const kyro = content.slice(kyroIdx, nextProject === -1 ? kyroIdx + 8000 : nextProject);

  assert.match(kyro, /seoTitle: 'Kyro — Desktop AI Assistant/);
  assert.match(kyro, /seoDescription:/);
  assert.match(kyro, /desktop AI assistant/i);
  assert.match(kyro, /pre-release/i);
  assert.match(kyro, /https:\/\/tonmoyinfrastructure\.org\/projects\/kyro\//, 'catalog should refer to the canonical Kyro profile');
  assert.match(route, /generateProjectMetadata\(project/);
  assert.match(route, /generateSoftwareApplicationSchema\(project\)/);
  assert.match(structuredData, /'@type': 'SoftwareApplication'/);
  assert.match(sitemap, /project\.slug === 'kyro' \|\| project\.status === 'Stable Release'/, 'Kyro gets a core project priority');
  assert.match(sitemap, /getProjects\(\)/, 'project catalogue feeds the sitemap');
});

test('KYRO-4: portfolio economics, period selection, and truthful financial disclosure', () => {
  const initialData = fs.readFileSync(path.join(ROOT, 'lib/portfolio-economics/initial-data.ts'), 'utf8');
  const sources = fs.readFileSync(path.join(ROOT, 'lib/portfolio-economics/sources.ts'), 'utf8');
  const economicsRoute = fs.readFileSync(path.join(ROOT, 'app/projects/[slug]/economics/page.tsx'), 'utf8');
  const sitemap = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');
  const economicsCase = fs.readFileSync(path.join(ROOT, 'components/projects/kyro-economic-case.tsx'), 'utf8');
  const detailView = fs.readFileSync(path.join(ROOT, 'components/projects/project-detail-view.tsx'), 'utf8');

  assert.match(initialData, /id:\s*'inv-kyro-status-fy2027'[\\s\\S]*?cashAmount:\s*null[\\s\\S]*?economicAmount:\s*null/,
    'Kyro must explicitly leave unverified investment actuals untracked rather than inserting zeroes');
  assert.match(initialData, /id:\s*'strat-kyro'[\\s\\S]*?revenuePotential:\s*3/,
    'Kyro must have a preliminary qualitative assessment separate from monetary valuation');
  assert.match(initialData, /projectId:\s*'kyro'[\\s\\S]*?Preliminary qualitative classification/i);
  assert.match(sources, /KYRO-PE-FY2027-STATUS/,
    'Kyro must have a lineage record explaining the status-only entry');
  assert.match(economicsRoute, /getFinancialPeriods/,
    'emerging ventures without historical actuals should use the open reporting period');
  assert.match(economicsRoute, /Not Tracked[\\s\\S]*zero expenditure or zero revenue/i,
    'missing financial data must not be represented as zero');
  assert.match(detailView, /KyroEconomicCase/,
    'Kyro commercial economics must be visible on the project profile');
  assert.match(economicsCase, /COMMERCIAL OPTIONS TO VALIDATE/);
  assert.match(economicsCase, /No public subscription price/);
  assert.match(economicsCase, /no project valuation, revenue forecast/i);
  assert.match(sitemap, /projectEconomicPages/);
  assert.match(sitemap, /projects\\/\\$\\{project\\.slug\\}\\/economics/);
});
