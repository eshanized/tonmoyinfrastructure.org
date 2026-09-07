import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getServiceStatuses } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'System & Service Status',
  description:
    'Service operational status for TIV infrastructure, applications, and networks. Real system telemetry without fabricated uptime metrics.',
  path: '/status',
  keywords: ['TIV status', 'system status', 'service availability', 'network uptime'],
});

const statusConfig: Record<string, { color: string; label: string }> = {
  Operational: { color: 'bg-emerald-500', label: 'Operational' },
  Degraded: { color: 'bg-amber-500', label: 'Degraded' },
  Maintenance: { color: 'bg-blue-500', label: 'Maintenance' },
  Outage: { color: 'bg-red-500', label: 'Outage' },
  NotDeployed: { color: 'bg-muted-foreground/40', label: 'Not Deployed' },
};

export default function StatusPage() {
  const services = getServiceStatuses();

  const pageGraph = generatePageGraph({
    title: 'System & Service Status — Tonmoy Infrastructure and Vision',
    description:
      'Service operational status for TIV infrastructure, applications, and networks. Real system telemetry without fabricated uptime metrics.',
    path: '/status',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'System Status', item: '/status' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="STATUS"
        label="Services"
        title="System status."
        description="Current status of TIV services and infrastructure. This page provides the architecture for future live monitoring — no fake uptime percentages are displayed."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Status' }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Architecture Only">
            TIV does not yet operate live service monitoring. This page provides
            the status system architecture and data model. When monitoring is
            deployed, real uptime data will replace the current status
            information. No fake uptime percentages are displayed.
          </Callout>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Services"
              title="Current status."
              description="Status of TIV services across infrastructure and software."
            />
          </Reveal>
          <StaggerContainer className="mt-10 space-y-px border border-border bg-border" stagger={0.05}>
            {services.map((service) => {
              const config = statusConfig[service.status];
              return (
                <StaggerItem key={service.slug}>
                  <div className="flex items-center justify-between bg-card p-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${config.color}`} />
                        <h3 className="font-display text-base font-medium tracking-tight">
                          {service.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="tiv-meta">{service.category}</span>
                      <p className="mt-1 text-sm font-medium">{config.label}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Future"
              title="Monitoring architecture."
              description="The status system is designed to consume monitoring data from multiple sources when deployed."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              <div className="bg-card p-6">
                <span className="tiv-meta">Data Sources</span>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>— Monitoring APIs</li>
                  <li>— Uptime services</li>
                  <li>— Internal telemetry</li>
                  <li>— Incident data</li>
                </ul>
              </div>
              <div className="bg-card p-6">
                <span className="tiv-meta">Status Types</span>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>— Operational</li>
                  <li>— Degraded</li>
                  <li>— Maintenance</li>
                  <li>— Outage</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
