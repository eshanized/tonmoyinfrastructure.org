import { PageHeader } from '@/components/shared/page-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { NewsList } from '@/components/news/news-list';
import { getNews } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'News & Engineering Announcements — TIV',
  description:
    'Official news, verified engineering milestones, software releases, and infrastructure announcements from Tonmoy Infrastructure and Vision.',
  path: '/news',
  keywords: [
    'Tonmoy Infrastructure news',
    'TIV announcements',
    'is this company exist',
    'engineering updates',
    'software releases',
    'founder Eshan Roy',
  ],
});

const categories = [
  'Company',
  'Products',
  'Engineering',
  'Research',
  'Infrastructure',
  'Announcements',
];

export default function NewsPage() {
  const articles = getNews();

  const pageGraph = generatePageGraph({
    title: 'News & Engineering Announcements — Tonmoy Infrastructure and Vision',
    description:
      'TIV announcements, stable product releases, engineering deep dives, research findings, and infrastructure updates.',
    path: '/news',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'News', item: '/news' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="NEWS"
        label="Journal"
        title="News and updates."
        description="Company announcements, product updates, engineering notes, research findings, and infrastructure news from TIV."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'News' },
            ]}
          />
        </div>
      </section>

      <NewsList initialArticles={articles} categories={categories} />
    </>
  );
}
