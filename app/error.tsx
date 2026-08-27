'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden tiv-grid">
      <div className="tiv-container relative text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-2 w-2 rounded-full bg-brand animate-pulse-dot" />
          <span className="tiv-meta-brand">ERROR / 500</span>
        </div>
        <h1 className="mt-6 font-display text-7xl tracking-tight md:text-9xl">
          500
        </h1>
        <p className="mt-6 max-w-md text-pretty text-lg text-muted-foreground">
          A system error occurred. The issue has been logged.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
          >
            Return to TIV
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
