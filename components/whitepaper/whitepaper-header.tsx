import type { Whitepaper } from '@/lib/types';

export function WhitepaperHeader({ wp }: { wp: Whitepaper }) {
  return (
    <div className="border border-border bg-card p-6 md:p-8">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div>
          <span className="tiv-meta block">Document</span>
          <p className="mt-1 font-display text-sm font-medium">
            {wp.title}
          </p>
        </div>
        <div>
          <span className="tiv-meta block">Version</span>
          <p className="mt-1 font-mono text-sm">{wp.version}</p>
        </div>
        <div>
          <span className="tiv-meta block">Status</span>
          <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-green-600 dark:text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {wp.status}
          </p>
        </div>
        <div>
          <span className="tiv-meta block">Published</span>
          <p className="mt-1 font-mono text-sm">{wp.publishedAt}</p>
        </div>
        <div>
          <span className="tiv-meta block">Classification</span>
          <p className="mt-1 font-mono text-sm">{wp.classification}</p>
        </div>
        <div>
          <span className="tiv-meta block">Authors</span>
          <p className="mt-1 text-sm">{wp.authors.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
