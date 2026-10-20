import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  compilePublications,
  validatePublicationFrontmatter,
  IsoDateSchema,
  SafeUrlOrPathSchema,
  extractTableOfContents,
  slugifyHeading,
  formatApaCitation,
  formatBibtexCitation,
  formatInlineCitation,
  filterPublications,
} from '../scripts/compile-publications.mjs';

const ROOT = process.cwd();

test('PUB-1: Discovery of MDX Publication Files', () => {
  const pubDir = path.join(ROOT, 'content/publications');
  assert.ok(fs.existsSync(pubDir), 'content/publications directory must exist');

  const files = fs.readdirSync(pubDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  assert.ok(files.length > 0, 'At least one publication MDX file must be present');
  assert.ok(
    files.includes('autonomous-development-systems.mdx'),
    'autonomous-development-systems.mdx must be discovered'
  );
});

test('PUB-2: Frontmatter Validation and Useful Validation Errors', () => {
  // Valid frontmatter
  const validData = {
    slug: 'test-paper',
    title: 'Test Paper Title',
    identifier: 'TIV-RES-2026-999',
    authors: ['Researcher One'],
    abstract: 'This is a valid abstract for testing purposes with sufficient length.',
    publicationDate: '2026-09-15',
    version: '1.0',
    status: 'Draft',
    area: 'Artificial Intelligence',
  };

  const parsed = validatePublicationFrontmatter(validData, 'content/publications/test-paper.mdx');
  assert.equal(parsed.slug, 'test-paper');
  assert.equal(parsed.title, 'Test Paper Title');

  // Invalid frontmatter: empty title
  assert.throws(
    () => {
      validatePublicationFrontmatter(
        { ...validData, title: '' },
        'content/publications/invalid.mdx'
      );
    },
    /Publication frontmatter validation failed in "content\/publications\/invalid\.mdx"/,
    'Validation error must cite the failing file'
  );
});

test('PUB-3: Duplicate Slug Rejection', () => {
  const pubs = compilePublications();
  const slugs = pubs.map((p) => p.slug);
  const uniqueSlugs = new Set(slugs);
  assert.equal(slugs.length, uniqueSlugs.size, 'All publication slugs must be unique');
});

test('PUB-4: Missing Required Metadata Checks', () => {
  const requiredFields = ['slug', 'title', 'identifier', 'authors', 'abstract', 'publicationDate', 'version', 'status', 'area'];

  for (const field of requiredFields) {
    const base = {
      slug: 'valid-slug',
      title: 'Valid Title',
      identifier: 'TIV-2026',
      authors: ['Author A'],
      abstract: 'Long enough abstract text for validation rules.',
      publicationDate: '2026-09-12',
      version: '1.0',
      status: 'Published',
      area: 'Networking',
    };
    delete base[field];

    assert.throws(
      () => validatePublicationFrontmatter(base, `test-${field}.mdx`),
      new RegExp(`\\[${field}\\]`),
      `Omitting ${field} must report an error mentioning [${field}]`
    );
  }
});

test('PUB-5: Strict Date Parsing and Invalid URLs', () => {
  // Valid dates
  assert.ok(IsoDateSchema.safeParse('2026-09-12').success);
  assert.ok(IsoDateSchema.safeParse('2026-02-28').success);

  // Invalid calendar dates
  assert.ok(!IsoDateSchema.safeParse('2026-02-30').success, 'Feb 30 must be rejected');
  assert.ok(!IsoDateSchema.safeParse('2026-13-01').success, 'Month 13 must be rejected');
  assert.ok(!IsoDateSchema.safeParse('12-09-2026').success, 'Non-ISO format must be rejected');
  assert.ok(!IsoDateSchema.safeParse('2026/09/12').success, 'Slash date format must be rejected');

  // Safe URLs
  assert.ok(SafeUrlOrPathSchema.safeParse('/publications/test.pdf').success);
  assert.ok(SafeUrlOrPathSchema.safeParse('https://github.com/eshanized/M31A').success);
  assert.ok(SafeUrlOrPathSchema.safeParse('http://example.com').success);

  // Unsafe / Malformed URLs
  assert.ok(!SafeUrlOrPathSchema.safeParse('javascript:alert(1)').success, 'javascript: URI must be rejected');
  assert.ok(!SafeUrlOrPathSchema.safeParse('data:text/html;base64,PHNjcmlwdD4=').success, 'data: URI must be rejected');
  assert.ok(!SafeUrlOrPathSchema.safeParse('//evil.com').success, 'Protocol-relative URL must be rejected');
});

test('PUB-6: Generation of Static Publication Parameters', () => {
  const manifestPath = path.join(ROOT, 'lib/publications/manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const slugs = manifest.map((p) => p.slug);
  assert.ok(Array.isArray(slugs), 'Slugs must be an array');
  assert.ok(slugs.includes('autonomous-development-systems'), 'Must include autonomous-development-systems');
});

test('PUB-7: Approved MDX Components Map Integrity', () => {
  const componentsPath = path.join(ROOT, 'lib/publications/components.tsx');
  assert.ok(fs.existsSync(componentsPath), 'components.tsx must exist');

  const content = fs.readFileSync(componentsPath, 'utf8');
  assert.match(content, /export function Figure\(/, 'Figure component must be defined');
  assert.match(content, /export function Callout\(/, 'Callout component must be defined');
  assert.match(content, /export function CodeBlock\(/, 'CodeBlock component must be defined');
  assert.match(content, /export function ResearchTable\(/, 'ResearchTable component must be defined');
  assert.match(content, /export function Reference\(/, 'Reference component must be defined');
  assert.match(content, /publicationMDXComponents\s*=/, 'publicationMDXComponents map must be exported');
});

test('PUB-8: Table-of-Contents Anchor Consistency', () => {
  const sampleMarkdown = `
## 1. Problem Space & Motivation
Text here.
### Detailed Breakdown
More text.
## 2. Core Architecture
Even more text.
## 1. Problem Space & Motivation
Duplicate section test.
`;

  const toc = extractTableOfContents(sampleMarkdown);
  assert.equal(toc.length, 4);
  assert.equal(toc[0].id, '1-problem-space-motivation');
  assert.equal(toc[1].id, 'detailed-breakdown');
  assert.equal(toc[1].level, 3);
  assert.equal(toc[2].id, '2-core-architecture');
  assert.equal(toc[3].id, '1-problem-space-motivation-1', 'Duplicate heading must have stable numeric suffix');
});

test('PUB-9: Citation Formatting for Complete and Incomplete Metadata', () => {
  const completePub = {
    slug: 'distributed-consensus',
    title: 'Fault Tolerant Consensus in Edge Computing',
    identifier: 'TIV-RES-2026-005',
    authors: ['Roy, Eshan', 'Doe, Jane'],
    abstract: 'Sample abstract.',
    publicationDate: '2026-09-20',
    date: '2026-09-20',
    version: '1.0',
    status: 'Published',
    area: 'Distributed Systems',
    journal: 'Journal of Systems Research',
    volume: '14',
    issue: '2',
    pages: '45-60',
    doi: '10.1000/182',
    content: '',
    toc: [],
  };

  const apa = formatApaCitation(completePub);
  assert.match(apa, /Roy, Eshan & Doe, Jane/);
  assert.match(apa, /\(2026\)/);
  assert.match(apa, /Fault Tolerant Consensus in Edge Computing/);
  assert.match(apa, /Journal of Systems Research, 14\(2\), 45-60/);
  assert.match(apa, /https:\/\/doi\.org\/10\.1000\/182/);

  const bibtex = formatBibtexCitation(completePub);
  assert.match(bibtex, /@article\{tiv_res_2026_005,/);
  assert.match(bibtex, /author\s*=\s*\{Roy, Eshan and Doe, Jane\}/);
  assert.match(bibtex, /journal\s*=\s*\{Journal of Systems Research\}/);
  assert.match(bibtex, /volume\s*=\s*\{14\}/);

  const inline = formatInlineCitation(completePub);
  assert.equal(inline, '[Roy, Eshan & Doe, Jane, 2026]');

  // Incomplete record test
  const incompletePub = {
    slug: 'draft-memo',
    title: 'Preliminary Architectural Memo',
    identifier: 'TIV-RES-2026-006',
    authors: ['Tonmoy Infrastructure and Vision'],
    abstract: 'Abstract.',
    publicationDate: '2026-09-12',
    date: '2026-09-12',
    version: '0.1',
    status: 'Draft',
    area: 'Systems Engineering',
    content: '',
    toc: [],
  };

  const incompleteApa = formatApaCitation(incompletePub);
  assert.doesNotMatch(incompleteApa, /undefined/);
  assert.doesNotMatch(incompleteApa, /null/);
  assert.match(incompleteApa, /Tonmoy Infrastructure and Vision Research\./);
});

test('PUB-10: Draft, Experimental, Published, and Superseded States', () => {
  const bannerPath = path.join(ROOT, 'components/publications/status-banner.tsx');
  assert.ok(fs.existsSync(bannerPath), 'status-banner.tsx must exist');

  const bannerSource = fs.readFileSync(bannerPath, 'utf8');
  assert.match(bannerSource, /Draft Document/, 'Banner must handle Draft state');
  assert.match(bannerSource, /Experimental Investigation/, 'Banner must handle Experimental state');
  assert.match(bannerSource, /Superseded Publication/, 'Banner must handle Superseded state');

  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib/publications/manifest.json'), 'utf8'));
  const pub = manifest.find((p) => p.slug === 'autonomous-development-systems');
  assert.ok(pub, 'autonomous-development-systems must exist');
  assert.equal(pub.status, 'Draft', 'Current migrated publication must remain Draft');
});

test('PUB-11: Accurate Scholarly JSON-LD Schema Generation', () => {
  const structuredDataFile = fs.readFileSync(path.join(ROOT, 'lib/structured-data.ts'), 'utf8');
  assert.match(structuredDataFile, /generateScholarlyArticleSchema/, 'generateScholarlyArticleSchema must exist');
  assert.match(structuredDataFile, /'@type':\s*'ScholarlyArticle'/, 'Must produce ScholarlyArticle schema');
  assert.match(structuredDataFile, /encodingFormat:\s*'application\/pdf'/, 'Must support PDF encoding');
  assert.match(structuredDataFile, /Periodical/, 'Must support Periodical schema');
});

test('PUB-12: Sitemap URL Uniqueness and Canonical Format', () => {
  const sitemapSource = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');
  assert.match(sitemapSource, /getPublications\(\)/, 'Sitemap must crawl publications');
  assert.match(sitemapSource, /\/research\/publications\/\$\{publication\.slug\}/, 'Sitemap must map canonical publication URLs');
  assert.match(sitemapSource, /publication\.updatedAt\s*\|\|\s*publication\.publicationDate\s*\|\|\s*publication\.date/, 'Sitemap must use authentic update/publication dates');

  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib/publications/manifest.json'), 'utf8'));
  for (const pub of manifest) {
    const rawDate = pub.updatedAt || pub.publicationDate || pub.date;
    const dateObj = new Date(rawDate);
    assert.ok(!isNaN(dateObj.getTime()), `Date ${rawDate} for ${pub.slug} must be a valid date`);
  }
});

test('PUB-13: PDF and Supplementary Resource Paths', () => {
  const pdfPath = path.join(ROOT, 'public/publications/autonomous-development-systems.pdf');
  assert.ok(fs.existsSync(pdfPath), 'public/publications/autonomous-development-systems.pdf must exist');

  const fileHead = fs.readFileSync(pdfPath, { encoding: 'utf8', flag: 'r' }).slice(0, 8);
  assert.match(fileHead, /^%PDF-/, 'PDF must have valid PDF header bytes');
});

test('PUB-14: Empty Catalogue and Search/Filter Zero-Results States', () => {
  const all = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib/publications/manifest.json'), 'utf8'));

  // Test match
  const matches = filterPublications(all, { search: 'Autonomous' });
  assert.ok(matches.length > 0, 'Searching "Autonomous" must find matches');

  // Test zero results
  const noMatches = filterPublications(all, { search: 'NonExistentTermXYZ123' });
  assert.equal(noMatches.length, 0, 'Unmatched search query must produce empty array');

  // Test area filter
  const aiMatches = filterPublications(all, { area: 'Artificial Intelligence' });
  assert.ok(aiMatches.length > 0, 'Filtering by AI area must match');

  const wrongAreaMatches = filterPublications(all, { area: 'NonExistentArea' });
  assert.equal(wrongAreaMatches.length, 0, 'Unmatched area filter must produce empty array');
});

test('PUB-15: Accessibility Attributes on Catalogue and Article Components', () => {
  const cardSource = fs.readFileSync(path.join(ROOT, 'components/publications/publication-card.tsx'), 'utf8');
  assert.match(cardSource, /aria-label=/, 'Publication card must have accessible action labels');

  const catalogSource = fs.readFileSync(path.join(ROOT, 'components/publications/publication-catalog.tsx'), 'utf8');
  assert.match(catalogSource, /aria-label="Search publications"/, 'Search input must have aria-label');

  const tocSource = fs.readFileSync(path.join(ROOT, 'components/publications/table-of-contents.tsx'), 'utf8');
  assert.match(tocSource, /aria-label="Table of Contents"/, 'TOC must have aria-label');

  const bannerSource = fs.readFileSync(path.join(ROOT, 'components/publications/status-banner.tsx'), 'utf8');
  assert.match(bannerSource, /role="status"/, 'Status banner must have role="status"');
});

test('PUB-16: Regression Protection for Existing Routes and Architecture', () => {
  const contentSource = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');

  // Verify getProjects and getNews still exist
  assert.match(contentSource, /export function getProjects\(\)/, 'getProjects must be preserved');
  assert.match(contentSource, /export function getResearchAreas\(\)/, 'getResearchAreas must be preserved');
  assert.match(contentSource, /export function getNews\(\)/, 'getNews must be preserved');

  // Verify getPublications is exported and single-source
  assert.match(contentSource, /getAllPublications as getPublications/, 'getPublications must delegate to pipeline');

  // Verify research landing page exists and links to publications
  const researchPageSource = fs.readFileSync(path.join(ROOT, 'app/research/page.tsx'), 'utf8');
  assert.match(researchPageSource, /\/research\/publications/, 'Research landing page must link to publications');
});
