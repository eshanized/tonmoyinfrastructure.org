import type { Publication, PublicationFilterOptions, PublicationStatus } from './types';

/**
 * In-memory client/server filtering for publications.
 * Contains no Node.js filesystem dependencies.
 */
export function filterPublications(
  publications: Publication[],
  options: PublicationFilterOptions = {}
): Publication[] {
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
    // Status filter
    if (status && status !== 'all' && pub.status !== status) {
      return false;
    }

    // Type filter
    if (type && type !== 'all' && pub.type !== type) {
      return false;
    }

    // Area filter
    if (area && area !== 'all' && pub.area.toLowerCase() !== area.toLowerCase()) {
      return false;
    }

    // Tag filter
    if (tag && (!pub.tags || !pub.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))) {
      return false;
    }

    // Search query
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

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'oldest') {
      const dateA = a.publicationDate || a.date;
      const dateB = b.publicationDate || b.date;
      return dateA.localeCompare(dateB);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    // newest default
    const dateA = a.publicationDate || a.date;
    const dateB = b.publicationDate || b.date;
    return dateB.localeCompare(dateA);
  });

  return filtered;
}
