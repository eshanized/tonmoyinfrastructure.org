import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  index?: string;
  label?: string;
  title: string;
  description?: string;
  link?: { label: string; href: string };
  className?: string;
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  link,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className="max-w-2xl">
        {index && (
          <div className="mb-3 flex items-center gap-3">
            <span className="tiv-section-marker">{index}</span>
            {label && (
              <>
                <span className="h-px w-8 bg-border" />
                <span className="tiv-meta">{label}</span>
              </>
            )}
          </div>
        )}
        <h2 className="text-balance font-display text-3xl leading-tight tracking-tight md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
