export type ProjectStatus =
  | 'Stable Release'
  | 'Maintenance'
  | 'Legacy'
  | 'Archived'
  | 'Preview'
  | 'Beta'
  | 'Planning'
  | 'Development'
  | 'Research'
  | 'Experimental'
  | 'Paused'
  | 'Production';

export type ProjectType = 'software' | 'infrastructure' | 'network' | 'research';

export type ProductStatus =
  | 'stable'
  | 'maintenance'
  | 'legacy'
  | 'archived'
  | 'preview'
  | 'beta';

export type ReleaseStatus =
  | 'stable'
  | 'released'
  | 'pre-release'
  | 'draft';

export type DevelopmentStage =
  | 'active'
  | 'maintenance'
  | 'research'
  | 'planning';

export type SourcePlatform =
  | 'github'
  | 'huggingface'
  | 'documentation'
  | 'research'
  | 'website'
  | 'registry';

export type SourceType =
  | 'repository'
  | 'model'
  | 'dataset'
  | 'space'
  | 'publication'
  | 'documentation'
  | 'website'
  | 'library'
  | 'tool';

export type AffiliationType = 'TIV' | 'TIVerse' | 'Founder' | 'External';

export type ArtifactClassification =
  | 'Application'
  | 'Software Platform'
  | 'Software System'
  | 'AI Model'
  | 'Dataset'
  | 'Space / Demo'
  | 'Research Project'
  | 'Infrastructure'
  | 'Publication'
  | 'Library'
  | 'Tool';

export interface ProjectSource {
  platform: SourcePlatform;
  type: SourceType;
  url: string;
  label?: string;
  author?: string;
  organization?: string;
  maintainer?: string;
  affiliation?: AffiliationType;
  verified?: boolean;
  description?: string;
}

export interface Project {
  slug: string;
  title: string;
  type: ProjectType;
  productStatus: ProductStatus;
  releaseStatus: ReleaseStatus;
  developmentStage: DevelopmentStage;
  status: ProjectStatus;
  category: string;
  description: string;
  shortDescription?: string;
  version?: string;
  releaseDate?: string;
  featured: boolean;
  repository?: string;
  documentation?: string;
  website?: string;
  license?: string;
  logo?: string;
  icon?: string;
  technology?: string[];
  content: string;
  problem?: string;
  approach?: string;
  architecture?: string;
  features?: string[];
  roadmap?: { item: string; done: boolean }[];
  relatedResearch?: string[];
  relatedProjects?: string[];
  updatedAt?: string;

  // Source-aware & ownership extensions
  sources?: ProjectSource[];
  artifactType?: ArtifactClassification;
  owner?: string;
  organization?: string;
  author?: string;
  maintainer?: string;
  affiliation?: AffiliationType;
  ecosystem?: string;
  ecosystemRole?: string;
  parameterCount?: string;
  parameters?: string;
  modelArchitecture?: string;
  contextWindow?: string;
  tags?: string[];
  intendedUse?: string[];
  checkpointsNote?: string;

  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export interface ResearchArea {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export type PublicationStatus =
  | 'Draft'
  | 'Experimental'
  | 'Published'
  | 'Superseded'
  | 'Archived';

export interface Publication {
  slug: string;
  title: string;
  identifier: string;
  authors: string[];
  abstract: string;
  date: string;
  publicationDate?: string;
  version: string;
  status: PublicationStatus;
  area: string;
  project?: string;
  pdf?: string;
  repository?: string;
  dataset?: string;
  references?: string[];
  content: string;
}

export interface InfrastructureService {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  description: string;
  classification: 'Commercial' | 'Internal' | 'Experimental' | 'Research';
  content: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export type NewsItem = NewsArticle;

export interface TransparencyReport {
  slug: string;
  fiscalYear: string;
  title: string;
  publicationDate: string;
  version: string;
  status: 'Draft' | 'Published' | 'Superseded';
  summary: string;
  content: string;
}

export interface RevenueStream {
  label: string;
  amount: number;
}

export interface ExpenseCategory {
  label: string;
  amount: number;
}

export interface BalanceSheetItem {
  label: string;
  amount: number;
}

export interface CapitalAllocation {
  label: string;
  percentage: number;
}

export interface FinancialReport {
  fiscalYear: string;
  status: 'Audited' | 'Unaudited' | 'Management Report' | 'Estimate' | 'Illustrative';
  currency: string;
  currencySymbol: string;
  revenue?: number;
  operatingExpenses?: number;
  operatingProfit?: number;
  netProfit?: number;
  assets?: number;
  liabilities?: number;
  equity?: number;
  cashAndEquivalents?: number;
  revenueStreams?: RevenueStream[];
  expenseCategories?: ExpenseCategory[];
  assetBreakdown?: BalanceSheetItem[];
  liabilityBreakdown?: BalanceSheetItem[];
  equityBreakdown?: BalanceSheetItem[];
  capitalAllocation?: CapitalAllocation[];
  reportingNote?: string;
}

export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  content: string;
}

export interface Repo {
  slug: string;
  name: string;
  description: string;
  language: string;
  license: string;
  status: ProjectStatus;
  repository?: string;
  documentation?: string;
  latestRelease?: string;
  platform?: SourcePlatform;
  artifactType?: ArtifactClassification;
  affiliation?: AffiliationType;
  sources?: ProjectSource[];
  parameterCount?: string;
}

export interface TechnicalArtifact {
  slug: string;
  name: string;
  description: string;
  artifactType: ArtifactClassification;
  platform: SourcePlatform;
  platformType: SourceType;
  status: ProjectStatus;
  language?: string;
  license: string;
  url: string;
  documentation?: string;
  author?: string;
  organization?: string;
  affiliation: AffiliationType;
  parameterCount?: string;
  modelArchitecture?: string;
  latestRelease?: string;
  tags?: string[];
  ecosystem?: string;
  ecosystemRole?: string;
  verified?: boolean;
}

export interface TechnicalFootprintPlatform {
  platform: SourcePlatform;
  name: string;
  profileUrl: string;
  handle: string;
  organization: string;
  role: string;
  description: string;
  verified: boolean;
  resourceTypes: string[];
  artifactCount?: number;
  featuredItems?: string[];
}

export interface M31Node {
  id: string;
  name: string;
  title: string;
  role: string;
  status: ProjectStatus;
  artifactType: ArtifactClassification;
  lifecycle: string;
  parameterCount?: string;
  platform: SourcePlatform;
  url: string;
  description: string;
  sourceUrl?: string;
  href?: string;
}

export interface WhitepaperSection {
  id: string;
  number: string;
  title: string;
  content: string;
}

export interface WhitepaperReference {
  label: string;
  href: string;
  type: 'internal' | 'external';
}

export interface WhitepaperVersion {
  version: string;
  status: 'Published' | 'Draft' | 'Superseded';
  publishedAt: string;
  changeSummary: string;
  pdf?: string;
}

export interface Whitepaper {
  title: string;
  version: string;
  status: 'Published' | 'Draft';
  publishedAt: string;
  authors: string[];
  classification: 'Public' | 'Internal';
  abstract: string;
  sections: WhitepaperSection[];
  references: WhitepaperReference[];
  versions: WhitepaperVersion[];
}

// ─── Company Info ───────────────────────────────────────────

export interface CompanyInfo {
  legalName: string;
  brandName: string;
  description: string;
  type?: string;
  jurisdiction?: string;
  incorporationDate?: string;
  registrationInfo?: string;
  registeredOffice?: string;
  officialContact: string;
  officialWebsite: string;
  primaryDomains: string[];
}

// ─── Timeline Events ────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  year: string;
  month?: string;
  title: string;
  description: string;
  category: 'Foundation' | 'Software' | 'Infrastructure' | 'Research' | 'Organization' | 'Publication';
  relatedProject?: string;
}

// ─── Releases ───────────────────────────────────────────────

export interface ReleaseNote {
  type: 'Added' | 'Fixed' | 'Changed' | 'Security' | 'Breaking' | 'Deprecated';
  items: string[];
}

export interface Release {
  slug: string;
  project: string;
  version: string;
  date: string;
  releaseDate?: string;
  status: 'Released' | 'Pre-release' | 'Draft';
  summary?: string;
  added?: string[];
  changed?: string[];
  fixed?: string[];
  security?: string[];
  breakingChanges?: string[];
  artifacts?: { name: string; url: string }[];
  notes: ReleaseNote[];
  downloadUrl?: string;
}

// ─── Technology Layers ──────────────────────────────────────

export interface TechnologyLayer {
  id: string;
  name: string;
  level: number;
  description: string;
  status: 'Existing' | 'Developing' | 'Experimental' | 'Research' | 'Planned';
  items: { name: string; status: ProjectStatus; href?: string; productStatus?: string }[];
}

// ─── Service Status ─────────────────────────────────────────

export type ServiceStatusType = 'Operational' | 'Degraded' | 'Maintenance' | 'Outage' | 'NotDeployed';

export interface ServiceStatus {
  slug: string;
  name: string;
  category: string;
  status: ServiceStatusType;
  description: string;
}

// ─── Security Advisories ─────────────────────────────────────

export interface SecurityAdvisory {
  slug: string;
  identifier: string;
  title: string;
  date: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Open' | 'Resolved' | 'Mitigated' | 'Withdrawn';
  affected: string[];
  summary: string;
  content: string;
}

// ─── Legal Documents ─────────────────────────────────────────

export interface LegalDocument {
  slug: string;
  title: string;
  category: 'Privacy' | 'Terms' | 'Accessibility' | 'Licenses';
  lastUpdated: string;
  content: string;
}

// ─── Media Assets ────────────────────────────────────────────

export interface MediaAsset {
  slug: string;
  name: string;
  type: 'Logo' | 'Wordmark' | 'Color' | 'Guidelines' | 'Screenshot' | 'Document';
  description: string;
  format: string;
  downloadUrl?: string;
}

// ─── Annual Reports ──────────────────────────────────────────

export interface AnnualReport {
  slug: string;
  fiscalYear: string;
  title: string;
  status: 'Draft' | 'Management Report' | 'Final' | 'Audited';
  publicationDate: string;
  summary: string;
  financialSection: string;
  operationalSection: string;
  researchSection: string;
  majorProjects: string[];
  risks: string;
  nextYearDirection: string;
  pdf?: string;
}

// ─── Documentation Links ─────────────────────────────────────

export interface DocLink {
  slug: string;
  title: string;
  category: string;
  description: string;
  externalUrl?: string;
  available: boolean;
}

// ─── Contact Categories ─────────────────────────────────────

export interface ContactCategory {
  value: string;
  label: string;
  description: string;
}
