import Link from 'next/link';
import { ArrowRight, BookOpen, Download, Github } from 'lucide-react';
import { StatusBadge } from '@/components/shared/status-badge';
import type { Publication } from '@/lib/publications/types';
import { getAuthorNames } from '@/lib/publications/citations';

interface FeaturedPublicationProps {
  publication: Publication;
}

export function FeaturedPublication({ publication }: FeaturedPublicationProps) {
  const authorNames = getAuthorNames(publication);

  return (
    <section className="border-b border-border bg-secondary/20">
      <div className="tiv-container py-12 md:py-16">
        <div className="mb-4 flex items-center gap-3">
          <BookOpen className="h-4 w-4 text-brand" aria-hidden="true" />
          <span className="tiv-meta-brand">Featured Research</span>
          <span className="h-px w-8 bg-border" />
          <span className="font-mono text-xs text-muted-foreground">{publication.area}</span>
        </div>

        <div className="relative border border-border bg-card p-8 md:p-12 transition-colors hover:border-brand/40 group">
          <span className="absolute top-0 left-0 h-1 w-0 bg-brand transition-all duration-300 group-hover:w-full" />

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm font-bold text-brand">
                {publication.identifier}
              </span>
              <StatusBadge status={publication.status} />
              {publication.type && (
                <span className="font-mono text-xs text-muted-foreground border border-border px-2.5 py-0.5 bg-secondary/30">
                  {publication.type}
                </span>
              )}
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              v{publication.version} · {publication.publicationDate || publication.date}
            </div>
          </div>

          <div className="mt-6 max-w-4xl">
            <Link href={`/research/publications/${publication.slug}`} className="group/link block">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-tight text-foreground transition-colors group-hover/link:text-brand">
                {publication.title}
              </h2>
            </Link>
            <p className="mt-4 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground">
              {publication.abstract}
            </p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-border/60 pt-6">
            <div>
              <span className="tiv-meta text-[10px] block mb-1">Authors</span>
              <p className="font-mono text-sm text-foreground">
                {authorNames.join(', ')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {publication.pdf && (
                <a
                  href={publication.pdf}
                  className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </a>
              )}
              {publication.repository && (
                <a
                  href={publication.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  <Github className="h-4 w-4" />
                  <span>Repository</span>
                </a>
              )}
              <Link
                href={`/research/publications/${publication.slug}`}
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-5 py-2 font-mono text-xs font-semibold transition-opacity hover:opacity-90"
              >
                <span>Read Full Paper</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
