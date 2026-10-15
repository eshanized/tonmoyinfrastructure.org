export type PublicationStatus =
  | 'Draft'
  | 'Experimental'
  | 'Published'
  | 'Superseded'
  | 'Archived';

export interface PublicationAuthor {
  name: string;
  affiliation?: string;
  role?: string;
  orcid?: string;
  url?: string;
  email?: string;
}

export interface PublicationReference {
  id?: string;
  title: string;
  authors?: string[];
  year?: string | number;
  venue?: string;
  doi?: string;
  url?: string;
}

export interface SupplementaryFile {
  title: string;
  url: string;
  description?: string;
  size?: string;
  format?: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface Publication {
  slug: string;
  title: string;
  identifier: string;
  authors: (string | PublicationAuthor)[];
  abstract: string;
  publicationDate: string;
  date: string;
  updatedAt?: string;
  version: string;
  status: PublicationStatus;
  supersededBy?: string;
  type?: string;
  area: string;
  tags?: string[];
  keywords?: string[];
  featured?: boolean;
  project?: string;
  doi?: string;
  journal?: string;
  conference?: string;
  volume?: string | number;
  issue?: string | number;
  pages?: string;
  license?: string;
  pdf?: string;
  repository?: string;
  dataset?: string;
  supplementaryFiles?: SupplementaryFile[];
  references?: (string | PublicationReference)[];
  canonicalUrl?: string;
  inLanguage?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
  content: string;
  toc: TableOfContentsItem[];
  readingTime?: number;
  filePath?: string;
}

export interface PublicationFilterOptions {
  search?: string;
  area?: string;
  status?: PublicationStatus | 'all';
  type?: string | 'all';
  tag?: string;
  sortBy?: 'newest' | 'oldest' | 'title';
}
