'use client';

import { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { Markdown } from '@/components/shared/markdown';
import { Reveal } from '@/components/shared/motion';
import { SectionNavigation } from './section-navigation';
import type { WhitepaperSection } from '@/lib/types';

export function WhitepaperSection({
  section,
  sections,
  index,
}: {
  section: WhitepaperSection;
  sections: WhitepaperSection[];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal>
      <section
        id={section.id}
        className="scroll-mt-24 border-t border-border pt-12"
      >
        <div
          className="group flex items-center gap-4"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className="font-display text-3xl font-bold tracking-tight text-muted-foreground/20">
            {section.number}
          </span>
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">
            {section.title}
          </h2>
          <a
            href={`#${section.id}`}
            className="ml-1 text-muted-foreground/40 transition-opacity hover:text-brand"
            aria-label={`Link to ${section.title}`}
          >
            <LinkIcon
              className={`h-4 w-4 transition-opacity ${hovered ? 'opacity-100' : 'opacity-0'}`}
            />
          </a>
        </div>

        <div className="mt-6 max-w-2xl">
          <Markdown content={section.content} />
        </div>

        <SectionNavigation sections={sections} currentIndex={index} />
      </section>
    </Reveal>
  );
}
