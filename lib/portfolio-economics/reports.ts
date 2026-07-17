// ─── Portfolio Economics Report Generation & Versioning ────────────────────
// Generates versioned, exportable reports (JSON, CSV, and printable structure).
// Strictly enforces version immutability (FY2026 v1.0, etc.).
// Distinguishes between Internal Full Report and Public Transparent Report.

import { calculatePortfolioEconomicsSummary } from './calculations';
import { sanitizePortfolioForPublic } from './auth';
import { getFinancialPeriod } from './periods';
import type { PublishedReportVersion, PortfolioEconomicsSummary } from './types';

const publishedVersionsStore: PublishedReportVersion[] = [
  {
    id: 'rep-fy2026-v1.0',
    fiscalYear: 'FY2026',
    version: 'v1.0',
    publishedAt: '2026-04-01T10:00:00Z',
    publishedBy: 'Eshan Roy (Founder & Financial Administrator)',
    summary:
      'Initial baseline Portfolio Economics report for FY2026 covering 7 core projects and research lines.',
    dataSnapshot: sanitizePortfolioForPublic(calculatePortfolioEconomicsSummary('fy2026')) as any,
  },
];

export function getPublishedVersions(fiscalYear?: string): PublishedReportVersion[] {
  return fiscalYear
    ? publishedVersionsStore.filter((v) => v.fiscalYear.toLowerCase() === fiscalYear.toLowerCase())
    : [...publishedVersionsStore];
}

export function publishNewReportVersion(
  periodId: string,
  version: string,
  publishedBy: string,
  summaryNotes: string
): PublishedReportVersion {
  const period = getFinancialPeriod(periodId);
  if (!period) throw new Error(`Unknown financial period: ${periodId}`);

  // Check if version already exists for this fiscal year
  const exists = publishedVersionsStore.find(
    (v) => v.fiscalYear.toLowerCase() === period.fiscalYear.toLowerCase() && v.version === version
  );
  if (exists) {
    throw new Error(
      `Version ${version} already exists for ${period.fiscalYear}. Published reports are immutable. Use a new version identifier (e.g. v1.1).`
    );
  }

  const rawSummary = calculatePortfolioEconomicsSummary(period.id);
  const sanitized = sanitizePortfolioForPublic(rawSummary);

  const reportVersion: PublishedReportVersion = {
    id: `rep-${period.id}-${version}`,
    fiscalYear: period.fiscalYear,
    version,
    publishedAt: new Date().toISOString(),
    publishedBy,
    summary: summaryNotes,
    dataSnapshot: sanitized as unknown as Record<string, unknown>,
  };

  publishedVersionsStore.push(reportVersion);
  return reportVersion;
}

export interface GeneratedReportOutput {
  title: string;
  reportingPeriod: string;
  version: string;
  generatedAt: string;
  classification: 'Management Analytics (Internal)' | 'Public Transparency Report';
  executiveSummary: string;
  methodologyOverview: string;
  dataStatus: string;
  reconciliationSummary: string[];
  projectsTable: {
    project: string;
    status: string;
    category: string;
    stage: string;
    investment: string;
    operatingCost: string;
    revenue: string;
    engineeringHours: string;
    contribution: string;
    confidence: string;
  }[];
  jsonPayload: PortfolioEconomicsSummary;
}

export function generateReport(
  periodId: string,
  isInternal = false,
  version = 'v1.0'
): GeneratedReportOutput {
  const period = getFinancialPeriod(periodId);
  if (!period) throw new Error(`Period ${periodId} not found.`);

  const raw = calculatePortfolioEconomicsSummary(period.id);
  const data = isInternal ? raw : sanitizePortfolioForPublic(raw);

  const formatMoney = (val: number | null, fallback = '—') => {
    if (val === null) return fallback;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const projectsTable = data.projects.map((p) => ({
    project: p.projectTitle,
    status: p.projectStatus,
    category: p.projectCategory,
    stage: p.developmentStage,
    investment:
      p.totalDevelopmentInvestment !== null
        ? formatMoney(p.totalDevelopmentInvestment)
        : 'Tracked',
    operatingCost:
      p.totalOperatingCosts !== null
        ? formatMoney(p.totalOperatingCosts)
        : 'Tracked',
    revenue:
      p.attributedRevenue !== null
        ? formatMoney(p.attributedRevenue)
        : p.revenueStatusText || 'Not Separately Disclosed',
    engineeringHours:
      p.totalEngineeringHours !== null ? `${p.totalEngineeringHours} hrs` : 'Not Tracked',
    contribution:
      p.portfolioContribution !== null ? formatMoney(p.portfolioContribution) : '—',
    confidence: p.overallConfidence,
  }));

  return {
    title: `TIV Portfolio Economics — ${period.fiscalYear}`,
    reportingPeriod: `${period.startDate} to ${period.endDate}`,
    version,
    generatedAt: new Date().toISOString(),
    classification: isInternal
      ? 'Management Analytics (Internal)'
      : 'Public Transparency Report',
    executiveSummary:
      'Portfolio Economics is a measurement system that documents development investment, operating costs, attributable revenue, engineering hours, shared infrastructure consumption, and data confidence across TIV technology initiatives. It is not a project valuation model.',
    methodologyOverview:
      'Revenues are recorded on an attributed basis or held as unattributed portfolio revenue. Shared infrastructure costs are explicitly allocated using defensible physical or operational metrics (compute, bandwidth, hours). Founder development time is tracked under economic development cost with explicit rate methodology.',
    dataStatus: `${data.reconciliationStatus} (${data.dataCoveragePercent}% portfolio coverage)`,
    reconciliationSummary: data.reconciliationNotes,
    projectsTable,
    jsonPayload: data,
  };
}
