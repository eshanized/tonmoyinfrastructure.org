'use client';

import { motion, useReducedMotion } from 'framer-motion';

const nodes = [
  { id: 'tiv', label: 'TIV', x: 400, y: 36, isRoot: true },
  { id: 'software', label: 'Software', x: 160, y: 140 },
  { id: 'networks', label: 'Networks', x: 400, y: 140 },
  { id: 'research', label: 'Research', x: 640, y: 140 },
  { id: 'systems', label: 'Systems', x: 400, y: 260 },
  { id: 'infrastructure', label: 'Infrastructure', x: 400, y: 370 },
];

const paths = [
  { d: 'M 400 42 C 400 85, 160 85, 160 134', delay: 0 },
  { d: 'M 400 42 L 400 134', delay: 0.1 },
  { d: 'M 400 42 C 400 85, 640 85, 640 134', delay: 0.2 },
  { d: 'M 160 146 C 160 200, 400 200, 400 254', delay: 0.4 },
  { d: 'M 400 146 L 400 254', delay: 0.5 },
  { d: 'M 640 146 C 640 200, 400 200, 400 254', delay: 0.6 },
  { d: 'M 400 266 L 400 364', delay: 0.8 },
];

export function HeroDiagram() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox="0 0 800 410"
        className="w-full h-auto"
        role="img"
        aria-label="TIV infrastructure tree: Software, Networks, and Research converge into Systems and Infrastructure"
      >
        {/* Subtle grid */}
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="800" height="410" fill="url(#hero-grid)" />

        {/* Connection paths */}
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            fill="none"
            stroke={
              i === 1 || i === 4 || i === 6
                ? 'hsl(var(--brand))'
                : 'hsl(var(--muted-foreground) / 0.3)'
            }
            strokeWidth={i === 1 || i === 4 || i === 6 ? 1.5 : 1}
            strokeLinecap="round"
            initial={prefersReduced ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
            animate={prefersReduced ? {} : { pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.8, delay: path.delay, ease: 'easeOut' },
              opacity: { duration: 0.3, delay: path.delay },
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 * i + 0.3, ease: 'easeOut' }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Pulse ring for root */}
            {node.isRoot && !prefersReduced && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="14"
                fill="none"
                stroke="hsl(var(--brand))"
                strokeWidth="1"
                animate={{ r: [8, 18], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.isRoot ? 7 : 5}
              fill={node.isRoot ? 'hsl(var(--brand))' : 'hsl(var(--background))'}
              stroke={node.isRoot ? 'hsl(var(--brand))' : 'hsl(var(--muted-foreground) / 0.5)'}
              strokeWidth="1.5"
            />
            <text
              x={node.x}
              y={node.isRoot ? node.y - 16 : node.y + 22}
              textAnchor="middle"
              className="font-mono"
              fontSize={node.isRoot ? '13' : '11'}
              fill={node.isRoot ? 'hsl(var(--brand))' : 'hsl(var(--muted-foreground))'}
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
