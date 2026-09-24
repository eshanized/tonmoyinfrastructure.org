'use client';

import { useState } from 'react';
import { COURIER_HUBS, COURIER_METRICS, COURIER_SERVICES, type CourierHub } from '@/lib/solutions-data';
import { TivIcon } from '@/components/shared/tiv-icon';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function CourierNetworkExplorer() {
  const [selectedHub, setSelectedHub] = useState<CourierHub | null>(null);

  const mapWidth = 900;
  const mapHeight = 440;
  const projectCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * mapWidth;
    const y = ((90 - lat) / 180) * mapHeight;
    return { x, y };
  };

  return (
    <div className="space-y-12">
      {/* 4 Performance Metrics Grid */}
      <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {COURIER_METRICS.map((kpi) => (
          <div key={kpi.label} className="bg-card p-6 md:p-8">
            <span className="tiv-meta">{kpi.label.toUpperCase()}</span>
            <div className="mt-4">
              <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                {kpi.value}
              </span>
            </div>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
              {kpi.description}
            </p>
          </div>
        ))}
      </div>

      {/* Global Courier Route Mesh Map */}
      <div className="border border-border bg-card p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div>
            <span className="tiv-meta">INTER-HUB AIR & FREIGHT CORRIDORS</span>
            <h3 className="font-display text-lg font-semibold text-foreground mt-0.5">
              17-Nation Direct Transit Network
            </h3>
          </div>
          <span className="font-mono text-xs text-muted-foreground border border-border px-2.5 py-1">
            GDP & ISO 9001 Audited Facilities
          </span>
        </div>

        <div className="relative w-full overflow-hidden border border-border bg-background">
          <svg
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            className="h-auto w-full select-none"
            role="img"
            aria-label="Interactive world map showing 17 TIV international courier logistics hubs and connected flight transit corridors"
          >
            <defs>
              <linearGradient id="corridorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--border)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="var(--brand)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--border)" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Latitude / Longitude hairline grid */}
            {[-60, -30, 0, 30, 60].map((lat) => {
              const y = ((90 - lat) / 180) * mapHeight;
              return (
                <line
                  key={`courier-lat-${lat}`}
                  x1="0"
                  y1={y}
                  x2={mapWidth}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              );
            })}
            {[-120, -60, 0, 60, 120].map((lng) => {
              const x = ((lng + 180) / 360) * mapWidth;
              return (
                <line
                  key={`courier-lng-${lng}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2={mapHeight}
                  stroke="var(--border)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Flight / Transit Corridors connecting hubs */}
            {COURIER_HUBS.map((hubA, i) => {
              const posA = projectCoords(hubA.lat, hubA.lng);
              return COURIER_HUBS.slice(i + 1).map((hubB) => {
                const posB = projectCoords(hubB.lat, hubB.lng);
                const isConnectedToSelected =
                  selectedHub && (selectedHub.name === hubA.name || selectedHub.name === hubB.name);

                // Curved quadratic bezier arc
                const midX = (posA.x + posB.x) / 2;
                const midY = (posA.y + posB.y) / 2 - 25;

                return (
                  <path
                    key={`corridor-${hubA.name}-${hubB.name}`}
                    d={`M ${posA.x} ${posA.y} Q ${midX} ${midY} ${posB.x} ${posB.y}`}
                    fill="none"
                    stroke={isConnectedToSelected ? 'var(--brand)' : 'var(--border)'}
                    strokeWidth={isConnectedToSelected ? 1.5 : 0.6}
                    opacity={isConnectedToSelected ? 0.9 : 0.25}
                  />
                );
              });
            })}

            {/* Hub Pins */}
            {COURIER_HUBS.map((hub) => {
              const { x, y } = projectCoords(hub.lat, hub.lng);
              const isSelected = selectedHub?.name === hub.name;

              return (
                <g
                  key={hub.name}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer"
                  onClick={() => setSelectedHub(hub)}
                >
                  {isSelected && (
                    <circle r="12" fill="var(--brand)" opacity="0.3" className="animate-ping" />
                  )}
                  <circle
                    r={isSelected ? 7 : 4.5}
                    fill="var(--card)"
                    stroke="var(--brand)"
                    strokeWidth={isSelected ? 2 : 1.2}
                  />
                  <circle r={isSelected ? 3.5 : 2} fill="var(--brand)" />
                  <text
                    x="8"
                    y="4"
                    fill="var(--foreground)"
                    fontSize="9.5"
                    fontFamily="var(--font-jetbrains)"
                    fontWeight={isSelected ? '600' : '400'}
                    className="pointer-events-none drop-shadow"
                  >
                    {hub.country}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Active Hub Card Overlay */}
          {selectedHub && (
            <div className="absolute bottom-4 left-4 right-4 z-20 border border-brand bg-card/95 p-4 backdrop-blur sm:bottom-6 sm:left-auto sm:right-6 sm:w-96">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-brand tracking-widest uppercase">
                    {selectedHub.region} Gateway
                  </span>
                  <h4 className="font-display text-lg font-bold text-foreground">
                    {selectedHub.name}
                  </h4>
                  <p className="text-xs font-mono text-muted-foreground">{selectedHub.country}</p>
                </div>
                <button
                  onClick={() => setSelectedHub(null)}
                  className="font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground">Status:</span>{' '}
                  <span className="text-emerald-400 font-semibold">{selectedHub.status}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Hub Load:</span>{' '}
                  <span className="text-foreground">{selectedHub.load}%</span>
                </div>
              </div>

              <div className="mt-3 border-t border-border pt-2">
                <span className="text-[10px] font-mono text-muted-foreground block mb-1">
                  Local Delivery Partners:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedHub.partners.map((p) => (
                    <span
                      key={p}
                      className="border border-border bg-secondary px-2 py-0.5 text-[10px] font-mono text-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex gap-1 border-t border-border pt-2">
                {selectedHub.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="border border-emerald-900/40 bg-emerald-950/20 px-2 py-0.5 text-[9px] font-mono text-emerald-400"
                  >
                    {cert} Certified
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3 Core Service Pillars */}
      <div>
        <div className="mb-6">
          <span className="tiv-meta">SERVICE ARCHITECTURE</span>
          <h3 className="font-display text-2xl font-bold tracking-tight text-foreground mt-1">
            Global Logistics Pillars
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
          {COURIER_SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="group relative bg-card p-6 md:p-8 transition-colors hover:bg-card/80"
            >
              <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              <div className="flex items-center justify-between">
                <span className="tiv-meta">{svc.tagline}</span>
                <div className="flex h-7 w-7 items-center justify-center border border-border text-brand">
                  <TivIcon name="truck" size={14} />
                </div>
              </div>
              <h4 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-brand transition-colors">
                {svc.title}
              </h4>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {svc.description}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-border pt-4">
                {svc.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-xs font-mono text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-brand shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 17 Hubs Interactive Directory Table */}
      <div className="border border-border bg-card">
        <div className="border-b border-border p-4 md:p-6 flex items-center justify-between">
          <div>
            <span className="tiv-meta">DISTRIBUTION DIRECTORY</span>
            <h4 className="font-display text-lg font-semibold text-foreground mt-0.5">
              17 Operational Hub Facilities
            </h4>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-xs font-mono text-brand hover:underline"
          >
            Custom Route Logistics <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-border bg-secondary/50 text-muted-foreground">
              <tr>
                <th className="py-3 px-4 font-medium">Facility / Hub</th>
                <th className="py-3 px-4 font-medium">Country</th>
                <th className="py-3 px-4 font-medium">Region</th>
                <th className="py-3 px-4 font-medium">SLA Standard</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Primary Carrier Partners</th>
                <th className="py-3 px-4 font-medium text-right">Audit Standards</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COURIER_HUBS.map((hub) => (
                <tr
                  key={hub.name}
                  onClick={() => setSelectedHub(hub)}
                  className="cursor-pointer transition-colors hover:bg-secondary/40"
                >
                  <td className="py-3 px-4 font-medium text-foreground">{hub.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{hub.country}</td>
                  <td className="py-3 px-4 text-muted-foreground">{hub.region}</td>
                  <td className="py-3 px-4 text-brand font-semibold">48h SLA</td>
                  <td className="py-3 px-4 text-emerald-400">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {hub.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{hub.partners.join(', ')}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="border border-border bg-secondary px-2 py-0.5 text-[10px]">
                      {hub.certifications.join(' · ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
