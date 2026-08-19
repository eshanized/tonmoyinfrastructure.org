'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface MapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'root' | 'branch' | 'leaf';
  href?: string;
  meta?: string;
  maturity?: 'stable' | 'research' | 'planned';
}

const nodes: MapNode[] = [
  { id: 'tiv', label: 'TIV', x: 300, y: 40, type: 'root' },
  { id: 'software', label: 'Software', x: 120, y: 130, type: 'branch' },
  { id: 'infrastructure', label: 'Infrastructure', x: 300, y: 130, type: 'branch' },
  { id: 'research', label: 'Research', x: 480, y: 130, type: 'branch' },
  { id: 'openmail', label: 'OpenMail', x: 50, y: 230, type: 'leaf', href: '/work/openmail', meta: 'Stable', maturity: 'stable' },
  { id: 'mercura', label: 'Mercura', x: 130, y: 230, type: 'leaf', href: '/work/mercura', meta: 'Stable', maturity: 'stable' },
  { id: 'm31a', label: 'M31A', x: 210, y: 230, type: 'leaf', href: '/work/m31a', meta: 'Stable', maturity: 'stable' },
  { id: 'octate', label: 'Octate', x: 290, y: 290, type: 'leaf', href: '/work/octate', meta: 'Stable', maturity: 'stable' },
  { id: 'hosting', label: 'Hosting', x: 260, y: 230, type: 'leaf', href: '/infrastructure/hosting', meta: 'Planned', maturity: 'planned' },
  { id: 'network', label: 'Networking', x: 340, y: 230, type: 'leaf', href: '/infrastructure/networking', meta: 'Research', maturity: 'research' },
  { id: 'optical', label: 'Optical', x: 420, y: 230, type: 'leaf', href: '/infrastructure/optical', meta: 'Research', maturity: 'research' },
  { id: 'ai', label: 'AI Systems', x: 440, y: 230, type: 'leaf', href: '/research', meta: 'Research', maturity: 'research' },
  { id: 'fiber', label: 'Fiber Systems', x: 530, y: 230, type: 'leaf', href: '/research', meta: 'Research', maturity: 'research' },
];

const edges = [
  { from: 'tiv', to: 'software' },
  { from: 'tiv', to: 'infrastructure' },
  { from: 'tiv', to: 'research' },
  { from: 'software', to: 'openmail' },
  { from: 'software', to: 'mercura' },
  { from: 'software', to: 'm31a' },
  { from: 'software', to: 'octate' },
  { from: 'infrastructure', to: 'hosting' },
  { from: 'infrastructure', to: 'network' },
  { from: 'infrastructure', to: 'optical' },
  { from: 'research', to: 'ai' },
  { from: 'research', to: 'fiber' },
  { from: 'research', to: 'm31a' },
];

export function TechnologyMap() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedNode = selected ? nodes.find((n) => n.id === selected) : null;
  const relatedEdges = selected
    ? edges.filter((e) => e.from === selected || e.to === selected)
    : [];
  const relatedNodes = new Set<string>();
  relatedEdges.forEach((e) => {
    relatedNodes.add(e.from);
    relatedNodes.add(e.to);
  });

  return (
    <div>
      <div className="w-full">
        <svg viewBox="0 0 600 340" className="w-full" role="img" aria-label="TIV technology map showing relationships between software, infrastructure, and research">
          {/* Edges */}
          {edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from)!;
            const to = nodes.find((n) => n.id === edge.to)!;
            const isActive = selected && (edge.from === selected || edge.to === selected);
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? 'var(--brand)' : 'var(--border)'}
                strokeWidth={isActive ? '1.5' : '1'}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = selected === node.id;
            const isRelated = relatedNodes.has(node.id);
            const opacity = !selected || isSelected || isRelated ? 1 : 0.4;
            const nodeWidth = node.label.length * 8 + 24;
            const isRoot = node.type === 'root';
            const isBranch = node.type === 'branch';
            const isStable = node.maturity === 'stable';
            const isResearch = node.maturity === 'research';
            const isPlanned = node.maturity === 'planned';
            const strokeDash = isResearch ? '4 2' : isPlanned ? '2 2' : 'none';
            const strokeWidth = isStable ? '1.5' : '1';

            return (
              <g
                key={node.id}
                onClick={() => setSelected(isSelected ? null : node.id)}
                style={{ cursor: 'pointer', opacity, transition: 'opacity 0.2s' }}
              >
                <rect
                  x={node.x - nodeWidth / 2}
                  y={node.y - 14}
                  width={nodeWidth}
                  height="28"
                  fill={isSelected ? 'var(--brand)' : isRoot ? 'var(--brand)' : isBranch ? 'var(--secondary)' : 'var(--card)'}
                  stroke={isSelected || isRoot ? 'var(--brand)' : isStable ? 'var(--brand)' : 'var(--border)'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                />
                <text
                  x={node.x}
                  y={node.y + 1}
                  fill={isSelected || isRoot ? 'var(--brand-foreground)' : 'var(--foreground)'}
                  fontSize={isRoot ? '13' : '11'}
                fontFamily="var(--font-display)"
                  fontWeight={isRoot || isBranch ? '600' : '400'}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <div className="mt-6 border-t border-border pt-6">
          <div className="flex items-center gap-2">
            <span className="tiv-meta">{selectedNode.type.toUpperCase()}</span>
            {selectedNode.meta && (
              <span className="tiv-meta text-brand">· {selectedNode.meta}</span>
            )}
          </div>
          <h3 className="mt-2 font-display text-lg tracking-tight">
            {selectedNode.label}
          </h3>
          {selectedNode.href && (
            <Link
              href={selectedNode.href}
              className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
            >
              Explore {selectedNode.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          {relatedNodes.size > 1 && (
            <p className="mt-3 text-sm text-muted-foreground">
              Connected to{' '}
              {Array.from(relatedNodes)
                .filter((id) => id !== selectedNode.id)
                .map((id) => nodes.find((n) => n.id === id)?.label)
                .join(', ')}
              .
            </p>
          )}
        </div>
      )}

      {!selectedNode && (
        <p className="mt-6 border-t border-border pt-6 text-sm text-muted-foreground">
          Select a node to see its connections and related work.
        </p>
      )}
    </div>
  );
}
