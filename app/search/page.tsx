'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import {
  getProjects,
  getPublications,
  getNews,
  getInfrastructureServices,
  getTransparencyReports,
  getTechnicalArtifacts,
} from '@/lib/content';
import { getTimelineEvents, getAnnualReports } from '@/lib/institutional';
import { getPeople } from '@/lib/people';
import { PlatformIcon, ArtifactClassificationBadge } from '@/components/shared/source-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import type { SourcePlatform, ArtifactClassification } from '@/lib/types';

interface SearchResult {
  title: string;
  type: string;
  href: string;
  description: string;
  platform?: SourcePlatform;
  status?: string;
  artifactType?: ArtifactClassification;
  isExternal?: boolean;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const results: SearchResult[] = [];
    const seen = new Set<string>();

    const addResult = (item: SearchResult) => {
      const key = `${item.href}::${item.title}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push(item);
      }
    };

    // 1. Projects & Products (Internal Specifications)
    getProjects().forEach((p) => {
      const matchText = `${p.title} ${p.description} ${p.category} ${p.technology?.join(' ') || ''} ${p.tags?.join(' ') || ''} ${p.parameters || p.parameterCount || ''} ${p.architecture || p.modelArchitecture || ''} ${p.artifactType || ''}`.toLowerCase();
      if (matchText.includes(q)) {
        const primarySource = p.sources?.[0];
        addResult({
          title: p.title,
          type: `${p.artifactType || 'Project'} · ${p.status}`,
          href: p.type === 'software' ? `/products/${p.slug}` : `/projects/${p.slug}`,
          description: p.description,
          status: p.status,
          artifactType: p.artifactType,
          platform: primarySource?.platform,
          isExternal: false,
        });
      }
    });

    // 2. Technical Artifacts (Direct Hugging Face Models, Spaces, GitHub Repositories)
    getTechnicalArtifacts().forEach((art) => {
      const matchText = `${art.name} ${art.description} ${art.tags?.join(' ') || ''} ${art.platform} ${art.artifactType} ${art.status}`.toLowerCase();
      if (matchText.includes(q)) {
        addResult({
          title: art.name,
          type: `${art.platform} · ${art.artifactType}`,
          href: art.url,
          description: art.description,
          platform: art.platform,
          status: art.status,
          artifactType: art.artifactType,
          isExternal: true,
        });
      }
    });

    // 3. Publications & Papers
    getPublications().forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.abstract.toLowerCase().includes(q) || p.area.toLowerCase().includes(q)) {
        addResult({
          title: p.title,
          type: 'Publication',
          href: `/research/publications/${p.slug}`,
          description: p.abstract,
          status: p.status,
          isExternal: false,
        });
      }
    });

    // 4. News & Dispatches
    getNews().forEach((n) => {
      if (n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)) {
        addResult({
          title: n.title,
          type: 'News',
          href: `/news/${n.slug}`,
          description: n.excerpt,
          isExternal: false,
        });
      }
    });

    // 5. Infrastructure Services
    getInfrastructureServices().forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) {
        addResult({
          title: s.title,
          type: 'Infrastructure',
          href: `/infrastructure/${s.slug}`,
          description: s.description,
          status: s.status,
          isExternal: false,
        });
      }
    });

    // 6. Transparency Reports
    getTransparencyReports().forEach((r) => {
      if (r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)) {
        addResult({
          title: r.title,
          type: 'Report',
          href: `/transparency/${r.slug}`,
          description: r.summary,
          status: r.status,
          isExternal: false,
        });
      }
    });

    // 7. Annual Reports
    getAnnualReports().forEach((r) => {
      if (r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)) {
        addResult({
          title: r.title,
          type: 'Annual Report',
          href: '/transparency/annual-reports',
          description: r.summary,
          isExternal: false,
        });
      }
    });

    // 8. People & Leadership
    getPeople().forEach((p) => {
      if (p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)) {
        addResult({
          title: p.name,
          type: 'Person',
          href: '/about/leadership',
          description: `${p.role} · ${p.organization}`,
          isExternal: false,
        });
      }
    });

    // 9. Timeline Events
    getTimelineEvents().forEach((e) => {
      if (e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) {
        addResult({
          title: e.title,
          type: 'Timeline',
          href: '/about/timeline',
          description: e.description,
          isExternal: false,
        });
      }
    });

    return results;
  }, [query]);

  return (
    <>
      <PageHeader
        index="SEARCH"
        label="Discover"
        title="Search."
        description="Search across TIV's public content — projects, publications, news, infrastructure, reports, and people."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Search' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, publications, news..."
                className="w-full border border-border bg-card py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:border-brand"
                aria-label="Search TIV content"
              />
            </div>
          </div>

          {query.trim() && (
            <div className="mt-10">
              <p className="tiv-meta mb-4">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>

              {results.length === 0 ? (
                <div className="border border-border bg-card p-8">
                  <p className="text-sm text-muted-foreground">
                    No results found. Try a different search term.
                  </p>
                </div>
              ) : (
                <div className="space-y-px border border-border bg-border">
                  {results.map((result, i) => {
                    const content = (
                      <>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {result.platform && (
                              <span className="inline-flex items-center gap-1 border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium">
                                <PlatformIcon platform={result.platform} className="h-3.5 w-3.5" />
                                <span>{result.platform}</span>
                              </span>
                            )}
                            {result.artifactType && (
                              <ArtifactClassificationBadge classification={result.artifactType} />
                            )}
                            {result.status && (
                              <StatusBadge status={result.status} />
                            )}
                            <span className="tiv-meta">{result.type.toUpperCase()}</span>
                          </div>
                          <h3 className="mt-2 font-display text-base font-medium tracking-tight transition-colors group-hover:text-brand">
                            {result.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                        {result.isExternal ? (
                          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                        ) : (
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-brand" />
                        )}
                      </>
                    );

                    if (result.isExternal) {
                      return (
                        <a
                          key={i}
                          href={result.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between bg-card p-5 transition-colors hover:bg-card/80"
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={i}
                        href={result.href}
                        className="group flex items-center justify-between bg-card p-5 transition-colors hover:bg-card/80"
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {!query.trim() && (
            <div className="mt-10">
              <p className="text-sm text-muted-foreground">
                Start typing to search across all public TIV content.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
