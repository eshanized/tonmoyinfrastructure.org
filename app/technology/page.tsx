import Link from 'next/link';
import { ArrowRight, Layers, Network, Server, Cpu, Zap, HardDrive } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { TechnologyStackDiagram } from '@/components/technology/technology-stack-diagram';
import { TechnologyMap } from '@/components/technology/technology-map';
import { M31EcosystemView } from '@/components/technology/m31-ecosystem-view';
import { PublicTechnicalFootprint } from '@/components/shared/public-technical-footprint';
import { getTechnologyLayers } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Technology & Layered Architecture',
  description:
    'How TIV approaches technology as a layered system — from user applications through software infrastructure, compute, networks, optical systems, and physical infrastructure.',
  path: '/technology',
  keywords: ['TIV technology', 'technology architecture', 'layered stack', 'infrastructure stack', 'systems engineering'],
});

const layerIcons: Record<string, typeof Layers> = {
  applications: Layers,
  'software-infrastructure': HardDrive,
  compute: Server,
  network: Network,
  optical: Zap,
  physical: Cpu,
};

const statusColors: Record<string, string> = {
  Existing: 'text-emerald-500',
  Developing: 'text-brand',
  Experimental: 'text-amber-500',
  Research: 'text-cyan-500',
  Planned: 'text-muted-foreground',
};

export default function TechnologyPage() {
  const layers = getTechnologyLayers();

  const pageGraph = generatePageGraph({
    title: 'Technology & Layered Architecture — Tonmoy Infrastructure and Vision',
    description:
      'How TIV approaches technology as a layered system — from user applications through software infrastructure, compute, networks, optical systems, and physical infrastructure.',
    path: '/technology',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Technology', item: '/technology' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="TECHNOLOGY"
        label="Architecture"
        title="How TIV thinks about technology."
        description="Technology is a layered system. From applications people use, through software infrastructure, compute, networks, optical systems, and the physical infrastructure that underpins everything. Each layer builds on the one below."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Technology' }]} />
        </div>
      </section>

      {/* Layered architecture diagram */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Stack"
              title="Technology layers."
              description="TIV organizes technology into six layers. Each layer depends on the layers below it. This model guides how TIV builds and where it invests research."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <div className="border border-border bg-card p-6 md:p-10">
              <TechnologyStackDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive technology map */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Map"
              title="TIV technology map."
              description="How TIV's projects, infrastructure, and research connect. Select a node to explore related work."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <div className="border border-border bg-card p-6 md:p-10">
              <TechnologyMap />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Layer details */}
      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Details"
              title="Layer by layer."
              description="Each layer, its current state, and what it contains."
            />
          </Reveal>
          <StaggerContainer className="mt-12 space-y-px border border-border bg-border" stagger={0.08}>
            {layers.map((layer) => {
              const Icon = layerIcons[layer.id] || Layers;
              return (
                <StaggerItem key={layer.id}>
                  <div className="bg-card p-6 md:p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center border border-border">
                            <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                          </span>
                          <div>
                            <span className="font-mono text-xs text-muted-foreground">
                              LAYER {String(layer.level).padStart(2, '0')}
                            </span>
                            <h3 className="font-display text-lg tracking-tight">
                              {layer.name}
                            </h3>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${statusColors[layer.status] || 'bg-muted-foreground'}`} />
                          <span className="text-sm text-muted-foreground">{layer.status}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                          {layer.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {layer.items.map((item) => (
                            <span
                              key={item.name}
                              className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-xs"
                            >
                              {item.href ? (
                                <Link href={item.href} className="text-brand hover:underline">
                                  {item.name}
                                </Link>
                              ) : (
                                <span>{item.name}</span>
                              )}
                              <span className="text-muted-foreground/60">· {item.status}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* M31 Ecosystem Architecture */}
      <section className="border-t border-border bg-secondary/20">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="04"
              label="Ecosystem"
              title="M31 Systems & Architecture."
              description="How TIV's agent systems, causal language models, and interactive tools relate across our computational hierarchy."
              link={{ label: 'Dedicated AI/ML Portal', href: '/technology/ai' }}
            />
          </Reveal>
          <div className="mt-12">
            <M31EcosystemView />
          </div>
        </div>
      </section>

      {/* Public Technical Footprint */}
      <section className="border-t border-border">
        <div className="tiv-container py-16 md:py-24">
          <PublicTechnicalFootprint />
        </div>
      </section>
    </>
  );
}
