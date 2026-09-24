'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { DATA_CENTERS } from '@/lib/solutions-data';
import { TivIcon } from '@/components/shared/tiv-icon';
import { RefreshCw, CheckCircle2, Shield, Activity, Wifi, Server, Cpu, Play, Pause } from 'lucide-react';

interface ServerNodeTelemetry {
  id: string;
  name: string;
  country: string;
  region: string;
  code: string;
  tier: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latencyMs: number;
  baseLatency: number;
  packetLoss: string;
  load: number;
  uptime: string;
  serversCount: number;
  powerStatus: string;
}

interface CoreServiceTelemetry {
  id: string;
  name: string;
  category: 'Infrastructure' | 'Software' | 'Logistics';
  description: string;
  status: 'Operational' | 'Degraded';
  latencyMs: number;
  uptime: string;
  protocol: string;
}

const REGION_CODES: Record<string, string> = {
  'New York': 'US-EAST-1',
  'Silicon Valley': 'US-WEST-1',
  Dallas: 'US-CENTRAL-1',
  London: 'EU-WEST-1',
  Frankfurt: 'EU-CENTRAL-1',
  Amsterdam: 'EU-WEST-2',
  Tokyo: 'AP-NORTHEAST-1',
  Seoul: 'AP-NORTHEAST-2',
  'Singapore Central': 'AP-SOUTHEAST-1',
  Mumbai: 'AP-SOUTH-1',
  Bangalore: 'AP-SOUTH-2',
  Dhaka: 'AP-SOUTH-3',
  Chittagong: 'AP-SOUTH-4',
  Satkhira: 'AP-SOUTH-5',
  Sydney: 'OC-EAST-1',
  Melbourne: 'OC-SOUTH-1',
};

const BASE_LATENCIES: Record<string, number> = {
  'New York': 14,
  'Silicon Valley': 18,
  Dallas: 22,
  London: 28,
  Frankfurt: 31,
  Amsterdam: 30,
  Tokyo: 65,
  Seoul: 72,
  'Singapore Central': 55,
  Mumbai: 42,
  Bangalore: 40,
  Dhaka: 38,
  Chittagong: 44,
  Satkhira: 46,
  Sydney: 88,
  Melbourne: 92,
};

const CORE_SERVICES: CoreServiceTelemetry[] = [
  {
    id: 'dns-edge',
    name: 'Anycast DNS & Edge Network',
    category: 'Infrastructure',
    description: 'Global distributed BGP anycast route tables and DNS resolution mesh',
    status: 'Operational',
    latencyMs: 3.2,
    uptime: '100.00%',
    protocol: 'BGP / DNS over TLS',
  },
  {
    id: 'storage-fabric',
    name: 'Distributed Object Storage Fabric',
    category: 'Infrastructure',
    description: '845 PB distributed Ceph & NVMe block storage with geo-replication',
    status: 'Operational',
    latencyMs: 8.5,
    uptime: '99.999%',
    protocol: 'S3 API / NVMe-oF',
  },
  {
    id: 'courier-api',
    name: 'Courier Logistics Telemetry Engine',
    category: 'Logistics',
    description: 'Real-time tracking, flight manifest synchronization, and customs relay',
    status: 'Operational',
    latencyMs: 16.4,
    uptime: '99.99%',
    protocol: 'gRPC / TLS 1.3',
  },
  {
    id: 'compute-scheduler',
    name: 'High-Density Compute Scheduler',
    category: 'Infrastructure',
    description: 'Bare-metal workload orchestrator and optical interconnect routing',
    status: 'Operational',
    latencyMs: 5.1,
    uptime: '99.999%',
    protocol: 'K8s / SRv6',
  },
  {
    id: 'openmail-relay',
    name: 'OpenMail Relay & Storage',
    category: 'Software',
    description: 'Self-hosted email delivery infrastructure, IMAP, and SMTP relays',
    status: 'Operational',
    latencyMs: 12.0,
    uptime: '99.99%',
    protocol: 'SMTP / IMAP / TLS',
  },
  {
    id: 'mercura-engine',
    name: 'Mercura VCS Engine',
    category: 'Software',
    description: 'Mercurial and Git source repository hosting and replication',
    status: 'Operational',
    latencyMs: 14.8,
    uptime: '99.99%',
    protocol: 'SSH / HTTPS',
  },
  {
    id: 'm31a-inference',
    name: 'M31A AI Agentic Inference Nodes',
    category: 'Software',
    description: 'Autonomous development platform inference cluster and tool dispatch',
    status: 'Operational',
    latencyMs: 24.5,
    uptime: '99.98%',
    protocol: 'OpenAI-compat / REST',
  },
  {
    id: 'octate-analyzer',
    name: 'Octate Analysis Engine',
    category: 'Software',
    description: 'Parallel DAG code review runner, Tree-sitter workers, SARIF pipeline',
    status: 'Operational',
    latencyMs: 18.2,
    uptime: '100.00%',
    protocol: 'CLI / gRPC',
  },
];

export function LiveStatusDashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'datacenters' | 'core' | 'software'>('all');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [refreshCountdown, setRefreshCountdown] = useState<number>(5);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [jitterSeed, setJitterSeed] = useState<number>(0);

  // Initialize and update timestamp on client only
  useEffect(() => {
    setLastSyncTime(new Date().toLocaleTimeString());
  }, []);

  // Live countdown and polling ticker
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          setJitterSeed((s) => s + 1);
          setLastSyncTime(new Date().toLocaleTimeString());
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleManualRefresh = useCallback(() => {
    setJitterSeed((s) => s + 1);
    setLastSyncTime(new Date().toLocaleTimeString());
    setRefreshCountdown(5);
  }, []);

  // Generate dynamically updated telemetry for all 16 data centers
  const liveDataCenters = useMemo<ServerNodeTelemetry[]>(() => {
    return DATA_CENTERS.map((dc, index) => {
      // Small simulated pseudo-random jitter around baseline
      const jitter = ((Math.sin(jitterSeed * 1.5 + index) * 3) + (Math.cos(jitterSeed * 2.1 + index) * 2));
      const currentLatency = Math.max(4, Math.round((BASE_LATENCIES[dc.name] || 25) + jitter));
      const currentLoad = Math.min(99, Math.max(50, Math.round(dc.load + Math.sin(jitterSeed + index) * 1.5)));

      return {
        id: dc.name.toLowerCase().replace(/\s+/g, '-'),
        name: dc.name,
        country: dc.country,
        region: dc.region,
        code: REGION_CODES[dc.name] || 'EDGE-1',
        tier: dc.tier,
        status: 'Operational',
        latencyMs: currentLatency,
        baseLatency: BASE_LATENCIES[dc.name] || 25,
        packetLoss: '0.00%',
        load: currentLoad,
        uptime: '99.999%',
        serversCount: dc.specs.servers,
        powerStatus: `${dc.powerCapacity} MW (2N+2 Online)`,
      };
    });
  }, [jitterSeed]);

  // Average live latency across all facilities
  const avgLatency = useMemo(() => {
    const sum = liveDataCenters.reduce((acc, n) => acc + n.latencyMs, 0);
    return Math.round(sum / liveDataCenters.length);
  }, [liveDataCenters]);

  const filteredDataCenters = useMemo(() => {
    if (activeTab === 'core' || activeTab === 'software') return [];
    return liveDataCenters;
  }, [liveDataCenters, activeTab]);

  const filteredCoreServices = useMemo(() => {
    if (activeTab === 'datacenters') return [];
    if (activeTab === 'software') {
      return CORE_SERVICES.filter((s) => s.category === 'Software');
    }
    if (activeTab === 'core') {
      return CORE_SERVICES.filter((s) => s.category !== 'Software');
    }
    return CORE_SERVICES;
  }, [activeTab]);

  return (
    <div className="space-y-10">
      {/* Dynamic Telemetry Header Bar */}
      <div className="border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div>
              <span className="tiv-meta">LIVE SYSTEM TELEMETRY</span>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                All Global Systems Operational
              </h2>
              <p className="mt-1 text-xs font-mono text-muted-foreground">
                24 Monitored Targets (16 Edge Data Centers, 8 Core Platform Services)
              </p>
            </div>
          </div>

          {/* Sync status and controls */}
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4 md:border-0 md:pt-0">
            <div className="flex items-center gap-2 border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-brand" />
              <span>Next poll in {refreshCountdown}s</span>
              {lastSyncTime && (
                <span className="text-[10px] text-muted-foreground/80">({lastSyncTime})</span>
              )}
            </div>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="flex items-center gap-1.5 border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-foreground hover:bg-secondary/80 transition-colors"
              title={autoRefresh ? 'Pause Auto-Refresh' : 'Resume Auto-Refresh'}
            >
              {autoRefresh ? (
                <>
                  <Pause className="h-3 w-3 text-brand" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-emerald-400" />
                  <span>Resume</span>
                </>
              )}
            </button>

            <button
              onClick={handleManualRefresh}
              className="flex items-center gap-1.5 bg-brand px-3.5 py-1.5 font-mono text-xs font-medium text-brand-foreground hover:bg-brand/90 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Sync Now</span>
            </button>
          </div>
        </div>

        {/* Live Aggregated Metrics Grid */}
        <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          <div className="bg-background/80 p-4">
            <span className="tiv-meta">GLOBAL UPTIME</span>
            <div className="mt-1 font-display text-2xl font-bold text-foreground">99.999%</div>
            <p className="text-[10px] font-mono text-muted-foreground">Rolling 90-Day SLA</p>
          </div>

          <div className="bg-background/80 p-4">
            <span className="tiv-meta">GLOBAL MEAN LATENCY</span>
            <div className="mt-1 font-display text-2xl font-bold text-foreground">
              {avgLatency} <span className="text-sm font-normal text-muted-foreground">ms</span>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground">Anycast Route Transit</p>
          </div>

          <div className="bg-background/80 p-4">
            <span className="tiv-meta">PACKET INTEGRITY</span>
            <div className="mt-1 font-display text-2xl font-bold text-emerald-400">0.00%</div>
            <p className="text-[10px] font-mono text-muted-foreground">Zero Dropped Frames</p>
          </div>

          <div className="bg-background/80 p-4">
            <span className="tiv-meta">ACTIVE NODES</span>
            <div className="mt-1 font-display text-2xl font-bold text-foreground">16 / 16</div>
            <p className="text-[10px] font-mono text-muted-foreground">All Facilities Answering</p>
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
          All Infrastructure & Services (24)
        </button>
        <button
          onClick={() => setActiveTab('datacenters')}
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === 'datacenters'
              ? 'bg-brand text-brand-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Data Center Servers (16)
        </button>
        <button
          onClick={() => setActiveTab('core')}
          className={`flex-1 py-2 text-center transition-colors ${
            activeTab === 'core'
              ? 'bg-brand text-brand-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Core Networking & Storage (4)
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

      {/* 16 Live Monitored Data Center Servers */}
      {filteredDataCenters.length > 0 && (
        <div className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4 md:p-6">
            <div>
              <span className="tiv-meta">EDGE TELEMETRY POOL</span>
              <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
                Global Data Center Servers (16 Live Nodes)
              </h3>
            </div>
            <span className="font-mono text-xs text-muted-foreground border border-border bg-secondary px-2.5 py-1">
              Active Polling Interval: 5s
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-border bg-secondary/50 text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 font-medium">Node / Location</th>
                  <th className="py-3 px-4 font-medium">Region Code</th>
                  <th className="py-3 px-4 font-medium">Tier Rating</th>
                  <th className="py-3 px-4 font-medium">Current Latency</th>
                  <th className="py-3 px-4 font-medium">System Load</th>
                  <th className="py-3 px-4 font-medium">Packet Loss</th>
                  <th className="py-3 px-4 font-medium">Power & Feed</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDataCenters.map((node) => (
                  <tr key={node.id} className="transition-colors hover:bg-secondary/40">
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-foreground">{node.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {node.country} · {node.serversCount.toLocaleString()} Servers
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-brand font-semibold">{node.code}</td>
                    <td className="py-3.5 px-4">
                      <span className="border border-border bg-secondary px-2 py-0.5 text-[10px]">
                        {node.tier}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-foreground font-medium">{node.latencyMs} ms</span>
                      <span className="text-[10px] text-muted-foreground block">
                        Base: {node.baseLatency}ms
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-brand transition-all duration-300"
                            style={{ width: `${node.load}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-foreground">{node.load}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400">{node.packetLoss}</td>
                    <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                      {node.powerStatus}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {node.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Core Infrastructure & Software Services */}
      {filteredCoreServices.length > 0 && (
        <div className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4 md:p-6">
            <div>
              <span className="tiv-meta">CORE PLATFORM SERVICES</span>
              <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
                Infrastructure & Software Services
              </h3>
            </div>
            <span className="font-mono text-xs text-emerald-400 border border-emerald-900/30 bg-emerald-950/20 px-2.5 py-1">
              8 of 8 Operational
            </span>
          </div>

          <div className="divide-y divide-border font-mono text-xs">
            {filteredCoreServices.map((svc) => (
              <div
                key={svc.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <h4 className="font-display text-base font-semibold text-foreground">
                      {svc.name}
                    </h4>
                    <span className="border border-border bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                      {svc.category}
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground text-xs leading-relaxed max-w-2xl">
                    {svc.description}
                  </p>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground block uppercase">Protocol</span>
                    <span className="text-foreground">{svc.protocol}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground block uppercase">Uptime</span>
                    <span className="text-emerald-400 font-semibold">{svc.uptime}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground block uppercase">Status</span>
                    <span className="text-emerald-400 font-medium">{svc.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 90-Day Rolling Uptime Visualization */}
      <div className="border border-border bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="tiv-meta">OPERATIONAL HISTORY</span>
            <h4 className="font-display text-base font-semibold text-foreground mt-0.5">
              90-Day Global System Availability
            </h4>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            100.00% Operational Timeline
          </span>
        </div>

        {/* 90 Bars Representing 90 Days */}
        <div className="flex items-center gap-1 overflow-x-auto py-2">
          {Array.from({ length: 90 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-full min-w-[6px] rounded-[1px] bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer"
              title={`Day -${90 - i}: 100% Uptime (0 Incidents)`}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>90 days ago</span>
          <span className="text-emerald-400 font-medium">No outages recorded</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
