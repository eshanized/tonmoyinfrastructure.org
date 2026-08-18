import { cn } from '@/lib/utils';
import type { ProjectStatus, PublicationStatus } from '@/lib/types';

const statusDotColor: Record<string, string> = {
  'Stable Release': 'bg-emerald-500',
  Maintenance: 'bg-blue-500',
  Legacy: 'bg-zinc-500',
  Production: 'bg-green-500',
  Beta: 'bg-blue-500',
  Alpha: 'bg-cyan-500',
  Development: 'bg-amber-500',
  Research: 'bg-purple-500',
  Experimental: 'bg-orange-500',
  Planning: 'bg-slate-500',
  Paused: 'bg-zinc-500',
  Archived: 'bg-zinc-500',
  Draft: 'bg-slate-500',
  Published: 'bg-green-500',
  Superseded: 'bg-orange-500',
};

const statusTextColor: Record<string, string> = {
  'Stable Release': 'text-emerald-600 dark:text-emerald-400',
  Maintenance: 'text-blue-600 dark:text-blue-400',
  Legacy: 'text-zinc-600 dark:text-zinc-400',
  Production: 'text-green-600 dark:text-green-400',
  Beta: 'text-blue-600 dark:text-blue-400',
  Alpha: 'text-cyan-600 dark:text-cyan-400',
  Development: 'text-amber-600 dark:text-amber-400',
  Research: 'text-purple-600 dark:text-purple-400',
  Experimental: 'text-orange-600 dark:text-orange-400',
  Planning: 'text-slate-600 dark:text-slate-400',
  Paused: 'text-zinc-600 dark:text-zinc-400',
  Archived: 'text-zinc-500 dark:text-zinc-500',
  Draft: 'text-slate-600 dark:text-slate-400',
  Published: 'text-green-600 dark:text-green-400',
  Superseded: 'text-orange-600 dark:text-orange-400',
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus | PublicationStatus | string;
  className?: string;
}) {
  const dot = statusDotColor[status] || statusDotColor['Planning'];
  const text = statusTextColor[status] || statusTextColor['Planning'];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider',
        text,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dot)} />
      {status}
    </span>
  );
}
