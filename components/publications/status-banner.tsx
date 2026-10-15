import Link from 'next/link';
import { AlertTriangle, Info, History, ArrowRight } from 'lucide-react';
import type { PublicationStatus } from '@/lib/publications/types';

interface StatusBannerProps {
  status: PublicationStatus;
  version?: string;
  supersededBy?: string;
  className?: string;
}

export function StatusBanner({
  status,
  version,
  supersededBy,
  className = '',
}: StatusBannerProps) {
  if (status === 'Published') {
    return null;
  }

  if (status === 'Draft') {
    return (
      <aside
        role="status"
        aria-label="Publication draft notice"
        className={`border border-amber-500/40 bg-amber-500/5 p-5 ${className}`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <div className="min-w-0">
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold">
              Draft Document {version ? `(v${version})` : ''}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              This publication is an early-stage research draft. Hypotheses, system architecture,
              and methodology remain subject to revision. No peer-reviewed experimental results or
              verified operational guarantees are claimed in this draft.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  if (status === 'Experimental') {
    return (
      <aside
        role="status"
        aria-label="Publication experimental notice"
        className={`border border-blue-500/40 bg-blue-500/5 p-5 ${className}`}
      >
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" aria-hidden="true" />
          <div className="min-w-0">
            <h4 className="font-mono text-xs uppercase tracking-wider text-blue-500 font-semibold">
              Experimental Investigation {version ? `(v${version})` : ''}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              This publication documents preliminary experimental research and exploratory
              prototyping. Results reflect initial benchmarks and may differ significantly in
              subsequent production implementations.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  if (status === 'Superseded') {
    return (
      <aside
        role="status"
        aria-label="Publication superseded notice"
        className={`border border-brand/40 bg-brand/5 p-5 ${className}`}
      >
        <div className="flex items-start gap-3">
          <History className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h4 className="font-mono text-xs uppercase tracking-wider text-brand font-semibold">
              Superseded Publication {version ? `(v${version})` : ''}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              This document has been superseded by a newer publication version. Readers are
              encouraged to consult the updated manuscript for current findings and architectural
              specifications.
            </p>
            {supersededBy && (
              <div className="mt-3">
                <Link
                  href={supersededBy.startsWith('/') ? supersededBy : `/research/publications/${supersededBy}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                >
                  <span>Read the latest version</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  }

  if (status === 'Archived') {
    return (
      <aside
        role="status"
        aria-label="Publication archived notice"
        className={`border border-border bg-secondary/30 p-5 ${className}`}
      >
        <div className="flex items-start gap-3">
          <History className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="min-w-0">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Archived Publication
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              This publication is preserved for historical and academic continuity. The underlying
              research has concluded and is no longer actively maintained.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return null;
}
