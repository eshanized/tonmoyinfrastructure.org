export function OpticalPath() {
  return (
    <div className="w-full overflow-x-auto border border-border bg-card p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="tiv-meta">PHYSICAL TRANSPORT LAYER</span>
          <h4 className="font-display text-base font-semibold mt-0.5">DWDM Optical Transport Path</h4>
        </div>
        <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5">
          C-Band · 100GHz ITU Grid · G.652D SMF
        </span>
      </div>

      <svg
        viewBox="0 0 800 360"
        className="w-full min-w-[650px] h-auto"
        role="img"
        aria-label="TIV dense wavelength division multiplexing (DWDM) optical transport schematic illustrating transponder transmit, passive multiplexing, EDFA amplification, dark fiber conduit, and demultiplexing"
      >
        <defs>
          <linearGradient id="fiberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--brand))" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="hsl(var(--brand))" />
          </linearGradient>
        </defs>

        {/* Stage 1: Transponders / Transmitters */}
        <g transform="translate(30, 40)">
          <rect width="110" height="40" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="55" y="24" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600" fontFamily="var(--font-jetbrains)">
            TX λ1 (1550.12nm)
          </text>

          <rect y="55" width="110" height="40" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="55" y="79" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600" fontFamily="var(--font-jetbrains)">
            TX λ2 (1550.92nm)
          </text>

          <rect y="110" width="110" height="40" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="55" y="134" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600" fontFamily="var(--font-jetbrains)">
            TX λN (1559.79nm)
          </text>
        </g>

        {/* Lines into MUX */}
        <line x1="140" y1="60" x2="200" y2="100" stroke="hsl(var(--brand))" strokeWidth="1.5" />
        <line x1="140" y1="115" x2="200" y2="115" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="140" y1="170" x2="200" y2="130" stroke="hsl(var(--brand))" strokeWidth="1.5" />

        {/* Stage 2: Passive Multiplexer */}
        <g transform="translate(200, 75)">
          <polygon points="0,0 60,20 60,60 0,80" fill="hsl(var(--card))" stroke="hsl(var(--brand))" strokeWidth="1.5" />
          <text x="25" y="45" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
            MUX
          </text>
        </g>

        {/* MUX out to Booster EDFA */}
        <line x1="260" y1="115" x2="310" y2="115" stroke="url(#fiberGrad)" strokeWidth="3" />

        {/* Stage 3: Booster EDFA & OSC */}
        <g transform="translate(310, 85)">
          <polygon points="0,0 45,30 0,60" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="16" y="34" textAnchor="middle" fill="hsl(var(--brand))" fontSize="10" fontWeight="bold" fontFamily="var(--font-jetbrains)">
            EDFA
          </text>
          <text x="22" y="76" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="var(--font-jetbrains)">
            +18dBm Booster
          </text>
        </g>

        {/* Single-Mode Fiber Span */}
        <g transform="translate(365, 115)">
          <line x1="0" y1="0" x2="160" y2="0" stroke="url(#fiberGrad)" strokeWidth="4" strokeDasharray="6 2" />
          {/* Fiber Conduit Box */}
          <rect x="20" y="-35" width="120" height="70" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.9" />
          <text x="80" y="-18" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="600" fontFamily="var(--font-display)">
            G.652D Dark Fiber Span
          </text>
          <text x="80" y="-2" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="var(--font-jetbrains)">
            Attenuation: ~0.2 dB/km
          </text>
          <text x="80" y="14" textAnchor="middle" fill="hsl(var(--brand))" fontSize="9" fontFamily="var(--font-jetbrains)">
            Municipal Conduit Link
          </text>
        </g>

        {/* Stage 4: Pre-amplifier EDFA */}
        <g transform="translate(535, 85)">
          <polygon points="0,0 45,30 0,60" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="16" y="34" textAnchor="middle" fill="hsl(var(--brand))" fontSize="10" fontWeight="bold" fontFamily="var(--font-jetbrains)">
            EDFA
          </text>
          <text x="22" y="76" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="var(--font-jetbrains)">
            Pre-Amp
          </text>
        </g>

        {/* Preamp to DEMUX */}
        <line x1="580" y1="115" x2="620" y2="115" stroke="url(#fiberGrad)" strokeWidth="3" />

        {/* Stage 5: Passive Demultiplexer */}
        <g transform="translate(620, 75)">
          <polygon points="0,20 60,0 60,80 0,60" fill="hsl(var(--card))" stroke="hsl(var(--brand))" strokeWidth="1.5" />
          <text x="35" y="45" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
            DEMUX
          </text>
        </g>

        {/* DEMUX out to Coherent Receivers */}
        <line x1="680" y1="100" x2="730" y2="60" stroke="hsl(var(--brand))" strokeWidth="1.5" />
        <line x1="680" y1="115" x2="730" y2="115" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="680" y1="130" x2="730" y2="170" stroke="hsl(var(--brand))" strokeWidth="1.5" />

        {/* Receivers */}
        <g transform="translate(730, 40)">
          <rect width="40" height="40" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="20" y="24" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            RX λ1
          </text>

          <rect y="55" width="40" height="40" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="20" y="79" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            RX λ2
          </text>

          <rect y="110" width="40" height="40" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="20" y="134" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            RX λN
          </text>
        </g>

        {/* Bottom Technical Specifications */}
        <g transform="translate(30, 240)">
          <rect width="740" height="90" rx="2" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
          <text x="20" y="26" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
            Wavelength Division & Channel Multiplexing Parameters
          </text>
          <text x="20" y="48" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            Spectral Band: C-Band (1530nm – 1565nm) · Channel Spacing: 100 GHz (0.8 nm) · Modulation: DP-QPSK / 16-QAM
          </text>
          <text x="20" y="68" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-jetbrains)">
            Supervisory Channel (OSC): 1510 nm Out-of-Band Telemetry · Dispersion Tolerance: &gt; 1600 ps/nm
          </text>
        </g>
      </svg>
    </div>
  );
}
