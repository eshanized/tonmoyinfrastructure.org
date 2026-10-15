import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { PublicationAuthor } from '@/lib/publications/types';
import { cn } from '@/lib/utils';

interface AuthorListProps {
  authors: (string | PublicationAuthor)[];
  layout?: 'inline' | 'detailed';
  className?: string;
}

export function AuthorList({
  authors,
  layout = 'detailed',
  className = '',
}: AuthorListProps) {
  if (!authors || authors.length === 0) {
    return null;
  }

  if (layout === 'inline') {
    return (
      <div className={cn('flex flex-wrap items-center gap-x-2 text-sm', className)}>
        {authors.map((author, i) => {
          const name = typeof author === 'string' ? author : author.name;
          const url = typeof author === 'object' ? author.url : undefined;
          const isLast = i === authors.length - 1;

          return (
            <span key={name} className="inline-flex items-center">
              {url ? (
                url.startsWith('/') ? (
                  <Link href={url} className="text-foreground hover:text-brand transition-colors">
                    {name}
                  </Link>
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-brand transition-colors inline-flex items-center gap-0.5"
                  >
                    <span>{name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )
              ) : (
                <span className="text-foreground">{name}</span>
              )}
              {!isLast && <span className="text-muted-foreground mr-1">,</span>}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <ul className={cn('space-y-3', className)}>
      {authors.map((author) => {
        const name = typeof author === 'string' ? author : author.name;
        const affiliation = typeof author === 'object' ? author.affiliation : undefined;
        const role = typeof author === 'object' ? author.role : undefined;
        const orcid = typeof author === 'object' ? author.orcid : undefined;
        const url = typeof author === 'object' ? author.url : undefined;

        return (
          <li key={name} className="border-l border-border pl-3 text-sm">
            <div className="flex items-center gap-2">
              {url ? (
                url.startsWith('/') ? (
                  <Link href={url} className="font-medium text-foreground hover:text-brand transition-colors">
                    {name}
                  </Link>
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:text-brand transition-colors inline-flex items-center gap-1"
                  >
                    <span>{name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )
              ) : (
                <span className="font-medium text-foreground">{name}</span>
              )}
              {orcid && (
                <a
                  href={orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline border border-emerald-500/30 px-1 py-0.2"
                  title={`ORCID: ${orcid}`}
                >
                  ORCID
                </a>
              )}
            </div>
            {(affiliation || role) && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {role ? `${role}, ` : ''}{affiliation || ''}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
