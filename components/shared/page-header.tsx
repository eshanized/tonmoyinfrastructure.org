import { cn } from '@/lib/utils';

interface PageHeaderProps {
  index?: string;
  label?: string;
  title: string;
  description?: string;
  meta?: { label: string; value: string | undefined }[];
  className?: string;
}

export function PageHeader({
  index,
  label,
  title,
  description,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        'border-b border-border tiv-grid',
        className
      )}
    >
      <div className="tiv-container py-16 md:py-24">
        {index && (
          <div className="mb-6 flex items-center gap-3">
            <span className="tiv-section-marker">{index}</span>
            {label && (
              <>
                <span className="h-px w-8 bg-border" />
                <span className="tiv-meta">{label}</span>
              </>
            )}
          </div>
        )}
        <h1 className="max-w-4xl text-balance font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {description}
          </p>
        )}
        {meta && meta.length > 0 && (
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
            {meta.map((item) => (
              <div key={item.label} className="flex items-baseline gap-2">
                <dt className="tiv-meta">{item.label}</dt>
                <dd className="font-mono text-sm text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
