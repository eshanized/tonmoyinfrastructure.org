import { generatePageMetadata } from '@/lib/seo';
import { ManagementDashboardView } from '@/components/portfolio-economics/management-dashboard-view';

export const metadata = generatePageMetadata({
  title: 'Portfolio Economics Management Dashboard',
  description:
    'Internal management control console for TIV Portfolio Economics: cross-project comparisons, corporate financial reconciliation, and data lineage.',
  path: '/transparency/financials/portfolio-economics/dashboard',
  noIndex: true, // Internal management view
});

export default function PortfolioEconomicsDashboardPage() {
  return <ManagementDashboardView />;
}
