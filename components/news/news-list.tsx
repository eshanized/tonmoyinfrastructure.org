'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { NewsArticle } from '@/lib/types';
import { StaggerContainer, StaggerItem } from '@/components/shared/motion';

interface NewsListProps {
  initialArticles: NewsArticle[];
  categories: string[];
}

export function NewsList({ initialArticles, categories }: NewsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = selectedCategory
    ? initialArticles.filter(
        (article) => article.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : initialArticles;

  return (
    <>
      {/* Category Filter Chips */}
      <section className="border-b border-border bg-card/30">
        <div className="tiv-container py-6">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter news by category">
            <span className="mr-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              aria-pressed={selectedCategory === null}
              className={`border px-3 py-1 font-mono text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-brand ${
                selectedCategory === null
                  ? 'border-brand bg-brand text-brand-foreground font-semibold'
                  : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
              }`}
            >
              All ({initialArticles.length})
            </button>
            {categories.map((cat) => {
              const isSelected = selectedCategory?.toLowerCase() === cat.toLowerCase();
              const count = initialArticles.filter(
                (a) => a.category.toLowerCase() === cat.toLowerCase()
              ).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? null : cat)}
                  aria-pressed={isSelected}
                  className={`border px-3 py-1 font-mono text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-brand ${
                    isSelected
                      ? 'border-brand bg-brand text-brand-foreground font-semibold'
                      : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                  }`}
                >
                  {cat} {count > 0 && `(${count})`}
                </button>
              );
            })}
            {selectedCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-1 border border-transparent px-2 py-1 font-mono text-xs text-brand hover:underline"
                aria-label="Clear active category filter"
              >
                <X className="h-3 w-3" />
                Clear filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Articles Feed */}
      <section>
        <div className="tiv-container py-16 md:py-20">
          {filteredArticles.length === 0 ? (
            <div className="border border-border bg-card p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No articles published under category &ldquo;{selectedCategory}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="mt-4 inline-flex items-center gap-1.5 border border-border bg-secondary/50 px-4 py-2 font-mono text-xs font-medium text-foreground hover:border-brand"
              >
                Show all articles
              </button>
            </div>
          ) : (
            <StaggerContainer className="space-y-px" stagger={0.08} key={selectedCategory || 'all'}>
              {filteredArticles.map((article) => (
                <StaggerItem key={article.slug}>
                  <Link
                    href={`/news/${article.slug}/`}
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
