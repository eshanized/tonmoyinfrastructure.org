'use client';

import Link from 'next/link';
import { ArrowUpRight, Github, Globe, FlaskConical } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { HuggingFaceIcon } from '@/components/shared/source-badge';
import type { PersonLink } from '@/lib/people';

const easing = [0.25, 0.1, 0.25, 1] as const;

const linkIcons: Record<
  PersonLink['type'],
  React.ComponentType<{ className?: string; size?: number | string }>
> = {
  github: Github,
  huggingface: HuggingFaceIcon,
  website: Globe,
  orcid: FlaskConical,
  linkedin: Github,
  email: Github,
};

export function FounderLinks({ links }: { links: PersonLink[] }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand"
          >
            {link.label}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, i) => {
        const Icon = linkIcons[link.type] || ArrowUpRight;
        return (
          <motion.a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08, ease: easing }}
            whileHover={{ y: -2 }}
            className="group inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand"
          >
            <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden="true" />
            {link.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </motion.a>
        );
      })}
    </div>
  );
}

export function FounderPortrait({ name, photo }: { name: string; photo?: string }) {
  const prefersReduced = useReducedMotion();

  if (photo) {
    const webpSrc = photo.endsWith('.png') ? photo.replace(/\.png$/, '.webp') : photo;
    return (
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={photo}
            alt={`${name}, founder of Tonmoy Infrastructure and Vision`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            width={768}
            height={960}
          />
        </picture>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[4/5] flex-col items-center justify-center border border-border bg-card p-8">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easing }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex h-20 w-20 items-center justify-center border border-border">
          <span className="font-display text-2xl font-bold tracking-tight text-muted-foreground/30">
            ER
          </span>
        </div>
        <span className="tiv-meta text-center">OFFICIAL PHOTOGRAPH</span>
        <p className="text-center text-xs text-muted-foreground">
          An official photograph will be added when available.
        </p>
      </motion.div>
    </div>
  );
}

export function SelectedWork({ work }: { work: { name: string; description: string; category: string; href?: string }[] }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="space-y-px border border-border bg-border">
      {work.map((item, i) => {
        const content = (
          <div className="group relative flex flex-col gap-1 bg-card p-5 transition-colors hover:bg-card/80">
            <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            <span className="tiv-meta">{item.category}</span>
            <h4 className="font-display text-base font-medium transition-colors group-hover:text-brand">
              {item.name}
            </h4>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        );

        if (prefersReduced) {
          return item.href ? (
            <Link key={item.name} href={item.href}>{content}</Link>
          ) : (
            <div key={item.name}>{content}</div>
          );
        }

        if (item.href) {
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06, ease: easing }}
            >
              <Link href={item.href}>{content}</Link>
            </motion.div>
          );
        }

        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06, ease: easing }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}

export function FounderPrinciples() {
  const principles = [
    { label: 'Understandable', desc: 'People should be able to reason about the systems they depend on.' },
    { label: 'Operable', desc: 'People should be able to run and maintain their own infrastructure.' },
    { label: 'Ownable', desc: 'People should control their data, their systems, and their tools.' },
    { label: 'Dependable', desc: 'Infrastructure should work reliably and predictably.' },
  ];

  const prefersReduced = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
      {principles.map((p, i) => (
        <motion.div
          key={p.label}
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.08, ease: easing }}
          className="bg-card p-6"
        >
          <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, '0')}</span>
          <h4 className="mt-2 font-display text-lg font-medium tracking-tight">{p.label}</h4>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            {p.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
