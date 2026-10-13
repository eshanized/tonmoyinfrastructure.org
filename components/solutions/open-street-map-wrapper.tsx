'use client';

import dynamic from 'next/dynamic';

export const OpenStreetMapViewer = dynamic(
  () => import('@/components/solutions/open-street-map-viewer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[550px] w-full items-center justify-center border border-border bg-card font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand animate-ping" />
          Loading OpenStreetMap Live Telemetry Layer...
        </span>
      </div>
    ),
  }
);
