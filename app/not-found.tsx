import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden tiv-grid">
      <div className="tiv-container relative text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-2 w-2 rounded-full bg-brand animate-pulse-dot" />
          <span className="tiv-meta-brand">ERROR / 404</span>
        </div>
        <h1 className="mt-6 font-display text-7xl tracking-tight md:text-9xl">
          404
        </h1>
        <p className="mt-6 max-w-md text-pretty text-lg text-muted-foreground">
          Endpoint not found. The requested resource does not exist in the current TIV network.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            Return to TIV
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/search"
            className="group inline-flex items-center gap-2 border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
          >
            <Search className="h-4 w-4" />
            Search the site
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/work" className="transition-colors hover:text-brand">Work</Link>
          <Link href="/about" className="transition-colors hover:text-brand">About</Link>
          <Link href="/research" className="transition-colors hover:text-brand">Research</Link>
          <Link href="/transparency" className="transition-colors hover:text-brand">Transparency</Link>
          <Link href="/trust" className="transition-colors hover:text-brand">Trust</Link>
          <Link href="/contact" className="transition-colors hover:text-brand">Contact</Link>
        </div>
      </div>
    </section>
  );
}
