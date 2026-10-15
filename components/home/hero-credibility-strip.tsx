import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroCredibilityStripProps {
  className?: string;
}

const proofPoints = [
  {
    index: '01',
    label: 'SHIPPED SOFTWARE',
    title: '4 Stable Platforms',
    description: 'OpenMail, Mercura, M31A, Octate',
    href: '/products',
  },
  {
    index: '02',
    label: 'SYSTEM DESIGN',
    title: 'Self-Reliant & Sovereign',
    description: 'Local-first, vendor free runtimes',
    href: '/technology',
  },
  {
    index: '03',
    label: 'OPEN RESEARCH',
    title: 'M31 AI Models',
    description: 'Causal models & open-source codebases',
    href: '/research',
  },
  {
    index: '04',
    label: 'GOVERNANCE',
    title: 'Public Accountability',
    description: 'Financial disclosures & asset registers',
    href: '/transparency',
  },
];

export function HeroCredibilityStrip({ className }: HeroCredibilityStripProps) {
  return (
    <div
      className={cn(
        'w-full border-y border-border bg-card/75 dark:bg-card/40 backdrop-blur-xs',
        className
      )}
    >
      <div className="tiv-container">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {proofPoints.map((point) => (
            <Link
              key={point.index}
              href={point.href}
              className="group relative flex flex-col justify-between p-6 transition-colors duration-200 hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
            >
              <div className="flex items-center justify-between">
                <span className="tiv-meta text-[11px] font-medium tracking-wider text-muted-foreground group-hover:text-brand transition-colors">
                  {point.index} / {point.label}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted-foreground/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3">
                <p className="font-display text-base font-semibold tracking-tight text-foreground group-hover:text-brand transition-colors">
                  {point.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
