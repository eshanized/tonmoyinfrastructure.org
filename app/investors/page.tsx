import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getProjects } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Investor & Stakeholder Information',
  description:
    'Factual stakeholder and investor information hub for Tonmoy Infrastructure and Vision — business model, infrastructure assets, capital discipline, and governance.',
  path: '/investors',
  keywords: ['TIV investors', 'stakeholder information', 'capital discipline', 'business areas'],
});

const sections = [
  { number: '01', label: 'Company Overview', title: 'What TIV is.', content: 'Tonmoy Infrastructure and Vision is an organization building practical infrastructure across software, internet infrastructure, networking, fiber optics, artificial intelligence, and systems engineering. TIV is not a startup chasing trends — it is an organization building things that should exist.' },
  { number: '02', label: 'Business Areas', title: 'Where TIV operates.', content: 'TIV operates across four areas: Software (OpenMail, Mercura, M31A, Octate — all stable releases), Internet Infrastructure (domains, hosting), Network Infrastructure (routing, switching, fiber optics), and Research (AI, networking, distributed systems, systems engineering). TIV has already built and shipped stable software while continuing to invest in infrastructure and research.' },
  { number: '03', label: 'Products and Projects', title: 'What TIV builds.', content: 'TIV has already developed and released four stable software products: OpenMail (self-hosted email), Mercura (code hosting), M31A (autonomous developer and AI infrastructure), and Octate (terminal-native AI code review CLI). All four are stable releases. TIV continues to improve them while investing in infrastructure and research.' },
  { number: '04', label: 'Infrastructure', title: 'TIV\'s infrastructure vision.', content: 'TIV is building toward infrastructure services across domains, hosting, compute, networking, and optical systems. All infrastructure services are currently in planning or research phases.' },
  { number: '05', label: 'Research', title: 'TIV\'s research direction.', content: 'TIV conducts fundamental research in AI, networking, fiber optics, distributed systems, systems engineering, and developer infrastructure. Research is published openly.' },
];

export default function InvestorsPage() {
  const projects = getProjects();

  const pageGraph = generatePageGraph({
    title: 'Investor & Stakeholder Information — Tonmoy Infrastructure and Vision',
    description:
      'Factual stakeholder and investor information hub for Tonmoy Infrastructure and Vision — business model, infrastructure assets, capital discipline, and governance.',
    path: '/investors',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Investors', item: '/investors' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="INVESTORS"
        label="Stakeholders"
        title="Investor information."
        description="A factual hub for stakeholders and investors. TIV is not publicly traded. No valuation, funding, investors, or revenue projections are fabricated."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Investors' }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Factual Information Only">
            TIV does not invent valuation, funding rounds, investor names, or
            revenue projections. This page provides verified information about
            the organization. Financial figures are clearly labeled as estimates
            where applicable.
          </Callout>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <div className="space-y-16">
            {sections.map((section, i) => (
              <Reveal key={section.number} delay={i * 0.05}>
                <div className="grid grid-cols-1 gap-8 border-l-2 border-border pl-6 md:grid-cols-[200px_1fr] md:gap-12 md:border-l-0 md:pl-0">
                  <div className="md:border-l-2 md:border-brand md:pl-6">
                    <span className="font-display text-4xl font-bold tracking-tight text-muted-foreground/20">
                      {section.number}
                    </span>
                    <h2 className="mt-2 font-display text-xl tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="max-w-2xl">
                    <span className="tiv-meta mb-3 block">{section.label}</span>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Financial and reports links */}
      <section className="border-t border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="06"
              label="Reports"
              title="Financial reports and transparency."
              description="TIV publishes financial information and annual reports through its transparency architecture."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              <Link
                href="/transparency/financials"
                className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">FINANCIAL</span>
                <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                  Financial Reports
                </h3>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                  View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link
                href="/transparency"
                className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                <span className="tiv-meta">REPORTS</span>
                <h3 className="mt-2 font-display text-base font-medium transition-colors group-hover:text-brand">
                  Annual Reports
                </h3>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
                  View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="07"
              label="Contact"
              title="Get in touch."
              description="For investor or stakeholder inquiries, use the contact page with the Investors category."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              Contact TIV
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
