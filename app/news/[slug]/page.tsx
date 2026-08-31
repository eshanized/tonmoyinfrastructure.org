import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Markdown } from '@/components/shared/markdown';
import { getNewsArticle, getNews } from '@/lib/content';
import { generateArticleMetadata } from '@/lib/seo';
import { generatePageGraph, generateNewsArticleSchema } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getNews().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getNewsArticle(params.slug);
  if (!article) return {};
  return generateArticleMetadata(article);
}

export default function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getNewsArticle(params.slug);
  if (!article) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name: article.title, path: `/news/${article.slug}` },
  ];

  const pageGraph = generatePageGraph({
    pagePath: `/news/${article.slug}`,
    pageTitle: `${article.title} — Tonmoy Infrastructure and Vision`,
    pageDescription: article.excerpt,
    breadcrumbs,
    entities: [generateNewsArticleSchema(article)],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index={article.category.toUpperCase()}
        label="News"
        title={article.title}
        description={article.excerpt}
        meta={[
          { label: 'DATE', value: article.date },
          { label: 'AUTHOR', value: article.author },
          { label: 'CATEGORY', value: article.category },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'News', href: '/news' },
              { label: article.title },
            ]}
          />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          <div className="tiv-container-narrow">
            <Markdown content={article.content} />

            <div className="mt-12 flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <Link
                href="/news"
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                All news
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
