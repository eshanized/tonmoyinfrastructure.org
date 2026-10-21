import Link from 'next/link';
import {
  TrendingUp,
  Target,
  Layers,
  Shield,
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  DollarSign,
  HelpCircle,
  PieChart,
  Users,
  Compass,
  Building,
  Lock,
} from 'lucide-react';
import { Callout } from '@/components/shared/callout';
import { RunsteadFinancialModelView } from './runstead-financial-model-view';

export function RunsteadInvestmentCase() {
  return (
    <div className="space-y-16">
      {/* ─── A. EXECUTIVE INVESTMENT THESIS ─────────────────────────── */}
      <section id="investment-thesis" className="scroll-mt-24">
        <div className="border-l-2 border-brand pl-6">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-brand" />
            <span className="tiv-meta-brand text-xs">EXECUTIVE INVESTMENT THESIS</span>
          </div>
          <h3 className="mt-2 font-display text-2xl md:text-3xl text-foreground">
            Unifying Commercial Operations &amp; Hosting Automation
          </h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Runstead is engineered to resolve a persistent, structural problem across the global web hosting industry: the extreme software fragmentation that burdens independent hosting providers, digital web agencies, and emerging hosting entrepreneurs.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border border-border bg-card p-6 space-y-3">
            <h4 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" />
              The Operational Problem
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              For over two decades, independent hosting providers have relied on legacy, monolithic systems—principally WHMCS—coupled with separate, unintegrated third-party utilities. Operating a hosting business today requires managing disparate tools: one for invoices, a disconnected panel for helpdesk tickets, manual registrar consoles for domain purchases, unlinked DNS tools, and antiquated customer portals with poor mobile responsiveness. This fragmentation generates high manual maintenance, recurring reconciliation errors, security vulnerabilities, and steep onboarding friction for new market entrants.
            </p>
          </div>

          <div className="border border-border bg-card p-6 space-y-3">
            <h4 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              The Proposed Solution &amp; Differentiation
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Runstead consolidates the entire hosting business lifecycle into a single, cohesive SaaS platform: CRM, multi-cycle catalog, automated recurring invoicing, service lifecycle automation, domain search, RFC-compliant DNS zone editing, support ticketing, and real-time white-label storefront customizers. Backed by PostgreSQL Row-Level Security (RLS) and transaction-scoped tenant context, it guarantees strict data isolation while providing platform operators global fleet visibility.
            </p>
          </div>
        </div>

        {/* Target Customers Grid */}
        <div className="mt-6 border border-border bg-card p-6">
          <span className="tiv-meta text-xs block mb-3">TARGET MARKET SEGMENTS</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-border/60 bg-background p-3.5 space-y-1">
              <span className="font-mono text-xs font-semibold text-foreground">Digital Web Agencies</span>
              <p className="text-[11px] text-muted-foreground">Managing client hosting portfolios with unified recurring billing, white-label portals, and team access.</p>
            </div>
            <div className="border border-border/60 bg-background p-3.5 space-y-1">
              <span className="font-mono text-xs font-semibold text-foreground">Hosting Entrepreneurs</span>
              <p className="text-[11px] text-muted-foreground">Bootstrapping regional hosting brands without spending months integrating complex legacy software stacks.</p>
            </div>
            <div className="border border-border/60 bg-background p-3.5 space-y-1">
              <span className="font-mono text-xs font-semibold text-foreground">Freelance Developers</span>
              <p className="text-[11px] text-muted-foreground">Bundling turnkey web hosting, domain registration, and maintenance subscriptions into project retainers.</p>
            </div>
            <div className="border border-border/60 bg-background p-3.5 space-y-1">
              <span className="font-mono text-xs font-semibold text-foreground">Established Host Modernizers</span>
              <p className="text-[11px] text-muted-foreground">Seeking an API-first Next.js alternative to replace aging WHMCS installations and high per-account license fees.</p>
            </div>
          </div>
        </div>

        {/* The Three Horizons Alignment */}
        <div className="mt-6 border border-border bg-secondary/20 p-6 space-y-4">
          <span className="tiv-meta text-xs block">STRATEGIC ALIGNMENT: THE THREE PLATFORM HORIZONS</span>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Runstead&apos;s business model is deliberately staged across three sequential horizons, balancing immediate commercial software delivery with Tonmoy Infrastructure&apos;s long-term sovereign infrastructure assets:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="border border-border bg-card p-4 space-y-1.5">
              <span className="text-brand font-bold">Horizon A: Business SaaS</span>
              <p className="font-sans text-xs text-muted-foreground">
                Commercial operating software: Client CRM, billing, catalog, storefronts, and helpdesk. Immediate SaaS recurring subscription monetization.
              </p>
            </div>
            <div className="border border-border bg-card p-4 space-y-1.5">
              <span className="text-foreground font-bold">Horizon B: Automation Layer</span>
              <p className="font-sans text-xs text-muted-foreground">
                Integration connectors: cPanel/WHM, Plesk, DirectAdmin, registrar EPP APIs, Stripe, and Let&apos;s Encrypt ACME challenge automation.
              </p>
            </div>
            <div className="border border-border bg-card p-4 space-y-1.5">
              <span className="text-foreground font-bold">Horizon C: Owned Infrastructure</span>
              <p className="font-sans text-xs text-muted-foreground">
                Sovereign TIV assets: Bare-metal hypervisors, native containerized control panels, Anycast DNS, and deduplicated object backup storage.
              </p>
            </div>
          </div>
        </div>

        {/* Key Execution Risks & Assumptions */}
        <div className="mt-6 border-l-2 border-amber-500 bg-amber-500/5 p-5 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-4 w-4" />
            Key Execution Risks &amp; Assumptions Requiring Commercial Validation
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/90 font-sans mt-2">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-mono shrink-0">•</span>
              <span><strong>Upstream API Maintenance:</strong> Upstream cPanel/WHM, Plesk, and DirectAdmin API changes require continuous regression testing and dedicated adapter maintenance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-mono shrink-0">•</span>
              <span><strong>Customer Migration Friction:</strong> Hosting providers with historical databases require battle-tested, lossless WHMCS import and schema reconciliation tooling.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-mono shrink-0">•</span>
              <span><strong>Payment Compliance:</strong> Production Stripe Connect, subscription webhooks, and multi-currency tax calculation require strict financial audit compliance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-mono shrink-0">•</span>
              <span><strong>Customer Acquisition Velocity:</strong> Reseller customer acquisition cost (CAC) and conversion from free sandbox to paid plans requires empirical testing with live pilot cohorts.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ─── B. MARKET POSITIONING & COMPETITION ─────────────────────── */}
      <section id="market-positioning" className="scroll-mt-24 border-t border-border pt-12">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-brand" />
          <span className="tiv-meta-brand text-xs">MARKET POSITIONING &amp; COMPETITIVE LANDSCAPE</span>
        </div>
        <h3 className="mt-2 font-display text-2xl text-foreground">
          Modern Alternative to Legacy Tool Fragmentation
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          The hosting billing and business management market is currently characterized by high concentration around legacy software suites, paired with growing dissatisfaction over escalating license fees and aging technical architectures.
        </p>

        {/* Competitor Analysis Table */}
        <div className="mt-8 border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-border bg-muted/40 uppercase tracking-wider text-muted-foreground text-[11px]">
                  <th className="px-4 py-3 font-medium">Platform / System</th>
                  <th className="px-4 py-3 font-medium">Architecture &amp; Stack</th>
                  <th className="px-4 py-3 font-medium">Commercial Model</th>
                  <th className="px-4 py-3 font-medium">Primary Operational Limitations</th>
                  <th className="px-4 py-3 font-medium">Runstead Differentiation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="px-4 py-3 font-bold text-foreground">WHMCS (WebPros)</td>
                  <td className="px-4 py-3 text-muted-foreground">Legacy PHP 7/8, IonCube encoded, MySQL</td>
                  <td className="px-4 py-3 text-muted-foreground">Tiered monthly per active client ($18.95 – $54.95+/mo)</td>
                  <td className="px-4 py-3 text-muted-foreground">Closed source IonCube encoding, frequent license price hikes, complex third-party plugin bloat</td>
                  <td className="px-4 py-3 text-brand font-medium">Modern Next.js/TypeScript, open schema, built-in visual storefront, predictable tiers</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-foreground">Blesta (Phillips Data)</td>
                  <td className="px-4 py-3 text-muted-foreground">PHP (open source files), MySQL</td>
                  <td className="px-4 py-3 text-muted-foreground">Monthly ($12.95/mo) or Perpetual ($250+)</td>
                  <td className="px-4 py-3 text-muted-foreground">Smaller plugin ecosystem, legacy admin UI, no integrated visual storefront builder</td>
                  <td className="px-4 py-3 text-brand font-medium">Turnkey multi-tenant SaaS, modern accessible Radix UI, integrated RFC DNS editor</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-foreground">Clientexec</td>
                  <td className="px-4 py-3 text-muted-foreground">PHP, MySQL</td>
                  <td className="px-4 py-3 text-muted-foreground">Monthly ($11.95/mo) or Reseller bundled</td>
                  <td className="px-4 py-3 text-muted-foreground">Limited hypervisor integration, slower release cadence, dated customer self-service</td>
                  <td className="px-4 py-3 text-brand font-medium">Operator console, strict PostgreSQL RLS data isolation, responsive mobile-first portal</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-foreground">HostBill</td>
                  <td className="px-4 py-3 text-muted-foreground">PHP, IonCube, MySQL</td>
                  <td className="px-4 py-3 text-muted-foreground">High perpetual license ($599 to $5,999 upfront)</td>
                  <td className="px-4 py-3 text-muted-foreground">Prohibitive upfront capex for startups, costly enterprise support contracts</td>
                  <td className="px-4 py-3 text-brand font-medium">Free sandbox tier, low barrier $49/mo launch plan, zero perpetual license lock-in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground italic">
          Market landscape notes: Competitor pricing and architectural observations are derived from publicly available vendor documentation as of October 2026. External market share figures are not estimated without accredited third-party census data.
        </p>
      </section>

      {/* ─── C. COMMERCIAL MODEL & PRICING ──────────────────────────── */}
      <section id="commercial-model" className="scroll-mt-24 border-t border-border pt-12">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-brand" />
          <span className="tiv-meta-brand text-xs">COMMERCIAL MODEL &amp; INDICATIVE PRICING</span>
        </div>
        <h3 className="mt-2 font-display text-2xl text-foreground">
          Predictable Platform SaaS Subscriptions
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          Runstead&apos;s revenue model is based strictly on subscription fees paid by hosting businesses and resellers for platform access. It maintains absolute separation from downstream end-user hosting revenues.
        </p>

        {/* Pricing Tiers Table */}
        <div className="mt-8 border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-border bg-muted/40 uppercase tracking-wider text-muted-foreground text-[11px]">
                  <th className="px-4 py-3 font-medium">Subscription Tier</th>
                  <th className="px-4 py-3 font-medium">Listed Monthly Fee</th>
                  <th className="px-4 py-3 font-medium">Target Reseller Profile</th>
                  <th className="px-4 py-3 font-medium">Included Features &amp; Quotas</th>
                  <th className="px-4 py-3 font-medium">Commercial Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="px-4 py-3.5 font-bold text-foreground">Sandbox</td>
                  <td className="px-4 py-3.5 text-foreground font-semibold">Free ($0 • ₹0 • ৳0)</td>
                  <td className="px-4 py-3.5 text-muted-foreground">Developers, pre-launch testing, evaluation</td>
                  <td className="px-4 py-3.5 text-muted-foreground">Up to 3 active clients, simulated billing, test DNS editor, watermarked storefront</td>
                  <td className="px-4 py-3.5 text-emerald-600 dark:text-emerald-400">Available in Demo</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-foreground">Launch</td>
                  <td className="px-4 py-3.5 text-foreground font-semibold">
                    <div>US$49 / mo</div>
                    <div className="text-[11px] font-mono text-muted-foreground font-normal">
                      ₹4,116 / ৳5,880
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">Freelance web designers, boutique agencies</td>
                  <td className="px-4 py-3.5 text-muted-foreground">Up to 50 active clients, custom domain, white-label storefront, 1 cPanel/Plesk server</td>
                  <td className="px-4 py-3.5 text-amber-600 dark:text-amber-400">Indicative Pricing</td>
                </tr>
                <tr className="bg-brand/5 border-l-2 border-brand">
                  <td className="px-4 py-3.5 font-bold text-foreground">Growth (Popular)</td>
                  <td className="px-4 py-3.5 text-brand font-bold">
                    <div>US$149 / mo</div>
                    <div className="text-[11px] font-mono text-brand/80 font-normal">
                      ₹12,516 / ৳17,880
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">Independent hosting entrepreneurs, regional hosts</td>
                  <td className="px-4 py-3.5 text-muted-foreground">Up to 250 active clients, multi-server routing, custom email branding, priority queue</td>
                  <td className="px-4 py-3.5 text-amber-600 dark:text-amber-400">Indicative Pricing</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-foreground">Scale</td>
                  <td className="px-4 py-3.5 text-foreground font-semibold">
                    <div>US$399 / mo</div>
                    <div className="text-[11px] font-mono text-muted-foreground font-normal">
                      ₹33,516 / ৳47,880
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">Growing hosting brands with multi-region nodes</td>
                  <td className="px-4 py-3.5 text-muted-foreground">Up to 1,000 active clients, automated server provisioning, multi-currency, audit logs</td>
                  <td className="px-4 py-3.5 text-amber-600 dark:text-amber-400">Indicative Pricing</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-foreground">Enterprise</td>
                  <td className="px-4 py-3.5 text-foreground font-semibold">
                    <div>Custom (from $999/mo)</div>
                    <div className="text-[11px] font-mono text-muted-foreground font-normal">
                      from ₹83,916 / ৳1,19,880
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">Large web hosting companies, telecom resellers</td>
                  <td className="px-4 py-3.5 text-muted-foreground">Unlimited clients, dedicated VPC, custom SLA, bespoke registrar integrations, SSO</td>
                  <td className="px-4 py-3.5 text-muted-foreground">Custom Quotation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-4 py-2.5 bg-muted/20 flex flex-wrap items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>Standard portfolio benchmark: 1 USD = 84.00 INR = 120.00 BDT</span>
            <span>All tiers convert to USD ($), INR (₹), and BDT (৳)</span>
          </div>
        </div>

        {/* Revenue Integrity Callout */}
        <div className="mt-6 border border-border bg-card p-5 space-y-2 text-xs">
          <span className="tiv-meta text-[11px] block text-brand">CRITICAL REVENUE INTEGRITY PRINCIPLE</span>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Runstead Revenue vs. Downstream Hosting Customer Revenue:</strong> When a web agency using Runstead charges their client $15/month for WordPress hosting and $12/year for a .com domain, 100% of that end-user transaction belongs to the agency. Neither Runstead nor Tonmoy Infrastructure &amp; Vision counts, consolidates, or reports downstream hosting revenues as corporate revenue. Runstead&apos;s sole commercial revenue comprises direct platform SaaS subscription fees.
          </p>
        </div>
      </section>

      {/* ─── D. PRODUCT DEVELOPMENT MILESTONES & BLOCKERS ────────── */}
      <section id="development-milestones" className="scroll-mt-24 border-t border-border pt-12">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-brand" />
          <span className="tiv-meta-brand text-xs">PRODUCT DEVELOPMENT MILESTONES &amp; BLOCKERS</span>
        </div>
        <h3 className="mt-2 font-display text-2xl text-foreground">
          Roadmap Evidence, Completed Phases &amp; Production Blockers
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          Runstead enforces an evidence-based development standard. Functionality is claimed as complete only when supported by verifiable source code, database migrations, and passing automated test suites.
        </p>

        {/* Roadmap Milestones Breakdown */}
        <div className="mt-8 space-y-4">
          {/* M1 */}
          <div className="border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-mono text-sm font-semibold text-foreground">
                  Milestone 1: Foundation &amp; Reseller Architecture
                </span>
              </div>
              <span className="border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                Verified (Demo Baseline)
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Implemented multi-tenant store, seed data models, reseller onboarding wizard (<code className="text-foreground">/demo/launch</code>), platform operator console (<code className="text-foreground">/demo/platform-admin</code>), and global command palette (⌘K). Verified by unit tests (<code className="text-foreground">tests/seed-data.test.ts</code>, <code className="text-foreground">tests/selectors.test.ts</code>).
            </p>
          </div>

          {/* M2 */}
          <div className="border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-mono text-sm font-semibold text-foreground">
                  Milestone 2: Core Platform &amp; Business Workflows
                </span>
              </div>
              <span className="border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                Verified (Demo Baseline)
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Implemented customer CRM, product catalog with multi-cycle pricing, order processing state machine, automated invoices with tax calculations, and multi-channel support ticketing. Verified by <code className="text-foreground">tests/workflows.test.ts</code>.
            </p>
          </div>

          {/* M3 */}
          <div className="border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-mono text-sm font-semibold text-foreground">
                  Milestone 3: Customer Experience &amp; Storefront Customizer
                </span>
              </div>
              <span className="border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                Verified (Demo Baseline)
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Implemented real-time visual storefront customizer with viewport toggles, public published storefront preview (<code className="text-foreground">/demo/storefront-preview</code>), customer self-service client portal, and multi-item shopping cart. Verified by <code className="text-foreground">tests/storefront.test.ts</code>.
            </p>
          </div>

          {/* M4 */}
          <div className="border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <Circle className="h-4 w-4 text-amber-500" />
                <span className="font-mono text-sm font-semibold text-foreground">
                  Milestone 4: Provisioning &amp; Automation Engine
                </span>
              </div>
              <span className="border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase">
                Simulation Verified • Production In Progress
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Service lifecycle state machine (Suspend, Restore, Upgrade, Cancel) and interactive 4-step provisioning simulation are verified in browser state.
            </p>
            <div className="mt-3 border-t border-border/60 pt-3">
              <span className="tiv-meta text-[10px] text-amber-500 block mb-1">Production-Readiness Blockers:</span>
              <ul className="text-xs space-y-1 text-muted-foreground font-sans">
                <li>• Real cPanel/WHM XML-API / UAPI client library for account provisioning.</li>
                <li>• Asynchronous background worker queue (BullMQ / Redis) with exponential backoff and dead-letter queues.</li>
                <li>• Plesk and DirectAdmin driver adapter implementations.</li>
              </ul>
            </div>
          </div>

          {/* M5 */}
          <div className="border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <Circle className="h-4 w-4 text-amber-500" />
                <span className="font-mono text-sm font-semibold text-foreground">
                  Milestone 5: Domain Commerce &amp; DNS Network
                </span>
              </div>
              <span className="border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase">
                RFC DNS Verified • Integrations In Progress
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Full RFC-compliant DNS zone editor supporting A, AAAA, CNAME, MX, TXT, and CAA records with TTL validation is verified in unit and E2E suites.
            </p>
            <div className="mt-3 border-t border-border/60 pt-3">
              <span className="tiv-meta text-[10px] text-amber-500 block mb-1">Production-Readiness Blockers:</span>
              <ul className="text-xs space-y-1 text-muted-foreground font-sans">
                <li>• Live registrar API connectors (ResellerClub, Enom, Namecheap EPP protocols).</li>
                <li>• Automated Let&apos;s Encrypt / ACME challenge automation for SSL certificate lifecycle management.</li>
                <li>• DNS edge synchronization with PowerDNS or Cloudflare API.</li>
              </ul>
            </div>
          </div>

          {/* M6 */}
          <div className="border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-mono text-sm font-semibold text-foreground">
                  Milestone 6: Security, Enterprise &amp; Release Readiness
                </span>
              </div>
              <span className="border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                Phase 0–2 Accepted • v1.0 Hardening In Progress
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              <strong>Phase 2 Completed (October 15, 2026):</strong> Modeled 19 relational entities in <code className="text-foreground">prisma/schema.prisma</code> using Prisma ORM 6.12.0. Enforced PostgreSQL Row-Level Security across all 18 tenant tables with transaction-scoped context (<code className="text-foreground">withTenantContext</code>). Verified by 25 PostgreSQL integration tests in <code className="text-foreground">tests/db-rls.test.ts</code> (total test suite expanded to 77 passing tests).
            </p>
            <div className="mt-3 border-t border-border/60 pt-3">
              <span className="tiv-meta text-[10px] text-amber-500 block mb-1">Production-Readiness Blockers:</span>
              <ul className="text-xs space-y-1 text-muted-foreground font-sans">
                <li>• Concrete Stripe Checkout, Customer Portal, and webhook signature verification for real billing settlement.</li>
                <li>• Multi-factor authentication (MFA) and secure session token management.</li>
                <li>• Independent security penetration testing and formal v1.0 release packaging.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── E. INVESTMENT REQUIREMENTS & USE OF FUNDS ────────────── */}
      <section id="use-of-funds" className="scroll-mt-24 border-t border-border pt-12">
        <div className="flex items-center gap-2">
          <PieChart className="h-4 w-4 text-brand" />
          <span className="tiv-meta-brand text-xs">INVESTMENT REQUIREMENTS &amp; USE OF FUNDS</span>
        </div>
        <h3 className="mt-2 font-display text-2xl text-foreground">
          Milestone Delivery Budget &amp; Resource Allocation
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          Advancing Runstead from its current Phase 2 state to a battle-tested v1.0 production release requires targeted engineering investment across six core disciplines.
        </p>

        {/* Governance Disclosure */}
        <div className="mt-6 border-l-2 border-brand bg-card p-5">
          <span className="tiv-meta text-[10px] text-brand block mb-1">GOVERNANCE &amp; AUTHORIZATION NOTICE</span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Official Investment Request Status:</strong> Tonmoy Infrastructure &amp; Vision has <strong>not published a formal fundraising target, enterprise valuation, or committed equity offering</strong> for Runstead. The allocations below represent an illustrative engineering budget scenario derived from estimated effort points required to resolve Milestones 4–6 production blockers over a 12-month development cycle.
          </p>
        </div>

        {/* Budget Allocation Breakdown */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-border bg-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-foreground">Core Control-Panel Adapters</span>
              <span className="font-mono text-xs text-brand font-semibold">35% Allocation</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Engineering upstream cPanel/WHM XML-API, Plesk REST API, and DirectAdmin CMD_API driver adapters; asynchronous BullMQ worker queues with retry semantics; and webhook delivery engine.
            </p>
          </div>

          <div className="border border-border bg-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-foreground">Security Hardening &amp; Auth</span>
              <span className="font-mono text-xs text-brand font-semibold">15% Allocation</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Implementing production session token lifecycle, email verification, TOTP multi-factor authentication (MFA), role-based audit logging, and external third-party penetration testing.
            </p>
          </div>

          <div className="border border-border bg-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-foreground">Stripe Payment Settlement</span>
              <span className="font-mono text-xs text-brand font-semibold">15% Allocation</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Live Stripe Billing integration, Payment Intents, Customer Portal reconciliation, webhook signature verification, and automated dispute and refund lifecycle handling.
            </p>
          </div>

          <div className="border border-border bg-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-foreground">Registrars &amp; ACME SSL</span>
              <span className="font-mono text-xs text-brand font-semibold">15% Allocation</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              EPP domain registrar integrations (ResellerClub, Enom, Namecheap) for automated domain procurement; DNS-01 / HTTP-01 ACME challenge workers for automatic Let&apos;s Encrypt wildcard SSL issuance.
            </p>
          </div>

          <div className="border border-border bg-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-foreground">High-Availability Infra</span>
              <span className="font-mono text-xs text-brand font-semibold">10% Allocation</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              PostgreSQL multi-AZ replication, Redis persistence clusters, automated off-site database backups, monitoring telemetry, and load-tested staging environments.
            </p>
          </div>

          <div className="border border-border bg-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-foreground">Docs &amp; Pilot Onboarding</span>
              <span className="font-mono text-xs text-brand font-semibold">10% Allocation</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Comprehensive API documentation, WHMCS database migration scripts, developer SDKs, and high-touch support for the initial cohort of beta web agency partners.
            </p>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE FINANCIAL MODEL SECTION ────────────────────── */}
      <section className="border-t border-border pt-12">
        <RunsteadFinancialModelView />
      </section>

      {/* ─── F. INVESTOR EXPECTATIONS & CONTACT ACTION ─────────────── */}
      <section id="investor-expectations" className="scroll-mt-24 border-t border-border pt-12">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-brand" />
          <span className="tiv-meta-brand text-xs">INVESTOR EXPECTATIONS &amp; PARTNERSHIP INQUIRY</span>
        </div>
        <h3 className="mt-2 font-display text-2xl text-foreground">
          Rigorous Evaluation Criteria &amp; Commercial Partnerships
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          Tonmoy Infrastructure &amp; Vision invites prospective strategic partners, infrastructure collaborators, and early-stage enterprise evaluators to assess Runstead with complete transparency.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border border-border bg-card p-6 space-y-3">
            <h4 className="font-display text-base font-semibold text-foreground">
              What Evaluators Should Examine
            </h4>
            <ul className="text-xs space-y-2 text-muted-foreground font-sans">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                <span><strong>Verifiable Codebase:</strong> 77 automated unit and integration tests, 25 Playwright journeys, and production Prisma RLS migrations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                <span><strong>Multi-Tenant Isolation:</strong> Enforced database Row-Level Security ensuring zero tenant cross-talk across commercial and service entities.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                <span><strong>Unit Economics Discipline:</strong> High gross margins (~75–80%) achievable through lean Next.js App Router serverless and containerized deployment.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                <span><strong>Transparent Governance:</strong> Honest separation between simulated demonstration behavior and planned production infrastructure.</span>
              </li>
            </ul>
          </div>

          <div className="border border-border bg-card p-6 space-y-3">
            <h4 className="font-display text-base font-semibold text-foreground">
              What TIV Does Not Offer
            </h4>
            <ul className="text-xs space-y-2 text-muted-foreground font-sans">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                <span><strong>No Guaranteed Returns:</strong> No promises of specific returns on capital, dividend distributions, or predetermined liquidity horizons.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                <span><strong>No Premature Valuations:</strong> Standalone monetary company or venture valuations are not assigned or published without audited financials.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                <span><strong>No Public Securities Offering:</strong> This profile is for informational and commercial partnership purposes only; it does not constitute a public solicitation of securities.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Inquiry Callout Card */}
        <div className="mt-8 border border-brand/40 bg-brand/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="tiv-meta text-[11px] text-brand">ENGAGEMENT &amp; INQUIRY</span>
            <h4 className="font-display text-xl font-bold text-foreground">
              Explore Strategic Partnerships &amp; Pilot Opportunities
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We welcome discussions with web agencies seeking modern client hosting tooling, control-panel vendors interested in driver integrations, and strategic partners evaluating cloud infrastructure ventures.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact?category=investors"
              rel="nofollow"
              className="inline-flex items-center gap-2 border border-brand bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors shadow-sm"
            >
              Investor Inquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact?category=partnership"
              rel="nofollow"
              className="inline-flex items-center gap-2 border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Strategic Partnership
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
