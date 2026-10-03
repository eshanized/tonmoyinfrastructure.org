'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfraLayer {
  id: string;
  label: string;
  description: string;
  link: string;
  projects: string[];
}

const layers: InfraLayer[] = [
  {
    id: 'applications',
    label: 'Applications',
    description: 'Software that people use — email, code hosting, developer tools.',
    link: '/work',
    projects: ['OpenMail', 'Mercura'],
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Hosting, domains, compute — the platform layer that applications run on.',
    link: '/infrastructure/hosting',
    projects: ['Hosting', 'Domains'],
  },
  {
    id: 'servers',
    label: 'Servers',
    description: 'Physical and virtual machines that execute workloads.',
    link: '/infrastructure',
    projects: ['Compute'],
  },
  {
    id: 'network',
    label: 'Network',
    description: 'Routing, switching, and the protocols that connect systems.',
    link: '/infrastructure/networking',
    projects: ['Networking'],
  },
  {
    id: 'optical',
    label: 'Optical Link',
    description: 'Fiber optics and optical transmission — the physical data paths.',
    link: '/infrastructure/optical',
    projects: ['Optical Systems'],
  },
  {
    id: 'physical',
    label: 'Physical Infrastructure',
    description: 'Cables, datacenters, and the material reality of the internet.',
    link: '/infrastructure',
    projects: ['Fiber Optics'],
  },
];

export function InfrastructureMap() {
  const [activeLayer, setActiveLayer] = useState<string>('applications');

  const active = layers.find((l) => l.id === activeLayer) || layers[0];

  return (
    <div className="border border-border bg-card">
      {/* Desktop: vertical layered diagram */}
      <div className="hidden md:block">
        <div className="flex">
          {/* Layer stack */}
          <div className="w-2/5 border-r border-border p-6">
            <span className="tiv-meta mb-4 block">Infrastructure Stack</span>
            <div className="space-y-1">
              {layers.map((layer, i) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={cn(
                    'group flex w-full items-center gap-3 border px-4 py-3 text-left transition-all duration-200',
                    activeLayer === layer.id
                      ? 'border-brand bg-brand/5'
                      : 'border-transparent hover:border-border'
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-xs',
                      activeLayer === layer.id ? 'text-brand' : 'text-muted-foreground/50'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'font-display text-sm font-medium',
                      activeLayer === layer.id ? 'text-brand' : 'text-foreground'
                    )}
                  >
                    {layer.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      'ml-auto h-4 w-4 transition-transform',
                      activeLayer === layer.id
                        ? 'rotate-[-90deg] text-brand'
                        : 'text-muted-foreground/30'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="flex-1 p-6">
            <div key={active.id} className="animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand animate-pulse-dot" />
                <span className="tiv-meta-brand">{active.label}</span>
              </div>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                {active.description}
              </p>
              {active.projects.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {active.projects.map((proj) => (
                    <span
                      key={proj}
                      className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Visual: connecting lines */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex flex-col gap-1">
                {layers.map((layer, i) => (
                  <div key={layer.id} className="flex items-center gap-2">
                    <div
                      className={cn(
                        'h-px transition-all duration-300',
                        activeLayer === layer.id
                          ? 'w-12 bg-brand'
                          : 'w-6 bg-border'
                      )}
                    />
                    <span
                      className={cn(
                        'font-mono text-xs transition-colors',
                        activeLayer === layer.id
                          ? 'text-brand'
                          : 'text-muted-foreground/40'
                      )}
                    >
                      {layer.label}
                    </span>
                    {i < layers.length - 1 && (
                      <span className="text-muted-foreground/20">↓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden">
        <div className="divide-y divide-border">
          {layers.map((layer, i) => (
            <div key={layer.id}>
              <button
                onClick={() =>
                  setActiveLayer(activeLayer === layer.id ? '' : layer.id)
                }
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span className="font-mono text-xs text-muted-foreground/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-display text-sm font-medium">
                  {layer.label}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    activeLayer === layer.id && 'rotate-180'
                  )}
                />
              </button>
              {activeLayer === layer.id && (
                <div className="overflow-hidden animate-fade-in">
                  <div className="px-4 pb-4">
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {layer.description}
                    </p>
                    {layer.projects.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {layer.projects.map((proj) => (
                          <span
                            key={proj}
                            className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
