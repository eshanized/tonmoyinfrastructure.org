import { generatePageMetadata } from '@/lib/seo';
import { ManagementDashboardView } from '@/components/portfolio-economics/management-dashboard-view';

export const metadata = generatePageMetadata({
  title: 'Internal Portfolio Economics',
  description: 'Internal operational management view for TIV Portfolio Economics system.',
  path: '/internal/portfolio-economics',
  noIndex: true,
});

export default function InternalPortfolioEconomicsPage() {
  return <ManagementDashboardView />;
}
