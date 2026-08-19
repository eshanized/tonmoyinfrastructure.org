'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Eye, Wrench, Key, Shield } from 'lucide-react';

const principles = [
  {
    icon: Eye,
    title: 'Understandable',
    description: 'Systems should be understandable to the people operating them.',
  },
  {
    icon: Wrench,
    title: 'Operable',
    description: 'Infrastructure should be practical to deploy and maintain.',
  },
  {
    icon: Key,
    title: 'Ownable',
    description: 'Organizations should have meaningful control over their systems.',
  },
  {
    icon: Shield,
    title: 'Dependable',
    description: 'Infrastructure should behave reliably and predictably.',
  },
];

export function PrincipleCards() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {principles.map((p, i) => (
        <motion.div
          key={p.title}
          className="group relative bg-card p-6"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1 * i, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
          <div className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
            <p.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-display text-lg font-medium tracking-tight transition-colors group-hover:text-brand">
            {p.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {p.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
