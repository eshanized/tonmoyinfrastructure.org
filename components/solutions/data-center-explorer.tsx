'use client';

import { useState, useMemo } from 'react';
import { DATA_CENTERS, type DataCenterFacility } from '@/lib/solutions-data';
import { TivIcon } from '@/components/shared/tiv-icon';
import { Search } from 'lucide-react';

export function DataCenterExplorer() {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFacility, setActiveFacility] = useState<DataCenterFacility | null>(null);

  const countries = useMemo(() => {
    return ['All', ...Array.from(new Set(DATA_CENTERS.map((dc) => dc.country)))];
  }, []);

  const filteredDataCenters = useMemo(() => {
    return DATA_CENTERS.filter((dc) => {
      const matchesCountry = selectedCountry === 'All' || dc.country === selectedCountry;
      const matchesSearch =
        searchQuery === '' ||
        dc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dc.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dc.networkProviders.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCountry && matchesSearch;
    });
  }, [selectedCountry, searchQuery]);

  // Equirectangular projection coordinates
  const mapWidth = 900;
  const mapHeight = 440;
  const projectCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * mapWidth;
    const y = ((90 - lat) / 180) * mapHeight;
    return { x, y };
  };

  const getLoadColor = (load: number) => {
    if (load < 80) return '#10b981'; // emerald
    if (load < 88) return '#f59e0b'; // amber
    return 'hsl(var(--brand))'; // coral brand
  };

  return (
    <div className="space-y-10">
      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => {
                setSelectedCountry(c);
                setActiveFacility(null);
              }}
              className={`px-3 py-1.5 text-xs font-mono transition-all ${
                selectedCountry === c
                  ? 'bg-brand text-brand-foreground font-semibold'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search city, carrier, region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-border bg-background py-1.5 pl-8 pr-3 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {/* Interactive Global Vector Topology Map */}
      <div className="border border-border bg-card p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="tiv-meta">GLOBAL GEODESIC GRID</span>
            <span className="font-mono text-xs text-muted-foreground">
              ({filteredDataCenters.length} Active Nodes Displayed)
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> &lt;80% Load
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> 80-87% Load
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand" /> 88%+ Load
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden border border-border bg-background">
          <svg
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            className="h-auto w-full select-none"
            role="img"
            aria-label="Interactive world map showing 16 global enterprise data center locations"
          >
            {/* Latitude and Longitude Grid Lines */}
            {[-60, -30, 0, 30, 60].map((lat) => {
              const y = ((90 - lat) / 180) * mapHeight;
              return (
                <line
                  key={`lat-${lat}`}
                  x1="0"
                  y1={y}
                  x2={mapWidth}
                  y2={y}
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              );
            })}
            {[-120, -60, 0, 60, 120].map((lng) => {
              const x = ((lng + 180) / 360) * mapWidth;
              return (
                <line
                  key={`lng-${lng}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2={mapHeight}
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Connecting Peering Backbones (Inter-node transit lines) */}
            {filteredDataCenters.map((fromDc, i) => {
              const from = projectCoords(fromDc.lat, fromDc.lng);
              return filteredDataCenters.slice(i + 1, i + 3).map((toDc) => {
                const to = projectCoords(toDc.lat, toDc.lng);
                return (
                  <line
                    key={`link-${fromDc.name}-${toDc.name}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    opacity="0.4"
                  />
                );
              });
            })}

            {/* Plotted Data Center Facility Pins */}
            {filteredDataCenters.map((dc) => {
              const { x, y } = projectCoords(dc.lat, dc.lng);
              const isSelected = activeFacility?.name === dc.name;
              const pinColor = getLoadColor(dc.load);

              return (
                <g
                  key={dc.name}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setActiveFacility(dc)}
                >
                  {/* Ping effect on selected or active node */}
                  {isSelected && (
                    <circle r="14" fill={pinColor} opacity="0.25" className="animate-ping" />
                  )}
                  {/* Outer ring */}
                  <circle
                    r={isSelected ? '8' : '5'}
                    fill="hsl(var(--card))"
                    stroke={pinColor}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                  />
                  {/* Center dot */}
                  <circle r={isSelected ? '3.5' : '2'} fill={pinColor} />

                  {/* Label */}
                  <text
                    x="8"
                    y="4"
                    fill="hsl(var(--foreground))"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains)"
                    fontWeight={isSelected ? '600' : '400'}
                    className="pointer-events-none drop-shadow"
                  >
                    {dc.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Active Facility Focus Card (Overlay when node selected) */}
          {activeFacility && (
            <div className="absolute bottom-4 left-4 right-4 z-20 border border-brand bg-card/95 p-4 backdrop-blur sm:bottom-6 sm:left-auto sm:right-6 sm:w-96">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-brand tracking-widest uppercase">
                    {activeFacility.region} · {activeFacility.country}
                  </span>
                  <h4 className="font-display text-lg font-bold text-foreground">
                    {activeFacility.name}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveFacility(null)}
                  className="font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground">Tier:</span>{' '}
                  <span className="text-foreground font-semibold">{activeFacility.tier}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Redundancy:</span>{' '}
                  <span className="text-foreground">{activeFacility.redundancy}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Power:</span>{' '}
                  <span className="text-foreground">{activeFacility.powerCapacity} MW</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Load:</span>{' '}
                  <span style={{ color: getLoadColor(activeFacility.load) }}>
                    {activeFacility.load}%
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Servers:</span>{' '}
                  <span className="text-foreground">
                    {activeFacility.specs.servers.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Storage:</span>{' '}
                  <span className="text-foreground">
                    {(activeFacility.totalStorage / 1000).toFixed(1)} PB
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1 border-t border-border pt-2">
                {activeFacility.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="border border-border bg-secondary px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Center Facilities Grid */}
      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {filteredDataCenters.map((dc) => (
          <div
            key={dc.name}
            className="group relative bg-card p-6 transition-colors hover:bg-card/80"
          >
            <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />

            <div className="flex items-start justify-between">
              <div>
                <span className="tiv-meta">{dc.region}</span>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-brand transition-colors">
                  {dc.name}
                </h3>
                <p className="text-xs font-mono text-muted-foreground">{dc.country}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="border border-border bg-secondary px-2 py-0.5 font-mono text-xs font-medium text-foreground">
                  {dc.tier}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {dc.status}
                </span>
              </div>
            </div>

            {/* Key Facility Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs font-mono">
              <div className="border border-border/60 bg-background/50 p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TivIcon name="server" size={13} />
                  <span>Servers</span>
                </div>
                <p className="mt-1 font-display text-base font-semibold text-foreground">
                  {dc.specs.servers.toLocaleString()}
                </p>
              </div>

              <div className="border border-border/60 bg-background/50 p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TivIcon name="shield" size={13} />
                  <span>Redundancy</span>
                </div>
                <p className="mt-1 font-display text-base font-semibold text-foreground">
                  {dc.redundancy}
                </p>
              </div>

              <div className="border border-border/60 bg-background/50 p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TivIcon name="cpu" size={13} />
                  <span>Power Cap.</span>
                </div>
                <p className="mt-1 font-display text-base font-semibold text-foreground">
                  {dc.powerCapacity} MW
                </p>
              </div>

              <div className="border border-border/60 bg-background/50 p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TivIcon name="boxes" size={13} />
                  <span>Racks</span>
                </div>
                <p className="mt-1 font-display text-base font-semibold text-foreground">
                  {dc.specs.racks.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Load and Storage Bars */}
            <div className="mt-5 space-y-3 border-t border-border pt-4 text-xs font-mono">
              <div>
                <div className="flex justify-between text-muted-foreground">
                  <span>System Load</span>
                  <span className="text-foreground font-semibold">{dc.load}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full bg-secondary">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${dc.load}%`,
                      backgroundColor: getLoadColor(dc.load),
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Capacity Allocation</span>
                  <span className="text-foreground">
                    {(dc.usedStorage / 1000).toFixed(1)} / {(dc.totalStorage / 1000).toFixed(1)} PB
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full bg-secondary">
                  <div
                    className="h-full bg-brand transition-all duration-300"
                    style={{ width: `${(dc.usedStorage / dc.totalStorage) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Network Providers */}
            <div className="mt-4 border-t border-border pt-3">
              <span className="text-[10px] font-mono text-muted-foreground block mb-1.5 uppercase tracking-wider">
                Transit Carriers
              </span>
              <div className="flex flex-wrap gap-1">
                {dc.networkProviders.map((p) => (
                  <span
                    key={p}
                    className="border border-border bg-secondary px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="mt-3">
              <span className="text-[10px] font-mono text-muted-foreground block mb-1.5 uppercase tracking-wider">
                Certifications
              </span>
              <div className="flex flex-wrap gap-1">
                {dc.certifications.map((c) => (
                  <span
                    key={c}
                    className="border border-emerald-900/40 bg-emerald-950/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
