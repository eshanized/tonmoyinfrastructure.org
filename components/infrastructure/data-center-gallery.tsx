'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Info,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Wrench,
  Server,
  Activity,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { InfrastructureGalleryItem } from '@/lib/types';

interface DataCenterGalleryProps {
  items?: InfrastructureGalleryItem[];
}

const itemIcons: Record<string, React.ElementType> = {
  exterior: Layers,
  'server-room': Server,
  'firewall-monitoring': Activity,
  'technician-maintenance': Wrench,
};

export function DataCenterGallery({ items = [] }: DataCenterGalleryProps) {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);

  const selectedItem = selectedIdx !== null && items[selectedIdx] ? items[selectedIdx] : null;

  const handlePrev = React.useCallback(() => {
    if (selectedIdx === null || items.length === 0) return;
    setSelectedIdx((prev) => (prev === 0 ? items.length - 1 : (prev ?? 0) - 1));
  }, [selectedIdx, items.length]);

  const handleNext = React.useCallback(() => {
    if (selectedIdx === null || items.length === 0) return;
    setSelectedIdx((prev) => (prev === items.length - 1 ? 0 : (prev ?? 0) + 1));
  }, [selectedIdx, items.length]);

  React.useEffect(() => {
    if (selectedIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIdx, handlePrev, handleNext]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div id="gallery" className="space-y-8 scroll-mt-24">
      {/* Mandatory Visual Disclosure Banner */}
      <aside
        aria-label="Visual disclosure"
        className="border border-brand/40 bg-card p-5 md:p-6"
      >
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center border border-brand/50 bg-brand/10 text-brand">
            <Info className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tiv-meta-brand text-xs">MANDATORY VISUAL DISCLOSURE</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90 font-sans">
              Visual representations are AI-generated visualizations and do not constitute documentary photographs of the physical facility. Dashboard values shown are simulated samples and are not live operational measurements.
            </p>
          </div>
        </div>
      </aside>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {items.map((item, idx) => {
          const Icon = itemIcons[item.id] || Server;
          const isFirewall = item.id === 'firewall-monitoring';
          const isMaintenance = item.id === 'technician-maintenance';

          return (
            <article
              key={item.id}
              className="group flex flex-col border border-border bg-card transition-colors hover:border-brand/40"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-black">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1670}
                  height={942}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Overlaid Badges */}
                <div className="absolute left-3 top-3 flex items-center">
                  <span className="border border-border/80 bg-black/80 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                {/* Zoom / Lightbox Trigger */}
                <button
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center border border-border bg-black/80 text-foreground opacity-90 transition-all hover:border-brand hover:bg-brand hover:text-white group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label={`View ${item.title} full resolution visualization`}
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">{item.category}</span>
                </div>

                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-brand transition-colors">
                  {item.title}
                </h3>

                <blockquote className="my-3 border-l-2 border-brand/60 pl-3 text-xs italic text-muted-foreground">
                  {item.caption}
                </blockquote>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.technicalDetails && item.technicalDetails.length > 0 && (
                  <div className="mt-4 border-t border-border/60 pt-4">
                    <span className="tiv-meta mb-2 block">Technical Principles</span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {item.technicalDetails.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 bg-brand" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Context-Specific Warning Note */}
                {isFirewall && (
                  <div className="mt-4 border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-200/90 flex items-start gap-2">
                    <ShieldAlert className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Notice: Metrics and dashboard values shown are simulated samples and do not represent live operational measurements.
                    </span>
                  </div>
                )}

                {isMaintenance && (
                  <div className="mt-4 border border-border bg-secondary/40 p-3 text-xs text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>
                      Notice: The technician depicted is a generated visualization demonstrating maintenance protocols and is not an actual TIV employee.
                    </span>
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                  >
                    <span>Inspect Visualization</span>
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Accessible Lightbox Modal */}
      <Dialog
        open={selectedItem !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIdx(null);
        }}
      >
        <DialogContent className="max-w-5xl border-border bg-card p-0 sm:rounded-none overflow-hidden max-h-[92vh] flex flex-col">
          {selectedItem && (
            <>
              <DialogHeader className="border-b border-border p-4 sm:p-5 flex-shrink-0">
                <div className="flex flex-wrap items-center justify-between gap-3 pr-8">
                  <div className="flex items-center gap-2">
                    <span className="tiv-meta-brand text-xs uppercase">{selectedItem.category}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      Visualization {selectedIdx !== null ? selectedIdx + 1 : 1} of {items.length}
                    </span>
                  </div>
                </div>
                <DialogTitle className="font-display text-xl sm:text-2xl font-semibold mt-1 text-left">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="text-left text-xs italic text-muted-foreground">
                  {selectedItem.caption}
                </DialogDescription>
              </DialogHeader>

              <div className="relative flex-1 min-h-0 overflow-y-auto bg-black flex flex-col">
                {/* Full-res Image Container */}
                <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center">
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.alt}
                    width={1670}
                    height={942}
                    className="h-full w-full object-contain"
                    priority
                  />
                  {/* Modal Previous / Next navigation */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-border bg-black/70 text-white transition-colors hover:border-brand hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-border bg-black/70 text-white transition-colors hover:border-brand hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Lightbox Details Drawer */}
                <div className="border-t border-border bg-card p-5 sm:p-6 space-y-4">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {selectedItem.description}
                  </p>

                  {selectedItem.technicalDetails && selectedItem.technicalDetails.length > 0 && (
                    <div className="border-t border-border/60 pt-3">
                      <span className="tiv-meta mb-2 block">Technical Principles & Scope</span>
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                        {selectedItem.technicalDetails.map((detail) => (
                          <li key={detail} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 bg-brand" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedItem.disclaimer && (
                    <div className="border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
                      <strong className="text-foreground">Visual Disclosure:</strong> {selectedItem.disclaimer}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
