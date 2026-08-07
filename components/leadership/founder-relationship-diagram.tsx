'use client';

import { motion, useReducedMotion } from 'framer-motion';

const easing = [0.25, 0.1, 0.25, 1] as const;

interface Branch {
  label: string;
  items: string[];
  x: number;
}

const branches: Branch[] = [
  { label: 'SOFTWARE', items: ['OpenMail', 'Mercura', 'M31A'], x: 120 },
  { label: 'INFRASTRUCTURE', items: ['Hosting', 'Domains', 'Networks'], x: 400 },
  { label: 'RESEARCH', items: ['AI', 'Networks', 'Fiber Optics'], x: 680 },
];

export function FounderRelationshipDiagram() {
  const prefersReduced = useReducedMotion();

  const founderY = 30;
  const roleY = 95;
  const tivY = 175;
  const centerX = 400;

  return (
    <div className="overflow-x-auto pb-4 lg:overflow-visible">
      <svg
        viewBox="0 0 800 400"
        className="mx-auto min-w-[640px] max-w-4xl"
        role="img"
        aria-label="Relationship diagram showing Eshan Roy as founder connecting to Tonmoy Infrastructure and Vision, which branches into Software, Infrastructure, and Research."
      >
        {/* Founder node */}
        <motion.g
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <text
            x={centerX}
            y={founderY}
            textAnchor="middle"
            className="fill-foreground font-display"
            style={{ fontSize: 18, fontWeight: 600 }}
          >
            ESHAN ROY
          </text>
        </motion.g>

        {/* Founder → Role line */}
        <motion.line
          x1={centerX}
          y1={founderY + 10}
          x2={centerX}
          y2={roleY - 15}
          stroke="currentColor"
          className="text-brand"
          strokeWidth={1.5}
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: easing }}
        />

        {/* Role node */}
        <motion.g
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <text
            x={centerX}
            y={roleY}
            textAnchor="middle"
            className="fill-brand font-mono"
            style={{ fontSize: 13, letterSpacing: 2 }}
          >
            FOUNDER
          </text>
        </motion.g>

        {/* Role → TIV line */}
        <motion.line
          x1={centerX}
          y1={roleY + 5}
          x2={centerX}
          y2={tivY - 15}
          stroke="currentColor"
          className="text-brand"
          strokeWidth={1.5}
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5, ease: easing }}
        />

        {/* TIV node */}
        <motion.g
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <text
            x={centerX}
            y={tivY}
            textAnchor="middle"
            className="fill-foreground font-display"
            style={{ fontSize: 15, fontWeight: 600 }}
          >
            <tspan x={centerX} dy={0}>TONMOY INFRASTRUCTURE</tspan>
            <tspan x={centerX} dy={18}>AND VISION</tspan>
          </text>
        </motion.g>

        {/* TIV → Branch lines */}
        {branches.map((branch, i) => (
          <motion.line
            key={`bl-${branch.label}`}
            x1={centerX}
            y1={tivY + 25}
            x2={branch.x}
            y2={235}
            stroke="currentColor"
            className="text-border"
            strokeWidth={1}
            initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.1, ease: easing }}
          />
        ))}

        {/* Horizontal connector */}
        <motion.line
          x1={branches[0].x}
          y1={235}
          x2={branches[2].x}
          y2={235}
          stroke="currentColor"
          className="text-border"
          strokeWidth={1}
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.75, ease: easing }}
        />

        {/* Branch labels and items */}
        {branches.map((branch, i) => (
          <motion.g
            key={`b-${branch.label}`}
            initial={prefersReduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
          >
            <line
              x1={branch.x}
              y1={235}
              x2={branch.x}
              y2={258}
              stroke="currentColor"
              className="text-border"
              strokeWidth={1}
            />
            <text
              x={branch.x}
              y={275}
              textAnchor="middle"
              className="fill-brand font-mono"
              style={{ fontSize: 11, letterSpacing: 1.5 }}
            >
              {branch.label}
            </text>
            {branch.items.map((item, j) => (
              <text
                key={item}
                x={branch.x}
                y={305 + j * 22}
                textAnchor="middle"
                className="fill-muted-foreground font-display"
                style={{ fontSize: 13 }}
              >
                {item}
              </text>
            ))}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
