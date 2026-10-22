'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  calculatePortfolioEconomicsSummary,
  convertPortfolioSummary,
} from '@/lib/portfolio-economics/calculations';
import { type SupportedCurrency } from '@/lib/portfolio-economics/decimal';
import { getFinancialPeriods } from '@/lib/portfolio-economics/periods';
import { type UserSession, PUBLIC_SESSION, LOCAL_DEV_SESSION } from '@/lib/portfolio-economics/auth';
import { EconomicsHeader } from './economics-header';
import { EconomicsSummaryCards } from './economics-summary-cards';
import { ProjectsEconomicsTable } from './projects-economics-table';
import { DataQualityCards } from './data-quality-cards';
import { PortfolioCharts } from './portfolio-charts';
import { ReconciliationCard } from './reconciliation-card';
import { ProjectComparison } from './project-comparison';
import { PeriodComparison } from './period-comparison';
import { ReportPreviewModal } from './report-preview-modal';
import { CorporateAssetRegister } from './corporate-asset-register';
import {
  Table,
  ArrowLeftRight,
  Calendar,
  FileCheck,
  FileText,
  Building,
  ShieldAlert,
  ArrowRight,
  Lock,
} from 'lucide-react';

export function ManagementDashboardView() {
  const isDev = process.env.NODE_ENV === 'development';
  const periods = getFinancialPeriods();
  const [selectedPeriodId, setSelectedPeriodId] = useState(periods[0]?.id || 'fy2026');
  const [currency, setCurrency] = useState<SupportedCurrency>('INR');
  const [activeTab, setActiveTab] = useState<
    'ledger' | 'assets' | 'comparison' | 'periods' | 'reconciliation' | 'reports'
  >('ledger');

  // Enforce session: in production static export, visitor is strictly PUBLIC_SESSION.
  // Fake admin sessions and client-side role switchers are permanently removed.
  const session: UserSession = isDev ? LOCAL_DEV_SESSION : PUBLIC_SESSION;

  const rawSummary = calculatePortfolioEconomicsSummary(selectedPeriodId);
  const summary = convertPortfolioSummary(rawSummary, currency);

  // If deployed in production static environment, block privileged management interface
  if (!isDev) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background px-4 py-16">
        <div className="max-w-xl w-full border border-border bg-card p-8 md:p-10 space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
            <Lock className="h-7 w-7" />
          </div>

          <div>
            <span className="tiv-meta text-xs">SECURITY BOUNDARY ENFORCED</span>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Internal Management Console Restricted
            </h1>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              Administrative management operations, ledger mutation, CSV interchange, and unpublished
              financial records require trusted server authorization through TIV Sovereign Identity.
              Per TIV Data Protection Policy, private management datasets and client-side administrative
              sessions are completely excluded from public static deployment bundles.
            </p>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/transparency/financials/portfolio-economics/"
              className="inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
            >
              <span>View Public Transparency Portal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/transparency/financials/portfolio-economics/methodology/"
              className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-brand hover:text-brand transition-colors w-full sm:w-auto justify-center"
            >
              <span>Read Methodology</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'ledger', label: 'Project Ledger', icon: Table },
    { id: 'assets', label: 'Asset Register', icon: Building },
    { id: 'comparison', label: 'Project Comparison', icon: ArrowLeftRight },
    { id: 'periods', label: 'Period Trends', icon: Calendar },
    { id: 'reconciliation', label: 'Reconciliation', icon: FileCheck },
    { id: 'reports', label: 'Reports & Versions', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <EconomicsHeader
        summary={summary}
        periods={periods}
        selectedPeriodId={selectedPeriodId}
        onSelectPeriod={setSelectedPeriodId}
        isInternal={false}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Local Development Mode Indicator */}
      <div className="border-b border-amber-500/30 bg-amber-500/10 text-amber-300">
        <div className="tiv-container py-2.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="font-semibold uppercase tracking-wider">Local Offline Development Mode:</span>
            <span>Unpublished mutations and admin features are strictly local and disabled in public builds.</span>
          </div>
          <span className="text-[10px] border border-amber-500/40 px-2 py-0.5">
            Role: {session.role}
          </span>
        </div>
      </div>

      <main className="tiv-container py-8 space-y-8">
        {/* Metric Cards */}
        <EconomicsSummaryCards summary={summary} isInternal={false} />

        {/* Dashboard Navigation Tabs */}
        <div className="border-b border-border">
          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-mono font-medium transition-colors ${
                    isActive
                      ? 'border-brand text-brand bg-brand/5'
                      : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Tab Content */}
        <div>
          {activeTab === 'ledger' && (
            <div className="space-y-8">
              <ProjectsEconomicsTable
                projects={summary.projects}
                currency={summary.currency}
                isInternal={false}
                onCurrencyChange={setCurrency}
              />
              <PortfolioCharts summary={summary} />
              <DataQualityCards summary={summary} />
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-6">
              <CorporateAssetRegister
                isInternal={false}
                activeCurrency={currency}
                onCurrencyChange={setCurrency}
              />
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <ProjectComparison
                projects={summary.projects}
                currency={summary.currency}
              />
            </div>
          )}

          {activeTab === 'periods' && (
            <div className="space-y-6">
              <PeriodComparison
                initialPeriodA={selectedPeriodId}
                initialPeriodB={selectedPeriodId === 'fy2026' ? 'fy2027' : 'fy2026'}
                currency={summary.currency}
              />
            </div>
          )}

          {activeTab === 'reconciliation' && (
            <div className="space-y-6">
              <ReconciliationCard summary={summary} />
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <ReportPreviewModal
                periodId={selectedPeriodId}
                isInternal={false}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
