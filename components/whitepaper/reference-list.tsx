import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { WhitepaperReference } from '@/lib/types';

export function ReferenceList({ references }: { references: WhitepaperReference[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
      {references.map((ref) => (
        <Link
          key={ref.href}
          href={ref.href}
          className="group relative bg-card p-4 transition-colors hover:bg-card/80"
        >
          <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground transition-colors group-hover:text-brand">
              {ref.label}
            </span>
            {ref.type === 'external' ? (
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            ) : (
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
