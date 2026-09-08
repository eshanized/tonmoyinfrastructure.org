import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { TechnologyStackDiagram } from '@/components/technology/technology-stack-diagram';
import { getTechnologyLayers } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Technology Architecture & Stack Model',
  description:
    'The TIV technology architecture — an explicit 6-layer model spanning applications, software infrastructure, compute, networking, optical systems, and physical nodes.',
  path: '/technology/architecture',
  keywords: ['TIV architecture', 'layered architecture', 'system design', 'infrastructure layers'],
});

export default function ArchitecturePage() {
  const layers = getTechnologyLayers();

  const pageGraph = generatePageGraph({
    title: 'Technology Architecture & Stack Model — Tonmoy Infrastructure and Vision',
    description:
      'The TIV technology architecture — an explicit 6-layer model spanning applications, software infrastructure, compute, networking, optical systems, and physical nodes.',
    path: '/technology/architecture',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Technology', item: '/technology' },
      { name: 'Architecture', item: '/technology/architecture' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="TECHNOLOGY / ARCHITECTURE"
        label="System Design"
        title="Architecture."
        description="The conceptual model that guides TIV's technology decisions — from the applications people use to the physical infrastructure that underpins everything."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs
            items={[
              { label: 'Technology', href: '/technology' },
              { label: 'Architecture' },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Model"
              title="Layered system."
              description="Technology at TIV is organized as a stack of six layers. Each layer builds on the one below. Understanding this stack is key to understanding how TIV builds."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <div className="border border-border bg-card p-6 md:p-10">
              <TechnologyStackDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Layers"
              title="Stack breakdown."
              description="Each layer in the stack, from top to bottom."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="space-y-px border border-border bg-border">
              {layers.map((layer) => (
                <div key={layer.id} className="bg-card p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-brand">
                      L{String(layer.level).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-base font-medium tracking-tight">
                      {layer.name}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
