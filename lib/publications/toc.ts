import type { TableOfContentsItem } from './types';

/**
 * Generates clean, stable anchor slugs from heading text.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '') // remove HTML tags
    .replace(/[^\w\s-]/g, '') // remove punctuation
    .trim()
    .replace(/[\s_]+/g, '-');
}

/**
 * Extracts Table of Contents items (h2, h3, h4) from markdown/MDX content.
 */
export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: TableOfContentsItem[] = [];
  const seenIds = new Map<string, number>();

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    // Strip inline markdown links or bolding from heading text
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
