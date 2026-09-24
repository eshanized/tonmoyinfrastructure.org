export function DataCenterDiagram() {
  return (
    <div className="w-full overflow-x-auto border border-border bg-card p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="tiv-meta">FACILITY ARCHITECTURE</span>
          <h4 className="font-display text-base font-semibold mt-0.5">Tier 4 High-Density Facility Topology</h4>
        </div>
        <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5">
          2N+2 Redundancy · 16 Global Nodes · 845 PB Fleet
        </span>
      </div>

      <svg
        viewBox="0 0 800 420"
        className="w-full min-w-[650px] h-auto"
        role="img"
        aria-label="TIV Tier 4 data center architecture schematic showing 2N+2 power distribution, redundant cooling loops, server rack pods, and carrier-neutral meet-me rooms"
      >
        <defs>
          <marker
            id="dcArrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
          </marker>
        </defs>

        {/* Layer 1: Dual Utility Power Feeds & Generation */}
        <g transform="translate(40, 30)">
          <rect width="220" height="75" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <rect x="0" y="0" width="220" height="3" fill="hsl(var(--brand))" />
          <text x="110" y="24" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            Utility Substation Feed A + B
          </text>
          <text x="110" y="44" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            Dual Independent 33kV Lines
          </text>
          <text x="110" y="60" textAnchor="middle" fill="hsl(var(--brand))" fontSize="9" fontFamily="var(--font-jetbrains)">
            2N+2 Concurrent Maintainability
          </text>
        </g>

        <g transform="translate(540, 30)">
          <rect width="220" height="75" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <rect x="0" y="0" width="220" height="3" fill="hsl(var(--brand))" />
          <text x="110" y="24" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            On-Site Turbine Generators
          </text>
          <text x="110" y="44" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            N+2 Diesel Turbo Arrays (72h Fuel)
          </text>
          <text x="110" y="60" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="var(--font-jetbrains)">
            Automatic Transfer Switches (ATS)
          </text>
        </g>

        {/* Lines down to UPS */}
        <line x1="150" y1="105" x2="250" y2="155" stroke="hsl(var(--border))" strokeWidth="1.5" markerEnd="url(#dcArrow)" />
        <line x1="650" y1="105" x2="550" y2="155" stroke="hsl(var(--border))" strokeWidth="1.5" markerEnd="url(#dcArrow)" />

        {/* Layer 2: Online Double-Conversion UPS Arrays */}
        <g transform="translate(180, 155)">
          <rect width="440" height="70" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="220" y="26" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            Static Transfer Switches & Dual Online UPS Systems
          </text>
          <text x="220" y="44" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            0ms Transfer Time · Isolated Power Distribution Units (PDUs) · A/B Bus
          </text>
          <text x="220" y="60" textAnchor="middle" fill="hsl(var(--brand))" fontSize="9" fontFamily="var(--font-jetbrains)">
            Power Density: Up to 35kW per rack
          </text>
        </g>

        {/* Line down to White Floor */}
        <line x1="400" y1="225" x2="400" y2="270" stroke="hsl(var(--border))" strokeWidth="1.5" markerEnd="url(#dcArrow)" />

        {/* Layer 3: High Density Compute Floor */}
        <g transform="translate(40, 270)">
          <rect width="460" height="115" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
          <rect x="0" y="0" width="460" height="3" fill="hsl(var(--brand))" />
          <text x="230" y="24" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            Mission-Critical White Space & Server Racks
          </text>

          {/* Racks graphic */}
          <g transform="translate(20, 36)">
            {[
              { label: 'Rack 01-10', sub: 'Compute A' },
              { label: 'Rack 11-20', sub: 'Compute B' },
              { label: 'Rack 21-30', sub: 'Storage A' },
              { label: 'Rack 31-40', sub: 'Storage B' },
            ].map((rack, idx) => (
              <g key={rack.label} transform={`translate(${idx * 105}, 0)`}>
                <rect width="95" height="60" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="47.5" y="22" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="500" fontFamily="var(--font-sans)">
                  {rack.label}
                </text>
                <text x="47.5" y="38" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="var(--font-jetbrains)">
                  {rack.sub}
                </text>
                <circle cx="47.5" cy="50" r="3" fill="hsl(var(--brand))" />
              </g>
            ))}
          </g>
        </g>

        {/* Carrier-Neutral Meet-Me Room (MMR) */}
        <g transform="translate(530, 270)">
          <rect width="230" height="115" rx="3" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="115" y="24" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            Meet-Me Room (MMR)
          </text>
          <text x="115" y="44" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            Diverse Carrier Trench Ingress
          </text>
          <text x="115" y="62" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            Tier-1 BGP Upstreams + Direct IX
          </text>
          <text x="115" y="80" textAnchor="middle" fill="hsl(var(--brand))" fontSize="9" fontFamily="var(--font-jetbrains)">
            Redundant Cross-Connects
          </text>
          <text x="115" y="98" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="var(--font-jetbrains)">
            Latency: &lt;1.2ms Metropolitan SLA
          </text>
        </g>
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground font-mono">
        <span>Uptime Institute: Tier 4 Concurrently Maintainable</span>
        <span>Certifications: ISO 27001 · PCI DSS · SOC 2 · HIPAA · GDPR</span>
        <span>Availability: 99.999% Fault Tolerant</span>
      </div>
    </div>
  );
}
