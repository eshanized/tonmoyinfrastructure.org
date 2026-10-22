import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { AIPortalView } from '@/components/ai/ai-portal-view';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  path: '/technology/ai',
  title: 'Artificial Intelligence & Machine Learning — Tonmoy Infrastructure and Vision',
  overrideTitle: true,
  description:
    'TIV artificial intelligence models, agent systems, interactive demos, and experimental architectures on Hugging Face and GitHub, including Kyro, a local-first desktop AI assistant with a public Linux v0.1.0 release.',
});

export default function TechnologyAIPage() {
  return (
    <>
      <AIPortalView basePath="technology" />
      <section className="border-t border-border bg-secondary/20">
        <div className="tiv-container py-14 md:py-18">
          <div className="grid grid-cols-1 gap-6 border border-brand/40 bg-card p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <span className="tiv-meta-brand">DESKTOP AI AGENT</span>
              <h2 className="mt-2 font-display text-2xl">Kyro — Local-first desktop AI assistant.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Kyro combines visual screen understanding, computer-use automation, browser workflows, and developer tools in a native desktop application.
                Version 0.1.0 is publicly available for Linux x86_64; product development and broader platform qualification continue.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects/kyro" className="inline-flex items-center gap-2 border border-border bg-card px-4 py-3 text-sm font-medium hover:border-brand hover:text-brand">
                Explore Kyro <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/projects/kyro/downloads" className="inline-flex items-center gap-2 border border-brand bg-brand px-4 py-3 text-sm font-medium text-brand-foreground hover:bg-brand/90">
                Download v0.1.0 <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://kyro.tonmoyinfrastructure.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-4 py-3 text-sm font-medium hover:border-brand hover:text-brand">
                Official website <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
