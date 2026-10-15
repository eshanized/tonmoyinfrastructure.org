import Link from 'next/link';
import { ArrowRight, Download, Github, Database } from 'lucide-react';
import { StatusBadge } from '@/components/shared/status-badge';
import type { Publication } from '@/lib/publications/types';
import { getAuthorNames } from '@/lib/publications/citations';
import { cn } from '@/lib/utils';

interface PublicationCardProps {
  publication: Publication;
  className?: string;
}

export function PublicationCard({ publication, className }: PublicationCardProps) {
  const authorNames = getAuthorNames(publication);

  return (
    <article
      className={cn(
        'group relative border border-border bg-card p-6 md:p-8 transition-colors hover:border-brand/40',
        className
      )}
    >
      {/* Brand accent indicator on hover */}
      <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />

      {/* Header metadata row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs font-semibold text-brand tracking-wider">
            {publication.identifier}
          </span>
          <StatusBadge status={publication.status} />
          {publication.type && (
            <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5 bg-secondary/30">
              {publication.type}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>v{publication.version}</span>
          <span>·</span>
          <time dateTime={publication.publicationDate || publication.date}>
            {publication.publicationDate || publication.date}
          </time>
        </div>
      </div>

      {/* Main title and abstract */}
      <div className="mt-4">
        <Link href={`/research/publications/${publication.slug}`} className="group/title block">
          <h3 className="font-display text-xl md:text-2xl tracking-tight text-foreground transition-colors group-hover/title:text-brand">
            {publication.title}
          </h3>
        </Link>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {publication.abstract}
        </p>
      </div>

      {/* Authors and tags */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-4">
        <div className="min-w-0">
          <span className="tiv-meta text-[10px] block mb-1">Authors</span>
          <p className="font-mono text-xs text-foreground truncate max-w-md">
            {authorNames.join(', ')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {publication.pdf && (
            <a
              href={publication.pdf}
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              aria-label={`Download PDF for ${publication.title}`}
            >
              <Download className="h-3.5 w-3.5" />
              <span>PDF</span>
            </a>
          )}
          {publication.repository && (
            <a
              href={publication.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              aria-label="Repository"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Repo</span>
            </a>
          )}
          {publication.dataset && (
            <a
              href={publication.dataset}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              aria-label="Dataset"
            >
              <Database className="h-3.5 w-3.5" />
              <span>Data</span>
            </a>
          )}
          <Link
            href={`/research/publications/${publication.slug}`}
            className="inline-flex items-center gap-1.5 bg-foreground text-background dark:bg-card dark:text-foreground dark:border dark:border-border px-4 py-1.5 font-mono text-xs font-medium transition-colors hover:bg-brand hover:text-brand-foreground"
          >
            <span>Read Paper</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
