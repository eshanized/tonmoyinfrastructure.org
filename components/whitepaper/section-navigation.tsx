import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { WhitepaperSection } from '@/lib/types';

export function SectionNavigation({
  sections,
  currentIndex,
}: {
  sections: WhitepaperSection[];
  currentIndex: number;
}) {
  const prev = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const next = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
      {prev ? (
        <Link
          href={`#${prev.id}`}
          className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>
            <span className="tiv-meta block">Previous</span>
            <span className="font-medium text-foreground group-hover:text-brand">
              {prev.title}
            </span>
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`#${next.id}`}
          className="group flex items-center gap-3 text-right text-sm text-muted-foreground transition-colors hover:text-brand sm:flex-row-reverse"
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span>
            <span className="tiv-meta block">Next</span>
            <span className="font-medium text-foreground group-hover:text-brand">
              {next.title}
            </span>
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
