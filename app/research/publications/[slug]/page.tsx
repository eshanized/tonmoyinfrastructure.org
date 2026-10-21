import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Github, Database, FileText, ExternalLink, Calendar, ShieldCheck, Tag } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { StatusBadge } from '@/components/shared/status-badge';
import { MetadataList } from '@/components/shared/metadata-list';
import { JsonLd } from '@/components/shared/json-ld';
import { TableOfContents } from '@/components/publications/table-of-contents';
import { StatusBanner } from '@/components/publications/status-banner';
import { CitationBlock } from '@/components/publications/citation-block';
import { AuthorList } from '@/components/publications/author-list';
import { MDXRenderer } from '@/components/publications/mdx-renderer';
import { Reference } from '@/lib/publications/components';
import {
  getPublicationBySlug,
  getPublicationSlugs,
  getAllPublications,
} from '@/lib/publications/pipeline';
import { generatePublicationMetadata } from '@/lib/seo';
import { generatePageGraph, generateScholarlyArticleSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getPublicationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) return {};
  return generatePublicationMetadata(pub);
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) notFound();

  const allPubs = getAllPublications();
  const relatedPubs = allPubs
    .filter((p) => p.slug !== pub.slug && (p.area === pub.area || p.project === pub.project))
    .slice(0, 2);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Publications', path: '/research/publications' },
    { name: pub.identifier, path: `/research/publications/${pub.slug}` },
  ];

  const pageGraph = generatePageGraph({
    pagePath: `/research/publications/${pub.slug}`,
    pageTitle: `${pub.title} — TIV Research`,
    pageDescription: pub.abstract,
    breadcrumbs,
    entities: [generateScholarlyArticleSchema(pub)],
  });

  const metadataItems = [
    { label: 'Identifier', value: pub.identifier },
    { label: 'Status', value: pub.status },
    { label: 'Area', value: pub.area },
    { label: 'Type', value: pub.type || 'Research Paper' },
    { label: 'Version', value: `v${pub.version}` },
    { label: 'Date', value: pub.publicationDate || pub.date },
    ...(pub.updatedAt ? [{ label: 'Updated', value: pub.updatedAt }] : []),
    ...(pub.license ? [{ label: 'License', value: pub.license }] : []),
    ...(pub.doi ? [{ label: 'DOI', value: pub.doi }] : []),
    ...(pub.project ? [{ label: 'Project', value: pub.project.toUpperCase() }] : []),
  ];

  return (
    <>
      <JsonLd data={pageGraph} />

      {/* Top Academic Paper Header */}
      <header className="border-b border-border bg-card">
        <div className="tiv-container py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Research', href: '/research' },
              { label: 'Publications', href: '/research/publications' },
              { label: pub.identifier },
            ]}
          />

          {/* Academic Identifier & Status Ribbon */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-bold text-brand tracking-wider">
              {pub.identifier}
            </span>
            <StatusBadge status={pub.status} />
            <span className="font-mono text-xs text-muted-foreground border border-border px-2.5 py-0.5 bg-secondary/30">
              {pub.area}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              v{pub.version} · {pub.publicationDate || pub.date}
            </span>
          </div>

          {/* Paper Title */}
          <h1 className="mt-6 max-w-4xl font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-foreground">
            {pub.title}
          </h1>

          {/* Authors List */}
          <div className="mt-6 pt-6 border-t border-border/60">
            <span className="tiv-meta text-[10px] block mb-2">Authors & Affiliations</span>
            <AuthorList authors={pub.authors} layout="inline" />
          </div>

          {/* Actions & Links Toolbar */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-border/60">
            {pub.pdf && (
              <a
                href={pub.pdf}
                className="inline-flex items-center gap-2 border border-border bg-secondary/40 px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-brand hover:text-brand"
                download
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
            )}
            {pub.repository && (
              <a
                href={pub.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-secondary/40 px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <Github className="h-4 w-4" />
                <span>Repository</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            )}
            {pub.dataset && (
              <a
                href={pub.dataset}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-secondary/40 px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <Database className="h-4 w-4" />
                <span>Dataset</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            )}
            {pub.project && (
              <Link
                href={`/projects/${pub.project}`}
                className="inline-flex items-center gap-2 border border-border bg-secondary/40 px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <FileText className="h-4 w-4" />
                <span>Related Project: {pub.project.toUpperCase()}</span>
              </Link>
            )}
            {pub.readingTime && (
              <span className="ml-auto font-mono text-xs text-muted-foreground hidden sm:inline-block">
                ~{pub.readingTime} min read
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Body Section */}
      <main className="py-12 md:py-16">
        <div className="tiv-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px]">
            {/* Reading Column */}
            <div className="min-w-0">
              {/* Draft / Experimental / Superseded Notice */}
              <StatusBanner
                status={pub.status}
                version={pub.version}
                supersededBy={pub.supersededBy}
                className="mb-8"
              />

              {/* Accessible Abstract Block */}
              <section
                aria-label="Abstract"
                className="mb-10 border-l-2 border-brand bg-card p-6 md:p-8 border-y border-r border-border"
              >
                <span className="tiv-meta-brand text-xs block mb-2 font-bold tracking-widest">
                  Abstract
                </span>
                <p className="text-pretty text-base md:text-lg leading-relaxed text-foreground/90 font-serif italic">
                  {pub.abstract}
                </p>
                {pub.keywords && pub.keywords.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center gap-2">
                    <span className="tiv-meta text-[10px]">Keywords:</span>
                    {pub.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="font-mono text-xs text-muted-foreground bg-secondary/50 border border-border px-2 py-0.5"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </section>

              {/* Server-Rendered MDX Body */}
              <MDXRenderer content={pub.content} />

              {/* Supplementary Files Section */}
              {pub.supplementaryFiles && pub.supplementaryFiles.length > 0 && (
                <section className="mt-12 border-t border-border pt-8" aria-label="Supplementary Materials">
                  <h3 className="font-display text-xl tracking-tight text-foreground mb-4">
                    Supplementary Materials
                  </h3>
                  <div className="space-y-3">
                    {pub.supplementaryFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border border-border bg-card p-4 text-sm"
                      >
                        <div>
                          <p className="font-medium text-foreground">{file.title}</p>
                          {file.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{file.description}</p>
                          )}
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-border px-3 py-1 font-mono text-xs text-brand hover:underline"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>{file.format || 'Download'}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* References Section if defined in frontmatter */}
              {pub.references && pub.references.length > 0 && (
                <section className="mt-16 border-t border-border pt-8" aria-label="References">
                  <h3 className="font-display text-2xl tracking-tight text-foreground mb-6">
                    References
                  </h3>
                  <div className="space-y-2">
                    {pub.references.map((ref, idx) => {
                      if (typeof ref === 'string') {
                        return (
                          <div key={idx} className="my-2 border-l-2 border-border pl-4 py-1 text-sm text-muted-foreground">
                            <span className="font-mono text-xs text-brand font-semibold mr-2">[{idx + 1}]</span>
                            <span>{ref}</span>
                          </div>
                        );
                      }
                      return (
                        <Reference
                          key={ref.id || idx}
                          id={ref.id || String(idx + 1)}
                          title={ref.title}
                          authors={ref.authors}
                          year={ref.year}
                          venue={ref.venue}
                          doi={ref.doi}
                          url={ref.url}
                        />
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Bottom Nav / Return to Publications */}
              <div className="mt-16 border-t border-border pt-8 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/research/publications/"
                  className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-brand"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to All Publications</span>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Share:</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `${pub.title} — TIV Research`
                    )}&url=${encodeURIComponent(
                      `https://tonmoyinfrastructure.org/research/publications/${pub.slug}/`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground hover:border-brand hover:text-brand"
                  >
                    X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      `https://tonmoyinfrastructure.org/research/publications/${pub.slug}/`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground hover:border-brand hover:text-brand"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Table of Contents */}
              {pub.toc && pub.toc.length > 0 && <TableOfContents items={pub.toc} />}

              {/* Publication Metadata Card */}
              <div className="border border-border bg-card p-5">
                <span className="tiv-meta mb-4 block">Bibliographic Details</span>
                <MetadataList columns={2} items={metadataItems} />

                {pub.tags && pub.tags.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="tiv-meta text-[10px] block mb-2">Subject Tags</span>
                    <div className="flex flex-wrap gap-1.5">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] text-muted-foreground bg-secondary/40 border border-border px-2 py-0.5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Author Profiles Card */}
              <div className="border border-border bg-card p-5">
                <span className="tiv-meta mb-3 block">Authors & Affiliations</span>
                <AuthorList authors={pub.authors} layout="detailed" />
              </div>

              {/* Interactive Citation Box */}
              <CitationBlock publication={pub} />

              {/* Related Research Cards */}
              {relatedPubs.length > 0 && (
                <div className="border border-border bg-card p-5">
                  <span className="tiv-meta mb-3 block">Related Publications</span>
                  <div className="space-y-3">
                    {relatedPubs.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/research/publications/${rp.slug}`}
                        className="group block border-l border-border pl-3 hover:border-brand transition-colors"
                      >
                        <span className="font-mono text-[10px] text-brand block">
                          {rp.identifier}
                        </span>
                        <h4 className="font-display text-sm text-foreground group-hover:text-brand transition-colors leading-snug">
                          {rp.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
