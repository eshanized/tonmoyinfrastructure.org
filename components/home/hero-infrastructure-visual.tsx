'use client';

import * as React from 'react';
import Image from 'next/image';
import { Server, Network, Shield, Cpu, Layers } from 'lucide-react';
import { HeroDiagram } from '@/components/shared/hero-diagram';
import { cn } from '@/lib/utils';

interface HeroInfrastructureVisualProps {
  className?: string;
}

export function HeroInfrastructureVisual({ className }: HeroInfrastructureVisualProps) {
  const [activeTab, setActiveTab] = React.useState<'fabric' | 'topology'>('fabric');
  const [imageError, setImageError] = React.useState(false);

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden border border-border bg-card shadow-sm transition-colors duration-300',
        className
      )}
    >
      {/* Decorative Technical Reticles in 4 corners */}
      <span className="pointer-events-none absolute left-1.5 top-1.5 font-mono text-[10px] leading-none text-muted-foreground/40 select-none z-20">
        +
      </span>
      <span className="pointer-events-none absolute right-1.5 top-1.5 font-mono text-[10px] leading-none text-muted-foreground/40 select-none z-20">
        +
      </span>
      <span className="pointer-events-none absolute bottom-1.5 left-1.5 font-mono text-[10px] leading-none text-muted-foreground/40 select-none z-20">
        +
      </span>
      <span className="pointer-events-none absolute bottom-1.5 right-1.5 font-mono text-[10px] leading-none text-muted-foreground/40 select-none z-20">
        +
      </span>

      {/* Console Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/50 px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-brand animate-pulse-dot" aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-foreground">
            {activeTab === 'fabric' ? 'SYS-FABRIC // COMPUTE WHITE SPACE' : 'SYS-TOPOLOGY // ARCHITECTURAL TREE'}
          </span>
        </div>

        {/* Console Tab Controls */}
        <div
          role="tablist"
          aria-label="Infrastructure display modes"
          className="flex items-center gap-1 border border-border/80 bg-background/80 p-0.5 text-xs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'fabric'}
            aria-controls="panel-fabric"
            id="tab-fabric"
            onClick={() => setActiveTab('fabric')}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand',
              activeTab === 'fabric'
                ? 'bg-foreground text-background shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Server className="h-3 w-3" aria-hidden="true" />
            <span>Fabric</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'topology'}
            aria-controls="panel-topology"
            id="tab-topology"
            onClick={() => setActiveTab('topology')}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand',
              activeTab === 'topology'
                ? 'bg-foreground text-background shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Network className="h-3 w-3" aria-hidden="true" />
            <span>Topology</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display Frame */}
      <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden bg-secondary/30">
        {/* TAB 1: Fabric Visual (Photography & Technical HUD) */}
        <div
          id="panel-fabric"
          role="tabpanel"
          aria-labelledby="tab-fabric"
          hidden={activeTab !== 'fabric'}
          className={cn(
            'relative h-full w-full',
            activeTab !== 'fabric' && 'hidden'
          )}
        >
          {!imageError ? (
            <>
              <Image
                src="/images/infrastructure/datacenter/server-room.webp"
                alt="Computing infrastructure white-space visualization depicting modular server racks, structured cabling, and deterministic execution boundaries."
                fill
                priority
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center filter saturate-[0.85] contrast-[1.08] dark:brightness-[0.9]"
                onError={() => setImageError(true)}
              />

              {/* Cinematic Vignette & Lighting Mask */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-90"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40"
                aria-hidden="true"
              />

              {/* Technical Grid Overlay */}
              <div
                className="pointer-events-none absolute inset-0 tiv-grid-fine opacity-15"
                aria-hidden="true"
              />

              {/* Inset Layer: Technical HUD Badges */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
                {/* Top Overlay Chips */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 border border-border/80 bg-background/85 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground backdrop-blur-md">
                    <Shield className="h-3 w-3 text-brand" aria-hidden="true" />
                    SOVEREIGN HARDWARE CUSTODY
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 border border-border/80 bg-background/85 px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted-foreground backdrop-blur-md">
                    <Cpu className="h-3 w-3 text-brand" aria-hidden="true" />
                    LINUX CGROUPS V2
                  </span>
                </div>

                {/* Bottom Overlay Information */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {['OPENMAIL', 'MERCURA', 'M31A', 'OCTATE'].map((platform) => (
                      <span
                        key={platform}
                        className="border border-border/90 bg-background/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-foreground backdrop-blur-md"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span className="bg-background/80 px-1 py-0.5 backdrop-blur-xs">
                      Physical white space & execution nodes
                    </span>
                    <span className="hidden sm:inline-block bg-background/80 px-1 py-0.5 text-[9px] uppercase tracking-wider backdrop-blur-xs">
                      Architectural visualization
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Pristine Fallback if Image Fails or Disabled */
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center tiv-grid-fine">
              <Layers className="h-10 w-10 text-brand mb-3" aria-hidden="true" />
              <p className="font-display text-lg font-medium text-foreground">
                TIV Systems White Space Fabric
              </p>
              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                Modular server infrastructure, Linux cgroups v2 resource boundaries, and deterministic execution runtimes.
              </p>
            </div>
          )}
        </div>

        {/* TAB 2: Topology Visual (HeroDiagram schematic) */}
        <div
          id="panel-topology"
          role="tabpanel"
          aria-labelledby="tab-topology"
          hidden={activeTab !== 'topology'}
          className={cn(
            'relative h-full w-full flex flex-col justify-between p-4 sm:p-6 bg-card/95',
            activeTab !== 'topology' && 'hidden'
          )}
        >
          <div className="mb-2 flex items-center justify-between border-b border-border/60 pb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Convergence Topology
            </span>
            <span className="font-mono text-[10px] text-brand">
              CORE → NODES → BOUNDARIES
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <HeroDiagram />
          </div>

          <div className="mt-2 border-t border-border/60 pt-2 text-center font-mono text-[10px] text-muted-foreground">
            Software, Networks & Research converge into high-assurance Systems & Infrastructure
          </div>
        </div>
      </div>

      {/* Console Bottom Metadata Bar */}
      <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-secondary/40 py-2.5 px-4 font-mono text-[10px] text-muted-foreground sm:grid-cols-3 sm:px-5">
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/80">
            CUSTODY LAYER
          </span>
          <span className="font-medium text-foreground">Sovereign & Verified</span>
        </div>
        <div className="pl-4">
          <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/80">
            NETWORK LAYER
          </span>
          <span className="font-medium text-foreground">Optical & Autonomous</span>
        </div>
        <div className="hidden pl-4 sm:block">
          <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/80">
            RUNTIME CEILING
          </span>
          <span className="font-medium text-foreground">Deterministic / Local-First</span>
        </div>
      </div>
    </div>
  );
}
