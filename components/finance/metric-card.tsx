'use client';

import { cn } from '@/lib/utils';
import { CountUp } from '@/components/shared/count-up';
import type { SupportedCurrency } from '@/lib/portfolio-economics/decimal';

interface MetricCardProps {
  label: string;
  amount?: number;
  currencySymbol: string;
  currency?: SupportedCurrency;
  subtext?: string;
  className?: string;
}

export function MetricCard({
  label,
  amount,
  currencySymbol,
  currency = 'INR',
  subtext,
  className,
}: MetricCardProps) {
  const isSouthAsian = currency === 'INR' || currency === 'BDT' || currencySymbol === '₹' || currencySymbol === '৳';

  let endVal = 0;
  let suffixVal = '';
  let decimalsVal = 1;

  if (amount !== undefined) {
    if (isSouthAsian) {
      endVal = amount / 100000;
      suffixVal = 'L';
      decimalsVal = 1;
    } else {
      if (amount >= 1000000) {
        endVal = amount / 1000000;
        suffixVal = 'M';
        decimalsVal = 2;
      } else if (amount >= 1000) {
        endVal = amount / 1000;
        suffixVal = 'K';
        decimalsVal = 1;
      } else {
        endVal = amount;
        suffixVal = '';
        decimalsVal = 0;
      }
    }
  }

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
            end={endVal}
            duration={1.5}
            prefix={currencySymbol}
            suffix={suffixVal}
            decimals={decimalsVal}
          />
        ) : (
          '—'
        )}
      </p>
      {subtext ? (
        <p className="mt-1 text-[11px] font-mono text-muted-foreground truncate" title={subtext}>
          {subtext}
        </p>
      ) : amount === undefined ? (
        <p className="mt-1 text-xs text-muted-foreground">Not available</p>
      ) : null}
    </div>
  );
}
