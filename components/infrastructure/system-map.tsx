'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SystemNode {
  id: string;
  label: string;
  description: string;
  projects: string[];
  children?: SystemNode[];
}

const systemTree: SystemNode = {
  id: 'tiv',
  label: 'TIV',
  description: 'Tonmoy Infrastructure and Vision',
  projects: [],
  children: [
    {
      id: 'software',
      label: 'Software',
      description: 'Self-hosted software for email, code hosting, and developer tools.',
      projects: ['OpenMail', 'Mercura', 'M31A', 'Octate'],
      children: [
        { id: 'openmail', label: 'OpenMail', description: 'Self-hosted email infrastructure', projects: ['OpenMail'] },
        { id: 'mercura', label: 'Mercura', description: 'Self-hosted code hosting', projects: ['Mercura'] },
        { id: 'm31a', label: 'M31A', description: 'Autonomous developer infrastructure', projects: ['M31A'] },
        { id: 'octate', label: 'Octate', description: 'Terminal-native AI code review CLI', projects: ['Octate'] },
      ],
    },
    {
      id: 'networks',
      label: 'Networks',
      description: 'Routing, switching, fiber optics, and network architecture.',
      projects: ['Networking', 'Optical Systems'],
      children: [
        { id: 'routing', label: 'Routing', description: 'Routing protocol research', projects: ['Networking'] },
        { id: 'fiber', label: 'Fiber', description: 'Fiber optic infrastructure', projects: ['Optical Systems'] },
      ],
    },
    {
      id: 'research',
      label: 'Research',
      description: 'AI, distributed systems, and systems engineering research.',
      projects: ['M31A', 'Publications'],
      children: [
        { id: 'ai', label: 'AI', description: 'Autonomous development systems', projects: ['M31A'] },
        { id: 'optics', label: 'Optics', description: 'Optical communication research', projects: ['Optical Systems'] },
      ],
    },
  ],
};

export function SystemMap() {
  const [activeNode, setActiveNode] = useState<string>('tiv');

  const findNode = (node: SystemNode, id: string): SystemNode | null => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const active = findNode(systemTree, activeNode) || systemTree;

  // Determine active branch for glowing connector lines
  const isSoftwareActive =
    activeNode === 'software' ||
    ['openmail', 'mercura', 'm31a', 'octate'].includes(activeNode);
  const isNetworksActive =
    activeNode === 'networks' || ['routing', 'fiber'].includes(activeNode);
  const isResearchActive =
    activeNode === 'research' || ['ai', 'optics'].includes(activeNode);

  // SVG Nodes definition with exact geometric alignment
  const nodes = [
    // Root
    { id: 'tiv', label: 'TIV', x: 438, y: 14, w: 84, h: 36, cx: 480, cy: 32, isRoot: true },

    // Categories (Level 1)
    { id: 'software', label: 'Software', x: 158, y: 98, w: 104, h: 34, cx: 210, cy: 115 },
    { id: 'networks', label: 'Networks', x: 478, y: 98, w: 104, h: 34, cx: 530, cy: 115 },
    { id: 'research', label: 'Research', x: 698, y: 98, w: 104, h: 34, cx: 750, cy: 115 },

    // Software Leaves
    { id: 'openmail', label: 'OpenMail', x: 18, y: 189, w: 84, h: 32, cx: 60, cy: 205 },
    { id: 'mercura', label: 'Mercura', x: 118, y: 189, w: 84, h: 32, cx: 160, cy: 205 },
    { id: 'm31a', label: 'M31A', x: 218, y: 189, w: 84, h: 32, cx: 260, cy: 205 },
    { id: 'octate', label: 'Octate', x: 318, y: 189, w: 84, h: 32, cx: 360, cy: 205 },

    // Networks Leaves
    { id: 'routing', label: 'Routing', x: 438, y: 189, w: 84, h: 32, cx: 480, cy: 205 },
    { id: 'fiber', label: 'Fiber', x: 538, y: 189, w: 84, h: 32, cx: 580, cy: 205 },

    // Research Leaves
    { id: 'ai', label: 'AI', x: 658, y: 189, w: 84, h: 32, cx: 700, cy: 205 },
    { id: 'optics', label: 'Optics', x: 758, y: 189, w: 84, h: 32, cx: 800, cy: 205 },
  ];

  return (
    <div className="border border-border bg-card p-6 md:p-10">
      {/* Diagram with responsive horizontal scroll wrapper */}
      <div className="overflow-x-auto pb-4 pt-2">
        <div className="min-w-[860px]">
          <svg
            viewBox="0 0 860 236"
            className="w-full h-auto"
            role="img"
            aria-label="TIV System Tree diagram showing connections between TIV, Software, Networks, and Research"
          >
            {/* ---------------- LEVEL 0 -> LEVEL 1 CONNECTORS ---------------- */}
            {/* Stem from TIV */}
            <line
              x1="480"
              y1="50"
              x2="480"
              y2="74"
              stroke={
                isSoftwareActive || isNetworksActive || isResearchActive
                  ? 'hsl(var(--brand))'
                  : 'hsl(var(--border))'
              }
              strokeWidth={
                isSoftwareActive || isNetworksActive || isResearchActive ? 1.5 : 1
              }
            />

            {/* Main horizontal crossbar */}
            <line
              x1="210"
              y1="74"
              x2="750"
              y2="74"
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
            {/* Active highlight segment: Software */}
            {isSoftwareActive && (
              <line
                x1="210"
                y1="74"
                x2="480"
                y2="74"
                stroke="hsl(var(--brand))"
                strokeWidth="1.5"
              />
            )}
            {/* Active highlight segment: Networks */}
            {isNetworksActive && (
              <line
                x1="480"
                y1="74"
                x2="530"
                y2="74"
                stroke="hsl(var(--brand))"
                strokeWidth="1.5"
              />
            )}
            {/* Active highlight segment: Research */}
            {isResearchActive && (
              <line
                x1="480"
                y1="74"
                x2="750"
                y2="74"
                stroke="hsl(var(--brand))"
                strokeWidth="1.5"
              />
            )}

            {/* Stems to Level 1 nodes */}
            <line
              x1="210"
              y1="74"
              x2="210"
              y2="98"
              stroke={isSoftwareActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
              strokeWidth={isSoftwareActive ? 1.5 : 1}
            />
            <line
              x1="530"
              y1="74"
              x2="530"
              y2="98"
              stroke={isNetworksActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
              strokeWidth={isNetworksActive ? 1.5 : 1}
            />
            <line
              x1="750"
              y1="74"
              x2="750"
              y2="98"
              stroke={isResearchActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
              strokeWidth={isResearchActive ? 1.5 : 1}
            />

            {/* ---------------- LEVEL 1 -> LEVEL 2 CONNECTORS ---------------- */}
            {/* Software Subtree */}
            <line
              x1="210"
              y1="132"
              x2="210"
              y2="160"
              stroke={isSoftwareActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
              strokeWidth={isSoftwareActive ? 1.5 : 1}
            />
            <line
              x1="60"
              y1="160"
              x2="360"
              y2="160"
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
            {['openmail', 'mercura', 'm31a', 'octate'].map((id, idx) => {
              const xPos = 60 + idx * 100;
              const isChildActive = activeNode === id;
              return (
                <g key={id}>
                  {isChildActive && (
                    <line
                      x1={Math.min(210, xPos)}
                      y1="160"
                      x2={Math.max(210, xPos)}
                      y2="160"
                      stroke="hsl(var(--brand))"
                      strokeWidth="1.5"
                    />
                  )}
                  <line
                    x1={xPos}
                    y1="160"
                    x2={xPos}
                    y2="189"
                    stroke={isChildActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
                    strokeWidth={isChildActive ? 1.5 : 1}
                  />
                </g>
              );
            })}

            {/* Networks Subtree */}
            <line
              x1="530"
              y1="132"
              x2="530"
              y2="160"
              stroke={isNetworksActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
              strokeWidth={isNetworksActive ? 1.5 : 1}
            />
            <line
              x1="480"
              y1="160"
              x2="580"
              y2="160"
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
            {['routing', 'fiber'].map((id, idx) => {
              const xPos = 480 + idx * 100;
              const isChildActive = activeNode === id;
              return (
                <g key={id}>
                  {isChildActive && (
                    <line
                      x1={Math.min(530, xPos)}
                      y1="160"
                      x2={Math.max(530, xPos)}
                      y2="160"
                      stroke="hsl(var(--brand))"
                      strokeWidth="1.5"
                    />
                  )}
                  <line
                    x1={xPos}
                    y1="160"
                    x2={xPos}
                    y2="189"
                    stroke={isChildActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
                    strokeWidth={isChildActive ? 1.5 : 1}
                  />
                </g>
              );
            })}

            {/* Research Subtree */}
            <line
              x1="750"
              y1="132"
              x2="750"
              y2="160"
              stroke={isResearchActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
              strokeWidth={isResearchActive ? 1.5 : 1}
            />
            <line
              x1="700"
              y1="160"
              x2="800"
              y2="160"
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
            {['ai', 'optics'].map((id, idx) => {
              const xPos = 700 + idx * 100;
              const isChildActive = activeNode === id;
              return (
                <g key={id}>
                  {isChildActive && (
                    <line
                      x1={Math.min(750, xPos)}
                      y1="160"
                      x2={Math.max(750, xPos)}
                      y2="160"
                      stroke="hsl(var(--brand))"
                      strokeWidth="1.5"
                    />
                  )}
                  <line
                    x1={xPos}
                    y1="160"
                    x2={xPos}
                    y2="189"
                    stroke={isChildActive ? 'hsl(var(--brand))' : 'hsl(var(--border))'}
                    strokeWidth={isChildActive ? 1.5 : 1}
                  />
                </g>
              );
            })}

            {/* ---------------- INTERACTIVE NODES ---------------- */}
            {nodes.map((node) => {
              const isSelected = activeNode === node.id;
              const isRoot = node.isRoot;

              return (
                <g
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveNode(node.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`Select ${node.label} in system diagram`}
                  className="cursor-pointer group outline-none focus-visible:ring-1 focus-visible:ring-brand"
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.w}
                    height={node.h}
                    className={cn(
                      'transition-all duration-200',
                      isRoot
                        ? 'fill-brand stroke-brand'
                        : isSelected
                        ? 'fill-brand/10 stroke-brand stroke-[1.5]'
                        : 'fill-card stroke-border group-hover:stroke-brand/50 group-hover:fill-secondary/30'
                    )}
                  />
                  <text
                    x={node.cx}
                    y={node.cy + 4}
                    textAnchor="middle"
                    className={cn(
                      'font-mono text-xs select-none transition-colors duration-200',
                      isRoot
                        ? 'fill-brand-foreground font-semibold text-sm'
                        : isSelected
                        ? 'fill-brand font-semibold'
                        : 'fill-foreground group-hover:fill-brand'
                    )}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Detail panel */}
      <div className="mt-8 border-t border-border pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse-dot" />
              <span className="tiv-meta-brand">{active.label}</span>
            </div>
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              {active.description}
            </p>
            {active.projects.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {active.projects.map((proj) => (
                  <span
                    key={proj}
                    className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
