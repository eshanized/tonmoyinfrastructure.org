'use client';

import { useState, useMemo } from 'react';
import { DATA_CENTERS } from '@/lib/solutions-data';
import { CheckCircle2, Shield, Server, Info, HardDrive, Cpu, Terminal, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SystemComponent {
  id: string;
  name: string;
  category: 'Facility Infrastructure' | 'Core Platform' | 'Software Systems';
  operationalScope: string;
  status: 'Operational' | 'Active Maintenance' | 'Planning';
  commercialAvailability: 'Internal Only' | 'Private Inquiry' | 'Public Open Source' | 'Not Offered';
  verificationSource: string;
  lastVerified: string;
  protocol?: string;
  details: string;
}

const SYSTEM_COMPONENTS: SystemComponent[] = [
  {
    id: 'dc-jayapura',
    name: 'Jayapura Sovereign Data Center Facility',
    category: 'Facility Infrastructure',
    operationalScope: 'Physical Sovereign Data Center Facility (Papua, Indonesia)',
    status: 'Operational',
    commercialAvailability: 'Private Inquiry',
    verificationSource: 'Facility Audit Records',
    lastVerified: 'October 2026',
    details:
      'Confirmed physical facility in Jayapura, Papua, Indonesia. Hosts authoritative DNS, sovereign compute nodes, and TIV core software platforms. Retail self-serve colocation is not offered; dedicated capacity evaluated by private inquiry.',
  },
  {
    id: 'dns-edge',
    name: 'Authoritative DNS & Edge Routing',
    category: 'Core Platform',
    operationalScope: 'Internal Anycast Network & Sovereign DNS',
    status: 'Operational',
    commercialAvailability: 'Internal Only',
    verificationSource: 'BGP Routing Table & Zone Records',
    lastVerified: 'October 2026',
    protocol: 'DNS over TLS / Anycast BGP',
    details: 'Authoritative nameservers routing tonmoyinfrastructure.org and associated domains.',
  },
  {
    id: 'storage-fabric',
    name: 'Internal Storage & Backup Fabric',
    category: 'Core Platform',
    operationalScope: 'ZFS & NVMe Sovereign Storage Pool',
    status: 'Operational',
    commercialAvailability: 'Internal Only',
    verificationSource: 'Storage Pool Metrics',
    lastVerified: 'October 2026',
    protocol: 'ZFS Mirrored Pool',
    details: 'Internal 120 TB raw storage pool with snapshot replication at the Jayapura facility.',
  },
  {
    id: 'compute-scheduler',
    name: 'Sovereign Compute Orchestrator',
    category: 'Core Platform',
    operationalScope: 'Bare-Metal Workload Orchestration',
    status: 'Operational',
    commercialAvailability: 'Internal Only',
    verificationSource: 'Hypervisor Health Logs',
    lastVerified: 'October 2026',
    protocol: 'Proxmox VE / Linux KVM',
    details: 'Local compute node cluster powering TIV internal daemons and staging environments.',
  },
  {
    id: 'openmail-platform',
    name: 'OpenMail Communication Engine',
    category: 'Software Systems',
    operationalScope: 'Self-Hosted Mail Infrastructure & Relays',
    status: 'Operational',
    commercialAvailability: 'Public Open Source',
    verificationSource: 'v1.0.0 Stable Release',
    lastVerified: 'October 2026',
    protocol: 'SMTP / IMAP / TLS 1.3',
    details: 'Self-hosted email delivery infrastructure, asynchronous mail queues, and storage relays.',
  },
  {
    id: 'mercura-vcs',
    name: 'Mercura Code Intelligence & VCS',
    category: 'Software Systems',
    operationalScope: 'Repository Hosting & AST Code Intelligence',
    status: 'Operational',
    commercialAvailability: 'Public Open Source',
    verificationSource: 'v1.0.0 Stable Release',
    lastVerified: 'October 2026',
    protocol: 'Mercurial / Git / SSH / HTTPS',
    details: 'Distributed version control server and local-first semantic code exploration.',
  },
  {
    id: 'm31a-runtime',
    name: 'M31A Autonomous Software Engineering Runtime',
    category: 'Software Systems',
    operationalScope: 'Verifiable Developer Runtime & Policy Gates',
    status: 'Operational',
    commercialAvailability: 'Public Open Source',
    verificationSource: 'v1.0.0 Stable Release',
    lastVerified: 'October 2026',
    protocol: 'Rust Native / IPC',
    details: 'Deterministic policy evaluation runtime and sandboxed code execution gates.',
  },
  {
    id: 'octate-cli',
    name: 'Octate AI Code Review CLI',
    category: 'Software Systems',
    operationalScope: 'Deterministic Repository Intelligence & AST Parser',
    status: 'Operational',
    commercialAvailability: 'Public Open Source',
    verificationSource: 'v1.0.0 Stable Release (@tiverse/octate on npm)',
    lastVerified: 'October 2026',
    protocol: 'CLI / SARIF v2.1.0',
    details: 'Terminal-native code review CLI with Tree-sitter AST parsing and multi-stage verification.',
  },
];

export function LiveStatusDashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'facility' | 'platform' | 'software'>('all');

  const filteredComponents = useMemo(() => {
    if (activeTab === 'facility') {
      return SYSTEM_COMPONENTS.filter((c) => c.category === 'Facility Infrastructure');
    }
    if (activeTab === 'platform') {
      return SYSTEM_COMPONENTS.filter((c) => c.category === 'Core Platform');
    }
    if (activeTab === 'software') {
      return SYSTEM_COMPONENTS.filter((c) => c.category === 'Software Systems');
    }
    return SYSTEM_COMPONENTS;
  }, [activeTab]);

  const jayapuraFacility = DATA_CENTERS[0];

  return (
    <div className="space-y-10">
      {/* Telemetry & Provenance Disclose Banner */}
      <div className="border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="tiv-meta">INFRASTRUCTURE STATUS</span>
                <span className="border border-border bg-secondary px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                  Verified Engineering Records
                </span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Core Systems &amp; Sovereign Infrastructure Operational
              </h2>
              <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed max-w-2xl">
                Status indicators reflect verified physical facility deployments and shipped software platforms.
                Telemetry for internal infrastructure is maintained on sovereign private networks; public metrics
                represent verified baseline configurations rather than synthetic animations.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 border-t border-border pt-4 md:border-0 md:pt-0 text-xs font-mono">
            <span className="text-muted-foreground">Last Verified Audit</span>
            <span className="text-foreground font-semibold">October 2026</span>
            <span className="text-[10px] text-muted-foreground">Basis: Ground Truth Inspection</span>
          </div>
        </div>

        {/* Verified Facility Ground Truth Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-background/90 p-4">
            <span className="tiv-meta">SOVEREIGN FACILITY</span>
            <div className="mt-1 font-display text-xl font-bold text-foreground">Jayapura, Papua</div>
            <p className="text-[10px] font-mono text-emerald-400 mt-1">Confirmed Physical Facility (Operational)</p>
          </div>

          <div className="bg-background/90 p-4">
            <span className="tiv-meta">COMMERCIAL SCOPE</span>
            <div className="mt-1 font-display text-xl font-bold text-foreground">Private Inquiry</div>
            <p className="text-[10px] font-mono text-muted-foreground mt-1">No Retail Colocation Portal</p>
          </div>

          <div className="bg-background/90 p-4">
            <span className="tiv-meta">SHIPPED SOFTWARE</span>
            <div className="mt-1 font-display text-xl font-bold text-foreground">4 Stable Releases</div>
            <p className="text-[10px] font-mono text-muted-foreground mt-1">OpenMail, Mercura, M31A, Octate</p>
          </div>

          <div className="bg-background/90 p-4">
            <span className="tiv-meta">POWER ARCHITECTURE</span>
            <div className="mt-1 font-display text-xl font-bold text-foreground font-mono">2N Power / N+1</div>
            <p className="text-[10px] font-mono text-muted-foreground mt-1">Dual-Feed Generator Backup</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border border-border bg-card p-1 text-xs font-mono">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === 'all'
              ? 'bg-brand text-brand-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          All Monitored Targets ({SYSTEM_COMPONENTS.length})
        </button>
        <button
          onClick={() => setActiveTab('facility')}
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === 'facility'
              ? 'bg-brand text-brand-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Physical Facility (1)
        </button>
        <button
          onClick={() => setActiveTab('platform')}
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === 'platform'
              ? 'bg-brand text-brand-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Core Platform (3)
        </button>
        <button
          onClick={() => setActiveTab('software')}
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === 'software'
              ? 'bg-brand text-brand-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Software Systems (4)
        </button>
      </div>

      {/* Component Status Registry */}
      <div className="border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-4 md:p-6">
          <div>
            <span className="tiv-meta">VERIFIED OPERATIONAL REGISTRY</span>
            <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
              Infrastructure Components &amp; Software Health
            </h3>
          </div>
          <span className="font-mono text-xs text-muted-foreground border border-border bg-secondary px-2.5 py-1">
            {filteredComponents.length} Records Shown
          </span>
        </div>

        <div className="divide-y divide-border font-mono text-xs">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className="flex flex-col gap-3 p-4 transition-colors hover:bg-secondary/40 sm:p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <h4 className="font-display text-base font-semibold text-foreground">
                      {component.name}
                    </h4>
                    <span className="border border-border bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                      {component.category}
                    </span>
                    {component.protocol && (
                      <span className="border border-border/80 bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
                        {component.protocol}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-muted-foreground text-xs leading-relaxed max-w-3xl">
                    {component.details}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 self-start sm:self-auto shrink-0 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-muted-foreground block uppercase">Offering</span>
                    <span className="text-foreground">{component.commercialAvailability}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-muted-foreground block uppercase">Source</span>
                    <span className="text-muted-foreground">{component.verificationSource}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-muted-foreground block uppercase">Status</span>
                    <span className="text-emerald-400 font-semibold">{component.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ground Truth Facility Specification Panel */}
      {jayapuraFacility && (
        <div className="border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <span className="tiv-meta">OPERATIONAL PHYSICAL ASSET</span>
              <h4 className="font-display text-lg font-bold text-foreground mt-0.5">
                Jayapura Sovereign Facility Ground Truth
              </h4>
            </div>
            <Link
              href="/infrastructure/data-centers/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-brand hover:underline"
            >
              Facility Specification <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4 text-xs font-mono">
            <div className="bg-background/90 p-3.5">
              <span className="text-muted-foreground block text-[10px] uppercase">Facility Class</span>
              <span className="font-semibold text-foreground text-sm">{jayapuraFacility.tier} Architecture</span>
            </div>
            <div className="bg-background/90 p-3.5">
              <span className="text-muted-foreground block text-[10px] uppercase">Storage Capacity</span>
              <span className="font-semibold text-foreground text-sm">{jayapuraFacility.totalStorage} TB Storage Pool</span>
            </div>
            <div className="bg-background/90 p-3.5">
              <span className="text-muted-foreground block text-[10px] uppercase">Node Density</span>
              <span className="font-semibold text-foreground text-sm">{jayapuraFacility.specs.servers} Rackmount Servers</span>
            </div>
            <div className="bg-background/90 p-3.5">
              <span className="text-muted-foreground block text-[10px] uppercase">Carrier Transit</span>
              <span className="font-semibold text-foreground text-sm">Telkom / Indosat / Carrier Fiber</span>
            </div>
          </div>

          <p className="mt-4 text-xs font-mono text-muted-foreground leading-relaxed">
            <strong>Operational Scope vs Commercial Availability:</strong> The Jayapura facility hosts TIV internal infrastructure,
            mail servers, and authoritative domain services. No public colocation or retail self-service is offered; dedicated capacity
            for sovereign enterprise workloads is evaluated exclusively via <Link href="/contact/" className="text-brand hover:underline">direct inquiry</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
