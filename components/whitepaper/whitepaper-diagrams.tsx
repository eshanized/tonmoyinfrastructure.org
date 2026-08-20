'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function WhitepaperSystemDiagram() {
  const prefersReduced = useReducedMotion();

  const nodes = [
    { id: 'tiv', label: 'TIV', x: 300, y: 30, isRoot: true },
    { id: 'software', label: 'Software', x: 100, y: 110 },
    { id: 'infra', label: 'Infrastructure', x: 300, y: 110 },
    { id: 'research', label: 'Research', x: 500, y: 110 },
    { id: 'openmail', label: 'OpenMail', x: 30, y: 200 },
    { id: 'mercura', label: 'Mercura', x: 100, y: 200 },
    { id: 'm31a', label: 'M31A', x: 170, y: 200 },
    { id: 'hosting', label: 'Hosting', x: 230, y: 200 },
    { id: 'network', label: 'Network', x: 300, y: 200 },
    { id: 'systems', label: 'Systems', x: 370, y: 200 },
    { id: 'ai', label: 'AI', x: 440, y: 200 },
    { id: 'optics', label: 'Optics', x: 510, y: 200 },
  ];

  const paths = [
    { d: 'M 300 36 C 300 70, 100 70, 100 104', delay: 0 },
    { d: 'M 300 36 L 300 104', delay: 0.1 },
    { d: 'M 300 36 C 300 70, 500 70, 500 104', delay: 0.2 },
    { d: 'M 100 116 C 100 150, 30 150, 30 194', delay: 0.35 },
    { d: 'M 100 116 L 100 194', delay: 0.4 },
    { d: 'M 100 116 C 100 150, 170 150, 170 194', delay: 0.45 },
    { d: 'M 300 116 C 300 150, 230 150, 230 194', delay: 0.5 },
    { d: 'M 300 116 L 300 194', delay: 0.55 },
    { d: 'M 300 116 C 300 150, 370 150, 370 194', delay: 0.6 },
    { d: 'M 500 116 C 500 150, 440 150, 440 194', delay: 0.65 },
    { d: 'M 500 116 C 500 150, 510 150, 510 194', delay: 0.7 },
  ];

  return (
    <svg
      viewBox="0 0 560 230"
      className="w-full h-auto"
      role="img"
      aria-label="TIV system diagram: Software, Infrastructure, and Research branches with their sub-projects"
    >
      <defs>
        <pattern id="wp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="560" height="230" fill="url(#wp-grid)" />

      {paths.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          fill="none"
          stroke={i === 1 || i === 5 || i === 7 ? 'hsl(var(--brand))' : 'hsl(var(--muted-foreground) / 0.25)'}
          strokeWidth={i === 1 || i === 5 || i === 7 ? 1.5 : 1}
          strokeLinecap="round"
          initial={prefersReduced ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={prefersReduced ? {} : { pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.6, delay: p.delay, ease: 'easeOut' },
            opacity: { duration: 0.2, delay: p.delay },
          }}
        />
      ))}

      {nodes.map((node, i) => (
        <motion.g
          key={node.id}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 * i + 0.2, ease: 'easeOut' }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          {node.isRoot && !prefersReduced && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill="none"
              stroke="hsl(var(--brand))"
              strokeWidth="1"
              animate={{ r: [6, 16], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.isRoot ? 6 : 4}
            fill={node.isRoot ? 'hsl(var(--brand))' : 'hsl(var(--background))'}
            stroke={node.isRoot ? 'hsl(var(--brand))' : 'hsl(var(--muted-foreground) / 0.4)'}
            strokeWidth="1.5"
          />
          <text
            x={node.x}
            y={node.isRoot ? node.y - 14 : node.y + 20}
            textAnchor="middle"
            className="font-mono"
            fontSize={node.isRoot ? '11' : '9'}
            fill={node.isRoot ? 'hsl(var(--brand))' : 'hsl(var(--muted-foreground))'}
            style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export function OpticalPathDiagram() {
  const prefersReduced = useReducedMotion();

  const steps = [
    { label: 'Node A', y: 20 },
    { label: 'Transmitter', y: 70 },
    { label: 'Fiber Link', y: 130 },
    { label: 'Receiver', y: 190 },
    { label: 'Node B', y: 240 },
  ];

  return (
    <svg
      viewBox="0 0 300 270"
      className="w-full h-auto"
      role="img"
      aria-label="Optical transmission path: Node A to transmitter to fiber link to receiver to Node B"
    >
      <defs>
        <linearGradient id="fiber-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--brand))" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(var(--brand))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--brand))" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {steps.slice(0, -1).map((_, i) => (
        <motion.line
          key={i}
          x1="150"
          y1={steps[i].y + 12}
          x2="150"
          y2={steps[i + 1].y - 12}
          stroke="hsl(var(--muted-foreground) / 0.3)"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={prefersReduced ? { opacity: 1 } : { pathLength: 0 }}
          animate={prefersReduced ? {} : { pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.15 * i, ease: 'easeOut' }}
        />
      ))}

      <motion.rect
        x="60"
        y={steps[2].y - 8}
        width="180"
        height="16"
        fill="url(#fiber-gradient)"
        rx="2"
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
        animate={prefersReduced ? {} : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        style={{ transformOrigin: 'center' }}
      />

      {steps.map((step, i) => (
        <motion.g
          key={step.label}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
        >
          <rect
            x="100"
            y={step.y - 12}
            width="100"
            height="24"
            fill="hsl(var(--card))"
            stroke={step.label === 'Fiber Link' ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
            strokeWidth="1"
            rx="2"
          />
          <text
            x="150"
            y={step.y + 4}
            textAnchor="middle"
            className="font-mono"
            fontSize="10"
            fill={step.label === 'Fiber Link' ? 'hsl(var(--brand))' : 'hsl(var(--muted-foreground))'}
            style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
          >
            {step.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export function SelfHostingStackDiagram() {
  const prefersReduced = useReducedMotion();
  const layers = [
    { label: 'Software' },
    { label: 'Application Server' },
    { label: 'Server' },
    { label: 'Network' },
    { label: 'Internet' },
    { label: 'Physical Infrastructure' },
  ];

  return (
    <svg
      viewBox="0 0 300 280"
      className="w-full h-auto"
      role="img"
      aria-label="Self-hosting stack: Software, Application Server, Server, Network, Internet, Physical Infrastructure"
    >
      {layers.map((layer, i) => {
        const y = 10 + i * 45;
        return (
          <motion.g
            key={layer.label}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -20 }}
            animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * i, ease: 'easeOut' }}
          >
            <rect
              x="40"
              y={y}
              width="220"
              height="36"
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              rx="2"
            />
            <rect
              x="40"
              y={y}
              width="4"
              height="36"
              fill="hsl(var(--brand))"
              rx="2"
            />
            <text
              x="60"
              y={y + 22}
              className="font-mono"
              fontSize="11"
              fill="hsl(var(--foreground))"
              style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              {layer.label}
            </text>
            {i < layers.length - 1 && (
              <line
                x1="150"
                y1={y + 36}
                x2="150"
                y2={y + 45}
                stroke="hsl(var(--muted-foreground) / 0.3)"
                strokeWidth="1"
              />
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
