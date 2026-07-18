// ─── Portfolio Economics Domain Types ─────────────────────────────────────
// TIV Portfolio Economics is a measurement system, not a project valuation system.
// It measures resource consumption, development investment, operating costs,
// revenue attribution, engineering hours, shared infrastructure, and data confidence.

export type PeriodStatus = 'Open' | 'Closed' | 'Published';

export interface FinancialPeriod {
  id: string; // e.g. 'fy2026'
  fiscalYear: string; // e.g. 'FY2026'
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  status: PeriodStatus;
  currency: string; // ISO 4217, default 'INR'
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type FinancialSourceType =
  | 'Accounting Record'
  | 'Invoice'
  | 'Bank Record'
  | 'Payroll Record'
  | 'Timesheet'
  | 'Asset Register'
  | 'Contract'
  | 'Management Estimate'
  | 'Manual Allocation'
  | 'Other';

export interface FinancialSource {
  id: string;
  sourceType: FinancialSourceType;
  reference: string; // e.g. 'GL-2026-INV-042', 'TS-2026-Q1'
  description: string;
  document?: string; // Path or document title
  date: string;
  createdAt: string;
}

export type DataConfidence =
  | 'Verified'
  | 'Calculated'
  | 'Allocated'
  | 'Estimated'
  | 'Unverified';

export type ApprovalStatus = 'Draft' | 'Reviewed' | 'Approved' | 'Published';

export type VisibilityLevel = 'internal' | 'public';

export type ContributorType =
  | 'Founder'
  | 'Employee'
  | 'Contractor'
  | 'Contributor'
  | 'Researcher'
  | 'Advisor';

export interface Person {
  id: string;
  name: string;
  role: string;
  organization: string;
  type: ContributorType;
  active: boolean;
  notes?: string;
}

export type EngineeringWorkType =
  | 'Development'
  | 'Maintenance'
  | 'Research'
  | 'Infrastructure'
  | 'Security'
  | 'Documentation'
  | 'Support'
  | 'Management'
  | 'Testing'
  | 'Design';

export interface EngineeringHourRecord {
  id: string;
  projectId: string;
  personId: string;
  date: string;
  hours: number;
  workType: EngineeringWorkType;
  financialPeriodId: string;
  sourceId: string;
  confidence: DataConfidence;
  approvalStatus: ApprovalStatus;
  notes?: string;
}

export type InvestmentCategory =
  | 'Engineering'
  | 'Design'
  | 'Development'
  | 'Testing'
  | 'Documentation'
  | 'Security'
  | 'Research'
  | 'Hardware'
  | 'Cloud / Compute'
  | 'Software / Services'
  | 'Contractors'
  | 'Other Direct Investment';

export interface DevelopmentInvestment {
  id: string;
  projectId: string;
  financialPeriodId: string;
  category: InvestmentCategory;
  cashAmount: number | null; // null represents "Not Tracked"
  economicAmount: number | null; // null represents "Not Tracked"
  currency: string;
  cashOrNonCash: 'cash' | 'non_cash' | 'mixed';
  rateMethodology?: string; // Explicit explanation for economic amount
  sourceId: string;
  confidence: DataConfidence;
  approvalStatus: ApprovalStatus;
  visibility: VisibilityLevel;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type OperatingCostCategory =
  | 'Hosting'
  | 'Servers'
  | 'Cloud'
  | 'Storage'
  | 'Bandwidth'
  | 'Domains'
  | 'Monitoring'
  | 'Backups'
  | 'Third-party APIs'
  | 'Software'
  | 'Support'
  | 'Maintenance'
  | 'Security'
  | 'Infrastructure'
  | 'Other';

export interface OperatingCost {
  id: string;
  projectId: string;
  financialPeriodId: string;
  category: OperatingCostCategory;
  amount: number;
  currency: string;
  directOrAllocated: 'direct' | 'allocated';
  sourceId: string;
  confidence: DataConfidence;
  approvalStatus: ApprovalStatus;
  visibility: VisibilityLevel;
  notes?: string;
}

export type AllocationMethod =
  | 'Direct'
  | 'Equal'
  | 'Engineering Hours'
  | 'Compute Usage'
  | 'Storage Usage'
  | 'Bandwidth Usage'
  | 'Revenue Share'
  | 'Manual Allocation'
  | 'Other';

export interface SharedCostSource {
  id: string;
  name: string;
  financialPeriodId: string;
  category: OperatingCostCategory;
  sourceAmount: number;
  currency: string;
  allocationMethod: AllocationMethod;
  sourceId: string;
  confidence: DataConfidence;
  approvalStatus: ApprovalStatus;
  visibility: VisibilityLevel;
  notes?: string;
}

export interface SharedCostAllocation {
  id: string;
  sharedCostId: string;
  projectId: string;
  percentage: number; // 0 - 100
  allocatedAmount: number;
  notes?: string;
}

export type RevenueType = 'Direct' | 'Indirect' | 'Shared' | 'Unattributed';

export type AttributionMethod =
  | 'Direct Invoice'
  | 'Contract'
  | 'Product Subscription'
  | 'Usage'
  | 'Manual Allocation'
  | 'Unattributed'
  | 'Other';

export interface ProjectRevenue {
  id: string;
  projectId?: string; // Optional if unattributed
  financialPeriodId: string;
  amount: number;
  currency: string;
  revenueType: RevenueType;
  attributionMethod: AttributionMethod;
  sourceId: string;
  confidence: DataConfidence;
  approvalStatus: ApprovalStatus;
  visibility: VisibilityLevel;
  notes?: string;
}

export type AssetType =
  | 'Server'
  | 'Computer'
  | 'Network Equipment'
  | 'Optical Equipment'
  | 'Laboratory Equipment'
  | 'Storage'
  | 'Other Equipment';

export interface Asset {
  id: string;
  name: string;
  assetType: AssetType;
  acquisitionDate: string;
  acquisitionCost: number;
  currency: string;
  usefulLifeYears: number;
  residualValue: number;
  bookValue: number;
  estimatedEconomicDepreciation: number;
  location: string;
  owner: string;
  status: 'Active' | 'In Maintenance' | 'Decommissioned' | 'Disposed';
  notes?: string;
}

export type AssetAllocationBasis =
  | 'Compute'
  | 'Storage'
  | 'Bandwidth'
  | 'Usage'
  | 'Manual'
  | 'Other';

export interface AssetAllocation {
  id: string;
  assetId: string;
  projectId: string;
  periodId: string;
  allocationPercentage: number; // 0 - 100
  allocationBasis: AssetAllocationBasis;
  notes?: string;
}

export type ResearchExpenditureCategory =
  | 'AI Research'
  | 'Networking Research'
  | 'Fiber Optics'
  | 'Experimental Hardware'
  | 'Datasets'
  | 'Compute'
  | 'Laboratory Equipment'
  | 'Research Software';

export interface ResearchExpenditure {
  id: string;
  projectId?: string;
  financialPeriodId: string;
  researchAreaSlug?: string;
  publicationSlug?: string;
  category: ResearchExpenditureCategory;
  amount: number;
  currency: string;
  sourceId: string;
  confidence: DataConfidence;
  approvalStatus: ApprovalStatus;
  visibility: VisibilityLevel;
  notes?: string;
}

// Strategic Assessment - STRICTLY separate from monetary valuation.
// Uses 1 to 5 scores. NEVER converts directly to a monetary valuation.
export interface StrategicAssessment {
  id: string;
  projectId: string;
  assessmentDate: string;
  assessor: string;
  strategicImportance: number; // 1 - 5
  technicalDifferentiation: number; // 1 - 5
  infrastructureRelevance: number; // 1 - 5
  researchSignificance: number; // 1 - 5
  revenuePotential: number; // 1 - 5
  ecosystemImportance: number; // 1 - 5
  notes: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: 'create' | 'update' | 'delete' | 'approve' | 'publish';
  entity: string;
  entityId: string;
  oldValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
}

export interface PublishedReportVersion {
  id: string;
  fiscalYear: string;
  version: string; // e.g. 'v1.0', 'v1.1'
  publishedAt: string;
  publishedBy: string;
  summary: string;
  dataSnapshot: Record<string, unknown>;
}

// User roles for authorization & RBAC
export type UserRole =
  | 'Financial Administrator'
  | 'Finance Editor'
  | 'Management'
  | 'Project Manager'
  | 'Viewer';

// Aggregated Project Economic Summary for a Financial Period
export interface ProjectEconomicProfile {
  projectId: string;
  projectSlug: string;
  projectTitle: string;
  projectStatus: string;
  projectCategory: string;
  developmentStage: string;
  isResearch: boolean;
  periodId: string;
  fiscalYear: string;
  currency: string;

  // Investment
  developmentInvestmentCash: number | null; // null = Not Tracked
  developmentInvestmentEconomic: number | null; // null = Not Tracked
  totalDevelopmentInvestment: number | null;
  researchInvestment: number | null;

  // Operating Costs
  directOperatingCosts: number | null;
  allocatedSharedCosts: number | null;
  totalOperatingCosts: number | null;

  // Revenue
  directRevenue: number | null;
  allocatedRevenue: number | null;
  attributedRevenue: number | null; // direct + allocated (or null if not tracked)
  revenueStatusText?: string; // e.g. 'Not Tracked', 'Not Applicable', 'Not Separately Disclosed'

  // Engineering Effort
  totalEngineeringHours: number | null;
  developmentHours: number | null;
  maintenanceHours: number | null;
  researchHours: number | null;
  effectiveCostPerHour: number | null;

  // Management Performance Metrics (strictly NOT statutory profit)
  portfolioContribution: number | null; // Attributed Revenue - Direct Costs - Allocated Costs
  postInvestmentContribution: number | null; // Portfolio Contribution - Development Investment
  investmentRecoveryRatio: number | null; // Attributed Revenue / Development Investment

  // Shared Assets
  allocatedAssets: {
    assetId: string;
    assetName: string;
    assetType: AssetType;
    allocationPercentage: number;
    allocationBasis: AssetAllocationBasis;
  }[];

  // Strategic Assessment (1-5 non-monetary scores)
  strategicAssessment?: StrategicAssessment;

  // Data Quality & Lineage
  dataCompleteness: 'High' | 'Medium' | 'Low';
  overallConfidence: DataConfidence;
  sourcesCount: number;
  sources: FinancialSource[];
  isPubliclyDisclosed: boolean;
}

// Portfolio-level Aggregated Summary
export interface PortfolioEconomicsSummary {
  periodId: string;
  fiscalYear: string;
  currency: string;
  periodStatus: PeriodStatus;

  // Portfolio Totals
  totalAttributedRevenue: number | null;
  unattributedRevenue: number | null;
  totalCorporateRevenue: number | null;

  totalDirectOperatingCosts: number | null;
  totalAllocatedSharedCosts: number | null;
  totalUnallocatedCosts: number | null;
  totalOperatingCosts: number | null;

  totalDevelopmentInvestmentCash: number | null;
  totalDevelopmentInvestmentEconomic: number | null;
  totalDevelopmentInvestment: number | null;
  totalResearchInvestment: number | null;

  totalEngineeringHours: number | null;
  totalProjectsTracked: number;
  activeProjectsCount: number;

  portfolioContribution: number | null;

  // Coverage & Data Quality
  dataCoveragePercent: number; // 0 - 100
  projectsWithCostData: number;
  projectsWithEngineeringData: number;
  projectsWithRevenueData: number;
  projectsWithInvestmentData: number;

  confidenceBreakdown: {
    verifiedCount: number;
    calculatedCount: number;
    allocatedCount: number;
    estimatedCount: number;
    unverifiedCount: number;
  };

  reconciliationStatus: 'Reconciled' | 'Partially Reconciled' | 'Incomplete';
  reconciliationNotes: string[];

  projects: ProjectEconomicProfile[];
}
