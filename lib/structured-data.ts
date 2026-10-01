import { siteConfig } from '@/lib/site-config';
import { buildCanonicalUrl } from '@/lib/seo';
import type { Project, Publication, NewsItem } from '@/lib/types';
import type { Person } from '@/lib/people';

/**
 * Generates the Schema.org Organization structured data entity.
 */
export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, siteConfig.formalName],
    url: siteConfig.canonicalUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': `${siteConfig.url}/#logo`,
      url: `${siteConfig.url}${siteConfig.logo}`,
      caption: `${siteConfig.name} Logo`,
    },
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.huggingFace,
    ],
    founder: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#founder`,
      name: siteConfig.founder.name,
      alternateName: siteConfig.founder.handle,
      jobTitle: siteConfig.founder.role,
      url: `${siteConfig.url}${siteConfig.founder.url}`,
      sameAs: [
        siteConfig.founder.github,
        siteConfig.founder.huggingFace,
        siteConfig.founder.orcid,
        siteConfig.founder.website,
      ],
    },
  };
}

/**
 * Generates the Schema.org Founder Person entity.
 */
export function generateFounderPersonSchema(person?: Person) {
  const p = person || siteConfig.founder;
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#founder`,
    name: p.name,
    alternateName: p.handle,
    jobTitle: p.role,
    worksFor: {
      '@id': `${siteConfig.url}/#organization`,
    },
    url: `${siteConfig.url}/about/leadership`,
    sameAs: [
      siteConfig.founder.github,
      siteConfig.founder.huggingFace,
      siteConfig.founder.orcid,
      siteConfig.founder.website,
    ],
    description:
      'summary' in p
        ? p.summary
        : 'Founder of Tonmoy Infrastructure and Vision, working across software infrastructure, systems engineering, and open research.',
  };
}

/**
 * Generates the Schema.org WebSite entity with a real search potentialAction.
 */
export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.canonicalUrl,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };
}

export interface BreadcrumbItem {
  name: string;
  path?: string;
  item?: string;
  href?: string;
}

/**
 * Generates BreadcrumbList structured data matching the visual breadcrumbs.
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => {
      const target = crumb.path || crumb.item || crumb.href;
      const itemUrl = target
        ? target.startsWith('http')
          ? target
          : buildCanonicalUrl(target)
        : undefined;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        ...(itemUrl && { item: itemUrl }),
      };
    }),
  };
}

/**
 * Generates SoftwareApplication structured data for a Project or AI Model.
 */
export function generateSoftwareApplicationSchema(project: Project) {
  const isModel = project.artifactType === 'AI Model';
  const canonicalUrl = buildCanonicalUrl(`/projects/${project.slug}`);

  const schema: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    '@id': `${canonicalUrl}#software`,
    name: project.title,
    description: project.description,
    applicationCategory: isModel ? 'DeveloperApplication' : 'InfrastructureApplication',
    operatingSystem: 'Cross-platform, Linux, POSIX',
    url: canonicalUrl,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    author: {
      '@id': `${siteConfig.url}/#founder`,
    },
  };

  if (project.version) {
    schema.softwareVersion = project.version;
  }

  if (project.releaseDate) {
    schema.datePublished = project.releaseDate;
  }

  if (project.license) {
    schema.license = project.license;
  }

  if (project.repository) {
    schema.codeRepository = project.repository;
  }

  if (isModel && project.parameters) {
    schema.applicationSubCategory = `Language Model (${project.parameters} parameters)`;
  }

  return schema;
}

/**
 * Generates ScholarlyArticle structured data for research papers.
 */
export function generateScholarlyArticleSchema(publication: Publication) {
  const canonicalUrl = buildCanonicalUrl(`/research/publications/${publication.slug}`);

  return {
    '@type': 'ScholarlyArticle',
    '@id': `${canonicalUrl}#article`,
    headline: publication.title,
    description: publication.abstract,
    url: canonicalUrl,
    datePublished: publication.publicationDate || publication.date,
    author: publication.authors.map((author) => {
      if (author === siteConfig.founder.name) {
        return { '@id': `${siteConfig.url}/#founder` };
      }
      return {
        '@type': 'Person',
        name: author,
      };
    }),
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    about: publication.area,
    inLanguage: 'en-US',
  };
}

/**
 * Generates NewsArticle structured data for news items.
 */
export function generateNewsArticleSchema(item: NewsItem) {
  const canonicalUrl = buildCanonicalUrl(`/news/${item.slug}`);

  return {
    '@type': 'NewsArticle',
    '@id': `${canonicalUrl}#article`,
    headline: item.title,
    description: item.excerpt,
    url: canonicalUrl,
    datePublished: item.date,
    author: {
      '@id': `${siteConfig.url}/#founder`,
    },
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    keywords: item.tags,
    inLanguage: 'en-US',
  };
}

export interface PageGraphOptions {
  pagePath?: string;
  path?: string;
  pageTitle?: string;
  title?: string;
  pageDescription?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  entities?: Record<string, unknown>[];
  additionalNodes?: Record<string, unknown>[];
}

/**
 * Generates a unified @graph JSON-LD structure connecting Organization, WebSite, WebPage, and entities.
 */
export function generatePageGraph(options: PageGraphOptions) {
  const finalPath = options.path || options.pagePath || '/';
  const finalTitle = options.title || options.pageTitle || siteConfig.name;
  const finalDesc = options.description || options.pageDescription || siteConfig.description;
  const canonicalUrl = buildCanonicalUrl(finalPath);

  const graph: Record<string, unknown>[] = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: finalTitle,
      description: finalDesc,
      isPartOf: {
        '@id': `${siteConfig.url}/#website`,
      },
      inLanguage: 'en-US',
    },
  ];

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    graph.push(generateBreadcrumbSchema(options.breadcrumbs));
  }

  const nodes = options.entities || options.additionalNodes || [];
  if (nodes.length > 0) {
    graph.push(...nodes);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
