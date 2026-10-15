import React from 'react';
import Link from 'next/link';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, Lightbulb, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slugifyHeading } from './toc';

/**
 * Extracts plain text from React children nodes.
 */
function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (React.isValidElement(node) && node.props && 'children' in node.props) {
    return getNodeText(node.props.children);
  }
  return '';
}

// ─── 1. Figure Component ─────────────────────────────────────────────

export interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  number?: string | number;
  className?: string;
}

export function Figure({ src, alt, caption, number, className }: FigureProps) {
  return (
    <figure className={cn('my-8 border border-border bg-card p-4 transition-colors', className)}>
      <div className="overflow-hidden bg-secondary/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto max-h-[500px] w-full object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs leading-relaxed text-muted-foreground">
          {number && <span className="font-semibold text-brand">Figure {number}: </span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── 2. Callout Component ────────────────────────────────────────────

export interface CalloutProps {
  type?: 'note' | 'info' | 'warning' | 'tip' | 'caution';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ type = 'note', title, children, className }: CalloutProps) {
  const configs = {
    note: {
      border: 'border-border',
      bg: 'bg-card',
      icon: Info,
      iconColor: 'text-muted-foreground',
      defaultTitle: 'Note',
    },
    info: {
      border: 'border-blue-500/40',
      bg: 'bg-blue-500/5',
      icon: Info,
      iconColor: 'text-blue-500',
      defaultTitle: 'Information',
    },
    tip: {
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/5',
      icon: Lightbulb,
      iconColor: 'text-emerald-500',
      defaultTitle: 'Tip',
    },
    warning: {
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/5',
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
      defaultTitle: 'Warning',
    },
    caution: {
      border: 'border-brand/40',
      bg: 'bg-brand/5',
      icon: AlertCircle,
      iconColor: 'text-brand',
      defaultTitle: 'Caution',
    },
  };

  const cfg = configs[type] || configs.note;
  const Icon = cfg.icon;
  const displayTitle = title || cfg.defaultTitle;

  return (
    <div
      role="region"
      aria-label={displayTitle}
      className={cn('my-6 border p-4 sm:p-5', cfg.border, cfg.bg, className)}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', cfg.iconColor)} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          {displayTitle && (
            <h4 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold mb-1.5">
              {displayTitle}
            </h4>
          )}
          <div className="text-sm leading-relaxed text-muted-foreground [&>p]:leading-relaxed [&>p:not(:last-child)]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. CodeBlock Component ──────────────────────────────────────────

export interface CodeBlockProps {
  language?: string;
  filename?: string;
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ language, filename, children, className }: CodeBlockProps) {
  return (
    <div className={cn('my-6 border border-border bg-card overflow-hidden', className)}>
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2 font-mono text-xs text-muted-foreground">
          <span>{filename || ''}</span>
          {language && <span className="uppercase text-[10px] text-brand">{language}</span>}
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground">
        <code>{children}</code>
      </pre>
    </div>
  );
}

// ─── 4. ResearchTable Component ──────────────────────────────────────

export interface ResearchTableProps {
  caption?: string;
  number?: string | number;
  headers?: string[];
  rows?: (string | number | React.ReactNode)[][];
  children?: React.ReactNode;
  className?: string;
}

export function ResearchTable({
  caption,
  number,
  headers,
  rows,
  children,
  className,
}: ResearchTableProps) {
  return (
    <div className={cn('my-8 overflow-hidden border border-border bg-card', className)}>
      {caption && (
        <div className="border-b border-border bg-secondary/30 px-4 py-2.5 font-mono text-xs text-muted-foreground">
          {number && <span className="font-semibold text-brand">Table {number}: </span>}
          {caption}
        </div>
      )}
      <div className="overflow-x-auto">
        {children ? (
          <div className="p-4 [&>table]:w-full [&>table]:border-collapse [&>table]:text-sm">
            {children}
          </div>
        ) : (
          <table className="w-full border-collapse text-left text-sm">
            {headers && headers.length > 0 && (
              <thead className="border-b border-border bg-secondary/20">
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            {rows && rows.length > 0 && (
              <tbody className="divide-y divide-border/50">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-secondary/20 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-muted-foreground font-mono text-xs">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
    </div>
  );
}

// ─── 5. Reference Component ──────────────────────────────────────────

export interface ReferenceProps {
  id: string;
  title: string;
  authors?: string[] | string;
  year?: string | number;
  venue?: string;
  doi?: string;
  url?: string;
  className?: string;
}

export function Reference({
  id,
  title,
  authors,
  year,
  venue,
  doi,
  url,
  className,
}: ReferenceProps) {
  const authorStr = Array.isArray(authors) ? authors.join(', ') : authors;
  const targetUrl = doi ? (doi.startsWith('http') ? doi : `https://doi.org/${doi}`) : url;

  return (
    <div
      id={`ref-${id}`}
      className={cn(
        'group my-3 border-l-2 border-border pl-4 py-1 text-sm transition-colors hover:border-brand',
        className
      )}
    >
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-xs text-brand font-semibold shrink-0">[{id}]</span>
        <div className="min-w-0">
          <p className="leading-relaxed text-foreground">
            {authorStr && <span className="text-muted-foreground">{authorStr} </span>}
            {year && <span className="text-muted-foreground">({year}). </span>}
            <span className="font-medium">{title}. </span>
            {venue && <em className="text-muted-foreground">{venue}. </em>}
            {targetUrl && (
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-brand hover:underline font-mono text-xs ml-1"
              >
                <span>{doi ? `doi:${doi.replace(/^https?:\/\/doi\.org\//, '')}` : 'Link'}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Heading Components with Stable Anchors ──────────────────────────

function createHeading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as const;
  const classes = {
    2: 'mt-12 mb-4 border-t border-border pt-8 font-display text-2xl tracking-tight text-foreground scroll-mt-24',
    3: 'mt-8 mb-3 font-display text-xl tracking-tight text-foreground scroll-mt-24',
    4: 'mt-6 mb-2 font-display text-lg font-medium text-foreground scroll-mt-24',
  };

  const HeadingComponent = ({
    children,
    id: explicitId,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getNodeText(children);
    const id = explicitId || slugifyHeading(text);

    return (
      <Tag id={id} className={cn('group relative flex items-baseline', classes[level])} {...props}>
        <span className="flex-1">{children}</span>
        {id && (
          <a
            href={`#${id}`}
            aria-label={`Link to section "${text}"`}
            className="ml-2 font-mono text-sm text-muted-foreground opacity-0 transition-opacity hover:text-brand group-hover:opacity-100"
          >
            #
          </a>
        )}
      </Tag>
    );
  };
  HeadingComponent.displayName = `PublicationHeading${level}`;
  return HeadingComponent;
}

// ─── Approved MDX Components Map ─────────────────────────────────────

export const publicationMDXComponents = {
  // Custom Domain Components
  Figure,
  Callout,
  CodeBlock,
  ResearchTable,
  Reference,

  // HTML overrides
  h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-8 mb-6 font-display text-3xl md:text-4xl tracking-tight text-foreground">
      {children}
    </h1>
  ),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  p: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-relaxed text-pretty text-muted-foreground my-4 text-base md:text-[17px]', className)}
      {...props}
    >
      {children}
    </p>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-foreground" {...props}>
      {children}
    </em>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
    if (isInternal) {
      return (
        <Link
          href={href || '#'}
          className="text-brand underline-offset-4 hover:underline transition-colors font-medium"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand underline-offset-4 hover:underline transition-colors font-medium inline-flex items-center gap-0.5"
        {...props}
      >
        <span>{children}</span>
        {href?.startsWith('http') && <ExternalLink className="inline h-3 w-3 ml-0.5" />}
      </a>
    );
  },
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 space-y-2 pl-6 list-none" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 list-decimal pl-6 space-y-2 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed text-muted-foreground" {...props}>
      <span className="text-foreground">{children}</span>
    </li>
  ),
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-2 border-brand bg-brand/5 p-4 text-muted-foreground italic [&>p]:my-1"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <pre className="overflow-x-auto border border-border bg-secondary/50 p-4 font-mono text-sm leading-relaxed my-4">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    }
    return (
      <code
        className="border border-border bg-secondary/60 px-1.5 py-0.5 font-mono text-xs text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => <>{children}</>,
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto border border-border bg-card">
      <table className="w-full border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-border bg-secondary/30" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-border/40 px-4 py-3 text-muted-foreground text-sm" {...props}>
      {children}
    </td>
  ),
  hr: () => <hr className="my-8 border-border" />,
};
