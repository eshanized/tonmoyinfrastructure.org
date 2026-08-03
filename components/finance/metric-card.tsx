'use client';

import { cn } from '@/lib/utils';
import { CountUp } from '@/components/shared/count-up';

interface MetricCardProps {
  label: string;
  amount?: number;
  currencySymbol: string;
  className?: string;
}

export function MetricCard({
  label,
  amount,
  currencySymbol,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'group relative border border-border bg-card p-5 transition-colors hover:border-brand/30',
        className
      )}
    >
      <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
      <span className="tiv-meta">{label}</span>
      <p className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
        {amount !== undefined ? (
          <CountUp
            end={amount / 100000}
            duration={1.5}
            prefix={currencySymbol}
            suffix="L"
            decimals={1}
          />
        ) : (
          '—'
        )}
      </p>
      {amount === undefined && (
        <p className="mt-1 text-xs text-muted-foreground">Not available</p>
      )}
    </div>
  );
}
