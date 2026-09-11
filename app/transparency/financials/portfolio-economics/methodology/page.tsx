import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Callout } from '@/components/shared/callout';
import Link from 'next/link';
import { BookOpen, ShieldAlert, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Portfolio Economics Methodology',
  description:
    'The foundational principles, accounting separation, cost allocation algorithms, and data lineage framework underpinning TIV Portfolio Economics.',
  path: '/transparency/financials/portfolio-economics/methodology',
  keywords: [
    'Portfolio Economics Methodology',
    'TIV accounting principles',
    'founder time treatment',
    'shared cost allocation',
    'revenue attribution',
    'non-monetary valuation',
  ],
});

export default function PortfolioEconomicsMethodologyPage() {
  const pageGraph = generatePageGraph({
    pagePath: '/transparency/financials/portfolio-economics/methodology',
    pageTitle: 'Portfolio Economics Methodology — Tonmoy Infrastructure and Vision',
    pageDescription:
      'Detailed methodological documentation for TIV Portfolio Economics: measurement models, founder time economics, shared infrastructure allocation, and anti-valuation declaration.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Transparency', path: '/transparency' },
      { name: 'Financials', path: '/transparency/financials' },
      { name: 'Portfolio Economics', path: '/transparency/financials/portfolio-economics' },
      { name: 'Methodology', path: '/transparency/financials/portfolio-economics/methodology' },
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={pageGraph} />

      {/* Header */}
      <div className="border-b border-border bg-gradient-to-b from-card/60 via-card/20 to-transparent">
        <div className="tiv-container py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Transparency', href: '/transparency' },
              { label: 'Financials', href: '/transparency/financials' },
              { label: 'Portfolio Economics', href: '/transparency/financials/portfolio-economics' },
              { label: 'Methodology' },
            ]}
          />

          <div className="mt-8 flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-2 text-brand">
              <BookOpen className="h-4 w-4" />
              <span className="tiv-meta text-xs">SPECIFICATION &amp; DISCLOSURE STANDARD</span>
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Portfolio Economics Methodology.
            </h1>

            <p className="text-base text-muted-foreground md:text-lg leading-relaxed">
              How Tonmoy Infrastructure and Vision (TIV) measures, attributes, and audits
              resource consumption, development investment, and operational costs across its
              technology portfolio.
            </p>

            <div>
              <Link
                href="/transparency/financials/portfolio-economics"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-brand hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio Economics
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="tiv-container py-12 max-w-4xl space-y-12">
        {/* Core Principle & Anti-Valuation Clause */}
        <section className="space-y-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="tiv-meta text-xs text-brand font-semibold">SECTION 1</span>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Core Principle &amp; Explicit No-Valuation Declaration
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            The Tonmoy Infrastructure and Vision Portfolio Economics system is a{' '}
            <strong className="text-foreground">measurement and accounting documentation system</strong>,{' '}
            <strong className="text-foreground">NOT</strong> a project valuation system.
          </p>

          <Callout type="warning" title="Formal No-Valuation Declaration">
            TIV does not currently assign or publish standalone monetary valuations for
            individual projects through the Portfolio Economics system. Portfolio Economics
            measures economic activity and resource consumption. It is not a valuation model.
            We do not calculate arbitrary figures such as &ldquo;OpenMail is worth ₹X&rdquo; or
            &ldquo;Mercura is worth ₹Y&rdquo;.
          </Callout>

          <p className="text-sm text-muted-foreground leading-relaxed">
            The intended purpose of Portfolio Economics is to establish a rigorous historical evidence base:
          </p>

          <div className="p-4 border border-border bg-card/60 font-mono text-xs text-muted-foreground">
            ACCOUNTING → PORTFOLIO ECONOMICS → HISTORICAL PERFORMANCE → UNIT ECONOMICS → ASSET/IP ANALYSIS → FUTURE VALUATION
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Only after multiple consecutive reporting periods of verified operational data are documented
            can an independent, formal valuation framework eventually be evaluated as a separate analytical layer.
          </p>
        </section>

        {/* What is Measured vs Not Measured */}
        <section className="space-y-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="tiv-meta text-xs text-brand font-semibold">SECTION 2</span>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Scope: What is Measured vs What is Not Measured
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-emerald-500/30 bg-emerald-500/5 p-5">
              <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mb-3">
                ✓ WHAT WE MEASURE
              </span>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Actual cash capital deployed for hosting, domain registration, hardware, and APIs</li>
                <li>• Quantified economic development effort (logged engineering hours)</li>
                <li>• Recurring direct operational expenses incurred per initiative</li>
                <li>• Shared infrastructure compute, storage, and bandwidth usage allocations</li>
                <li>• Formally attributable revenues derived from direct contracts or usage</li>
                <li>• Physical and compute asset consumption via fixed asset register</li>
                <li>• Data confidence levels and source lineage verification</li>
              </ul>
            </div>

            <div className="border border-red-500/30 bg-red-500/5 p-5">
              <span className="font-mono text-xs font-semibold text-red-600 dark:text-red-400 block mb-3">
                ✕ WHAT WE DO NOT MEASURE
              </span>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Fictional market capitalization or speculative enterprise valuation</li>
                <li>• Theoretical replacement cost multiplier heuristics</li>
                <li>• Fabricated revenue figures for non-commercialized research prototypes</li>
                <li>• Hypothetical software licensing multiples</li>
                <li>• Subjective brand equity estimations</li>
                <li>• Speculative venture capital valuation milestones</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Direct vs Shared Costs */}
        <section className="space-y-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="tiv-meta text-xs text-brand font-semibold">SECTION 3</span>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Direct Costs vs Shared Infrastructure Cost Allocation
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Costs are categorized strictly as either <strong>Direct</strong> or <strong>Allocated</strong>:
          </p>

          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="border border-border bg-card p-4">
              <strong className="text-foreground text-sm block mb-1">Direct Costs:</strong>
              When an expense belongs exclusively to an individual project (such as dedicated outbound SMTP IP blocks for OpenMail or dedicated NVMe volumes for Mercura), it is classified with <code className="font-mono">direct_or_allocated = direct</code>. Direct costs are never allocated across projects.
            </li>

            <li className="border border-border bg-card p-4">
              <strong className="text-foreground text-sm block mb-1">Shared Infrastructure Costs:</strong>
              When infrastructure supports multiple initiatives (e.g. core multi-tenant virtualization clusters, CI runners, optical gateway testbeds), the source cost is recorded in full, along with an explicit <code className="font-mono">allocation_method</code> (Compute Usage, Bandwidth Usage, Storage Usage, or Engineering Hours).
            </li>
          </ul>

          <Callout type="info" title="Zero Silent Allocation Principle">
            TIV never silently allocates costs. Every shared cost record requires explicit percentage allocations across consumer projects, and the system enforces that the sum of allocation percentages equals 100% within a strict 0.05% numerical tolerance.
          </Callout>
        </section>

        {/* Cash Investment vs Economic Development Cost */}
        <section className="space-y-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="tiv-meta text-xs text-brand font-semibold">SECTION 4</span>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Cash Investment vs Economic Development Cost (Founder Time)
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Software development often relies significantly on founder engineering and systems architecture without a cash salary being disbursed. Converting founder time directly into cash expense would distort statutory accounting, while ignoring it completely would misrepresent the real economic investment required to construct the technology.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Therefore, TIV maintains two separate measures:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-border bg-card p-4">
              <span className="font-mono text-xs font-semibold text-foreground block">Cash Investment</span>
              <p className="mt-1 text-xs text-muted-foreground">
                Actual cash deployed from bank accounts for hardware, cloud services, domain registrars, third-party software, and external services.
              </p>
            </div>

            <div className="border border-border bg-card p-4">
              <span className="font-mono text-xs font-semibold text-foreground block">Economic Development Cost</span>
              <p className="mt-1 text-xs text-muted-foreground">
                The economic value of founder and contributor engineering hours, computed using an explicit baseline rate (e.g. ₹500/hr for systems engineering), with methodology fully recorded in the audit trail.
              </p>
            </div>
          </div>
        </section>

        {/* Revenue Attribution & Unattributed Revenue */}
        <section className="space-y-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="tiv-meta text-xs text-brand font-semibold">SECTION 5</span>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Revenue Attribution &amp; Unattributed Revenue
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Commercial income is only attributed to an individual project when a defensible and verifiable causal link exists (such as a direct contract for private OpenMail instances or Mercura hosting licenses).
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed">
            General corporate income—such as domain services or multi-service infrastructure agreements—is held at the portfolio level as <strong className="text-foreground">Unattributed Revenue</strong>. TIV never forces corporate revenue arbitrarily into project ledgers.
          </p>
        </section>

        {/* Research Project Economics */}
        <section className="space-y-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="tiv-meta text-xs text-brand font-semibold">SECTION 6</span>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Research Initiatives vs Stable Software Products
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Research initiatives (such as M31Genesis, M31Tesla, and M31Entropy) are experimental research artifacts and checkpoint lineages, not commercial software applications.
          </p>

          <div className="border border-border bg-card p-4 text-xs text-muted-foreground leading-relaxed space-y-2">
            <p>
              • <strong className="text-foreground">Revenue = Not Applicable:</strong> Commercial expectations are not applied to foundational AI models and tokenizer explorations.
            </p>
            <p>
              • <strong className="text-foreground">Research Investment:</strong> Compute, datasets, and laboratory equipment are tracked separately and linked directly to publications and research areas.
            </p>
          </div>
        </section>

        {/* Data Confidence & The "Not Tracked" Principle */}
        <section className="space-y-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="tiv-meta text-xs text-brand font-semibold">SECTION 7</span>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Data Confidence &amp; The &ldquo;Not Tracked vs ₹0&rdquo; Rule
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            A critical rule of TIV Portfolio Economics is the strict distinction between missing data and zero:
          </p>

          <Callout type="warning" title="Mandatory Not Tracked Principle">
            If a metric has not been measured or source records are pending intake, the value
            is represented as &ldquo;Not Tracked&rdquo; or &ldquo;Not Available&rdquo;. The value
            ₹0 is NEVER used to represent unmeasured data.
          </Callout>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Every economic metric supports one of five confidence ratings:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            <div className="border border-emerald-500/30 bg-card p-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold block">Verified</span>
              <span className="text-[11px] text-muted-foreground mt-1 block">Backed by invoices, bank statements, or official contracts.</span>
            </div>
            <div className="border border-blue-500/30 bg-card p-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold block">Calculated</span>
              <span className="text-[11px] text-muted-foreground mt-1 block">Mathematically derived from verified hours or source amounts.</span>
            </div>
            <div className="border border-purple-500/30 bg-card p-3">
              <span className="text-purple-600 dark:text-purple-400 font-bold block">Allocated</span>
              <span className="text-[11px] text-muted-foreground mt-1 block">Apportioned from shared source costs via defensible metrics.</span>
            </div>
            <div className="border border-amber-500/30 bg-card p-3">
              <span className="text-amber-600 dark:text-amber-400 font-bold block">Estimated</span>
              <span className="text-[11px] text-muted-foreground mt-1 block">Management estimate prepared when exact timesheets are pending.</span>
            </div>
            <div className="border border-zinc-500/30 bg-card p-3">
              <span className="text-zinc-600 dark:text-zinc-400 font-bold block">Unverified</span>
              <span className="text-[11px] text-muted-foreground mt-1 block">Preliminary intake figure awaiting formal audit reconciliation.</span>
            </div>
          </div>
        </section>

        {/* Statutory Accounting Separation */}
        <section className="space-y-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="tiv-meta text-xs text-brand font-semibold">SECTION 8</span>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Separation from Statutory Financial Accounts
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Portfolio Economics is <strong className="text-foreground">management analytics</strong>, not statutory accounting. TIV does not replace or circumvent official corporate accounting practices.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Statutory financial statements remain exclusively authoritative for company-wide revenue, expenses, balance sheet liabilities, taxes, and equity. Portfolio contribution is a managerial measure (<code className="font-mono">Attributed Revenue - Operating Costs</code>), and is never presented as statutory net profit.
          </p>
        </section>
      </main>
    </div>
  );
}
