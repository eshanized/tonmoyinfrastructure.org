// ─── Portfolio Economics Calculations & Analytics ──────────────────────────
// Pure management analytics engine.
// All financial arithmetic uses safe DecimalMoney calculations.
// Principles:
// 1. DO NOT assign arbitrary valuations.
// 2. Attributed Revenue - Direct Costs - Allocated Costs = Portfolio Contribution.
// 3. Label metrics as Management Metrics, never statutory profit.
// 4. "Not Tracked" is preserved; never converted to ₹0.

import { portfolioDataStore } from './data-store';
import { getRegisteredProjects, getRegisteredProject } from './registry';
import { getFinancialPeriod, getDefaultFinancialPeriod } from './periods';
import { getFinancialSources } from './sources';
import { getFinancialReports } from '@/lib/content';
import { DecimalMoney } from './decimal';
import type {
  ProjectEconomicProfile,
  PortfolioEconomicsSummary,
  DataConfidence,
  FinancialSource,
} from './types';

/**
 * Calculate the Economic Profile for a single project within a financial period.
 */
export function calculateProjectEconomicProfile(
  projectId: string,
  periodIdInput?: string
): ProjectEconomicProfile | undefined {
  const period = periodIdInput
    ? getFinancialPeriod(periodIdInput)
    : getDefaultFinancialPeriod();
  if (!period) return undefined;

  const project = getRegisteredProject(projectId);
  if (!project) return undefined;

  const periodId = period.id;

  // 1. Development Investments
  const investments = portfolioDataStore.getInvestments(periodId, project.id);
  let totalCash: DecimalMoney | null = null;
  let totalEconomic: DecimalMoney | null = null;

  for (const inv of investments) {
    if (inv.cashAmount !== null) {
      totalCash = (totalCash || DecimalMoney.zero()).add(inv.cashAmount);
    }
    if (inv.economicAmount !== null) {
      totalEconomic = (totalEconomic || DecimalMoney.zero()).add(inv.economicAmount);
    }
  }

  let totalDevInvestment: DecimalMoney | null = null;
  if (totalCash !== null || totalEconomic !== null) {
    totalDevInvestment = (totalCash || DecimalMoney.zero()).add(totalEconomic || DecimalMoney.zero());
  }

  // 2. Direct Operating Costs
  const directCosts = portfolioDataStore.getOperatingCosts(periodId, project.id);
  let totalDirectCosts: DecimalMoney | null = null;
  if (directCosts.length > 0) {
    totalDirectCosts = DecimalMoney.zero();
    for (const cost of directCosts) {
      totalDirectCosts = totalDirectCosts.add(cost.amount);
    }
  }

  // 3. Allocated Shared Costs
  const sharedAllocations = portfolioDataStore
    .getSharedCostAllocations()
    .filter((a) => a.projectId === project.id);

  let totalAllocatedShared: DecimalMoney | null = null;
  // Filter allocations belonging to the given period
  const periodSources = portfolioDataStore.getSharedCostSources(periodId);
  const periodSourceIds = new Set(periodSources.map((s) => s.id));

  const relevantAllocations = sharedAllocations.filter((a) =>
    periodSourceIds.has(a.sharedCostId)
  );

  if (relevantAllocations.length > 0) {
    totalAllocatedShared = DecimalMoney.zero();
    for (const alloc of relevantAllocations) {
      totalAllocatedShared = totalAllocatedShared.add(alloc.allocatedAmount);
    }
  }

  // Total Operating Costs = Direct + Allocated Shared
  let totalOperatingCosts: DecimalMoney | null = null;
  if (totalDirectCosts !== null || totalAllocatedShared !== null) {
    totalOperatingCosts = (totalDirectCosts || DecimalMoney.zero()).add(
      totalAllocatedShared || DecimalMoney.zero()
    );
  }

  // 4. Research Expenditures
  const researchExps = portfolioDataStore.getResearchExpenditures(periodId, project.id);
  let totalResearch: DecimalMoney | null = null;
  if (researchExps.length > 0) {
    totalResearch = DecimalMoney.zero();
    for (const r of researchExps) {
      totalResearch = totalResearch.add(r.amount);
    }
  }

  // 5. Revenue
  const revenues = portfolioDataStore.getRevenues(periodId, project.id);
  let directRev: DecimalMoney | null = null;
  let allocatedRev: DecimalMoney | null = null;

  for (const rev of revenues) {
    if (rev.revenueType === 'Direct') {
      directRev = (directRev || DecimalMoney.zero()).add(rev.amount);
    } else if (rev.revenueType === 'Shared' || rev.revenueType === 'Indirect') {
      allocatedRev = (allocatedRev || DecimalMoney.zero()).add(rev.amount);
    }
  }

  let attributedRevenue: DecimalMoney | null = null;
  if (directRev !== null || allocatedRev !== null) {
    attributedRevenue = (directRev || DecimalMoney.zero()).add(
      allocatedRev || DecimalMoney.zero()
    );
  }

  // 6. Engineering Hours
  const hoursRecords = portfolioDataStore.getEngineeringHours(periodId, project.id);
  let totalHours: number | null = null;
  let devHours: number | null = null;
  let maintHours: number | null = null;
  let resHours: number | null = null;

  if (hoursRecords.length > 0) {
    totalHours = 0;
    devHours = 0;
    maintHours = 0;
    resHours = 0;

    for (const rec of hoursRecords) {
      totalHours += rec.hours;
      if (rec.workType === 'Development') devHours += rec.hours;
      else if (rec.workType === 'Maintenance') maintHours += rec.hours;
      else if (rec.workType === 'Research') resHours += rec.hours;
    }
  }

  // 7. Management Contribution Metrics
  // Portfolio Contribution = Attributed Revenue - Direct Costs - Allocated Shared Costs
  let portfolioContribution: DecimalMoney | null = null;
  if (attributedRevenue !== null && totalOperatingCosts !== null) {
    portfolioContribution = attributedRevenue.sub(totalOperatingCosts);
  }

  // Post-Investment Contribution = Contribution - Development Investment
  let postInvestmentContribution: DecimalMoney | null = null;
  if (portfolioContribution !== null && totalDevInvestment !== null) {
    postInvestmentContribution = portfolioContribution.sub(totalDevInvestment);
  }

  // Effective Engineering Cost per Hour (only if hours exist and > 0)
  let effectiveCostPerHour: number | null = null;
  if (totalHours && totalHours > 0) {
    const cashCosts = (totalCash || DecimalMoney.zero()).add(
      totalOperatingCosts || DecimalMoney.zero()
    );
    effectiveCostPerHour = Math.round((cashCosts.toNumber() / totalHours) * 100) / 100;
  }

  // Investment Recovery Ratio = Attributed Revenue / Total Development Investment
  let investmentRecoveryRatio: number | null = null;
  if (attributedRevenue !== null && totalDevInvestment !== null && totalDevInvestment.toNumber() > 0) {
    investmentRecoveryRatio =
      Math.round((attributedRevenue.toNumber() / totalDevInvestment.toNumber()) * 100) / 100;
  }

  // 8. Shared Asset Allocations
  const assetAllocations = portfolioDataStore.getAssetAllocations(periodId, project.id);
  const allocatedAssets = assetAllocations.map((alloc) => {
    const asset = portfolioDataStore.getAsset(alloc.assetId);
    return {
      assetId: alloc.assetId,
      assetName: asset?.name || alloc.assetId,
      assetType: asset?.assetType || 'Other Equipment',
      allocationPercentage: alloc.allocationPercentage,
      allocationBasis: alloc.allocationBasis,
    };
  });

  // 9. Strategic Assessment
  const strategicAssessment = portfolioDataStore.getStrategicAssessment(project.id);

  // 10. Sources & Data Lineage
  const allSources = getFinancialSources();
  const sourceIdSet = new Set<string>();
  const confidences: DataConfidence[] = [];

  investments.forEach((i) => {
    sourceIdSet.add(i.sourceId);
    confidences.push(i.confidence);
  });
  directCosts.forEach((c) => {
    sourceIdSet.add(c.sourceId);
    confidences.push(c.confidence);
  });
  relevantAllocations.forEach(() => {
    confidences.push('Allocated');
  });
  revenues.forEach((r) => {
    sourceIdSet.add(r.sourceId);
    confidences.push(r.confidence);
  });
  hoursRecords.forEach((h) => {
    sourceIdSet.add(h.sourceId);
    confidences.push(h.confidence);
  });

  const sources = allSources.filter((s) => sourceIdSet.has(s.id));

  // Determine Overall Confidence
  let overallConfidence: DataConfidence = 'Unverified';
  if (confidences.includes('Verified')) overallConfidence = 'Verified';
  else if (confidences.includes('Calculated')) overallConfidence = 'Calculated';
  else if (confidences.includes('Allocated')) overallConfidence = 'Allocated';
  else if (confidences.includes('Estimated')) overallConfidence = 'Estimated';

  // Calculate Data Completeness Level
  // Metrics tracked: investment, direct cost, shared cost, revenue/not-applicable, hours, sources
  let trackedCount = 0;
  const totalCheckpoints = 5;
  if (totalDevInvestment !== null) trackedCount++;
  if (totalDirectCosts !== null || totalAllocatedShared !== null) trackedCount++;
  if (attributedRevenue !== null || project.isResearch) trackedCount++;
  if (totalHours !== null) trackedCount++;
  if (sources.length > 0) trackedCount++;

  const completenessRatio = trackedCount / totalCheckpoints;
  const dataCompleteness: 'High' | 'Medium' | 'Low' =
    completenessRatio >= 0.8 ? 'High' : completenessRatio >= 0.4 ? 'Medium' : 'Low';

  // Determine Revenue Status text
  let revenueStatusText = 'Not Tracked';
  if (project.isResearch) {
    revenueStatusText = 'Not Applicable';
  } else if (attributedRevenue !== null) {
    revenueStatusText = 'Tracked';
  }

  return {
    projectId: project.id,
    projectSlug: project.slug,
    projectTitle: project.title,
    projectStatus: project.status,
    projectCategory: project.category,
    developmentStage: project.developmentStage,
    isResearch: project.isResearch,
    periodId: period.id,
    fiscalYear: period.fiscalYear,
    currency: period.currency,

    developmentInvestmentCash: totalCash ? totalCash.toNumber() : null,
    developmentInvestmentEconomic: totalEconomic ? totalEconomic.toNumber() : null,
    totalDevelopmentInvestment: totalDevInvestment ? totalDevInvestment.toNumber() : null,
    researchInvestment: totalResearch ? totalResearch.toNumber() : null,

    directOperatingCosts: totalDirectCosts ? totalDirectCosts.toNumber() : null,
    allocatedSharedCosts: totalAllocatedShared ? totalAllocatedShared.toNumber() : null,
    totalOperatingCosts: totalOperatingCosts ? totalOperatingCosts.toNumber() : null,

    directRevenue: directRev ? directRev.toNumber() : null,
    allocatedRevenue: allocatedRev ? allocatedRev.toNumber() : null,
    attributedRevenue: attributedRevenue ? attributedRevenue.toNumber() : null,
    revenueStatusText,

    totalEngineeringHours: totalHours,
    developmentHours: devHours,
    maintenanceHours: maintHours,
    researchHours: resHours,
    effectiveCostPerHour,

    portfolioContribution: portfolioContribution ? portfolioContribution.toNumber() : null,
    postInvestmentContribution: postInvestmentContribution
      ? postInvestmentContribution.toNumber()
      : null,
    investmentRecoveryRatio,

    allocatedAssets,
    strategicAssessment,

    dataCompleteness,
    overallConfidence,
    sourcesCount: sources.length,
    sources,
    isPubliclyDisclosed: true, // Controlled via project settings
  };
}

/**
 * Calculate complete Portfolio Economics Summary across all registered projects
 * for a specific financial period.
 */
export function calculatePortfolioEconomicsSummary(
  periodIdInput?: string
): PortfolioEconomicsSummary {
  const period = periodIdInput
    ? getFinancialPeriod(periodIdInput)
    : getDefaultFinancialPeriod();

  if (!period) {
    throw new Error(`Invalid or missing financial period: ${periodIdInput}`);
  }

  const periodId = period.id;
  const registeredProjects = getRegisteredProjects();

  const profiles: ProjectEconomicProfile[] = [];
  for (const proj of registeredProjects) {
    const profile = calculateProjectEconomicProfile(proj.id, periodId);
    if (profile) {
      profiles.push(profile);
    }
  }

  // Aggregate Portfolio Metrics
  let totalAttributedRevenue: DecimalMoney | null = null;
  let totalDirectCosts: DecimalMoney | null = null;
  let totalAllocatedShared: DecimalMoney | null = null;
  let totalDevCash: DecimalMoney | null = null;
  let totalDevEconomic: DecimalMoney | null = null;
  let totalDevInvestment: DecimalMoney | null = null;
  let totalResearchInvestment: DecimalMoney | null = null;
  let totalEngineeringHours: number | null = null;

  let projectsWithCost = 0;
  let projectsWithEng = 0;
  let projectsWithRev = 0;
  let projectsWithInv = 0;

  for (const p of profiles) {
    if (p.attributedRevenue !== null) {
      totalAttributedRevenue = (totalAttributedRevenue || DecimalMoney.zero()).add(
        p.attributedRevenue
      );
      projectsWithRev++;
    }
    if (p.directOperatingCosts !== null) {
      totalDirectCosts = (totalDirectCosts || DecimalMoney.zero()).add(
        p.directOperatingCosts
      );
      projectsWithCost++;
    }
    if (p.allocatedSharedCosts !== null) {
      totalAllocatedShared = (totalAllocatedShared || DecimalMoney.zero()).add(
        p.allocatedSharedCosts
      );
    }
    if (p.developmentInvestmentCash !== null) {
      totalDevCash = (totalDevCash || DecimalMoney.zero()).add(
        p.developmentInvestmentCash
      );
    }
    if (p.developmentInvestmentEconomic !== null) {
      totalDevEconomic = (totalDevEconomic || DecimalMoney.zero()).add(
        p.developmentInvestmentEconomic
      );
    }
    if (p.totalDevelopmentInvestment !== null) {
      totalDevInvestment = (totalDevInvestment || DecimalMoney.zero()).add(
        p.totalDevelopmentInvestment
      );
      projectsWithInv++;
    }
    if (p.researchInvestment !== null) {
      totalResearchInvestment = (totalResearchInvestment || DecimalMoney.zero()).add(
        p.researchInvestment
      );
    }
    if (p.totalEngineeringHours !== null) {
      totalEngineeringHours = (totalEngineeringHours || 0) + p.totalEngineeringHours;
      projectsWithEng++;
    }
  }

  // Portfolio Unattributed Revenue
  const unattributedRecords = portfolioDataStore
    .getRevenues(periodId)
    .filter((r) => r.revenueType === 'Unattributed' || !r.projectId);

  let unattributedRevenue: DecimalMoney | null = null;
  if (unattributedRecords.length > 0) {
    unattributedRevenue = DecimalMoney.zero();
    for (const u of unattributedRecords) {
      unattributedRevenue = unattributedRevenue.add(u.amount);
    }
  }

  // Corporate Financial Statement Reference (if available)
  const corporateReports = getFinancialReports();
  const corporateReport = corporateReports.find(
    (c) => c.fiscalYear.toLowerCase() === period.fiscalYear.toLowerCase()
  );

  const totalCorporateRevenue = corporateReport?.revenue
    ? corporateReport.revenue
    : totalAttributedRevenue
    ? (totalAttributedRevenue.add(unattributedRevenue || DecimalMoney.zero())).toNumber()
    : null;

  const totalCorporateCosts = corporateReport?.operatingExpenses || null;

  // Total project operating costs
  let totalProjectOperatingCosts: DecimalMoney | null = null;
  if (totalDirectCosts !== null || totalAllocatedShared !== null) {
    totalProjectOperatingCosts = (totalDirectCosts || DecimalMoney.zero()).add(
      totalAllocatedShared || DecimalMoney.zero()
    );
  }

  // Unallocated corporate costs
  let totalUnallocatedCosts: DecimalMoney | null = null;
  if (totalCorporateCosts !== null && totalProjectOperatingCosts !== null) {
    const directTotal = (totalProjectOperatingCosts.add(
      totalResearchInvestment || DecimalMoney.zero()
    )).toNumber();
    totalUnallocatedCosts = new DecimalMoney(Math.max(0, totalCorporateCosts - directTotal));
  }

  // Portfolio Contribution = Total Attributed Revenue - Total Operating Costs
  let portfolioContribution: DecimalMoney | null = null;
  if (totalAttributedRevenue !== null && totalProjectOperatingCosts !== null) {
    portfolioContribution = totalAttributedRevenue.sub(totalProjectOperatingCosts);
  }

  // Data Coverage Percentage
  const totalProjects = profiles.length;
  const coveragePercent =
    totalProjects > 0
      ? Math.round(((projectsWithCost + projectsWithEng + projectsWithInv) / (totalProjects * 3)) * 100)
      : 0;

  // Confidence Breakdown
  const confidenceCounts = {
    verifiedCount: 0,
    calculatedCount: 0,
    allocatedCount: 0,
    estimatedCount: 0,
    unverifiedCount: 0,
  };

  for (const p of profiles) {
    if (p.overallConfidence === 'Verified') confidenceCounts.verifiedCount++;
    else if (p.overallConfidence === 'Calculated') confidenceCounts.calculatedCount++;
    else if (p.overallConfidence === 'Allocated') confidenceCounts.allocatedCount++;
    else if (p.overallConfidence === 'Estimated') confidenceCounts.estimatedCount++;
    else confidenceCounts.unverifiedCount++;
  }

  // Financial Reconciliation
  const reconciliationNotes: string[] = [];
  let reconciliationStatus: 'Reconciled' | 'Partially Reconciled' | 'Incomplete' =
    'Partially Reconciled';

  if (totalCorporateRevenue !== null && totalAttributedRevenue !== null) {
    const sumRev = (
      totalAttributedRevenue.add(unattributedRevenue || DecimalMoney.zero())
    ).toNumber();
    const revDiff = Math.abs(sumRev - totalCorporateRevenue);
    if (revDiff < 1) {
      reconciliationNotes.push(
        `Revenue Reconciled: Attributed (₹${totalAttributedRevenue.toNumber().toLocaleString('en-IN')}) + Unattributed (₹${(unattributedRevenue?.toNumber() || 0).toLocaleString('en-IN')}) equals Corporate Revenue (₹${totalCorporateRevenue.toLocaleString('en-IN')}).`
      );
    } else {
      reconciliationNotes.push(
        `Revenue Discrepancy: Difference of ₹${revDiff.toLocaleString('en-IN')} between Sum of Revenue Streams and Corporate Financial Statements.`
      );
    }
  } else {
    reconciliationNotes.push('Revenue reconciliation incomplete due to pending financial audit intake.');
  }

  if (totalCorporateCosts !== null && totalDirectCosts !== null && totalAllocatedShared !== null) {
    const sumCosts =
      totalDirectCosts.toNumber() +
      totalAllocatedShared.toNumber() +
      (totalResearchInvestment?.toNumber() || 0) +
      (totalUnallocatedCosts?.toNumber() || 0);

    const costDiff = Math.abs(sumCosts - totalCorporateCosts);
    if (costDiff < 1) {
      reconciliationNotes.push(
        `Operating Expenses Reconciled: Direct Costs + Allocated Shared Costs + Research + Unallocated Corporate Costs match Corporate Financial Statements.`
      );
      if (reconciliationNotes[0]?.includes('Revenue Reconciled')) {
        reconciliationStatus = 'Reconciled';
      }
    } else {
      reconciliationNotes.push(
        `Expense Discrepancy: Difference of ₹${costDiff.toLocaleString('en-IN')} with Corporate Ledger.`
      );
      reconciliationStatus = 'Partially Reconciled';
    }
  } else {
    reconciliationStatus = 'Incomplete';
  }

  return {
    periodId: period.id,
    fiscalYear: period.fiscalYear,
    currency: period.currency,
    periodStatus: period.status,

    totalAttributedRevenue: totalAttributedRevenue ? totalAttributedRevenue.toNumber() : null,
    unattributedRevenue: unattributedRevenue ? unattributedRevenue.toNumber() : null,
    totalCorporateRevenue,

    totalDirectOperatingCosts: totalDirectCosts ? totalDirectCosts.toNumber() : null,
    totalAllocatedSharedCosts: totalAllocatedShared ? totalAllocatedShared.toNumber() : null,
    totalUnallocatedCosts: totalUnallocatedCosts ? totalUnallocatedCosts.toNumber() : null,
    totalOperatingCosts: totalProjectOperatingCosts ? totalProjectOperatingCosts.toNumber() : null,

    totalDevelopmentInvestmentCash: totalDevCash ? totalDevCash.toNumber() : null,
    totalDevelopmentInvestmentEconomic: totalDevEconomic ? totalDevEconomic.toNumber() : null,
    totalDevelopmentInvestment: totalDevInvestment ? totalDevInvestment.toNumber() : null,
    totalResearchInvestment: totalResearchInvestment ? totalResearchInvestment.toNumber() : null,

    totalEngineeringHours,
    totalProjectsTracked: totalProjects,
    activeProjectsCount: profiles.filter((p) => p.developmentStage === 'active').length,

    portfolioContribution: portfolioContribution ? portfolioContribution.toNumber() : null,

    dataCoveragePercent: coveragePercent,
    projectsWithCostData: projectsWithCost,
    projectsWithEngineeringData: projectsWithEng,
    projectsWithRevenueData: projectsWithRev,
    projectsWithInvestmentData: projectsWithInv,

    confidenceBreakdown: confidenceCounts,

    reconciliationStatus,
    reconciliationNotes,

    projects: profiles,
  };
}

/**
 * Compare two financial periods (e.g. FY2026 vs FY2027).
 * NEVER calculate growth from unavailable data.
 */
export function compareFinancialPeriods(
  periodIdA: string,
  periodIdB: string
): {
  periodA: PortfolioEconomicsSummary;
  periodB: PortfolioEconomicsSummary;
  revenueGrowthPercent: number | null;
  costGrowthPercent: number | null;
  investmentGrowthPercent: number | null;
  contributionGrowthPercent: number | null;
  notes: string[];
} {
  const summaryA = calculatePortfolioEconomicsSummary(periodIdA);
  const summaryB = calculatePortfolioEconomicsSummary(periodIdB);

  const notes: string[] = [];

  const calcGrowth = (a: number | null, b: number | null, label: string): number | null => {
    if (a === null || b === null || a === 0) {
      notes.push(`${label} growth unavailable: insufficient baseline or period data.`);
      return null;
    }
    const growth = ((b - a) / Math.abs(a)) * 100;
    return Math.round(growth * 10) / 10;
  };

  const revenueGrowthPercent = calcGrowth(
    summaryA.totalAttributedRevenue,
    summaryB.totalAttributedRevenue,
    'Revenue'
  );
  const costGrowthPercent = calcGrowth(
    summaryA.totalOperatingCosts,
    summaryB.totalOperatingCosts,
    'Operating Cost'
  );
  const investmentGrowthPercent = calcGrowth(
    summaryA.totalDevelopmentInvestment,
    summaryB.totalDevelopmentInvestment,
    'Development Investment'
  );
  const contributionGrowthPercent = calcGrowth(
    summaryA.portfolioContribution,
    summaryB.portfolioContribution,
    'Portfolio Contribution'
  );

  return {
    periodA: summaryA,
    periodB: summaryB,
    revenueGrowthPercent,
    costGrowthPercent,
    investmentGrowthPercent,
    contributionGrowthPercent,
    notes,
  };
}
