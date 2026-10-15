import { z } from 'zod';

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates strictly formatted ISO 8601 calendar dates (YYYY-MM-DD).
 */
export const IsoDateSchema = z.string().refine((val) => {
  if (!ISO_DATE_REGEX.test(val)) return false;
  const [yearStr, monthStr, dayStr] = val.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}, {
  message: 'Date must be a valid ISO calendar date in YYYY-MM-DD format',
});

/**
 * Validates permitted internal paths (e.g. /publications/paper.pdf) or external HTTP/HTTPS URLs.
 * Rejects javascript:, data:, and malformed protocol targets.
 */
export const SafeUrlOrPathSchema = z.string().refine((val) => {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.startsWith('/\\')) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}, {
  message: 'Must be an absolute internal path starting with "/" or a valid http:// or https:// URL',
});

export const PublicationStatusSchema = z.enum([
  'Draft',
  'Experimental',
  'Published',
  'Superseded',
  'Archived',
]);

export const PublicationAuthorSchema = z.union([
  z.string().min(1, 'Author name cannot be empty'),
  z.object({
    name: z.string().min(1, 'Author name is required'),
    affiliation: z.string().optional(),
    role: z.string().optional(),
    orcid: z.string().regex(/^https:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/, 'Invalid ORCID format').optional(),
    url: SafeUrlOrPathSchema.optional(),
    email: z.string().email('Invalid email format').optional(),
  }),
]);

export const PublicationReferenceSchema = z.union([
  z.string().min(1, 'Reference cannot be empty'),
  z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Reference title is required'),
    authors: z.array(z.string()).optional(),
    year: z.union([z.number().int().min(1900).max(2100), z.string()]).optional(),
    venue: z.string().optional(),
    doi: z.string().optional(),
    url: SafeUrlOrPathSchema.optional(),
  }),
]);

export const SupplementaryFileSchema = z.object({
  title: z.string().min(1, 'Supplementary file title is required'),
  url: SafeUrlOrPathSchema,
  description: z.string().optional(),
  size: z.string().optional(),
  format: z.string().optional(),
});

export const PublicationSlugSchema = z.string()
  .min(2, 'Slug must be at least 2 characters')
  .max(128, 'Slug cannot exceed 128 characters')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must consist of lowercase letters, numbers, and hyphens');

export const PublicationFrontmatterSchema = z.object({
  slug: PublicationSlugSchema,
  title: z.string().min(1, 'Publication title is required'),
  identifier: z.string().min(1, 'Publication identifier is required (e.g. TIV-RES-2026-001)'),
  authors: z.array(PublicationAuthorSchema).min(1, 'At least one author is required'),
  abstract: z.string().min(10, 'Abstract must be at least 10 characters'),
  publicationDate: IsoDateSchema,
  date: IsoDateSchema.optional(),
  updatedAt: IsoDateSchema.optional(),
  version: z.string().min(1, 'Version identifier is required'),
  status: PublicationStatusSchema,
  supersededBy: z.string().optional(),
  type: z.string().optional().default('Research Paper'),
  area: z.string().min(1, 'Research area is required'),
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
  pdf: SafeUrlOrPathSchema.optional(),
  repository: SafeUrlOrPathSchema.optional(),
  dataset: SafeUrlOrPathSchema.optional(),
  supplementaryFiles: z.array(SupplementaryFileSchema).optional().default([]),
  references: z.array(PublicationReferenceSchema).optional().default([]),
  canonicalUrl: SafeUrlOrPathSchema.optional(),
  inLanguage: z.string().optional().default('en-US'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: SafeUrlOrPathSchema.optional(),
  noIndex: z.boolean().optional(),
});

export type PublicationFrontmatter = z.infer<typeof PublicationFrontmatterSchema>;

/**
 * Validates frontmatter with actionable, contextual error messages.
 */
export function validatePublicationFrontmatter(
  data: unknown,
  sourceFile: string
): PublicationFrontmatter {
  const result = PublicationFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `  - [${issue.path.join('.') || 'root'}]: ${issue.message}`)
      .join('\n');
    throw new Error(
      `Publication frontmatter validation failed in "${sourceFile}":\n${errorDetails}`
    );
  }
  return result.data;
}
