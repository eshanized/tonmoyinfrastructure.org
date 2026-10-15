import type { Publication, PublicationAuthor } from './types';

/**
 * Normalizes author representation to a display string name.
 */
export function getAuthorName(author: string | PublicationAuthor): string {
  if (typeof author === 'string') return author;
  return author.name || '';
}

/**
 * Returns an array of string author names.
 */
export function getAuthorNames(publication: Publication): string[] {
  return (publication.authors || []).map(getAuthorName).filter(Boolean);
}

/**
 * Formats authors for APA style: "Roy, E., & Doe, J." or "Tonmoy Infrastructure and Vision"
 */
function formatApaAuthors(authors: (string | PublicationAuthor)[]): string {
  const names = authors.map(getAuthorName).filter(Boolean);
  if (names.length === 0) return 'Tonmoy Infrastructure and Vision';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}`;
}

/**
 * Formats a publication as an APA 7th edition bibliographic citation.
 * Handles missing fields gracefully.
 */
export function formatApaCitation(pub: Publication, siteUrl: string = 'https://tonmoyinfrastructure.org'): string {
  const authors = formatApaAuthors(pub.authors);
  const year = (pub.publicationDate || pub.date || '').slice(0, 4) || 'n.d.';
  const title = pub.title.trim();
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

/**
 * Generates BibTeX entry for a publication.
 */
export function formatBibtexCitation(pub: Publication, siteUrl: string = 'https://tonmoyinfrastructure.org'): string {
  const citeKey = pub.identifier
    ? pub.identifier.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    : pub.slug.replace(/[^a-z0-9]+/g, '_');

  const authors = getAuthorNames(pub).join(' and ');
  const year = (pub.publicationDate || pub.date || '').slice(0, 4) || '2026';
  const entryType = pub.journal ? 'article' : pub.conference ? 'inproceedings' : 'techreport';

  const lines: string[] = [
    `@${entryType}{${citeKey},`,
    `  title        = {${pub.title.replace(/[{}]/g, '')}},`,
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

/**
 * Formats a concise inline bibliographic citation.
 */
export function formatInlineCitation(pub: Publication): string {
  const authors = getAuthorNames(pub);
  const leadAuthor = authors[0] || 'TIV';
  const authorEtAl = authors.length > 2 ? `${leadAuthor} et al.` : authors.join(' & ');
  const year = (pub.publicationDate || pub.date || '').slice(0, 4);
  return `[${authorEtAl}, ${year}]`;
}
