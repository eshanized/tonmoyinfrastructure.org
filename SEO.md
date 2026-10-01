# Tonmoy Infrastructure and Vision (TIV) — SEO, Discoverability & Search Architecture

This document specifies the technical architecture, canonical entity models, metadata standards, structured data (Schema.org) hierarchies, sitemap/robots directives, and maintenance workflows for the official Tonmoy Infrastructure and Vision (TIV) web platform.

---

## 1. Discoverability Strategy & Principles

TIV adheres to an **honest, entity-grounded discoverability architecture**. Search engines, academic indices, and AI models ingest this site as a primary source of institutional and technical truth.

### Core Discoverability Principles
1. **Zero Fabrication**: No artificial rankings, fictitious customer metrics, inflated star ratings, synthetic review aggregates, or spoofed business addresses. Everything stated reflects verified engineering milestones.
2. **Deterministic Canonical Hierarchy**: Every entity belongs to a single canonical URL. Alternate categorization hubs (`/products/`, `/work/`) point directly to the canonical `/projects/${slug}` entity page.
3. **Machine-Readable Semantic Graph**: All pages inject linked JSON-LD graphs (`@graph`) connecting the top-level `Organization` (`Tonmoy Infrastructure and Vision`), the `WebSite`, the current `WebPage`, the visual `BreadcrumbList`, and specialized domain entities (`SoftwareApplication`, `ScholarlyArticle`, `NewsArticle`, `Person`).
4. **Local & Global Crawl Budget Protection**: Internal search interfaces (`/search`) are excluded from crawling via `noIndex: true` and omitted from `sitemap.xml`. Essential rendering stylesheets and scripts are explicitly permitted in `robots.txt`.

---

## 2. Organization & Entity Hierarchy

The semantic knowledge graph is built around the following verified entities:

### Top-Level Organization
* **Legal / Brand Name**: Tonmoy Infrastructure and Vision (`TIV`)
* **Formal Name**: Tonmoy Infrastructure and Vision
* **Canonical URI**: `https://tonmoyinfrastructure.org/`
* **Brand Color**: `#E5484D` (Coral Red)
* **Profiles**:
  * GitHub: `https://github.com/eshanized`
  * Hugging Face: `https://huggingface.co/eshanized`

### Founder & Leadership
* **Name**: Eshan Roy
* **Public Handle**: `eshanized`
* **Role**: Founder & Systems Architect
* **Authority Profiles**:
  * GitHub: `https://github.com/eshanized`
  * Hugging Face: `https://huggingface.co/eshanized`
  * ORCID: `https://orcid.org/0009-0007-1261-6805`
  * Personal Site: `https://eshanized.is-a.dev/`

### Shipped Software Systems (Stable Releases)
Each system is mapped to `schema.org/SoftwareApplication` with `operatingSystem: "Cross-platform, Linux, POSIX"`:
1. **OpenMail** (`/projects/openmail`): Self-hosted email infrastructure and mail queue engine.
2. **Mercura** (`/projects/mercura`): Local-first code intelligence, repository hosting, and AST exploration.
3. **M31A** (`/projects/m31a`): Autonomous developer agent and compute runtime engine.
4. **Octate** (`/projects/octate`): Terminal-native AI code review CLI and deterministic repository intelligence platform.

### Experimental AI Checkpoints & Research Models
1. **M31Genesis** (`/projects/m31genesis`): 425M-parameter causal language model pre-trained on high-quality code and reasoning tokens.
2. **M31Tesla** (`/projects/m31tesla`): 228.9M-parameter autonomous agent runtime model.
3. **M31Entropy** (`/projects/m31entropy`): 314M-parameter vocabulary-focused language model.
4. **M31 Q // For programmers**: Hugging Face Space runtime for developer query testing.

---

## 3. Metadata & OpenGraph Architecture

Metadata generation is centralized in `lib/seo.ts` and configured via `lib/site-config.ts`.

### 3.1 Metadata Helper Functions
* `buildCanonicalUrl(path)`: Normalizes paths, enforces trailing slashes matching Next.js `trailingSlash: true` static export, strips queries, prepending `siteConfig.url`.
* `formatTitle(title, override)`: Formats standard title tags (`<Page Title> — Tonmoy Infrastructure and Vision`).
* `generatePageMetadata(options)`: Generates standard OpenGraph, Twitter cards, meta tags, and canonical links.
* `generateProjectMetadata(project)`: Customizes metadata for software applications and AI models with tags, repo links, and versioning.
* `generatePublicationMetadata(publication)`: Sets scholarly article meta tags with author lists and publication dates.
* `generateArticleMetadata(newsItem)`: Sets news article OpenGraph and Twitter cards.
* `generateReportMetadata(report)`: Sets transparency report metadata.
* `generateInfrastructureMetadata(service)`: Sets infrastructure service metadata.

### 3.2 Dynamic OpenGraph Images (`/api/og`)
Located at `app/api/og/route.tsx`, using `@vercel/og` (`ImageResponse` on the Edge runtime):
* Generates 1200x630 branded social cards featuring the TIV grid, Coral Red (#E5484D) accent pill, entity title, description, and institutional watermark.
* Static fallback available at `public/og.png` and `public/og.svg`.

---

## 4. Canonical URL Routing Matrix

To prevent keyword cannibalization and duplicate content dilution, strict canonical rules are enforced:

| Front-Facing Path | Route Function | Canonical Target |
|---|---|---|
| `/projects/:slug/` | Canonical entity page | `https://tonmoyinfrastructure.org/projects/:slug/` |
| `/products/:slug/` | Catalog view | `https://tonmoyinfrastructure.org/projects/:slug/` |
| `/work/:slug/` | Portfolio view | `https://tonmoyinfrastructure.org/projects/:slug/` |
| `/:slug` (e.g. `/openmail`) | Direct slug redirect | 308 Permanent Redirect to `/projects/:slug/` |
| `/security/` | Canonical security center | `https://tonmoyinfrastructure.org/security/` |
| `/transparency/security/` | Transparency portal view | `https://tonmoyinfrastructure.org/security/` |
| `/trust/security/` | Trust portal view | `https://tonmoyinfrastructure.org/security/` |
| `/privacy/` | Canonical privacy policy | `https://tonmoyinfrastructure.org/privacy/` |
| `/legal/privacy/` | Legal section view | `https://tonmoyinfrastructure.org/privacy/` |
| `/terms/` | Canonical terms of service | `https://tonmoyinfrastructure.org/terms/` |
| `/legal/terms/` | Legal section view | `https://tonmoyinfrastructure.org/terms/` |
| `/accessibility/` | Canonical accessibility | `https://tonmoyinfrastructure.org/accessibility/` |
| `/legal/accessibility/` | Legal section view | `https://tonmoyinfrastructure.org/accessibility/` |

---

## 5. Schema.org / JSON-LD Graph Architecture

Structured data is generated via `lib/structured-data.ts` and rendered server-side via `components/shared/json-ld.tsx`.

Every indexed page contains a linked `@graph` structure connecting:
* `Organization`: Tonmoy Infrastructure and Vision with founder node, official logo, and social profiles.
* `WebSite`: SearchAction schema enabling search box discovery.
* `WebPage`: Canonical URL, title, description, and site membership.
* `BreadcrumbList`: Positioned ListItem sequence corresponding directly to the visual navigation hierarchy.
* Specialized entities: `SoftwareApplication`, `ScholarlyArticle`, `NewsArticle`, or `Person`.

---

## 6. Robots.txt and Sitemap.xml Directives

* **Robots Configuration** (`app/robots.ts`):
  * Allows all search engine crawlers (`*`).
  * Disallows non-indexable utility endpoints: `/api/`, `/admin/`, `/private/`.
  * Points directly to the absolute sitemap URL: `https://tonmoyinfrastructure.org/sitemap.xml`.
* **Sitemap Generation** (`app/sitemap.ts`):
  * Automatically crawls static routes, active projects, publications, transparency reports, and news.
  * Explicitly excludes query search (`/search`).
  * Incorporates real publication and update timestamps (`lastModified`).
  * Sets change frequencies (`weekly`, `monthly`, `yearly`) and priority weightings (`1.0` for home, `0.9` for core projects, `0.8` for research).

---

## 7. Operational Workflows

### How to Add a New Project
1. Define the project in `lib/content.ts`.
   * Ensure `status: 'Stable Release'` and `developmentStage: 'active'` if shipped.
   * Provide `seoTitle`, `seoDescription`, `keywords`, and `license`.
2. The dynamic route `app/projects/[slug]/page.tsx` automatically generates its canonical URL, metadata, and `SoftwareApplication` JSON-LD.
3. `app/sitemap.ts` automatically includes `/projects/${project.slug}` in the next build.

### How to Add a Research Paper or Publication
1. Add publication record in `lib/content.ts` under `publications`.
2. Dynamic route `app/research/publications/[slug]/page.tsx` generates `ScholarlyArticle` schema with authors, publication date, and abstract.
3. Sitemap updates automatically.

### How to Update Domain or Site URL
1. Set the environment variable:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://tonmoyinfrastructure.org/
   ```
2. If unset, it defaults cleanly to `https://tonmoyinfrastructure.org/` configured in `lib/site-config.ts`. All canonical URLs, sitemaps, robots rules, and schema IDs update uniformly.

### How to Verify SEO Integrity
Run the project test suite:
```bash
npm test
```
Run the production static export:
```bash
npm run build
```
Verify that all 85+ static pages export with zero missing canonicals, zero unresolved JSON-LD types, and zero broken links.
