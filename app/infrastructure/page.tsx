import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { TivIcon } from '@/components/shared/tiv-icon';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { InfrastructureMap } from '@/components/infrastructure/infrastructure-map';
import { getInfrastructureServices } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Infrastructure Services & Systems',
  description:
    'TIV infrastructure activities across global data center facilities, 17-country courier logistics, domains, bare-metal hosting, compute clusters, low-latency networking, and optical systems.',
  path: '/infrastructure',
  keywords: ['TIV infrastructure', 'data centers', 'courier network', 'global logistics', 'server hosting', 'cloud compute', 'optical networking', 'domain infrastructure'],
});

const serviceIcons: Record<string, string> = {
  Domains: 'globe',
  Hosting: 'server',
  Compute: 'cpu',
  Networking: 'network',
  'Optical Systems': 'waves',
  'Data Centers': 'database',
  'Global Courier Network': 'truck',
};

export default function InfrastructurePage() {
  const services = getInfrastructureServices();

  const pageGraph = generatePageGraph({
    title: 'Infrastructure Services & Systems — Tonmoy Infrastructure and Vision',
    description:
      'TIV infrastructure activities across domains, bare-metal hosting, compute clusters, low-latency networking, and experimental optical systems.',
    path: '/infrastructure',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Infrastructure', item: '/infrastructure' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="INFRASTRUCTURE"
        label="Systems & Physical"
        title="Infrastructure we operate and research."
        description="TIV's infrastructure work spans the full stack — from domain registration and hosting to networking and optical systems. Each area is clearly classified by its current stage."
      />

      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              label="Interactive Map"
              title="Explore the infrastructure stack."
              description="From applications down to physical infrastructure — explore each layer and the projects connected to it."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <InfrastructureMap />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              label="Services"
              title="Infrastructure categories."
              description="Each category is classified as Commercial, Internal, Experimental, or Research."
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {services.map((svc) => (
              <StaggerItem key={svc.slug}>
                <Link
                  href={`/infrastructure/${svc.slug === 'optical-systems' ? 'optical' : svc.slug}`}
                  className="group relative bg-card p-6 transition-colors hover:bg-card/80"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-all group-hover:border-brand/40 group-hover:text-brand">
                        <TivIcon name={serviceIcons[svc.title] || 'server'} size={16} />
                      </div>
                      <span className="tiv-meta">{svc.classification}</span>
                    </div>
                    <StatusBadge status={svc.status} />
                  </div>
                  <h3 className="mt-4 font-display text-xl tracking-tight transition-colors group-hover:text-brand">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {svc.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
