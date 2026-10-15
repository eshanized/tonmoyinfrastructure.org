import type { TableOfContentsItem } from '@/lib/publications/types';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of Contents"
      className={cn('border border-border bg-card p-5', className)}
    >
      <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
        <span className="tiv-meta">Contents</span>
        <span className="font-mono text-[10px] text-muted-foreground/60 uppercase">
          {items.length} Sections
        </span>
      </div>
      <ol className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              'leading-snug transition-colors',
              item.level === 3 && 'ml-3 border-l border-border/60 pl-2 text-xs',
              item.level === 4 && 'ml-6 border-l border-border/40 pl-2 text-xs'
            )}
          >
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-brand transition-colors block py-0.5 line-clamp-2"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
