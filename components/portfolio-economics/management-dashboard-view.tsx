'use client';

import { useState } from 'react';
import {
  calculatePortfolioEconomicsSummary,
  calculateProjectEconomicProfile,
} from '@/lib/portfolio-economics/calculations';
import { getFinancialPeriods } from '@/lib/portfolio-economics/periods';
import { AVAILABLE_ROLES, type UserSession, DEFAULT_ADMIN_SESSION } from '@/lib/portfolio-economics/auth';
import { EconomicsHeader } from './economics-header';
import { EconomicsSummaryCards } from './economics-summary-cards';
import { ProjectsEconomicsTable } from './projects-economics-table';
import { DataQualityCards } from './data-quality-cards';
import { PortfolioCharts } from './portfolio-charts';
import { ReconciliationCard } from './reconciliation-card';
import { ProjectComparison } from './project-comparison';
import { PeriodComparison } from './period-comparison';
import { CsvExchangeModal } from './csv-exchange-modal';
import { ReportPreviewModal } from './report-preview-modal';
import {
  BarChart3,
  Table,
  ArrowLeftRight,
  Calendar,
  FileCheck,
  FileSpreadsheet,
  FileText,
  UserCheck,
} from 'lucide-react';

export function ManagementDashboardView() {
  const periods = getFinancialPeriods();
  const [selectedPeriodId, setSelectedPeriodId] = useState(periods[0]?.id || 'fy2026');
  const [activeTab, setActiveTab] = useState<
    'ledger' | 'comparison' | 'periods' | 'reconciliation' | 'csv' | 'reports'
  >('ledger');
  const [session, setSession] = useState<UserSession>(DEFAULT_ADMIN_SESSION);
  const [refreshKey, setRefreshKey] = useState(0);

  const summary = calculatePortfolioEconomicsSummary(selectedPeriodId);

  const tabs = [
    { id: 'ledger', label: 'Project Ledger', icon: Table },
    { id: 'comparison', label: 'Project Comparison', icon: ArrowLeftRight },
    { id: 'periods', label: 'Period Trends', icon: Calendar },
    { id: 'reconciliation', label: 'Reconciliation', icon: FileCheck },
    { id: 'csv', label: 'CSV Interchange', icon: FileSpreadsheet },
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
        isInternal={true}
      />

      {/* Role Switcher Toolbar */}
      <div className="border-b border-border bg-muted/20">
        <div className="tiv-container py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-brand" />
            <span className="text-xs font-mono uppercase text-muted-foreground">Active Role:</span>
            <select
              value={session.role}
              onChange={(e) => {
                const r = AVAILABLE_ROLES.find((role) => role.role === e.target.value);
                if (r) {
                  setSession({
                    ...session,
                    role: r.role,
                    isInternal: r.role !== 'Viewer',
                  });
                }
              }}
              className="border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground focus:border-brand focus:outline-none"
            >
              {AVAILABLE_ROLES.map((r) => (
                <option key={r.role} value={r.role}>
                  {r.role}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
            <span>Audit User:</span>
            <span className="text-foreground font-semibold">{session.name}</span>
            <span>({session.isInternal ? 'Internal Access' : 'Public Restricted'})</span>
          </div>
        </div>
      </div>

      <main className="tiv-container py-8 space-y-8">
        {/* Metric Cards */}
        <EconomicsSummaryCards summary={summary} isInternal={true} />

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
                isInternal={true}
              />
              <PortfolioCharts summary={summary} />
              <DataQualityCards summary={summary} />
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
              />
            </div>
          )}

          {activeTab === 'reconciliation' && (
            <div className="space-y-6">
              <ReconciliationCard summary={summary} />
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="space-y-6">
              <CsvExchangeModal
                periodId={selectedPeriodId}
                onDataChanged={() => setRefreshKey((k) => k + 1)}
              />
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <ReportPreviewModal
                periodId={selectedPeriodId}
                isInternal={session.isInternal}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
