export function NetworkDiagram() {
  return (
    <div className="w-full overflow-x-auto border border-border bg-card p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="tiv-meta">TOPOLOGY ARCHITECTURE</span>
          <h4 className="font-display text-base font-semibold mt-0.5">TIV Autonomous Network Architecture</h4>
        </div>
        <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5">
          BGP-4 · IPv6 Native · SRv6
        </span>
      </div>

      <svg
        viewBox="0 0 800 440"
        className="w-full min-w-[650px] h-auto"
        role="img"
        aria-label="TIV autonomous network architecture topology diagram showing upstream transit, IXP peering, dual edge routers, high-speed internal backbone mesh, and distributed PoPs"
      >
        <defs>
          <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="var(--brand)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity="0.4" />
          </linearGradient>
          <marker
            id="arrow"
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

        {/* Tier 1 / Upstream Transit */}
        <g transform="translate(60, 30)">
          <rect width="180" height="60" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="1" />
          <text x="90" y="26" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            Tier-1 Upstream Transit
          </text>
          <text x="90" y="44" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Full BGP Feed (AS Peering)
          </text>
        </g>

        {/* IXP Peering Exchange */}
        <g transform="translate(560, 30)">
          <rect width="180" height="60" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="1" />
          <text x="90" y="26" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            Internet Exchange (IXP)
          </text>
          <text x="90" y="44" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Direct Peering / Bilateral
          </text>
        </g>

        {/* Connections from Upstream to Edge */}
        <path d="M 150 90 L 260 170" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 150 90 L 540 170" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <path d="M 650 90 L 540 170" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 650 90 L 260 170" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Edge Router A */}
        <g transform="translate(180, 170)">
          <rect width="160" height="70" rx="2" fill="var(--card)" stroke="var(--brand)" strokeWidth="1.5" />
          <rect x="0" y="0" width="4" height="70" fill="var(--brand)" />
          <text x="80" y="28" textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="600" fontFamily="var(--font-display)">
            Edge Router 01 (North)
          </text>
          <text x="80" y="48" textAnchor="middle" fill="var(--brand)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Active · VRRP / BGP Anycast
          </text>
        </g>

        {/* Edge Router B */}
        <g transform="translate(460, 170)">
          <rect width="160" height="70" rx="2" fill="var(--card)" stroke="var(--brand)" strokeWidth="1.5" />
          <rect x="0" y="0" width="4" height="70" fill="var(--brand)" />
          <text x="80" y="28" textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="600" fontFamily="var(--font-display)">
            Edge Router 02 (South)
          </text>
          <text x="80" y="48" textAnchor="middle" fill="var(--brand)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Active · VRRP / BGP Anycast
          </text>
        </g>

        {/* Inter-Edge Link (Sync) */}
        <line x1="340" y1="205" x2="460" y2="205" stroke="var(--brand)" strokeWidth="2" />
        <text x="400" y="198" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-jetbrains)">
          100G Sync Mesh
        </text>

        {/* Links to Core Fabric */}
        <path d="M 260 240 L 260 300 L 400 320" stroke="url(#linkGrad)" strokeWidth="2" />
        <path d="M 540 240 L 540 300 L 400 320" stroke="url(#linkGrad)" strokeWidth="2" />

        {/* Core Fabric / Internal Ring */}
        <g transform="translate(240, 310)">
          <rect width="320" height="80" rx="2" fill="var(--secondary)" stroke="var(--border)" strokeWidth="1" />
          <text x="160" y="28" textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="600" fontFamily="var(--font-display)">
            High-Throughput Backbone Fabric
          </text>
          <text x="160" y="48" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Segment Routing (SRv6) · EVPN-VXLAN Encapsulation
          </text>
          <text x="160" y="66" textAnchor="middle" fill="var(--brand)" fontSize="10" fontFamily="var(--font-jetbrains)">
            Zero-Trust Mutual TLS / WireGuard Mesh
          </text>
        </g>

        {/* Local Points of Presence */}
        <g transform="translate(60, 350)">
          <rect width="130" height="50" rx="2" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <text x="65" y="24" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
            PoP Node: Delta
          </text>
          <text x="65" y="40" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-jetbrains)">
            Compute / Edge Cache
          </text>
        </g>
        <path d="M 190 375 L 240 360" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2" />

        <g transform="translate(610, 350)">
          <rect width="130" height="50" rx="2" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <text x="65" y="24" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
            PoP Node: Gamma
          </text>
          <text x="65" y="40" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-jetbrains)">
            Storage / Queue Sinks
          </text>
        </g>
        <path d="M 610 375 L 560 360" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-3 text-xs text-muted-foreground">
        <div>
          <span className="tiv-meta">ROUTING DAEMON</span>
          <p className="mt-0.5 font-mono">FRRouting (FRR) / BIRD2</p>
        </div>
        <div>
          <span className="tiv-meta">CONVERGENCE TIME</span>
          <p className="mt-0.5 font-mono">&lt; 250ms sub-second BFD failover</p>
        </div>
        <div>
          <span className="tiv-meta">SECURITY POLICY</span>
          <p className="mt-0.5 font-mono">RPKI ROV Validated Peering</p>
        </div>
      </div>
    </div>
  );
}
