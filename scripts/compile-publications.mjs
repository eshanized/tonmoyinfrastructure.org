import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const PUBLICATIONS_DIR = path.join(process.cwd(), 'content', 'publications');
const OUTPUT_FILE = path.join(process.cwd(), 'lib', 'publications', 'manifest.json');

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

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

export function validatePublicationFrontmatter(data, sourceFile) {
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

export function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-');
}

export function extractTableOfContents(content) {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items = [];
  const seenIds = new Map();

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    const cleanText = rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim();

    let id = slugifyHeading(cleanText) || `section-${items.length + 1}`;
    const count = seenIds.get(id) || 0;
    if (count > 0) {
      seenIds.set(id, count + 1);
      id = `${id}-${count}`;
    } else {
      seenIds.set(id, 1);
    }

    items.push({
      id,
      text: cleanText,
      level,
    });
  }

  return items;
}

export function estimateReadingTime(content) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function getAuthorName(author) {
  if (typeof author === 'string') return author;
  return author?.name || '';
}

export function getAuthorNames(publication) {
  return (publication.authors || []).map(getAuthorName).filter(Boolean);
}

export function formatApaCitation(pub, siteUrl = 'https://tonmoyinfrastructure.org') {
  const names = getAuthorNames(pub);
  const authors =
    names.length === 0
      ? 'Tonmoy Infrastructure and Vision'
      : names.length === 1
      ? names[0]
      : names.length === 2
      ? `${names[0]} & ${names[1]}`
      : `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}`;

  const year = (pub.publicationDate || pub.date || '').slice(0, 4) || 'n.d.';
  const title = (pub.title || '').trim();
  const version = pub.version ? ` (v${pub.version})` : '';
  const identifier = pub.identifier ? ` [${pub.identifier}]` : '';

  let venue = '';
  if (pub.journal) {
    venue = pub.journal;
    if (pub.volume) {
      venue += `, ${pub.volume}`;
      if (pub.issue) {
        venue += `(${pub.issue})`;
      }
    }
    if (pub.pages) {
      venue += `, ${pub.pages}`;
    }
    venue += '.';
  } else if (pub.conference) {
    venue = `In Proceedings of the ${pub.conference}.`;
  } else {
    venue = 'Tonmoy Infrastructure and Vision Research.';
  }

  const parts = [`${authors} (${year}).`, `${title}${version}${identifier}.`, venue];

  if (pub.doi) {
    const cleanDoi = pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi.replace(/^doi:/i, '')}`;
    parts.push(cleanDoi);
  } else if (pub.canonicalUrl) {
    parts.push(pub.canonicalUrl);
  } else {
    parts.push(`${siteUrl}/research/publications/${pub.slug}/`);
  }

  return parts.filter(Boolean).join(' ');
}

export function formatBibtexCitation(pub, siteUrl = 'https://tonmoyinfrastructure.org') {
  const citeKey = pub.identifier
    ? pub.identifier.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    : pub.slug.replace(/[^a-z0-9]+/g, '_');

  const authors = getAuthorNames(pub).join(' and ');
  const year = (pub.publicationDate || pub.date || '').slice(0, 4) || '2026';
  const entryType = pub.journal ? 'article' : pub.conference ? 'inproceedings' : 'techreport';

  const lines = [
    `@${entryType}{${citeKey},`,
    `  title        = {${(pub.title || '').replace(/[{}]/g, '')}},`,
    `  author       = {${authors}},`,
    `  year         = {${year}},`,
  ];

  if (pub.identifier) {
    lines.push(`  number       = {${pub.identifier}},`);
  }

  if (pub.version) {
    lines.push(`  version      = {${pub.version}},`);
  }

  if (pub.journal) {
    lines.push(`  journal      = {${pub.journal}},`);
    if (pub.volume) lines.push(`  volume       = {${pub.volume}},`);
    if (pub.issue) lines.push(`  number       = {${pub.issue}},`);
    if (pub.pages) lines.push(`  pages        = {${pub.pages}},`);
  } else if (pub.conference) {
    lines.push(`  booktitle    = {Proceedings of ${pub.conference}},`);
  } else {
    lines.push(`  institution  = {Tonmoy Infrastructure and Vision},`);
    lines.push(`  type         = {Technical Report},`);
  }

  if (pub.doi) {
    lines.push(`  doi          = {${pub.doi.replace(/^https?:\/\/doi\.org\//, '')}},`);
  }

  const url = pub.canonicalUrl || `${siteUrl}/research/publications/${pub.slug}/`;
  lines.push(`  url          = {${url}}`);
  lines.push('}');

  return lines.join('\n');
}

export function formatInlineCitation(pub) {
  const authors = getAuthorNames(pub);
  const leadAuthor = authors[0] || 'TIV';
  const authorEtAl = authors.length > 2 ? `${leadAuthor} et al.` : authors.join(' & ');
  const year = (pub.publicationDate || pub.date || '').slice(0, 4);
  return `[${authorEtAl}, ${year}]`;
}

export function filterPublications(publications, options = {}) {
  const {
    search = '',
    area = '',
    status = 'all',
    type = 'all',
    tag = '',
    sortBy = 'newest',
  } = options;

  const query = search.toLowerCase().trim();

  let filtered = publications.filter((pub) => {
    if (status && status !== 'all' && pub.status !== status) return false;
    if (type && type !== 'all' && pub.type !== type) return false;
    if (area && area !== 'all' && pub.area.toLowerCase() !== area.toLowerCase()) return false;
    if (tag && (!pub.tags || !pub.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))) return false;

    if (query) {
      const authorMatch = pub.authors.some((author) => {
        const name = typeof author === 'string' ? author : author.name;
        return name.toLowerCase().includes(query);
      });

      const tagMatch = (pub.tags || []).some((t) => t.toLowerCase().includes(query));
      const keywordMatch = (pub.keywords || []).some((k) => k.toLowerCase().includes(query));
      const titleMatch = pub.title.toLowerCase().includes(query);
      const abstractMatch = pub.abstract.toLowerCase().includes(query);
      const identifierMatch = pub.identifier.toLowerCase().includes(query);

      return (
        titleMatch ||
        abstractMatch ||
        identifierMatch ||
        authorMatch ||
        tagMatch ||
        keywordMatch
      );
    }

    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'oldest') {
      const dateA = a.publicationDate || a.date;
      const dateB = b.publicationDate || b.date;
      return dateA.localeCompare(dateB);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    const dateA = a.publicationDate || a.date;
    const dateB = b.publicationDate || b.date;
    return dateB.localeCompare(dateA);
  });

  return filtered;
}

export function compilePublications() {
  if (!fs.existsSync(PUBLICATIONS_DIR)) {
    console.warn(`[publications-compiler] Directory not found: ${PUBLICATIONS_DIR}`);
    fs.mkdirSync(PUBLICATIONS_DIR, { recursive: true });
  }

  const entries = fs.readdirSync(PUBLICATIONS_DIR, { withFileTypes: true });
  const mdxFiles = entries
    .filter((e) => e.isFile() && (e.name.endsWith('.mdx') || e.name.endsWith('.md')))
    .map((e) => e.name)
    .sort();

  const slugMap = new Map();
  const publications = [];

  for (const filename of mdxFiles) {
    const filePath = path.join(PUBLICATIONS_DIR, filename);
    const rawContent = fs.readFileSync(filePath, 'utf-8');

    let parsed;
    try {
      parsed = matter(rawContent);
    } catch (err) {
      throw new Error(`Failed to parse frontmatter in "${filePath}": ${err.message}`);
    }

    const frontmatter = validatePublicationFrontmatter(parsed.data, filePath);

    // Check duplicate slug
    const existingFile = slugMap.get(frontmatter.slug);
    if (existingFile) {
      throw new Error(
        `Duplicate publication slug "${frontmatter.slug}" detected in "${filePath}". It was already defined in "${existingFile}". Slugs must be unique.`
      );
    }
    slugMap.set(frontmatter.slug, filePath);

    const toc = extractTableOfContents(parsed.content);
    const readingTime = estimateReadingTime(parsed.content);

    publications.push({
      ...frontmatter,
      date: frontmatter.date || frontmatter.publicationDate,
      content: parsed.content,
      toc,
      readingTime,
      filePath: path.relative(process.cwd(), filePath),
    });
  }

  // Sort newest first
  publications.sort((a, b) => {
    const dateA = a.publicationDate || a.date;
    const dateB = b.publicationDate || b.date;
    const dateComp = dateB.localeCompare(dateA);
    if (dateComp !== 0) return dateComp;
    return a.title.localeCompare(b.title);
  });

  // Ensure output directory exists and write
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(publications, null, 2), 'utf-8');
  console.log(`[publications-compiler] Compiled ${publications.length} publication(s) -> ${OUTPUT_FILE}`);
  return publications;
}

// Run immediately if executed as CLI script
if (process.argv[1] && process.argv[1].endsWith('compile-publications.mjs')) {
  try {
    compilePublications();
  } catch (err) {
    console.error(`\x1b[31m[publications-compiler error]\x1b[0m ${err.message}`);
    process.exit(1);
  }
}
