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
        { id: 'octate', label: 'Octate', description: 'TIV software project', projects: ['Octate'] },
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

  const renderNode = (
    node: SystemNode,
    depth: number,
    isRoot?: boolean
  ): React.ReactNode => (
    <div
      key={node.id}
      className={cn(
        'relative flex flex-col items-center',
        depth === 0 && 'mx-auto w-full max-w-5xl'
      )}
    >
      <button
        onClick={() => setActiveNode(node.id)}
        className={cn(
          'group relative border px-4 py-2.5 font-mono text-sm transition-all duration-200',
          isRoot
            ? 'border-brand bg-brand text-brand-foreground font-semibold'
            : activeNode === node.id
            ? 'border-brand text-brand'
            : 'border-border text-foreground hover:border-brand/40'
        )}
      >
        {node.label}
      </button>

      {node.children && node.children.length > 0 && (
        <div className="relative mt-8 flex flex-wrap justify-center gap-x-8 gap-y-8">
          {/* Vertical connector */}
          <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-border" />

          {/* Horizontal connector */}
          {node.children.length > 1 && (
            <div
              className="absolute left-[12.5%] right-[12.5%] top-4 h-px bg-border"
              style={{
                left: `calc(50% / ${node.children.length})`,
                right: `calc(50% / ${node.children.length})`,
              }}
            />
          )}

          {node.children.map((child) => (
            <div
              key={child.id}
              className="relative flex flex-col items-center"
            >
              {/* Connector to child */}
              <div className="absolute left-1/2 top-[-2rem] h-4 w-px -translate-x-1/2 bg-border" />
              <div className="absolute left-1/2 top-[-1.25rem] h-4 w-px -translate-x-1/2 bg-border" />
              {renderNode(child, depth + 1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="border border-border bg-card p-6 md:p-10">
      {/* Diagram */}
      <div className="overflow-x-auto pb-6 lg:overflow-visible">
        <div className="min-w-[640px]">
          <div className="flex flex-col items-center pt-4">
            {renderNode(systemTree, 0, true)}
          </div>
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
