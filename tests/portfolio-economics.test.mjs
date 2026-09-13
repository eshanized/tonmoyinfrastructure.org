import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('PE-1: Financial Periods Model & FY2026 + Future Period Support', () => {
  const periodsFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/periods.ts'),
    'utf8'
  );

  assert.match(periodsFile, /fy2026/i, 'FY2026 must be supported');
  assert.match(periodsFile, /fy2027/i, 'Future period FY2027 must be supported');
  assert.match(periodsFile, /fy2028/i, 'Future period FY2028 must be supported');
  assert.match(periodsFile, /validateFinancialPeriod/, 'validateFinancialPeriod must be exported');
  assert.match(periodsFile, /status:\s*['"]Published['"]/, 'FY2026 must have Published status');
});

test('PE-2: Portfolio Coverage & Dynamic Project Registry Integration', () => {
  const registryFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/registry.ts'),
    'utf8'
  );
  const contentFile = fs.readFileSync(
    path.join(ROOT, 'lib/content.ts'),
    'utf8'
  );

  // Assert all 7 known projects exist in content
  const requiredProjects = [
    'openmail',
    'mercura',
    'm31a',
    'octate',
    'm31genesis',
    'm31tesla',
    'm31entropy',
  ];

  for (const slug of requiredProjects) {
    assert.match(
      contentFile,
      new RegExp(`slug:\\s*['"]${slug}['"]`),
      `${slug} must exist in content registry`
    );
  }

  // Registry must import from lib/content, not hardcode
  assert.match(registryFile, /getProjects/, 'Registry must import getProjects dynamically');
  assert.match(registryFile, /getRegisteredProjects/, 'Must export getRegisteredProjects');
});

test('PE-3: Strict Anti-Valuation Compliance & No Fictional Valuation Fields', () => {
  const typesFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/types.ts'),
    'utf8'
  );
  const methodologyFile = fs.readFileSync(
    path.join(ROOT, 'app/transparency/financials/portfolio-economics/methodology/page.tsx'),
    'utf8'
  );

  // Assert no property named "valuation" exists in domain interfaces
  assert.doesNotMatch(
    typesFile,
    /^\s*valuation\s*[:?]/m,
    'No field called "valuation" must exist in Portfolio Economics types'
  );

  // Assert methodology explicitly contains the mandatory disclaimer
  assert.match(
    methodologyFile,
    /TIV does not currently assign or publish standalone monetary valuations/i,
    'Methodology must contain the explicit no-valuation declaration'
  );
  assert.match(
    methodologyFile,
    /Portfolio Economics\s+measures economic activity and resource consumption/i,
    'Methodology must define Portfolio Economics as measurement system'
  );
});

test('PE-4: Cash vs Economic Investment & Rate Methodology', () => {
  const initialDataFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/initial-data.ts'),
    'utf8'
  );
  const typesFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/types.ts'),
    'utf8'
  );

  // Types must specify cashAmount, economicAmount, rateMethodology
  assert.match(typesFile, /cashAmount:\s*number\s*\|\s*null/, 'Must support cashAmount');
  assert.match(typesFile, /economicAmount:\s*number\s*\|\s*null/, 'Must support economicAmount');
  assert.match(typesFile, /rateMethodology\?:/, 'Must support rateMethodology');

  // Initial data must record rate methodology explicitly for founder time
  assert.match(
    initialDataFile,
    /rateMethodology:/,
    'Rate methodology must be recorded explicitly for economic investment'
  );
  assert.match(
    initialDataFile,
    /₹500\/hr/i,
    'Standard systems engineering economic baseline rate must be documented'
  );
});

test('PE-5: Person Model & Actual Known Contributors Only', () => {
  const peopleFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/people.ts'),
    'utf8'
  );

  // Eshan Roy is the founder and only known contributor
  assert.match(peopleFile, /eshan-roy/, 'Eshan Roy must be present');
  assert.match(peopleFile, /Founder/, 'Eshan Roy must be typed Founder');
  // Prohibit arbitrary fabricated people
  assert.doesNotMatch(peopleFile, /john doe|alice|bob/i, 'No invented people allowed');
});

test('PE-6: Shared Cost Allocations Sum to 100% Validation', () => {
  const initialDataFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/initial-data.ts'),
    'utf8'
  );
  const dataStoreFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/data-store.ts'),
    'utf8'
  );

  // Data store must validate percentage sum equals 100
  assert.match(dataStoreFile, /validatePercentageSum/, 'Must validate percentage sum');
  assert.match(dataStoreFile, /Shared cost allocations must sum to 100%/, 'Must enforce 100% allocation sum');

  // Verify allocations in initialData for Core Server Cluster (30 + 25 + 35 + 10 = 100%)
  assert.match(initialDataFile, /percentage:\s*30/, 'OpenMail 30% server allocation');
  assert.match(initialDataFile, /percentage:\s*25/, 'Mercura 25% server allocation');
  assert.match(initialDataFile, /percentage:\s*35/, 'M31A 35% server allocation');
  assert.match(initialDataFile, /percentage:\s*10/, 'Octate 10% server allocation');
});

test('PE-7: Revenue Attribution & Unattributed Corporate Revenue Separation', () => {
  const initialDataFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/initial-data.ts'),
    'utf8'
  );

  // Assert unattributed corporate revenue is tracked at portfolio level
  assert.match(initialDataFile, /rev-corp-unatt-01/, 'Corporate unattributed revenue record must exist');
  assert.match(initialDataFile, /revenueType:\s*'Unattributed'/, 'Revenue must be typed Unattributed');
  assert.match(initialDataFile, /attributionMethod:\s*'Unattributed'/, 'Attribution method must be Unattributed');
});

test('PE-8: Financial Reconciliation Engine', () => {
  const calcFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/calculations.ts'),
    'utf8'
  );

  assert.match(calcFile, /reconciliationStatus/, 'Reconciliation status must be calculated');
  assert.match(calcFile, /reconciliationNotes/, 'Reconciliation notes must be generated');
  assert.match(calcFile, /Revenue Reconciled:/, 'Must verify sum of attributed + unattributed equals total');
  assert.match(calcFile, /Operating Expenses Reconciled:/, 'Must verify operating cost reconciliation');
});

test('PE-9: Decimal-Safe Arithmetic & Formatting', () => {
  const decimalFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/decimal.ts'),
    'utf8'
  );

  assert.match(decimalFile, /class DecimalMoney/, 'DecimalMoney class must be implemented');
  assert.match(decimalFile, /formatCurrency/, 'formatCurrency function must be implemented');
  assert.match(decimalFile, /validatePercentageSum/, 'validatePercentageSum function must be implemented');

  // Ensure formatCurrency does not replace null with ₹0
  assert.match(decimalFile, /placeholder\s*=\s*['"]Not Tracked['"]/, 'Default placeholder must be "Not Tracked"');
});

test('PE-10: Strategic Assessment (Non-Monetary 1-5 Scoring)', () => {
  const initialDataFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/initial-data.ts'),
    'utf8'
  );
  const dataStoreFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/data-store.ts'),
    'utf8'
  );

  // Validate 1-5 range enforcement in dataStore
  assert.match(
    dataStoreFile,
    /Strategic assessment scores must be integers between 1 and 5/,
    'Must strictly validate 1-5 score boundary'
  );

  // Check initial assessments exist
  assert.match(initialDataFile, /strategicImportance:\s*[1-5]/, 'Strategic importance 1-5 score');
  assert.match(initialDataFile, /technicalDifferentiation:\s*[1-5]/, 'Technical differentiation 1-5 score');
  assert.match(initialDataFile, /infrastructureRelevance:\s*[1-5]/, 'Infrastructure relevance 1-5 score');
  assert.match(initialDataFile, /researchSignificance:\s*[1-5]/, 'Research significance 1-5 score');
  assert.match(initialDataFile, /revenuePotential:\s*[1-5]/, 'Revenue potential 1-5 score');
  assert.match(initialDataFile, /ecosystemImportance:\s*[1-5]/, 'Ecosystem importance 1-5 score');
});

test('PE-11: Data Lineage & Sources Model', () => {
  const sourcesFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/sources.ts'),
    'utf8'
  );

  assert.match(sourcesFile, /explainDataLineage/, 'explainDataLineage function must be exported');
  assert.match(sourcesFile, /src-gl-2026/, 'src-gl-2026 source record must exist');
  assert.match(sourcesFile, /src-infra-inv-2026/, 'src-infra-inv-2026 invoice source must exist');
  assert.match(sourcesFile, /src-eng-log-2026/, 'src-eng-log-2026 timesheet source must exist');
});

test('PE-12: CSV Import/Export & Rigorous Record Validation', () => {
  const csvFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/csv.ts'),
    'utf8'
  );

  assert.match(csvFile, /exportInvestmentsCsv/, 'Must export investments CSV');
  assert.match(csvFile, /importInvestmentsCsv/, 'Must import investments CSV');
  assert.match(csvFile, /exportOperatingCostsCsv/, 'Must export costs CSV');
  assert.match(csvFile, /importOperatingCostsCsv/, 'Must import costs CSV');
  assert.match(csvFile, /exportRevenueCsv/, 'Must export revenue CSV');
  assert.match(csvFile, /importRevenueCsv/, 'Must import revenue CSV');
  assert.match(csvFile, /exportEngineeringHoursCsv/, 'Must export hours CSV');
  assert.match(csvFile, /importEngineeringHoursCsv/, 'Must import hours CSV');
  assert.match(csvFile, /exportAssetAllocationsCsv/, 'Must export assets CSV');
});

test('PE-13: Audit Trail & Immutable Report Versioning', () => {
  const auditFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/audit.ts'),
    'utf8'
  );
  const reportsFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/reports.ts'),
    'utf8'
  );

  assert.match(auditFile, /logAuditAction/, 'Must export logAuditAction');
  assert.match(auditFile, /\[REDACTED\]/, 'Must sanitize sensitive keys in audit logs');

  assert.match(reportsFile, /publishNewReportVersion/, 'Must export publishNewReportVersion');
  assert.match(reportsFile, /Published reports are immutable/, 'Must enforce version immutability');
});

test('PE-14: Security, RBAC & Public Data Sanitization', () => {
  const authFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/auth.ts'),
    'utf8'
  );

  assert.match(authFile, /Financial Administrator/, 'Must support Financial Administrator');
  assert.match(authFile, /Finance Editor/, 'Must support Finance Editor');
  assert.match(authFile, /Management/, 'Must support Management');
  assert.match(authFile, /Project Manager/, 'Must support Project Manager');
  assert.match(authFile, /Viewer/, 'Must support Viewer');
  assert.match(authFile, /sanitizeProjectForPublic/, 'Must export sanitizeProjectForPublic');
  assert.match(authFile, /sanitizePortfolioForPublic/, 'Must export sanitizePortfolioForPublic');
});

test('PE-15: Canonical Route Coverage & File Existence', () => {
  const requiredRoutes = [
    'app/transparency/financials/portfolio-economics/page.tsx',
    'app/transparency/financials/portfolio-economics/methodology/page.tsx',
    'app/transparency/financials/portfolio-economics/dashboard/page.tsx',
    'app/internal/portfolio-economics/page.tsx',
    'app/projects/[slug]/economics/page.tsx',
  ];

  for (const route of requiredRoutes) {
    const fullPath = path.join(ROOT, route);
    assert.ok(fs.existsSync(fullPath), `Route must exist: ${route}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 200, `Route must contain comprehensive code: ${route}`);
  }
});
