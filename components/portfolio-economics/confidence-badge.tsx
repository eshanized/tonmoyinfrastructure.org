import { cn } from '@/lib/utils';
import type { DataConfidence } from '@/lib/portfolio-economics/types';

const confidenceStyles: Record<
  DataConfidence,
  { bg: string; text: string; border: string; dot: string }
> = {
  Verified: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
  Calculated: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
    dot: 'bg-blue-500',
  },
  Allocated: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
    dot: 'bg-purple-500',
  },
  Estimated: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-500',
  },
  Unverified: {
    bg: 'bg-zinc-500/10',
    text: 'text-zinc-600 dark:text-zinc-400',
    border: 'border-zinc-500/30',
    dot: 'bg-zinc-500',
  },
};

export function ConfidenceBadge({
  confidence,
  className,
}: {
  confidence: DataConfidence;
  className?: string;
}) {
  const style = confidenceStyles[confidence] || confidenceStyles.Unverified;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider',
        style.bg,
        style.text,
        style.border,
        className
      )}
      title={`Data Confidence: ${confidence}`}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
      {confidence}
    </span>
  );
}
