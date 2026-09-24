'use client';

import { TivIcon } from '@/components/shared/tiv-icon';
import { DATA_CENTERS } from '@/lib/solutions-data';

export function FleetMetrics() {
  const totalStorageTB = DATA_CENTERS.reduce((acc, dc) => acc + dc.totalStorage, 0);
  const usedStorageTB = DATA_CENTERS.reduce((acc, dc) => acc + dc.usedStorage, 0);
  const totalStoragePB = (totalStorageTB / 1000).toFixed(1);
  const usedStoragePB = (usedStorageTB / 1000).toFixed(1);
  const averageLoad = Math.round(
    DATA_CENTERS.reduce((acc, dc) => acc + dc.load, 0) / DATA_CENTERS.length
  );

  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Security & System Status */}
      <div className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="tiv-meta">SYSTEM STATUS</span>
          <div className="flex h-8 w-8 items-center justify-center border border-border text-brand">
            <TivIcon name="shield" size={16} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            All Systems Operational
          </span>
        </div>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          16 of 16 Facilities Online · Continuous Monitoring
        </p>
      </div>

      {/* 2. Total Fleet Capacity */}
      <div className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="tiv-meta">STORAGE FLEET</span>
          <div className="flex h-8 w-8 items-center justify-center border border-border text-brand">
            <TivIcon name="database" size={16} />
          </div>
        </div>
        <div className="mt-4">
          <span className="font-display text-3xl font-bold tracking-tight text-foreground">
            {totalStoragePB} <span className="text-xl font-normal text-muted-foreground">PB</span>
          </span>
        </div>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          {usedStoragePB} PB Active ({Math.round((usedStorageTB / totalStorageTB) * 100)}% Alloc.)
        </p>
      </div>

      {/* 3. Fleet Utilization */}
      <div className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="tiv-meta">LOAD BALANCING</span>
          <div className="flex h-8 w-8 items-center justify-center border border-border text-brand">
            <TivIcon name="chart" size={16} />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-3xl font-bold tracking-tight text-foreground">
            {averageLoad}%
          </span>
          <span className="text-xs font-mono text-muted-foreground">Mean Fleet Load</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden bg-secondary">
          <div
            className="h-full bg-brand transition-all duration-500"
            style={{ width: `${averageLoad}%` }}
          />
        </div>
      </div>

      {/* 4. Network Uptime */}
      <div className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="tiv-meta">RELIABILITY SLA</span>
          <div className="flex h-8 w-8 items-center justify-center border border-border text-brand">
            <TivIcon name="network" size={16} />
          </div>
        </div>
        <div className="mt-4">
          <span className="font-display text-3xl font-bold tracking-tight text-foreground font-mono">
            99.999%
          </span>
        </div>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          Past 30-Day Rolling Ingress/Egress Availability
        </p>
      </div>
    </div>
  );
}
