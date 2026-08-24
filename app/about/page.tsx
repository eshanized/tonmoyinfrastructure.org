import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Markdown } from '@/components/shared/markdown';
import { Reveal } from '@/components/shared/motion';
import { getFounder } from '@/lib/people';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'About Tonmoy Infrastructure and Vision',
  description:
    'Tonmoy Infrastructure and Vision (TIV) — who we are, what we believe, our engineering philosophy, open-source work, and long-term infrastructure mission.',
  path: '/about',
  keywords: ['About TIV', 'Tonmoy Infrastructure and Vision', 'engineering organization', 'infrastructure mission'],
});

const sections = [
  {
    number: '01',
    title: 'Who We Are',
    content: `Tonmoy Infrastructure and Vision (TIV) is a technology infrastructure organization building practical software, internet infrastructure, networking systems, optical systems, and emerging technologies.

TIV is not a startup. It is an engineering organization that sits at the intersection of software, infrastructure, networks, and advanced research — building systems that people can understand, operate, own, and depend on.`,
  },
  {
    number: '02',
    title: 'What We Believe',
    content: `We believe infrastructure should be:

- **Understandable** — people should be able to reason about the systems they depend on. Systems that cannot be understood cannot be audited, maintained, or improved.
- **Operable** — people should be able to deploy, configure, and maintain their own infrastructure without requiring an army of specialists.
- **Ownable** — individuals and organizations should control their data, software, and systems without permission or vendor lock-in.
- **Dependable** — infrastructure must behave reliably, predictably, and fail gracefully with actionable diagnostics.

The internet has become too centralized, too opaque, and too dependent on a small number of large providers. TIV builds practical, ownable alternatives.`,
  },
  {
    number: '03',
    title: 'What We Build',
    content: `TIV operates across four interconnected categories of work:

- **Software** — self-hosted email, code hosting, AI infrastructure, and developer systems (OpenMail, Mercura, M31A, and Octate — all four shipped as stable releases).
- **Internet Infrastructure** — domains, DNS, hosting, and the foundational services that make the internet accessible.
- **Network Infrastructure** — routing, switching, edge infrastructure, and network architecture research.
- **Research** — fundamental research across artificial intelligence, networking, fiber optics, distributed systems, and systems engineering.

TIV has already shipped stable software while continuing to operate internal infrastructure and conduct long-term research.`,
  },
  {
    number: '04',
    title: 'How We Work',
    content: `TIV engineering principles guide every architectural decision:

- **Build from first principles** — understand the physical and logical realities before designing abstractions.
- **Ship working software** — working code in production beats theoretical specifications.
- **Prefer simplicity** — unnecessary complexity is the primary source of operational failure and security vulnerabilities.
- **Design for ownership** — software and infrastructure must be fully deployable on user-controlled hardware.
- **Document everything** — undocumented infrastructure cannot be operated or maintained responsibly.
- **Verifiable facts only** — no fake claims, no fabricated certifications, and no inflated metrics.`,
  },
  {
    number: '05',
    title: 'Where We Are Going',
    content: `TIV's long-term trajectory works down the infrastructure stack:

1. **Applications & Software** — stable release products deployed and maintained.
2. **Internet Services** — internal hosting, domain operations, and developer services.
3. **Networking** — edge routing, switching architectures, and network observability.
4. **Optical Systems** — fiber optic transmission systems and physical communications research.
5. **Integrated Infrastructure** — complete end-to-end self-reliant infrastructure stack.

We are building toward a more self-reliant internet. This is a multi-year effort. We are patient. We build what should exist.`,
  },
];

export default function AboutPage() {
  const founder = getFounder();

  const pageGraph = generatePageGraph({
    title: 'About Tonmoy Infrastructure and Vision',
    description:
      'Tonmoy Infrastructure and Vision (TIV) — who we are, what we believe, our engineering philosophy, open-source work, and long-term infrastructure mission.',
    path: '/about',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'About', item: '/about' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="ABOUT"
        label="Organization"
        title="Who we are."
        description="Tonmoy Infrastructure and Vision builds practical software, internet infrastructure, networking systems, and emerging technologies that people can deploy, operate, and depend on."
        meta={[
          { label: 'ORGANIZATION', value: 'TIV' },
          { label: 'PORTFOLIO', value: '4 Stable Systems' },
          { label: 'APPROACH', value: 'Engineering-Led' },
          { label: 'INTEGRITY', value: 'Verified Facts Only' },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Verified Information Only">
            TIV does not fabricate company history, employees, board members, offices,
            investors, partnerships, certifications, or awards. Only verified information is
            published. Where information is not yet available, it is simply omitted.
          </Callout>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              label="Principles"
              title="Four engineering principles."
              description="These four principles are engineering constraints that govern what TIV builds and how."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Understandable',
                desc: 'People can reason about the systems they depend on. Clear architecture, explicit configurations, observable behavior.',
              },
              {
                title: 'Operable',
                desc: 'Practical to deploy and maintain on own infrastructure without requiring a dedicated army of specialists.',
              },
              {
                title: 'Ownable',
                desc: 'True data and software ownership. Open-source licenses, local data storage, and zero vendor lock-in.',
              },
              {
                title: 'Dependable',
                desc: 'Predictable behavior under expected conditions and graceful degradation under stress. No silent data loss.',
              },
            ].map((p, idx) => (
              <div key={p.title} className="bg-card p-6">
                <span className="font-display text-4xl font-bold tracking-tight text-muted-foreground/20">
                  0{idx + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-brand">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Narrative Sections */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <div className="space-y-16 md:space-y-24">
            {sections.map((section, i) => (
              <Reveal key={section.number} delay={i * 0.05}>
                <div className="grid grid-cols-1 gap-8 border-l-2 border-border pl-6 md:grid-cols-[220px_1fr] md:gap-12 md:border-l-0 md:pl-0">
                  <div className="md:border-l-2 md:border-brand md:pl-6">
                    <span className="font-display text-4xl font-bold tracking-tight text-muted-foreground/20">
                      {section.number}
                    </span>
                    <h2 className="mt-2 font-display text-2xl tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="max-w-3xl">
                    <Markdown content={section.content} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      {founder && (
        <section className="border-b border-border bg-secondary/30">
          <div className="tiv-container py-16 md:py-24">
            <Reveal>
              <SectionHeader
                index="06"
                label="Founder"
                title="Built by people who engineer the systems."
                description="TIV is not an anonymous web entity. The organization was founded and is led by an active systems engineer."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 border border-border bg-card p-8 md:p-10">
                <span className="tiv-meta">FOUNDER</span>
                <h3 className="mt-3 font-display text-3xl tracking-tight">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm text-brand font-mono">
                  @{founder.handle} · {founder.role}, {founder.organization}
                </p>
                <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  {founder.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {founder.areas.map((area) => (
                    <span
                      key={area}
                      className="border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/about/leadership"
                    className="group inline-flex items-center gap-1.5 bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    Founder profile & leadership
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/about/governance"
                    className="group inline-flex items-center gap-1.5 border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    Governance principles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Institutional Links */}
      <section>
        <div className="tiv-container py-16">
          <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
            <Link
              href="/about/company"
              className="group bg-card p-6 transition-colors hover:bg-card/80"
            >
              <span className="tiv-meta">COMPANY</span>
              <h4 className="mt-2 font-display text-lg group-hover:text-brand">
                Corporate Identity
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Legal name, brand, contacts, and registered domains.
              </p>
            </Link>
            <Link
              href="/about/timeline"
              className="group bg-card p-6 transition-colors hover:bg-card/80"
            >
              <span className="tiv-meta">TIMELINE</span>
              <h4 className="mt-2 font-display text-lg group-hover:text-brand">
                Organizational Milestones
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Verified milestone dates from foundation to software releases.
              </p>
            </Link>
            <Link
              href="/transparency"
              className="group bg-card p-6 transition-colors hover:bg-card/80"
            >
              <span className="tiv-meta">TRANSPARENCY</span>
              <h4 className="mt-2 font-display text-lg group-hover:text-brand">
                Financials & Reports
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Annual reports, management estimates, and security disclosures.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
