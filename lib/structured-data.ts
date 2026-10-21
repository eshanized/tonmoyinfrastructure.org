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
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Company name on registration application',
        value: siteConfig.applicationName,
      },
      {
        '@type': 'PropertyValue',
        name: 'Registration application reference',
        value: siteConfig.registration.applicationReference,
      },
      {
        '@type': 'PropertyValue',
        name: 'Registration service',
        value: siteConfig.registration.service,
      },
      {
        '@type': 'PropertyValue',
        name: 'Registration status disclosure',
        value: siteConfig.registration.statusNote,
      },
      {
        '@type': 'PropertyValue',
        name: 'Country of tax residence',
        value: siteConfig.registration.taxResidence,
      },
    ],
    telephone: siteConfig.address.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.address.latitude,
      longitude: siteConfig.address.longitude,
    },
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

  const schema: Record<string, unknown> = {
    '@type': 'ScholarlyArticle',
    '@id': `${canonicalUrl}#article`,
    headline: publication.title,
    description: publication.abstract,
    url: publication.canonicalUrl || canonicalUrl,
    datePublished: publication.publicationDate || publication.date,
    author: publication.authors.map((author) => {
      const name = typeof author === 'string' ? author : author.name;
      const affiliation = typeof author === 'object' && author.affiliation ? author.affiliation : undefined;
      const orcid = typeof author === 'object' && author.orcid ? author.orcid : undefined;

      if (name === siteConfig.founder.name) {
        return { '@id': `${siteConfig.url}/#founder` };
      }
      if (name === siteConfig.name || name === 'Tonmoy Infrastructure and Vision') {
        return { '@id': `${siteConfig.url}/#organization` };
      }
      return {
        '@type': 'Person',
        name,
        ...(affiliation && {
          affiliation: {
            '@type': 'Organization',
            name: affiliation,
          },
        }),
        ...(orcid && { sameAs: [orcid] }),
      };
    }),
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    about: publication.area,
    inLanguage: publication.inLanguage || 'en-US',
  };

  if (publication.updatedAt) {
    schema.dateModified = publication.updatedAt;
  }
  if (publication.version) {
    schema.version = `v${publication.version}`;
  }
  if (publication.identifier) {
    schema.identifier = publication.identifier;
  }
  if (publication.license) {
    schema.license = publication.license;
  }
  if (publication.keywords && publication.keywords.length > 0) {
    schema.keywords = publication.keywords;
  } else if (publication.tags && publication.tags.length > 0) {
    schema.keywords = publication.tags;
  }
  if (publication.doi) {
    schema.sameAs = publication.doi.startsWith('http') ? publication.doi : `https://doi.org/${publication.doi}`;
  }
  if (publication.pdf) {
    const pdfUrl = publication.pdf.startsWith('http') ? publication.pdf : buildCanonicalUrl(publication.pdf);
    schema.encoding = {
      '@type': 'MediaObject',
      contentUrl: pdfUrl,
      encodingFormat: 'application/pdf',
    };
  }
  if (publication.journal) {
    schema.isPartOf = {
      '@type': 'Periodical',
      name: publication.journal,
      ...(publication.volume && { volumeNumber: String(publication.volume) }),
      ...(publication.issue && { issueNumber: String(publication.issue) }),
    };
  } else if (publication.conference) {
    schema.isPartOf = {
      '@type': 'Event',
      name: publication.conference,
    };
  }

  return schema;
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

/**
 * Generates FAQPage structured data answering verified institutional inquiries.
 */
export function generateCompanyFaqSchema() {
  return {
    '@type': 'FAQPage',
    '@id': `${siteConfig.url}/about/company/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does Tonmoy Infrastructure and Vision exist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Tonmoy Infrastructure and Vision (TIV) is the technology organization behind this official website and its publicly linked software projects, release records, and research materials.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does Reg-2026-346380 mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is the application reference shown on the supplied Foreign Company Registration record. The record provided does not show approval status or a final registration certificate or number, so TIV identifies it as an application reference only.',
        },
      },
    ],
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
