'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface TOCItem {
  id: string;
  number: string;
  title: string;
}

export function WhitepaperTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* Desktop sticky TOC */}
      <nav
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
        aria-label="Table of contents"
      >
        <span className="tiv-meta mb-4 block">Contents</span>
        <ul className="space-y-1 border-l border-border">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'group flex items-baseline gap-3 py-1.5 pl-4 -ml-px border-l-2 transition-colors',
                  activeId === item.id
                    ? 'border-brand text-brand'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="font-mono text-xs text-muted-foreground/60">
                  {item.number}
                </span>
                <span className="text-sm">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile collapsible TOC */}
      <nav className="lg:hidden" aria-label="Table of contents">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-between border border-border bg-card px-4 py-3"
          aria-expanded={mobileOpen}
        >
          <span className="tiv-meta">Contents — {items.length} sections</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted-foreground transition-transform',
              mobileOpen && 'rotate-180'
            )}
          />
        </button>
        {mobileOpen && (
          <ul className="mt-px border border-border bg-card p-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-baseline gap-3 px-3 py-2 text-sm transition-colors',
                    activeId === item.id
                      ? 'text-brand'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {item.number}
                  </span>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
}
