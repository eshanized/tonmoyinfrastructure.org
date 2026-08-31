import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { getNews } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'News & Engineering Announcements',
  description:
    'TIV announcements, stable product releases, engineering deep dives, research findings, and infrastructure updates.',
  path: '/news',
  keywords: ['TIV news', 'announcements', 'engineering updates', 'product releases'],
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
        <div className="tiv-container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'News' },
            ]}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          {articles.length === 0 ? (
            <div className="border border-border bg-card p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No news published yet. Check back soon.
              </p>
            </div>
          ) : (
            <StaggerContainer className="space-y-px" stagger={0.08}>
              {articles.map((article) => (
                <StaggerItem key={article.slug}>
                  <Link
                    href={`/news/${article.slug}`}
                    className="group relative flex flex-col gap-3 border border-border bg-card p-6 transition-colors hover:border-brand/40 md:flex-row md:items-start md:justify-between"
                  >
                    <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    <div className="flex items-center gap-4 md:w-48 md:flex-shrink-0">
                      <span className="font-mono text-xs text-muted-foreground">
                        {article.date}
                      </span>
                      <span className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {article.category}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl transition-colors group-hover:text-brand">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs text-muted-foreground/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 md:pt-1" />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
