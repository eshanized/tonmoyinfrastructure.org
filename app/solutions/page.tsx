import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Globe,
  Zap,
  Truck,
  Database,
  Building,
  DollarSign,
  Layers,
  TrendingDown,
  Info,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal } from '@/components/shared/motion';
import { FleetMetrics } from '@/components/solutions/fleet-metrics';
import { DataCenterExplorer } from '@/components/solutions/data-center-explorer';
import { CourierNetworkExplorer } from '@/components/solutions/courier-network-explorer';
import dynamic from 'next/dynamic';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

const OpenStreetMapViewer = dynamic(
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

export const metadata = generatePageMetadata({
  title: 'Global Infrastructure & Logistics Solutions',
  description:
    'Enterprise infrastructure solutions: 16 Tier 3 & Tier 4 data center facilities, high-density compute capacity, and global courier logistics connecting 17 countries with guaranteed 48-hour delivery.',
  path: '/solutions',
  keywords: [
    'TIV solutions',
    'enterprise infrastructure',
    'data centers',
    'global courier network',
    'express delivery',
    'international logistics',
    'tier 4 data center',
    'carrier neutral',
  ],
});

export default function SolutionsPage() {
  const pageGraph = generatePageGraph({
    title: 'Global Infrastructure & Logistics Solutions — TIV',
    description:
      'Enterprise infrastructure solutions: 16 Tier 3 & Tier 4 data center facilities, high-density compute capacity, and global courier logistics connecting 17 countries.',
    path: '/solutions',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Solutions', item: '/solutions' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="SOLUTIONS"
        label="Enterprise & Logistics"
        title="Global Infrastructure & Logistics Solutions."
        description="Experience unparalleled security and performance with our worldwide network of 16 mission-critical data center facilities and our international courier logistics network connecting 17 countries."
        meta={[
          { label: 'DATA CENTERS', value: '16 Facilities' },
          { label: 'COURIER REACH', value: '17 Nations' },
          { label: 'SLA STANDARD', value: '48h Transit' },
          { label: 'UPTIME SLA', value: '99.999%' },
        ]}
      />

      {/* Breadcrumbs */}
      <section className="border-b border-border bg-background">
        <div className="tiv-container py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions' },
            ]}
          />
        </div>
      </section>

      {/* Fleet Overview Metrics */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-16 md:py-20">
          <Reveal>
            <SectionHeader
              label="Real-Time Telemetry"
              title="Infrastructure Fleet Overview."
              description="Continuous telemetry and operational health monitoring across our worldwide compute, storage, and networking footprint."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <FleetMetrics />
          </Reveal>
        </div>
      </section>

      {/* Live OpenStreetMap Section */}
      <section id="global-map" className="border-b border-border bg-background">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              label="Live Cartography"
              title="OpenStreetMap Global Telemetry Grid."
              description="Interactive global telemetry rendered on OpenStreetMap tiles — inspect our 16 mission-critical data center facilities, 17 international courier gateway hubs, and connected 48-hour flight corridors in real time."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <OpenStreetMapViewer />
          </Reveal>
        </div>
      </section>

      {/* Global Data Center Fleet Section */}
      <section id="data-centers" className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionHeader
                  label="Compute & Facilities"
                  title="Global Data Center Fleet."
                  description="Strategically positioned Tier 3 and Tier 4 facilities engineered for high-density compute, multi-petabyte storage, and carrier-neutral peering."
                />
              </div>
              <Link
                href="/infrastructure/data-centers"
                className="flex items-center gap-1.5 text-xs font-mono text-brand hover:underline self-start md:self-auto"
              >
                Detailed Specifications <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10">
            <DataCenterExplorer />
          </div>
        </div>
      </section>

      {/* Global Courier Network Section */}
      <section id="courier" className="border-b border-border bg-secondary/10">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionHeader
                  label="Physical Logistics & Supply Chain"
                  title="Global Courier Network."
                  description="Seamless logistics solutions connecting 17 countries with reliable, 48-hour delivery guarantees, full customs clearance, and specialized handling."
                />
              </div>
              <Link
                href="/infrastructure/courier"
                className="flex items-center gap-1.5 text-xs font-mono text-brand hover:underline self-start md:self-auto"
              >
                Logistics Architecture <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10">
            <CourierNetworkExplorer />
          </div>
        </div>
      </section>

      {/* Section 04: Economic Portfolio & Valuation */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <SectionHeader
                  index="04"
                  label="Economic Portfolio & Valuation"
                  title="Capital valuation & economic accounting."
                  description="How TIV accounts for its data centers and courier logistics fleet under our formal Portfolio Economics framework — verified capital asset acquisition cost, straight-line economic depreciation, net book value, and commercial revenue attribution."
                />
              </div>
              <Link
                href="/transparency/financials/portfolio-economics"
                className="flex items-center gap-1.5 text-xs font-mono text-brand hover:underline self-start md:self-auto"
              >
                Portfolio Economics Dashboard <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-border bg-card p-5">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="tiv-meta text-[11px]">INFRASTRUCTURE FLEET</span>
                <Building className="h-4 w-4 text-brand" />
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-foreground">
                33 Facilities
              </p>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                16 Data Centers + 17 Courier Hubs across 17 countries
              </p>
            </div>

            <div className="border border-border bg-card p-5">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="tiv-meta text-[11px]">HISTORICAL COST BASIS</span>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-foreground">
                ₹11,30,000
              </p>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                Hardware, storage enclosures &amp; sortation telemetry
              </p>
            </div>

            <div className="border border-brand/40 bg-brand/5 p-5">
              <div className="flex items-center justify-between text-brand">
                <span className="tiv-meta text-[11px] font-semibold">ACCOUNTED BOOK VALUE</span>
                <ShieldCheck className="h-4 w-4 text-brand" />
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-brand">
                ₹9,50,000
              </p>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                Audited balance sheet valuation after ₹1.8L depreciation
              </p>
            </div>

            <div className="border border-border bg-card p-5">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="tiv-meta text-[11px]">FY2026 COMMERCIAL REVENUE</span>
                <Layers className="h-4 w-4 text-brand" />
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-foreground">
                ₹9,00,000
              </p>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                ₹7.2L DC Peering/Hosting + ₹1.8L Courier Logistics
              </p>
            </div>
          </div>

          {/* Anti-Valuation Notice */}
          <div className="mt-8 border border-border bg-card/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 text-brand mt-0.5 shrink-0" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Formal Anti-Valuation Standard: </span>
                TIV strictly rejects speculative venture-style enterprise multiples or paper valuations.
                All infrastructure and logistics networks are quoted strictly at verified historical acquisition cost less straight-line economic depreciation (Net Book Value).
              </div>
            </div>

            <Link
              href="/transparency/financials/portfolio-economics/methodology"
              className="inline-flex items-center gap-1.5 border border-border bg-secondary px-3.5 py-1.5 font-mono text-xs text-foreground hover:border-brand hover:text-brand transition-colors shrink-0"
            >
              Read Valuation Policy <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-background">
        <div className="tiv-container py-20 md:py-28">
          <div className="relative overflow-hidden border border-border bg-card p-8 md:p-14">
            <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand via-brand/60 to-transparent" />

            <div className="max-w-2xl">
              <span className="tiv-meta">ENGAGEMENT & ENTERPRISE CONTRACTS</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Ready to scale your infrastructure or global logistics?
              </h2>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                Whether deploying mission-critical compute across our 16 data center facilities or securing rapid 48-hour hardware courier transit across 17 countries, our engineering team is ready to assist.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  Enterprise Security & ISO 27001
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-brand" />
                  17 International Gateway Hubs
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-brand" />
                  48-Hour Worldwide Turnaround
                </span>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 bg-brand px-6 py-3 font-mono text-xs font-medium text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-lg"
                >
                  Contact Infrastructure Sales
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/infrastructure"
                  className="flex items-center gap-2 border border-border bg-secondary px-6 py-3 font-mono text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
                >
                  Explore All Systems
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
