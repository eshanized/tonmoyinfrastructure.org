import { cn } from '@/lib/utils';

interface MetadataItem {
  label: string;
  value: string | undefined;
}

interface MetadataListProps {
  items: MetadataItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function MetadataList({
  items,
  className,
  columns = 2,
}: MetadataListProps) {
  const filtered = items.filter((item) => item.value !== undefined);
  if (filtered.length === 0) return null;

  const colClass =
    columns === 3
      ? 'sm:grid-cols-3'
      : columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : 'sm:grid-cols-2';

  return (
    <dl className={cn('grid grid-cols-1 gap-x-6 gap-y-4', colClass, className)}>
      {filtered.map((item) => (
        <div key={item.label} className="border-l border-border pl-4">
          <dt className="tiv-meta mb-1">{item.label}</dt>
          <dd className="font-mono text-sm text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
