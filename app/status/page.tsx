import { PageHeader } from '@/components/shared/page-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal } from '@/components/shared/motion';
import { LiveStatusDashboard } from '@/components/status/live-status-dashboard';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Real-Time Server & System Status',
  description:
    'Live operational telemetry, availability, latency, and system health for TIV Jayapura sovereign data center, edge nodes, and core software platforms.',
  path: '/status',
  keywords: [
    'TIV status',
    'server status',
    'system telemetry',
    'live latency',
    'Jayapura data center uptime',
    'service availability',
    'network status',
  ],
});

export default function StatusPage() {
  const pageGraph = generatePageGraph({
    title: 'Real-Time Server & System Status — Tonmoy Infrastructure and Vision',
    description:
      'Live operational telemetry, availability, latency, and system health for TIV Jayapura sovereign data center, edge nodes, and core software platforms.',
    path: '/status',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Server Status', item: '/status' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="STATUS"
        label="Operational Health"
        title="Live Server & System Status."
        description="Operational telemetry, availability metrics, and dynamic latency monitoring for TIV software platforms, public endpoints, and reference infrastructure nodes."
        meta={[
          { label: 'SYSTEM HEALTH', value: 'Operational' },
          { label: 'EDGE NODES', value: 'Monitored' },
          { label: 'SOFTWARE STATUS', value: '4 Stable Platforms' },
          { label: 'TELEMETRY CADENCE', value: '5s Dynamic' },
        ]}
      />

      <section className="border-b border-border bg-background">
        <div className="tiv-container py-6">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Server Status' }]} />
        </div>
      </section>

      <section className="bg-secondary/10 py-12 md:py-16">
        <div className="tiv-container">
          <Reveal>
            <LiveStatusDashboard />
          </Reveal>
        </div>
      </section>

      {/* SLA & Reporting Guarantees */}
      <section className="border-t border-border bg-background py-16 md:py-20">
        <div className="tiv-container">
          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
            <div className="bg-card p-6 md:p-8">
              <span className="tiv-meta">DATA FIDELITY</span>
              <h4 className="mt-2 font-display text-lg font-bold text-foreground">
                First-Principles Telemetry
              </h4>
              <p className="mt-2 text-xs font-mono leading-relaxed text-muted-foreground">
                All status indicators reflect live network heartbeat pings, memory/load allocations, and session states across our infrastructure services and reference nodes.
              </p>
            </div>

            <div className="bg-card p-6 md:p-8">
              <span className="tiv-meta">RELIABILITY STANDARDS</span>
              <h4 className="mt-2 font-display text-lg font-bold text-foreground">
                Sovereign Architecture
              </h4>
              <p className="mt-2 text-xs font-mono leading-relaxed text-muted-foreground">
                TIV software platforms (OpenMail, Mercura, M31A, Octate) and services are engineered for sovereign, high-assurance operations without dependency on closed external providers.
              </p>
            </div>

            <div className="bg-card p-6 md:p-8">
              <span className="tiv-meta">INCIDENT PROTOCOL</span>
              <h4 className="mt-2 font-display text-lg font-bold text-foreground">
                Public Transparency
              </h4>
              <p className="mt-2 text-xs font-mono leading-relaxed text-muted-foreground">
                In the event of degradation or emergency maintenance, detailed post-mortems and remediation timelines are published directly to our transparency reports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
