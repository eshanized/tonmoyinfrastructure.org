import Link from 'next/link';
import {
  ArrowUpRight,
  Clock,
  DollarSign,
  Layers,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

const financialStatus = [
  {
    label: 'Cash development investment',
    value: 'Not Tracked',
    detail: 'No verified project-level cash amount is published.',
  },
  {
    label: 'Engineering effort',
    value: 'Not Tracked',
    detail: 'No approved Kyro-specific timesheet total is published.',
  },
  {
    label: 'Operating costs',
    value: 'Not Tracked',
    detail: 'Direct and shared costs require source-backed records.',
  },
  {
    label: 'Attributed revenue',
    value: 'Not Tracked',
    detail: 'No Kyro revenue amount or customer count is disclosed.',
  },
];

const commercialPaths = [
  {
    title: 'Support and implementation',
    detail:
      'Potential paid configuration, migration, integration, or support engagements for teams that need hands-on assistance.',
  },
  {
    title: 'Enterprise integration',
    detail:
      'Potential custom connectors, deployment guidance, and security or workflow integration, subject to demand and delivery capacity.',
  },
  {
    title: 'Optional managed capabilities',
    detail:
      'A future hosted or team-oriented service could be evaluated only if it is implemented, costed, and clearly separated from the MIT-licensed desktop application.',
  },
];

const costDrivers = [
  'Engineering, design, security maintenance, testing, and release qualification.',
  'Cross-platform packaging, CI/build capacity, distribution, and signing where required.',
  'Provider or model-inference charges only where TIV actually bears them; user-configured provider charges must not be silently counted as TIV expenses.',
  'Customer support, integration work, and any future managed service infrastructure.',
  'Shared CI or infrastructure only when usage is measured and an explicit allocation method is documented.',
];

export function KyroEconomicCase() {
  return (
    <section id="commercial-economics" className="space-y-7" aria-labelledby="kyro-economic-heading">
      <div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-brand" />
          <span className="tiv-meta-brand">PORTFOLIO ECONOMICS</span>
        </div>
        <h2 id="kyro-economic-heading" className="mt-3 font-display text-2xl md:text-3xl">
          Kyro’s economic position and commercial pathway.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Kyro is an MIT-licensed desktop AI application with a public v0.1.0 release and
          ongoing development. Its economic profile separates recorded financial actuals
          from potential commercial options: a published software release is not evidence
          of paying customers, revenue, or a validated price point.
        </p>
      </div>

      <div className="border-l-4 border-amber-500 bg-amber-500/5 p-5">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <ShieldCheck className="h-4 w-4" />
          Financial disclosure — actuals not tracked
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          The public Portfolio Economics ledger does not currently contain verified Kyro
          amounts for cash investment, economic development cost, operating expenses,
          engineering hours, or attributed revenue. These fields are reported as
          <strong> Not Tracked</strong>, not as zero. No project valuation, revenue forecast,
          customer count, or return estimate is being asserted here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
        {financialStatus.map((item) => (
          <div key={item.label} className="bg-card p-5">
            <span className="tiv-meta">{item.label}</span>
            <p className="mt-2 font-display text-xl font-semibold text-foreground">{item.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-brand" />
            <span className="tiv-meta-brand">COMMERCIAL OPTIONS TO VALIDATE</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            These are avenues for evaluation, not currently published paid plans or commitments.
            The MIT license remains the project’s stated software license.
          </p>
          <div className="mt-5 space-y-4">
            {commercialPaths.map((path, index) => (
              <div key={path.title} className="flex gap-3 border-t border-border/60 pt-4 first:border-t-0 first:pt-0">
                <span className="font-mono text-xs text-brand">0{index + 1}</span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{path.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{path.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
            No public subscription price, paid-tier schedule, or approved monetization decision is currently disclosed.
          </p>
        </div>

        <div className="border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-brand" />
            <span className="tiv-meta-brand">COSTS TO MEASURE</span>
          </div>
          <ul className="mt-5 space-y-3">
            {costDrivers.map((driver) => (
              <li key={driver} className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                <span className="mt-0.5 text-brand">—</span>
                <span>{driver}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border border-border bg-secondary/20 p-5">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-brand" />
          <span className="tiv-meta-brand">EVIDENCE REQUIRED BEFORE A FINANCIAL FORECAST</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A defensible model needs approved engineering-hour records and rate methodology,
          expense invoices, measurable shared-resource usage, a clear rule for who pays model
          provider fees, and validated adoption and willingness-to-pay evidence. Unit
          economics and payback should be calculated from those records—not inferred from
          source-code size, release downloads, or a qualitative strategic score.
        </p>
      </div>

      <Link
        href="/projects/kyro/economics"
        className="inline-flex items-center gap-2 border border-brand/40 bg-brand/5 px-4 py-3 text-sm font-medium text-brand transition-colors hover:bg-brand/10"
      >
        Open Kyro’s Portfolio Economics record
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
