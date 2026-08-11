'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import type { PortfolioEconomicsSummary } from '@/lib/portfolio-economics/types';

const COLORS = ['#E5484D', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

export function PortfolioCharts({
  summary,
}: {
  summary: PortfolioEconomicsSummary;
}) {
  const { projects } = summary;

  // Verify adequate data exists
  const hasCostOrInvestmentData = projects.some(
    (p) => (p.totalOperatingCosts || 0) > 0 || (p.totalDevelopmentInvestment || 0) > 0
  );

  const hasHoursData = projects.some((p) => (p.totalEngineeringHours || 0) > 0);

  if (!hasCostOrInvestmentData && !hasHoursData) {
    return (
      <div className="border border-border bg-card p-8 text-center">
        <p className="text-sm font-mono text-muted-foreground">
          Charts unavailable: insufficient quantitative data recorded for this period.
        </p>
      </div>
    );
  }

  // Cost vs Investment dataset
  const costInvestmentData = projects
    .filter((p) => (p.totalOperatingCosts || 0) > 0 || (p.totalDevelopmentInvestment || 0) > 0)
    .map((p) => ({
      name: p.projectTitle,
      operatingCost: p.totalOperatingCosts || 0,
      developmentInvestment: p.totalDevelopmentInvestment || 0,
    }));

  // Engineering Hours dataset
  const hoursData = projects
    .filter((p) => (p.totalEngineeringHours || 0) > 0)
    .map((p) => ({
      name: p.projectTitle,
      hours: p.totalEngineeringHours || 0,
      development: p.developmentHours || 0,
      maintenance: p.maintenanceHours || 0,
      research: p.researchHours || 0,
    }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Chart 1: Operating Cost vs Development Investment */}
      {costInvestmentData.length > 0 && (
        <div className="border border-border bg-card p-5">
          <div className="border-b border-border pb-3">
            <span className="tiv-meta text-xs">FINANCIAL COMMITMENT BY INITIATIVE</span>
            <h3 className="mt-1 font-display text-base font-semibold text-foreground">
              Operating Cost vs Development Investment
            </h3>
            <span className="text-[11px] font-mono text-muted-foreground">Amounts in INR (₹)</span>
          </div>

          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costInvestmentData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.15)" />
                <XAxis
                  dataKey="name"
                  stroke="#888"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#888"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, '']}
                  contentStyle={{
                    backgroundColor: 'rgba(20, 20, 20, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    fontSize: '12px',
                    borderRadius: '0px',
                    color: '#fff',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="operatingCost" name="Operating Cost" fill="#3b82f6" />
                <Bar dataKey="developmentInvestment" name="Dev Investment" fill="#E5484D" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Chart 2: Engineering Hours Distribution */}
      {hoursData.length > 0 && (
        <div className="border border-border bg-card p-5">
          <div className="border-b border-border pb-3">
            <span className="tiv-meta text-xs">HUMAN CAPITAL ALLOCATION</span>
            <h3 className="mt-1 font-display text-base font-semibold text-foreground">
              Engineering Hours by Work Type
            </h3>
            <span className="text-[11px] font-mono text-muted-foreground">Logged Development, Research &amp; Maintenance</span>
          </div>

          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.15)" />
                <XAxis
                  dataKey="name"
                  stroke="#888"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#888"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `${val}h`}
                />
                <Tooltip
                  formatter={(val: number) => [`${val} hours`, '']}
                  contentStyle={{
                    backgroundColor: 'rgba(20, 20, 20, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    fontSize: '12px',
                    borderRadius: '0px',
                    color: '#fff',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="development" name="Development" stackId="a" fill="#10b981" />
                <Bar dataKey="research" name="Research" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="maintenance" name="Maintenance" stackId="a" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
