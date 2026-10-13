import * as React from 'react';
import {
  Server,
  Network,
  ShieldCheck,
  Zap,
  Thermometer,
  Wrench,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import type { InfrastructureArea } from '@/lib/types';

interface DataCenterAreasProps {
  areas?: InfrastructureArea[];
}

const areaIcons: Record<string, React.ElementType> = {
  server: Server,
  network: Network,
  shield: ShieldCheck,
  zap: Zap,
  thermometer: Thermometer,
  wrench: Wrench,
  compute: Cpu,
};

export function DataCenterAreas({ areas = [] }: DataCenterAreasProps) {
  if (!areas || areas.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {areas.map((area, idx) => {
        const Icon = areaIcons[area.iconName || 'server'] || Server;

        return (
          <article
            key={area.id}
            className="flex flex-col border border-border bg-card p-6 transition-colors hover:border-brand/40"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-border text-brand bg-brand/5">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5">
                0{idx + 1}
              </span>
            </div>

            <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
              {area.title}
            </h3>

            {/* Purpose */}
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {area.purpose}
            </p>

            {/* Core Principles */}
            {area.principles && area.principles.length > 0 && (
              <div className="mt-5 border-t border-border/60 pt-4">
                <span className="tiv-meta mb-2.5 block text-[11px]">Engineering Principles</span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {area.principles.map((principle) => (
                    <li key={principle} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 bg-brand rounded-full" />
                      <span className="leading-snug">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Operational Considerations */}
            {area.operationalConsiderations && area.operationalConsiderations.length > 0 && (
              <div className="mt-4 border-t border-border/60 pt-4">
                <span className="tiv-meta mb-2.5 block text-[11px]">Operational Considerations</span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {area.operationalConsiderations.map((consideration) => (
                    <li key={consideration} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 bg-muted-foreground rounded-full" />
                      <span className="leading-snug">{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confirmed Implementation Scope */}
            {area.confirmedScope && (
              <div className="mt-auto pt-5">
                <div className="border border-border bg-secondary/40 p-3 text-xs text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-medium text-foreground block mb-0.5">Confirmed Scope</span>
                    <span className="text-[11px] leading-tight block">{area.confirmedScope}</span>
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
