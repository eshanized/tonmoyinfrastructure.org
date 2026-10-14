import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Shield,
  Server,
  Network,
  Cpu,
  Layers,
  CheckCircle,
  ExternalLink,
  Lock,
  Radio,
  Waves,
  Activity,
  Wrench,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { StatusBadge } from '@/components/shared/status-badge';
import { SectionHeader } from '@/components/shared/section-header';
import { DataCenterGallery } from '@/components/infrastructure/data-center-gallery';
import { DataCenterAreas } from '@/components/infrastructure/data-center-areas';
import { DataCenterDiagram } from '@/components/infrastructure/data-center-diagram';
import { siteConfig } from '@/lib/site-config';
import type { InfrastructureService } from '@/lib/types';

interface DataCenterDetailProps {
  service: InfrastructureService;
  breadcrumbs: { label: string; href?: string }[];
}

const relatedServices = [
  {
    title: 'Networking',
    href: '/infrastructure/networking',
    icon: Network,
    description: 'Autonomous System design, BGP routing policy, and resilient ingress topologies.',
    status: 'Production',
    classification: 'Internal',
  },
  {
    title: 'Optical systems',
    href: '/infrastructure/optical',
    icon: Waves,
    description: 'DWDM path analysis, optical transceivers, attenuation profiling, and long-haul dark fiber transport.',
    status: 'Research',
    classification: 'Research',
  },
  {
    title: 'Compute infrastructure',
    href: '/infrastructure/compute',
    icon: Cpu,
    description: 'Bare-metal virtualization with hard cgroups v2 resource ceilings, POSIX rlimits, and execution isolation.',
    status: 'Planning',
    classification: 'Commercial',
  },
  {
    title: 'Sovereign hosting',
    href: '/infrastructure/hosting',
    icon: Server,
    description: 'Dedicated bare-metal server deployment and private sovereign hosting environments.',
    status: 'Planning',
    classification: 'Commercial',
  },
  {
    title: 'Security center',
    href: '/security',
    icon: Shield,
    description: 'Institutional security principles, vulnerability disclosure policies, and policy enforcement.',
    status: 'Production',
    classification: 'Internal',
  },
];

export function DataCenterDetail({ service, breadcrumbs }: DataCenterDetailProps) {
  return (
    <div className="min-w-0">
      {/* Section A: Spacious Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-card/80 to-background">
        <div className="tiv-container py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Heading and Context */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="tiv-section-marker">INFRASTRUCTURE</span>
                <span className="h-px w-6 bg-border" />
                <span className="tiv-meta">DATA CENTERS</span>
                <StatusBadge status={service.status} />
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/5 px-3 py-1 font-mono text-xs text-brand">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Jayapura, Papua, Indonesia</span>
                </div>
                <h1 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  TIV sovereign data center in Jayapura, Papua, Indonesia
                </h1>
              </div>

              <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tonmoy Infrastructure and Vision operates an active sovereign data center facility in Jayapura, Papua, Indonesia — serving as the foundational physical host for TIV core software platforms (OpenMail, Mercura, M31A, and Octate), authoritative DNS resolution, and internal sovereign systems.
              </p>

              {/* Verified Metadata Matrix */}
              <div className="border border-border bg-card/60 p-4 font-mono text-xs">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Facility Status</span>
                    <span className="font-semibold text-foreground">Production Facility</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Classification</span>
                    <span className="font-semibold text-foreground">Internal Sovereign Infrastructure</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Confirmed Location</span>
                    <span className="font-semibold text-foreground">Jayapura, Papua, Indonesia</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Hosted Workloads</span>
                    <span className="font-semibold text-foreground">OpenMail, Mercura, M31A, Octate, DNS</span>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center border border-brand bg-brand px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  Inspect visual gallery
                </a>
                <Link
                  href="/infrastructure"
                  className="inline-flex items-center justify-center border border-border bg-card px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-brand/40 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  Infrastructure overview
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-brand transition-colors"
                >
                  <span>Sovereign inquiries</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Frame */}
            <div className="lg:col-span-6">
              <div className="relative border border-border bg-card p-2 sm:p-3 shadow-2xl">
                <div className="mb-2 flex items-center justify-between border-b border-border pb-2 px-1 text-xs">
                  <span className="tiv-meta">FACILITY EXTERIOR</span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden border border-border bg-black">
                  <Image
                    src="/images/infrastructure/datacenter/exterior.webp"
                    alt="Exterior view of the TIV data center in Jayapura, Papua, Indonesia."
                    width={1672}
                    height={941}
                    className="h-full w-full object-cover"
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="mt-2.5 px-1 font-mono text-[11px] text-muted-foreground">
                  The data center · Exterior visualization of the TIV data center in Jayapura, Papua, Indonesia.
                </figcaption>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs Navigation */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      {/* Section B: Facility Overview */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                index="OVERVIEW"
                label="Facility Context"
                title="Sovereign computing anchored in Eastern Indonesia."
                description="The Jayapura facility provides sovereign execution environments, persistent repository storage, and authoritative network services for Tonmoy Infrastructure and Vision."
              />

              <div className="prose prose-invert max-w-none text-muted-foreground text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Tonmoy Infrastructure and Vision operates an established sovereign data center facility located in Jayapura, Papua, Indonesia. Engineered as an independent foundation for our software platforms and internet infrastructure, the facility provides physical custody and localized computing sovereignty away from centralized global hyperscalers.
                </p>
                <p>
                  The facility houses the production execution runtime for TIV stable release software:
                </p>
                <ul className="space-y-2 border-l border-border pl-4 my-4 font-mono text-xs sm:text-sm text-foreground/90">
                  <li>
                    <strong className="text-brand">OpenMail</strong>: Sovereign mail engine, IMAP/SMTP queues, and cryptographic email signature signing.
                  </li>
                  <li>
                    <strong className="text-brand">Mercura</strong>: Distributed Mercurial repository storage and transparent Git interoperability mirrors.
                  </li>
                  <li>
                    <strong className="text-brand">M31A</strong>: Rust-native autonomous software-engineering runtime operating under strict ASVS L1 hardening.
                  </li>
                  <li>
                    <strong className="text-brand">Octate</strong>: Terminal-native code review engine and SARIF compliance evaluation pipelines.
                  </li>
                  <li>
                    <strong className="text-brand">Authoritative DNS</strong>: Dedicated nameserver resolution daemons for TIV core root domains.
                  </li>
                </ul>
                <p>
                  By controlling the underlying physical hardware and network termination points, TIV ensures that intellectual property, repository histories, and autonomous runtime policies execute on user-verifiable systems without third-party telemetric inspection.
                </p>
              </div>

              {/* Commercial Scope Notice Callout */}
              <div className="border border-border bg-secondary/30 p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand" />
                  <span className="tiv-meta text-foreground">Operational Scope vs. Commercial Offering</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The Jayapura facility is an internal sovereign operational site. TIV does not operate a public retail self-service colocation storefront or public self-serve cloud portal. Dedicated capacity, enterprise interconnection, and sovereign hosting arrangements are evaluated strictly via private inquiry.
                </p>
              </div>
            </div>

            {/* Right Column: Factual Ground Truth & Boundary Matrix */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-border bg-card p-6">
                <span className="tiv-meta mb-4 block">Ground Truth Specification</span>
                <dl className="space-y-4 text-xs font-mono">
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Confirmed Facility</dt>
                    <dd className="text-foreground font-sans font-medium text-sm">
                      TIV Sovereign Data Center (Jayapura)
                    </dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Administrative Jurisdiction</dt>
                    <dd className="text-foreground">
                      Jayapura, Papua, Indonesia (Pusat Bisnis Jayapura)
                    </dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Operational Role</dt>
                    <dd className="text-foreground">
                      Platform hosting, DNS daemons, build runners, repository mirrors
                    </dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Commercial Colocation</dt>
                    <dd className="text-muted-foreground">
                      Private enterprise inquiry only · No retail public storefront
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Security Framework Alignment</dt>
                    <dd className="text-foreground">
                      Aligned with ISO 27001 physical security controls and SOC 2 security principles
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Local Reality vs Global Blueprints Notice */}
              <div className="border border-border bg-card p-6 space-y-3">
                <span className="tiv-meta block text-brand">Institutional Veracity Notice</span>
                <h3 className="font-display text-base font-semibold text-foreground">
                  Local reality vs. global blueprints
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  TIV rigorously distinguishes verified physical assets from theoretical architectures. TIV operates its confirmed physical sovereign facility in Jayapura, Papua, Indonesia. We do not claim ownership of unverified global fleets of 16 hyperscale facilities across 11 countries, 845 PB storage arrays, or 99.999% SLA marketing metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section C: Infrastructure Visual Gallery */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-16 md:py-20">
          <SectionHeader
            index="GALLERY"
            label="Visual Inspection"
            title="Facility views and infrastructure domains."
            description="Explore the external environment, server white space, perimeter monitoring, and physical maintenance disciplines represented in TIV data center operations."
            className="mb-10"
          />

          <DataCenterGallery items={service.gallery} />
        </div>
      </section>

      {/* Facility Architecture Schematic */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <SectionHeader
            index="SCHEMATIC"
            label="Topology"
            title="Facility architecture and physical subsystem topology."
            description="Schematic distribution path tracing dual utility feeds, auxiliary power generation, online UPS battery conditioning, modular server racks, and carrier meet-me demarcation."
            className="mb-10"
          />

          <DataCenterDiagram />
        </div>
      </section>

      {/* Section D: Infrastructure Areas */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-16 md:py-20">
          <SectionHeader
            index="DOMAINS"
            label="Engineering Areas"
            title="Six core infrastructure subsystems."
            description="A structured overview of the facility computing, cabling, security, power distribution, climate management, and physical access controls."
            className="mb-10"
          />

          <DataCenterAreas areas={service.areas} />
        </div>
      </section>

      {/* Section E: Operations and Reliability */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-20">
          <div className="max-w-3xl">
            <SectionHeader
              index="RELIABILITY"
              label="Operational Principles"
              title="Disciplined engineering over synthetic metrics."
              description="How proactive observability, preventative maintenance, climate equilibrium, and deterministic isolation preserve operational integrity."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="border border-border bg-card p-6 space-y-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border text-brand bg-brand/5">
                <Activity className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                Proactive observability & telemetry
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Continuous instrumentation across CPU junction temperatures, fan speeds, ECC memory parity errors, and optical link attenuation enables early anomaly detection before faults cascade into downtime.
              </p>
            </div>

            <div className="border border-border bg-card p-6 space-y-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border text-brand bg-brand/5">
                <Wrench className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                Scheduled preventative runbooks
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Strict operational runbooks govern optical patch inspections, battery internal resistance impedance testing, air filter replacements, and auxiliary generator test cycles under simulated load.
              </p>
            </div>

            <div className="border border-border bg-card p-6 space-y-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border text-brand bg-brand/5">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                Equatorial climate equilibrium
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Jayapura equatorial coastal climate demands continuous dew-point and relative humidity management. Hot/cold aisle isolation prevents hot air recirculation and thermal degradation.
              </p>
            </div>

            <div className="border border-border bg-card p-6 space-y-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border text-brand bg-brand/5">
                <Shield className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                Defense in depth & policy gates
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Physical security boundaries, network perimeter packet filtering, and runtime confinement work in unison. Workloads like M31A enforce 11-stage policy gates and ASVS L1 hardening.
              </p>
            </div>

            <div className="border border-border bg-card p-6 space-y-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border text-brand bg-brand/5">
                <Radio className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                Cryptographic backup & recovery
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ZFS snapshots, encrypted off-site cold storage mirrors, and reproducible declarative system configurations ensure deterministic cold-restart capabilities without unverified claims of instant recovery.
              </p>
            </div>

            <div className="border border-border bg-card p-6 space-y-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border text-brand bg-brand/5">
                <CheckCircle className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                Honest reliability reporting
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                TIV deliberately avoids publishing unsubstantiated availability figures (e.g. 99.999% SLAs) without multi-year audited operational evidence. Reliability is earned through verifiable architecture and transparent accounting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section F: Location and Contact */}
      <section className="border-b border-border bg-secondary/20">
        <div className="tiv-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                index="COORDINATES"
                label="Physical Location"
                title="Verified facility location in Jayapura."
                description="The facility is established in Jayapura, Papua, Indonesia, positioning sovereign compute directly within Eastern Indonesia."
              />

              <div className="border border-border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 text-brand">
                  <MapPin className="h-5 w-5" />
                  <span className="font-mono text-sm font-semibold uppercase tracking-wider">
                    Official Corporate & Facility Address
                  </span>
                </div>
                <div className="font-mono text-sm text-foreground/90 space-y-1">
                  <p>{siteConfig.address.street}</p>
                  <p>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}</p>
                  <p>{siteConfig.address.country}</p>
                </div>
                <div className="border-t border-border/60 pt-3 flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider block text-muted-foreground">Coordinates</span>
                    <span className="text-foreground font-semibold">
                      {siteConfig.address.latitude}° S, {siteConfig.address.longitude}° E
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider block text-muted-foreground">Telephone</span>
                    <a href={siteConfig.address.telephoneUri} className="text-foreground hover:text-brand">
                      {siteConfig.address.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-brand bg-brand px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span>Submit sovereign infrastructure inquiry</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/infrastructure"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-brand"
                >
                  <span>View all infrastructure services</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-border bg-card p-6 space-y-4">
                <span className="tiv-meta block">Private Inquiry Guidelines</span>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Dedicated hosting & sovereign capacity
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Organizations requiring dedicated bare-metal nodes, private cross-connects, or sovereign data isolation in Eastern Indonesia may initiate confidential technical consultations.
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                    <span>Dedicated server instances & colocation review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                    <span>Regional transit & BGP peering coordination</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                    <span>Cryptographic telemetry verification partnerships</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-brand hover:underline"
                  >
                    <span>Contact systems architecture team</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section G: Related Infrastructure */}
      <section>
        <div className="tiv-container py-16 md:py-20">
          <SectionHeader
            index="NETWORK"
            label="Related Systems"
            title="Explore complementary infrastructure systems."
            description="Discover other layers of Tonmoy Infrastructure and Vision digital, optical, and computing architecture."
            link={{ label: 'All infrastructure', href: '/infrastructure' }}
            className="mb-10"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((rel) => {
              const Icon = rel.icon;
              return (
                <Link
                  key={rel.title}
                  href={rel.href}
                  className="group flex flex-col border border-border bg-card p-6 transition-all hover:border-brand/40 hover:bg-card/80"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                      <Icon className="h-4 w-4" />
                    </div>
                    <StatusBadge status={rel.status} />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
                    {rel.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {rel.description}
                  </p>

                  <div className="mt-auto pt-5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-brand">
                    <span>Explore system</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
