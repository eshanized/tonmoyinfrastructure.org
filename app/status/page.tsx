import { PageHeader } from '@/components/shared/page-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal } from '@/components/shared/motion';
import { LiveStatusDashboard } from '@/components/status/live-status-dashboard';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'System Health & Operational Status',
  description:
    'Verified operational status, facility infrastructure, and system health for TIV Jayapura sovereign data center and core software platforms.',
  path: '/status',
  keywords: [
    'TIV status',
    'system health',
    'Jayapura data center',
    'operational status',
    'service availability',
    'infrastructure health',
  ],
});

export default function StatusPage() {
  const pageGraph = generatePageGraph({
    title: 'System Health & Operational Status — Tonmoy Infrastructure and Vision',
    description:
      'Verified operational status, facility infrastructure, and system health for TIV Jayapura sovereign data center and core software platforms.',
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
        label="Operational Health"
        title="System Health & Operational Status."
        description="Verified operational deployment records, infrastructure status, and platform health for TIV sovereign data center assets and software releases."
        meta={[
          { label: 'SOVEREIGN FACILITY', value: 'Jayapura (Operational)' },
          { label: 'SOFTWARE RELEASES', value: '4 Stable Platforms' },
          { label: 'COMMERCIAL ACCESS', value: 'Private Inquiry' },
          { label: 'MONITORING BASIS', value: 'Verified Milestones' },
        ]}
      />

      <section className="border-b border-border bg-background">
        <div className="tiv-container py-6">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'System Status' }]} />
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
                First-Principles Integrity
              </h4>
              <p className="mt-2 text-xs font-mono leading-relaxed text-muted-foreground">
                All status indicators reflect verified facility deployments and software releases.
                TIV does not fabricate live telemetry readings or synthetic latency numbers.
              </p>
            </div>

            <div className="bg-card p-6 md:p-8">
              <span className="tiv-meta">SOVEREIGN FACILITY</span>
              <h4 className="mt-2 font-display text-lg font-bold text-foreground">
                Confirmed Physical Asset
              </h4>
              <p className="mt-2 text-xs font-mono leading-relaxed text-muted-foreground">
                TIV operates a physical sovereign data center in Jayapura, Papua, Indonesia.
                The facility powers internal services, while commercial colocation is handled strictly
                via private inquiry.
              </p>
            </div>

            <div className="bg-card p-6 md:p-8">
              <span className="tiv-meta">INCIDENT PROTOCOL</span>
              <h4 className="mt-2 font-display text-lg font-bold text-foreground">
                Public Transparency
              </h4>
              <p className="mt-2 text-xs font-mono leading-relaxed text-muted-foreground">
                In the event of degradation or maintenance, factual post-mortems and remediation
                timelines are published directly to our transparency reports without vanity metrics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
