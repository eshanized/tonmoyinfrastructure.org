import { z } from 'zod';
import type {
  Project,
  ProjectStatus,
  FinancialReport,
  Publication,
  Release,
  NewsArticle,
  OfficeAddress,
  CompanyInfo,
} from '@/lib/types';
import type { Person } from '@/lib/people';

export const ProjectStatusSchema = z.enum([
  'Stable Release',
  'Maintenance',
  'Legacy',
  'Archived',
  'Preview',
  'Beta',
  'Planning',
  'Development',
  'Research',
  'Experimental',
  'Paused',
  'Production',
]);

// ─── Product / Project Schema ───────────────────────────────────────
export const ProductStatusSchema = z.enum([
  'stable',
  'maintenance',
  'legacy',
  'archived',
  'preview',
  'beta',
]);

export const ReleaseStatusSchema = z.enum([
  'stable',
  'released',
  'pre-release',
  'draft',
]);

export const DevelopmentStageSchema = z.enum([
  'active',
  'maintenance',
  'research',
  'planning',
]);

export const ProjectTypeSchema = z.enum([
  'software',
  'infrastructure',
  'network',
  'research',
]);

export const SourcePlatformSchema = z.enum([
  'github',
  'huggingface',
  'documentation',
  'research',
  'website',
  'registry',
]);

export const SourceTypeSchema = z.enum([
  'repository',
  'model',
  'dataset',
  'space',
  'publication',
  'documentation',
  'website',
  'library',
  'tool',
]);

export const AffiliationTypeSchema = z.enum([
  'TIV',
  'TIVerse',
  'Founder',
  'External',
]);

export const ArtifactClassificationSchema = z.enum([
  'Application',
  'Software Platform',
  'Software System',
  'AI Model',
  'Dataset',
  'Space / Demo',
  'Research Project',
  'Infrastructure',
  'Publication',
  'Library',
  'Tool',
]);

export const ProjectSourceSchema = z.object({
  platform: SourcePlatformSchema,
  type: SourceTypeSchema,
  url: z.string(),
  label: z.string().optional(),
  author: z.string().optional(),
  organization: z.string().optional(),
  maintainer: z.string().optional(),
  affiliation: AffiliationTypeSchema.optional(),
  verified: z.boolean().optional(),
  description: z.string().optional(),
});

export const ProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().optional(),
  type: ProjectTypeSchema,
  productStatus: ProductStatusSchema,
  releaseStatus: ReleaseStatusSchema,
  developmentStage: DevelopmentStageSchema,
  status: ProjectStatusSchema,
  category: z.string().min(1),
  version: z.string().optional(),
  releaseDate: z.string().optional(),
  technology: z.array(z.string()).default([]),
  repository: z.string().optional().default(''),
  documentation: z.string().optional().default(''),
  website: z.string().optional().default(''),
  license: z.string().optional().default(''),
  logo: z.string().optional(),
  icon: z.string().optional(),
  featured: z.boolean().default(false),
  content: z.string().min(1),
  problem: z.string().optional(),
  approach: z.string().optional(),
  architecture: z.string().optional(),
  features: z.array(z.string()).optional(),
  roadmap: z
    .array(z.object({ item: z.string(), done: z.boolean() }))
    .optional(),
  relatedResearch: z.array(z.string()).optional(),
  relatedProjects: z.array(z.string()).optional(),
  updatedAt: z.string().optional(),

  // Source-aware & ownership extensions
  sources: z.array(ProjectSourceSchema).optional().default([]),
  artifactType: ArtifactClassificationSchema.optional(),
  owner: z.string().optional(),
  organization: z.string().optional(),
  author: z.string().optional(),
  maintainer: z.string().optional(),
  affiliation: AffiliationTypeSchema.optional(),
  ecosystem: z.string().optional(),
  ecosystemRole: z.string().optional(),
  parameterCount: z.string().optional(),
  parameters: z.string().optional(),
  modelArchitecture: z.string().optional(),
  contextWindow: z.string().optional(),
  tags: z.array(z.string()).optional(),
  intendedUse: z.array(z.string()).optional(),
  checkpointsNote: z.string().optional(),

  // SEO fields
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
  noIndex: z.boolean().optional(),
  keywords: z.array(z.string()).optional(),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

// ─── Person Schema ──────────────────────────────────────────────────
export const PersonTypeSchema = z.enum([
  'Founder',
  'Director',
  'Board Member',
  'Executive',
  'Advisor',
  'Research Lead',
  'Engineering Lead',
]);

export const PersonStatusSchema = z.enum(['active', 'inactive', 'former']);

export const PersonLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
  type: z.enum(['github', 'website', 'orcid', 'linkedin', 'email', 'huggingface']),
});

export const PersonWorkSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum([
    'Founder Work',
    'TIV Project',
    'Open Source Work',
    'Research',
    'AI/ML Work',
  ]),
  href: z.string().optional(),
});

export const PersonSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  handle: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().min(1),
  type: PersonTypeSchema,
  status: PersonStatusSchema,
  public: z.boolean().default(true),
  bio: z.string().optional(),
  photo: z.string().optional(),
  summary: z.string().min(1),
  areas: z.array(z.string()).default([]),
  links: z.array(PersonLinkSchema).default([]),
  selectedWork: z.array(PersonWorkSchema).default([]),
  timeline: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().optional(),
      })
    )
    .default([]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  orcid: z.string().optional(),
  linkedin: z.string().optional(),
});

export type PersonInput = z.infer<typeof PersonSchema>;

// ─── Financial Schema ───────────────────────────────────────────────
export const FinancialStatusSchema = z.enum([
  'Audited',
  'Unaudited',
  'Management Report',
  'Estimate',
  'Illustrative',
]);

export const FinancialReportSchema = z.object({
  fiscalYear: z.string().min(1),
  status: FinancialStatusSchema,
  currency: z.string().min(1),
  currencySymbol: z.string().min(1),
  revenue: z.number().optional(),
  operatingExpenses: z.number().optional(),
  operatingProfit: z.number().optional(),
  netProfit: z.number().optional(),
  assets: z.number().optional(),
  liabilities: z.number().optional(),
  equity: z.number().optional(),
  cashAndEquivalents: z.number().optional(),
  revenueStreams: z
    .array(z.object({ label: z.string(), amount: z.number() }))
    .optional(),
  expenseCategories: z
    .array(z.object({ label: z.string(), amount: z.number() }))
    .optional(),
  assetBreakdown: z
    .array(z.object({ label: z.string(), amount: z.number() }))
    .optional(),
  liabilityBreakdown: z
    .array(z.object({ label: z.string(), amount: z.number() }))
    .optional(),
  equityBreakdown: z
    .array(z.object({ label: z.string(), amount: z.number() }))
    .optional(),
  capitalAllocation: z
    .array(z.object({ label: z.string(), percentage: z.number() }))
    .optional(),
  reportingNote: z.string().optional(),
});

export type FinancialReportInput = z.infer<typeof FinancialReportSchema>;

// ─── Research Schema ────────────────────────────────────────────────
export {
  PublicationStatusSchema,
  PublicationAuthorSchema,
  PublicationReferenceSchema,
  PublicationSlugSchema,
  PublicationFrontmatterSchema,
} from '@/lib/publications/schema';

export const PublicationSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  identifier: z.string().min(1),
  authors: z.array(z.union([
    z.string().min(1),
    z.object({
      name: z.string().min(1),
      affiliation: z.string().optional(),
      role: z.string().optional(),
      orcid: z.string().optional(),
      url: z.string().optional(),
      email: z.string().optional(),
    }),
  ])).min(1),
  abstract: z.string().min(1),
  publicationDate: z.string().min(1),
  date: z.string().min(1),
  updatedAt: z.string().optional(),
  version: z.string().min(1),
  status: z.enum(['Draft', 'Experimental', 'Published', 'Superseded', 'Archived']),
  supersededBy: z.string().optional(),
  type: z.string().optional().default('Research Paper'),
  area: z.string().min(1),
  tags: z.array(z.string()).optional().default([]),
  keywords: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  project: z.string().optional(),
  doi: z.string().optional(),
  journal: z.string().optional(),
  conference: z.string().optional(),
  volume: z.union([z.string(), z.number()]).optional(),
  issue: z.union([z.string(), z.number()]).optional(),
  pages: z.string().optional(),
  license: z.string().optional().default('CC-BY-4.0'),
  pdf: z.string().optional(),
  repository: z.string().optional(),
  dataset: z.string().optional(),
  supplementaryFiles: z.array(z.object({
    title: z.string().min(1),
    url: z.string(),
    description: z.string().optional(),
    size: z.string().optional(),
    format: z.string().optional(),
  })).optional().default([]),
  references: z.array(z.union([
    z.string(),
    z.object({
      id: z.string().optional(),
      title: z.string(),
      authors: z.array(z.string()).optional(),
      year: z.union([z.number(), z.string()]).optional(),
      venue: z.string().optional(),
      doi: z.string().optional(),
      url: z.string().optional(),
    }),
  ])).optional().default([]),
  canonicalUrl: z.string().optional(),
  inLanguage: z.string().optional().default('en-US'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().optional(),
  content: z.string().min(1),
  toc: z.array(z.object({
    id: z.string(),
    text: z.string(),
    level: z.number(),
  })).optional().default([]),
  readingTime: z.number().optional(),
  filePath: z.string().optional(),
});

export type PublicationInput = z.infer<typeof PublicationSchema>;

// ─── Release Schema ─────────────────────────────────────────────────
export const ReleaseSchema = z.object({
  slug: z.string().min(1),
  project: z.string().min(1),
  version: z.string().min(1),
  releaseDate: z.string().min(1),
  date: z.string().min(1),
  status: z.enum(['Released', 'Pre-release', 'Draft']),
  summary: z.string().min(1),
  added: z.array(z.string()).optional().default([]),
  changed: z.array(z.string()).optional().default([]),
  fixed: z.array(z.string()).optional().default([]),
  security: z.array(z.string()).optional().default([]),
  breakingChanges: z.array(z.string()).optional().default([]),
  artifacts: z
    .array(z.object({ name: z.string(), url: z.string() }))
    .optional()
    .default([]),
  notes: z
    .array(
      z.object({
        type: z.enum([
          'Added',
          'Fixed',
          'Changed',
          'Security',
          'Breaking',
          'Deprecated',
        ]),
        items: z.array(z.string()),
      })
    )
    .default([]),
  downloadUrl: z.string().optional(),
});

export type ReleaseInput = z.infer<typeof ReleaseSchema>;

// ─── News Schema ────────────────────────────────────────────────────
export const NewsArticleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  author: z.string().min(1),
  category: z.enum([
    'Company',
    'Products',
    'Engineering',
    'Infrastructure',
    'Research',
    'Announcements',
  ]),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  cover: z.string().optional(),
  relatedProjects: z.array(z.string()).optional().default([]),
});

export type NewsArticleInput = z.infer<typeof NewsArticleSchema>;

// ─── Validation Helpers ─────────────────────────────────────────────
export function validateProjects(data: unknown[]): Project[] {
  return data.map((item, index) => {
    try {
      return ProjectSchema.parse(item) as Project;
    } catch (err) {
      console.error(`Invalid Project at index ${index}:`, err);
      throw err;
    }
  });
}

export function validatePeople(data: unknown[]): Person[] {
  return data.map((item, index) => {
    try {
      return PersonSchema.parse(item) as Person;
    } catch (err) {
      console.error(`Invalid Person at index ${index}:`, err);
      throw err;
    }
  });
}

export function validateFinancials(data: unknown[]): FinancialReport[] {
  return data.map((item, index) => {
    try {
      return FinancialReportSchema.parse(item) as FinancialReport;
    } catch (err) {
      console.error(`Invalid FinancialReport at index ${index}:`, err);
      throw err;
    }
  });
}

export function validatePublications(data: unknown[]): Publication[] {
  return data.map((item, index) => {
    try {
      return PublicationSchema.parse(item) as Publication;
    } catch (err) {
      console.error(`Invalid Publication at index ${index}:`, err);
      throw err;
    }
  });
}

export function validateReleases(data: unknown[]): Release[] {
  return data.map((item, index) => {
    try {
      return ReleaseSchema.parse(item) as Release;
    } catch (err) {
      console.error(`Invalid Release at index ${index}:`, err);
      throw err;
    }
  });
}

export function validateNews(data: unknown[]): NewsArticle[] {
  return data.map((item, index) => {
    try {
      return NewsArticleSchema.parse(item) as NewsArticle;
    } catch (err) {
      console.error(`Invalid NewsArticle at index ${index}:`, err);
      throw err;
    }
  });
}

// ─── Office Address & Company Schema ────────────────────────────────
export const OfficeAddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  region: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
  telephoneUri: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  mapUrl: z.string().url(),
});

export type OfficeAddressInput = z.infer<typeof OfficeAddressSchema>;

export const CompanyInfoSchema = z.object({
  legalName: z.string().min(1),
  brandName: z.string().min(1),
  description: z.string().min(1),
  type: z.string().optional(),
  jurisdiction: z.string().optional(),
  incorporationDate: z.string().optional(),
  registrationInfo: z.string().optional(),
  registeredOffice: z.string().optional(),
  officeAddress: OfficeAddressSchema.optional(),
  officialContact: z.string().min(1),
  officialWebsite: z.string().url(),
  primaryDomains: z.array(z.string()),
});

export type CompanyInfoInput = z.infer<typeof CompanyInfoSchema>;

export function validateOfficeAddress(data: unknown): OfficeAddress {
  try {
    return OfficeAddressSchema.parse(data) as OfficeAddress;
  } catch (err) {
    console.error('Invalid OfficeAddress:', err);
    throw err;
  }
}

export function validateCompanyInfo(data: unknown): CompanyInfo {
  try {
    return CompanyInfoSchema.parse(data) as CompanyInfo;
  } catch (err) {
    console.error('Invalid CompanyInfo:', err);
    throw err;
  }
}
