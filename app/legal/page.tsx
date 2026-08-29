import Link from 'next/link';
import { ArrowRight, ShieldCheck, FileText, Eye, Scale, Accessibility } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { getLegalDocuments } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Legal, Privacy & Compliance Directory',
  description:
    'Legal framework, privacy policy, terms of service, accessibility statement, and software licenses for Tonmoy Infrastructure and Vision.',
  path: '/legal',
  keywords: ['TIV legal', 'privacy policy', 'terms of service', 'compliance', 'licenses'],
});

const docMeta: Record<string, { icon: typeof FileText; path: string; summary: string }> = {
  privacy: {
    icon: Eye,
    path: '/legal/privacy',
    summary: 'Our data protection commitments: zero behavioral telemetry, zero ad trackers, and absolute user privacy.',
  },
  terms: {
    icon: Scale,
    path: '/legal/terms',
    summary: 'Conditions governing the use of the TIV website, open protocols, public APIs, and software downloads.',
  },
  accessibility: {
    icon: Accessibility,
    path: '/legal/accessibility',
    summary: 'Our WCAG 2.2 AA compliance standards, keyboard accessibility, semantic structure, and screen-reader testing.',
  },
  licenses: {
    icon: ShieldCheck,
    path: '/legal/licenses',
    summary: 'Permissive and copyleft open-source licenses governing OpenMail, Mercura, M31A, and Octate.',
  },
};

export default function LegalIndexPage() {
  const docs = getLegalDocuments();

  const pageGraph = generatePageGraph({
    title: 'Legal, Privacy & Compliance Directory — Tonmoy Infrastructure and Vision',
    description:
      'Legal framework, privacy policy, terms of service, accessibility statement, and software licenses for Tonmoy Infrastructure and Vision.',
    path: '/legal',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Legal', item: '/legal' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="LEGAL / COMPLIANCE"
        label="Legal Framework"
        title="Legal & compliance."
        description="Clear, plain-spoken legal policies governing our website, infrastructure, and software releases."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Legal' }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Directory"
              title="Official documents."
              description="Review our legal policies, terms, accessibility guidelines, and license agreements."
            />
          </Reveal>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2" stagger={0.08}>
            {docs.map((doc) => {
              const meta = docMeta[doc.slug] || {
                icon: FileText,
                path: `/legal/${doc.slug}`,
                summary: 'Official TIV legal document.',
              };
              const Icon = meta.icon;

              return (
                <StaggerItem key={doc.slug}>
                  <Link
                    href={meta.path}
                    className="group relative flex h-full flex-col bg-card p-8 transition-colors hover:bg-card/80"
                  >
                    <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center border border-border text-brand transition-all group-hover:border-brand/40">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">Updated {doc.lastUpdated}</span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-medium transition-colors group-hover:text-brand">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                      {meta.summary}
                    </p>

                    <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-brand">
                      Read document
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Summary of Guarantees */}
      <section className="bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="tiv-meta">OUR LEGAL PHILOSOPHY</span>
            <h2 className="mt-2 font-display text-2xl">Plain language, no predatory clauses.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We do not use legal fine print to claim rights over user data or restrict the free inspection and modification of our open-source software. Our policies are written in accessible language and designed to uphold sovereignty.
            </p>
            <div className="mt-8 border-t border-border pt-6">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-xs font-medium text-brand hover:underline"
              >
                Inquiries regarding legal or licensing matters
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
