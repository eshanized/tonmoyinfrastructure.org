export function CourierDiagram() {
  return (
    <div className="w-full overflow-x-auto border border-border bg-card p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="tiv-meta">LOGISTICS TOPOLOGY</span>
          <h4 className="font-display text-base font-semibold mt-0.5">TIV Global Courier Logistics Pipeline</h4>
        </div>
        <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5">
          48h SLA · GDP / ISO 9001 · 17 Hubs
        </span>
      </div>

      <svg
        viewBox="0 0 800 420"
        className="w-full min-w-[650px] h-auto"
        role="img"
        aria-label="TIV global courier network logistics diagram showing parcel intake, customs and compliance processing, inter-hub air cargo transit, and localized last-mile delivery"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--border)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--brand)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--border)" stopOpacity="0.8" />
          </linearGradient>
          <marker
            id="courierArrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
          </marker>
        </defs>

        {/* Stage 1: Origin & Intake */}
        <g transform="translate(40, 40)">
          <rect width="180" height="90" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="1" />
          <rect x="0" y="0" width="180" height="3" fill="var(--brand)" />
          <text x="90" y="28" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            1. Parcel & Asset Intake
          </text>
          <text x="90" y="48" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Cryptographic Tracking Tag
          </text>
          <text x="90" y="66" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Anti-Static / Fragile Seals
          </text>
          <text x="90" y="82" textAnchor="middle" fill="var(--brand)" fontSize="9" fontFamily="var(--font-jetbrains)">
            T0: Intake Timestamped
          </text>
        </g>

        {/* Connector 1 -> 2 */}
        <line x1="220" y1="85" x2="300" y2="85" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#courierArrow)" />

        {/* Stage 2: Customs & Security Inspection */}
        <g transform="translate(300, 40)">
          <rect width="200" height="90" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="1" />
          <rect x="0" y="0" width="200" height="3" fill="var(--brand)" />
          <text x="100" y="28" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            2. Customs & GDP Audit
          </text>
          <text x="100" y="48" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Automated HS Duty Calculation
          </text>
          <text x="100" y="66" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Cold Chain & X-Ray Screening
          </text>
          <text x="100" y="82" textAnchor="middle" fill="var(--brand)" fontSize="9" fontFamily="var(--font-jetbrains)">
            ISO 9001 / GDP Verification
          </text>
        </g>

        {/* Connector 2 -> 3 */}
        <line x1="500" y1="85" x2="580" y2="85" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#courierArrow)" />

        {/* Stage 3: Air Freight & Transit Corridors */}
        <g transform="translate(580, 40)">
          <rect width="180" height="90" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="1" />
          <rect x="0" y="0" width="180" height="3" fill="var(--brand)" />
          <text x="90" y="28" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            3. Scheduled Transit Mesh
          </text>
          <text x="90" y="48" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Express Direct Air Flights
          </text>
          <text x="90" y="66" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Intercontinental Flight Lanes
          </text>
          <text x="90" y="82" textAnchor="middle" fill="var(--brand)" fontSize="9" fontFamily="var(--font-jetbrains)">
            In-Transit Telemetry
          </text>
        </g>

        {/* Central Core: 17-Hub International Distribution Mesh */}
        <g transform="translate(80, 180)">
          <rect width="640" height="100" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
          <text x="320" y="26" textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="600" fontFamily="var(--font-display)">
            Global Hub Routing Mesh (17 International Gateway Nodes)
          </text>

          {/* Hub Badges Grid */}
          <g transform="translate(20, 40)">
            {[
              { code: 'NYC', country: 'US', x: 0 },
              { code: 'LON', country: 'UK', x: 70 },
              { code: 'FRA', country: 'DE', x: 140 },
              { code: 'CDG', country: 'FR', x: 210 },
              { code: 'NRT', country: 'JP', x: 280 },
              { code: 'ICN', country: 'KR', x: 350 },
              { code: 'PVG', country: 'CN', x: 420 },
              { code: 'SIN', country: 'SG', x: 490 },
              { code: 'BOM', country: 'IN', x: 560 },
            ].map((node) => (
              <g key={node.code} transform={`translate(${node.x}, 0)`}>
                <rect width="55" height="42" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="0.8" />
                <text x="27.5" y="18" textAnchor="middle" fill="var(--brand)" fontSize="10" fontWeight="bold" fontFamily="var(--font-jetbrains)">
                  {node.code}
                </text>
                <text x="27.5" y="32" textAnchor="middle" fill="var(--muted-foreground)" fontSize="8" fontFamily="var(--font-sans)">
                  {node.country}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* Connecting Lines between Mesh and Final Stages */}
        <line x1="240" y1="280" x2="240" y2="330" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#courierArrow)" />
        <line x1="560" y1="280" x2="560" y2="330" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#courierArrow)" />

        {/* Stage 4A: Regional Gateway Sorting */}
        <g transform="translate(140, 330)">
          <rect width="200" height="70" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="1" />
          <text x="100" y="24" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
            4A. Regional Sorting & Depots
          </text>
          <text x="100" y="42" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-jetbrains)">
            Automated Conveyor Sortation
          </text>
          <text x="100" y="58" textAnchor="middle" fill="var(--brand)" fontSize="9" fontFamily="var(--font-jetbrains)">
            T+36h Routing Clear
          </text>
        </g>

        {/* Stage 4B: Last-Mile Delivery */}
        <g transform="translate(460, 330)">
          <rect width="200" height="70" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="1" />
          <rect x="0" y="0" width="200" height="2" fill="var(--brand)" />
          <text x="100" y="24" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
            4B. Final Last-Mile Handover
          </text>
          <text x="100" y="42" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-jetbrains)">
            Secure Signature & Geotag
          </text>
          <text x="100" y="58" textAnchor="middle" fill="var(--brand)" fontSize="9" fontFamily="var(--font-jetbrains)">
            Guaranteed T+48h Delivery
          </text>
        </g>
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground font-mono">
        <span>SLA: 48 Hours Worldwide Turnaround</span>
        <span>Daily Volume: 50,000+ Shipments</span>
        <span>Accuracy: 99.9% Delivery Success</span>
      </div>
    </div>
  );
}
