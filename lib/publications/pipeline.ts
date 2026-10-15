import type { Publication } from './types';
import manifestData from './manifest.json';

export { extractTableOfContents, slugifyHeading } from './toc';
export { filterPublications } from './filter';

const publications: Publication[] = manifestData as Publication[];

/**
 * Returns all compiled and validated research publications.
 * Single source of truth loaded from the pre-compiled manifest.
 */
export function getAllPublications(): Publication[] {
  return publications;
}

export const getPublications = getAllPublications;

/**
 * Retrieves a single publication by its canonical slug.
 */
export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}

/**
 * Returns all publication slugs for static param generation.
 */
export function getPublicationSlugs(): string[] {
  return publications.map((p) => p.slug);
}

/**
 * Returns publications marked as featured.
 */
export function getFeaturedPublications(): Publication[] {
  return publications.filter((p) => p.featured);
}

/**
 * Returns publications belonging to a specific research area.
 */
export function getPublicationsByArea(area: string): Publication[] {
  const normArea = area.toLowerCase().trim();
  return publications.filter(
    (p) => p.area.toLowerCase().trim() === normArea
  );
}
