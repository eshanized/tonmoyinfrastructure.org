import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('RUNSTEAD-1: Authoritative Project Registration & Schema Integrity', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');

  // Verify Runstead presence
  const runsteadIdx = contentFile.indexOf("slug: 'runstead'");
  assert.ok(runsteadIdx !== -1, 'Runstead project entry must exist in lib/content.ts');

  const runsteadChunk = contentFile.slice(runsteadIdx, runsteadIdx + 12000);

  // Status must be Development (never Stable Release)
  assert.match(runsteadChunk, /status:\s*'Development'/, 'Runstead status must be Development');
  assert.match(runsteadChunk, /category:\s*'Software'/, 'Runstead category must be Software');
  assert.match(runsteadChunk, /artifactType:\s*'Software Platform'/, 'Runstead artifactType must be Software Platform');
  assert.match(runsteadChunk, /productStatus:\s*'preview'/, 'Runstead productStatus must be preview');
  assert.match(runsteadChunk, /releaseStatus:\s*'pre-release'/, 'Runstead releaseStatus must be pre-release');

  // Authoritative links and repository
  assert.match(runsteadChunk, /repository:\s*'https:\/\/github\.com\/eshanized\/Runstead'/, 'Must link to verified GitHub repo');

  // Verified capabilities & roadmap
  assert.match(runsteadChunk, /PostgreSQL Row-Level Security \(RLS\)/, 'Must document PostgreSQL RLS architecture');
  assert.match(runsteadChunk, /Phase 0: Project Charter & Verification Baseline/, 'Must include Phase 0 roadmap');
  assert.match(runsteadChunk, /Phase 1: Dependency Hardening & Security Audit Baseline/, 'Must include Phase 1 roadmap');
  assert.match(runsteadChunk, /Phase 2: Relational PostgreSQL Schema & Multi-Tenant RLS Enforcement/, 'Must include Phase 2 roadmap');
  assert.match(runsteadChunk, /Milestone 4: Upstream cPanel\/WHM XML-API & Plesk Provisioning Connectors/, 'Must include Milestone 4 roadmap');

  // Repos and Technical Artifacts inclusion
  assert.match(contentFile, /name:\s*'Runstead'[\s\S]*?repository:\s*'https:\/\/github\.com\/eshanized\/Runstead'/, 'Runstead must be registered in repos');
  assert.match(contentFile, /slug:\s*'runstead'[\s\S]*?artifactType:\s*'Software Platform'/, 'Runstead must be in technical artifacts');
});

test('RUNSTEAD-2: 4 Stable Software Releases Immutability', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');
  const productsPage = fs.readFileSync(path.join(ROOT, 'app/products/page.tsx'), 'utf8');

  // Verify the four canonical platforms remain strictly Stable Release
  const stableSlugs = ['openmail', 'mercura', 'm31a', 'octate'];
  for (const slug of stableSlugs) {
    const idx = contentFile.indexOf(`slug: '${slug}'`);
    assert.ok(idx !== -1, `${slug} must exist in lib/content.ts`);
    const chunk = contentFile.slice(idx, idx + 1000);
    assert.match(chunk, /status:\s*'Stable Release'/, `${slug} must retain Stable Release status`);
  }

  // Verify products page filters exclusively to Stable Release software
  assert.match(
    productsPage,
    /p\.type\s*===\s*'software'\s*&&\s*p\.status\s*===\s*'Stable Release'/,
    'Products page must filter strictly to Stable Release software'
  );
});

test('RUNSTEAD-3: Portfolio Economics & Non-Monetary Strategic Assessment', () => {
  const initDataFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/initial-data.ts'),
    'utf8'
  );
  const economicsPage = fs.readFileSync(
    path.join(ROOT, 'app/projects/[slug]/economics/page.tsx'),
    'utf8'
  );

  // Strategic Assessment exists
  assert.match(initDataFile, /id:\s*'strat-runstead'/, 'Strategic assessment strat-runstead must exist');
  assert.match(initDataFile, /projectId:\s*'runstead'/, 'strat-runstead must link to runstead');
  assert.match(initDataFile, /strategicImportance:\s*4/, 'strat-runstead strategicImportance must be 4');
  assert.match(initDataFile, /technicalDifferentiation:\s*4/, 'strat-runstead technicalDifferentiation must be 4');
  assert.match(initDataFile, /infrastructureRelevance:\s*5/, 'strat-runstead infrastructureRelevance must be 5');
  assert.match(initDataFile, /researchSignificance:\s*2/, 'strat-runstead researchSignificance must be 2');
  assert.match(initDataFile, /revenuePotential:\s*5/, 'strat-runstead revenuePotential must be 5');
  assert.match(initDataFile, /ecosystemImportance:\s*4/, 'strat-runstead ecosystemImportance must be 4');

  // Verify no fabricated financial records for Runstead in initial-data.ts
  const operatingMatch = initDataFile.match(/export const initialOperatingCosts[\s\S]*?\];/);
  assert.ok(operatingMatch, 'initialOperatingCosts must exist');
  assert.doesNotMatch(operatingMatch[0], /projectId:\s*'runstead'/, 'Initial operating costs must NOT fabricate data for Runstead');

  const investmentsMatch = initDataFile.match(/export const initialInvestments[\s\S]*?\];/);
  assert.ok(investmentsMatch, 'initialInvestments must exist');
  assert.doesNotMatch(investmentsMatch[0], /projectId:\s*'runstead'/, 'Initial investments must NOT fabricate data for Runstead');

  const revenueMatch = initDataFile.match(/export const initialRevenue[\s\S]*?\];/);
  assert.ok(revenueMatch, 'initialRevenue must exist');
  assert.doesNotMatch(revenueMatch[0], /projectId:\s*'runstead'/, 'Initial revenue must NOT fabricate data for Runstead');

  // Shared server costs must remain 100% allocated to 4 stable platforms
  const allocMatch = initDataFile.match(/export const initialSharedCostAllocations[\s\S]*?\];/);
  assert.ok(allocMatch, 'initialSharedCostAllocations must exist');
  const allocBlock = allocMatch[0];
  assert.match(allocBlock, /sharedCostId:\s*'sh-srv-core'[\s\S]*?projectId:\s*'openmail'[\s\S]*?percentage:\s*30/);
  assert.match(allocBlock, /sharedCostId:\s*'sh-srv-core'[\s\S]*?projectId:\s*'mercura'[\s\S]*?percentage:\s*25/);
  assert.match(allocBlock, /sharedCostId:\s*'sh-srv-core'[\s\S]*?projectId:\s*'m31a'[\s\S]*?percentage:\s*35/);
  assert.match(allocBlock, /sharedCostId:\s*'sh-srv-core'[\s\S]*?projectId:\s*'octate'[\s\S]*?percentage:\s*10/);
  assert.doesNotMatch(allocBlock, /sharedCostId:\s*'sh-srv-core'[\s\S]*?projectId:\s*'runstead'/, 'Runstead must not receive unverified shared server cost');

  // Economics subpage must display unrecorded actuals notice
  assert.match(economicsPage, /Unrecorded Historical Actuals/, 'Economics page must display honest unrecorded notice');
  assert.match(economicsPage, /href="\/projects\/runstead#financial-model"/, 'Economics page must link to financial model');
});

test('RUNSTEAD-4: Deterministic Financial Model Engine & Math Invariants', () => {
  const modelFile = fs.readFileSync(path.join(ROOT, 'lib/runstead-financial-model.ts'), 'utf8');

  // Must export SCENARIO_ASSUMPTIONS and calculateFinancialModel
  assert.match(modelFile, /export const SCENARIO_ASSUMPTIONS/, 'Must export SCENARIO_ASSUMPTIONS');
  assert.match(modelFile, /export function calculateFinancialModel/, 'Must export calculateFinancialModel');

  // Pricing tiers must match Runstead source
  assert.match(modelFile, /sandbox:\s*0/, 'Sandbox tier must be 0');
  assert.match(modelFile, /launch:\s*49/, 'Launch tier must be 49');
  assert.match(modelFile, /growth:\s*149/, 'Growth tier must be 149');
  assert.match(modelFile, /scale:\s*399/, 'Scale tier must be 399');

  // Downstream revenue distinction disclaimer must be embedded
  assert.match(modelFile, /DOWNSTREAM_REVENUE_SEPARATION_DISCLAIMER/, 'Must include downstream revenue separation disclaimer');
  assert.match(modelFile, /never count as Runstead or TIV revenue/i, 'Must explicitly disclaim simulated downstream revenue');

  // ARR = MRR * 12 formula invariant
  assert.match(modelFile, /totalMRR\s*\*\s*12/, 'ARR must be calculated as MRR * 12');

  // Gross profit = MRR - variable COGS
  assert.match(modelFile, /grossProfit\s*=\s*totalMRR\s*-\s*totalCOGS/, 'Gross profit must be totalMRR - totalCOGS');

  // Net cash flow = totalMRR - totalOperatingCost
  assert.match(modelFile, /netCashFlow\s*=\s*totalMRR\s*-\s*totalOperatingCost/, 'Net cash flow must be totalMRR - totalOperatingCost');
});

test('RUNSTEAD-5: Discoverability & Canonical Routing Architecture', () => {
  const projectsPage = fs.readFileSync(path.join(ROOT, 'app/projects/page.tsx'), 'utf8');
  const productsPage = fs.readFileSync(path.join(ROOT, 'app/products/page.tsx'), 'utf8');
  const homePage = fs.readFileSync(path.join(ROOT, 'app/page.tsx'), 'utf8');
  const siteNav = fs.readFileSync(path.join(ROOT, 'components/navigation/site-nav.tsx'), 'utf8');
  const mobileNav = fs.readFileSync(path.join(ROOT, 'components/navigation/mobile-nav.tsx'), 'utf8');
  const redirectsFile = fs.readFileSync(path.join(ROOT, 'public/_redirects'), 'utf8');
  const htaccessFile = fs.readFileSync(path.join(ROOT, 'public/.htaccess'), 'utf8');

  // Projects page has Ventures in Development
  assert.match(projectsPage, /Ventures in Development/, 'Projects page must feature Ventures in Development');
  assert.match(projectsPage, /status\s*===\s*'Development'/, 'Projects page must filter development ventures');

  // Products page has discovery card
  assert.match(productsPage, /href="\/projects\/runstead"/, 'Products page must link to Runstead');

  // Home page has venture highlight
  assert.match(homePage, /href="\/projects\/runstead"/, 'Home page must link to Runstead');
  assert.match(homePage, /VENTURE IN DEVELOPMENT/, 'Home page must label Runstead as Venture in Development');

  // Navigation has Runstead
  assert.match(siteNav, /href:\s*'\/projects\/runstead'/, 'SiteNav must link to /projects/runstead');
  assert.match(mobileNav, /href:\s*'\/projects\/runstead'/, 'MobileNav must link to /projects/runstead');

  // Redirects
  assert.match(redirectsFile, /\/runstead\s+\/projects\/runstead\/\s+301/, '_redirects must redirect /runstead to /projects/runstead/');
  assert.match(htaccessFile, /RewriteRule\s+\^runstead\/\?\$ https:\/\/\%\{HTTP_HOST\}\/projects\/runstead\/ \[R=301,L\]/, '.htaccess must rewrite /runstead to /projects/runstead/');
});

test('RUNSTEAD-6: Institutional Releases & Pre-Release History', () => {
  const institutionalFile = fs.readFileSync(path.join(ROOT, 'lib/institutional.ts'), 'utf8');

  assert.match(institutionalFile, /slug:\s*'runstead-0-2-0-dev'/, 'Pre-release entry runstead-0-2-0-dev must exist');
  assert.match(institutionalFile, /version:\s*'0\.2\.0-dev'/, 'Runstead pre-release version must be 0.2.0-dev');
  assert.match(institutionalFile, /project:\s*'runstead'/, 'Product name must be runstead');
  assert.match(institutionalFile, /Row-Level Security \(RLS\) across all 18 tenant tables/, 'Must document Phase 2 RLS delivery');
});

test('RUNSTEAD-7: Investor & Partner Contact Inquiries', () => {
  const institutionalFile = fs.readFileSync(path.join(ROOT, 'lib/institutional.ts'), 'utf8');
  const contactPage = fs.readFileSync(path.join(ROOT, 'app/contact/page.tsx'), 'utf8');
  const investmentCase = fs.readFileSync(
    path.join(ROOT, 'components/projects/runstead-investment-case.tsx'),
    'utf8'
  );

  // Institutional contact categories
  assert.match(institutionalFile, /value:\s*'investors'/, 'Institutional categories must include investors');
  assert.match(institutionalFile, /value:\s*'partnership'/, 'Institutional categories must include partnership');

  // Contact page handles ?category=
  assert.match(contactPage, /searchParams\.get\('category'\)/, 'Contact page must read category query parameter');

  // Investment case links to contact categories
  assert.match(investmentCase, /href="\/contact\?category=investors"/, 'Investment case must link to /contact?category=investors');
  assert.match(investmentCase, /href="\/contact\?category=partnership"/, 'Investment case must link to /contact?category=partnership');
});
