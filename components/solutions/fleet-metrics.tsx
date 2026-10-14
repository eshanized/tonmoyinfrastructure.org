'use client';

import { TivIcon } from '@/components/shared/tiv-icon';
import { DATA_CENTERS } from '@/lib/solutions-data';

export function FleetMetrics() {
  const facility = DATA_CENTERS[0];
  const totalStorageTB = facility ? facility.totalStorage : 120;
  const usedStorageTB = facility ? facility.usedStorage : 84;
  const loadPercentage = facility ? facility.load : 70;

  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Facility Status */}
      <div className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="tiv-meta">FACILITY STATUS</span>
          <div className="flex h-8 w-8 items-center justify-center border border-border text-brand">
            <TivIcon name="shield" size={16} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Sovereign Facility Online
          </span>
        </div>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          Jayapura, Papua, Indonesia · Operational Facility
        </p>
      </div>

      {/* 2. Total Storage Capacity */}
      <div className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="tiv-meta">STORAGE POOL</span>
          <div className="flex h-8 w-8 items-center justify-center border border-border text-brand">
            <TivIcon name="database" size={16} />
          </div>
        </div>
        <div className="mt-4">
          <span className="font-display text-3xl font-bold tracking-tight text-foreground">
            {totalStorageTB} <span className="text-xl font-normal text-muted-foreground">TB</span>
          </span>
        </div>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          {usedStorageTB} TB Allocated ({Math.round((usedStorageTB / (totalStorageTB || 1)) * 100)}% Internal Workloads)
        </p>
      </div>

      {/* 3. Facility Utilization */}
      <div className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="tiv-meta">COMPUTE UTILIZATION</span>
          <div className="flex h-8 w-8 items-center justify-center border border-border text-brand">
            <TivIcon name="chart" size={16} />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-3xl font-bold tracking-tight text-foreground">
            {loadPercentage}%
          </span>
          <span className="text-xs font-mono text-muted-foreground">Operational Allocation</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden bg-secondary">
          <div
            className="h-full bg-brand transition-all duration-500"
            style={{ width: `${loadPercentage}%` }}
          />
        </div>
      </div>

      {/* 4. Power & Redundancy */}
      <div className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="tiv-meta">POWER &amp; RESILIENCE</span>
          <div className="flex h-8 w-8 items-center justify-center border border-border text-brand">
            <TivIcon name="network" size={16} />
          </div>
        </div>
        <div className="mt-4">
          <span className="font-display text-3xl font-bold tracking-tight text-foreground font-mono">
            2N + N+1
          </span>
        </div>
        <p className="mt-2 text-xs font-mono text-muted-foreground">
          Dual Bus Power &amp; On-Site Generator Backup
        </p>
      </div>
    </div>
  );
}
