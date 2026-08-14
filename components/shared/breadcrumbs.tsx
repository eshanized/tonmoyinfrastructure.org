import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.href ? (
              <Link
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm text-foreground">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
