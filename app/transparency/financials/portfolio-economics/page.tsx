import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import { calculatePortfolioEconomicsSummary } from '@/lib/portfolio-economics/calculations';
import { getFinancialPeriods, getDefaultFinancialPeriod } from '@/lib/portfolio-economics/periods';
import { sanitizePortfolioForPublic } from '@/lib/portfolio-economics/auth';
import { PublicPortfolioView } from '@/components/portfolio-economics/public-portfolio-view';

export const metadata = generatePageMetadata({
  title: 'Portfolio Economics',
  description:
    'A transparent measurement and accounting view of development investment, operating costs, attributed revenue, engineering effort, and data confidence across TIV projects.',
  path: '/transparency/financials/portfolio-economics',
  keywords: [
    'TIV portfolio economics',
    'infrastructure investment',
    'open source accounting',
    'engineering effort tracking',
    'shared cost allocation',
    'data confidence',
  ],
});

export default function PublicPortfolioEconomicsPage() {
  const periods = getFinancialPeriods();
  const defaultPeriod = getDefaultFinancialPeriod();
  const rawSummary = calculatePortfolioEconomicsSummary(defaultPeriod.id);
  const summary = sanitizePortfolioForPublic(rawSummary);

  const pageGraph = generatePageGraph({
    pagePath: '/transparency/financials/portfolio-economics',
    pageTitle: 'Portfolio Economics — Tonmoy Infrastructure and Vision',
    pageDescription:
      'A factual measurement system documenting development investment, operating costs, revenue attribution, engineering hours, and data confidence across TIV initiatives.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Transparency', path: '/transparency' },
      { name: 'Financials', path: '/transparency/financials' },
      { name: 'Portfolio Economics', path: '/transparency/financials/portfolio-economics' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PublicPortfolioView
        initialSummary={summary}
        periods={periods}
        defaultPeriod={defaultPeriod}
      />
    </>
  );
}
