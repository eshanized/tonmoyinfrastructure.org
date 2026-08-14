import Link from 'next/link';
import { ArrowRight, Shield, Bug, FileText, Mail, Key, Lock, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getSecurityAdvisories } from '@/lib/institutional';

interface SecurityCenterViewProps {
  breadcrumbs: { label: string; href?: string }[];
}

const severityColors: Record<string, string> = {
  Critical: 'bg-red-500',
  High: 'bg-orange-500',
  Medium: 'bg-amber-500',
  Low: 'bg-blue-500',
  Info: 'bg-muted-foreground',
};

export function SecurityCenterView({ breadcrumbs }: SecurityCenterViewProps) {
  const advisories = getSecurityAdvisories();

  return (
    <>
      <PageHeader
        index="SECURITY CENTER"
        label="Vulnerability & Trust"
        title="Security at TIV."
        description="Security is an engineering discipline, not a marketing badge. We design for zero-trust, verify memory safety, operate transparent disclosure, and maintain open advisories."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      {/* 01 — Overview */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Engineering Standard"
              title="Security architecture principles."
              description="How TIV approaches the construction and maintenance of reliable infrastructure software."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              <div className="bg-card p-6">
                <Shield className="h-5 w-5 text-brand" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-medium">Memory Safety & Minimal Surface</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our systems prioritize memory-safe languages and statically linked runtimes, minimizing external dynamic dependencies and unneeded attack surface.
                </p>
              </div>
              <div className="bg-card p-6">
                <Bug className="h-5 w-5 text-brand" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-medium">Safe Harbor Disclosure</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Good-faith security research is protected under our Safe Harbor commitment. We will not pursue legal action against researchers acting in accordance with our policy.
                </p>
              </div>
              <div className="bg-card p-6">
                <FileText className="h-5 w-5 text-brand" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-medium">Verified Advisories</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every vulnerability is assigned a structured CVE/TIV identifier, with reproducible regression tests and clear patch remediation steps.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — Disclosure Policy */}
      <section className="border-b border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Policy & Timelines"
              title="Vulnerability disclosure policy."
              description="Guidelines for reporting and our commitment to researchers."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="max-w-3xl space-y-6">
              <div className="border-l-2 border-brand bg-card p-6">
                <h3 className="font-display text-lg tracking-tight">Reporting Protocol</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Send vulnerability reports to <span className="font-mono text-foreground">security@tonmoyinfrastructure.org</span> or via our contact portal using the <span className="font-medium text-foreground">Security</span> category. Please encrypt sensitive technical details using our published PGP key whenever possible.
                </p>
              </div>

              <div className="border-l-2 border-border bg-card p-6">
                <h3 className="font-display text-lg tracking-tight">Response SLA Commitments</h3>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand" />
                    <span><strong className="text-foreground">Initial Acknowledgment:</strong> Within 48 hours of report receipt.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand" />
                    <span><strong className="text-foreground">Triage & Severity Assessment:</strong> Within 5 business days.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand" />
                    <span><strong className="text-foreground">Status Updates:</strong> Bi-weekly updates until remediation patch release.</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-2 border-border bg-card p-6">
                <h3 className="font-display text-lg tracking-tight">Coordinated Release</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We request a standard 90-day coordinated disclosure window before public release. In instances where an active zero-day exploit is observed, we accelerate patches within 24 to 72 hours.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — Advisories */}
      <section className="border-b border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Advisories"
              title="Security advisories."
              description="Published security advisories. TIV maintains absolute honesty and never fabricates advisories."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            {advisories.length === 0 ? (
              <div className="border border-border bg-card p-8 md:p-12">
                <Callout type="info" title="No Outstanding Advisories">
                  TIV has zero known unpatched security vulnerabilities. When security issues are discovered and patched, detailed advisories will be published here with full identifiers, CVSS metrics, and migration guides.
                </Callout>
              </div>
            ) : (
              <StaggerContainer className="space-y-px border border-border bg-border" stagger={0.06}>
                {advisories.map((adv) => (
                  <StaggerItem key={adv.slug}>
                    <div className="bg-card p-6">
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${severityColors[adv.severity] || 'bg-muted-foreground'}`} />
                        <span className="font-mono text-xs text-brand">{adv.identifier}</span>
                        <span className="tiv-meta">{adv.severity}</span>
                        <span className="tiv-meta">· {adv.status}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg tracking-tight">{adv.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{adv.date}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </Reveal>
        </div>
      </section>

      {/* 04 — Security Contacts & PGP */}
      <section>
        <div className="tiv-container py-16 md:py-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border border-border bg-card p-8">
              <Key className="h-6 w-6 text-brand" />
              <h3 className="mt-4 font-display text-xl">PGP Security Key</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Fingerprint for verified encrypted vulnerability disclosure:
              </p>
              <div className="mt-4 bg-secondary/70 p-3 border border-border font-mono text-xs break-all select-all">
                4B91 A1E2 F80C 335B 904C 76D1 E289 B31A 7780 D5EF
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                Canonical security machine specification available at <span className="font-mono">/.well-known/security.txt</span>.
              </p>
            </div>

            <div className="border border-border bg-card p-8 flex flex-col justify-between">
              <div>
                <Lock className="h-6 w-6 text-brand" />
                <h3 className="mt-4 font-display text-xl">Report a Vulnerability</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Direct submission channel for researchers, system administrators, and downstream operators.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
                >
                  <Mail className="h-4 w-4" />
                  Submit Security Report
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
