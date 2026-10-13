# Tonmoy Infrastructure & Vision (TIV) — Comprehensive SEO Recovery & Organic Growth Implementation Report

**Date:** October 13, 2026  
**Auditor / Architect:** Senior Principal Engineer & Technical SEO Architect  
**Target Domain:** `https://tonmoyinfrastructure.org/`  
**Repository:** `https://github.com/eshanized/tonmoyinfrastructure.org`  
**Architecture:** Next.js (App Router), React 18, TypeScript, Tailwind CSS, Static Export (`output: 'export'`), Shared Linux / StackCDN / Apache Hosting.

---

## A. Executive Summary

This engineering implementation addresses technical search crawlability, metadata architecture, sitemap integrity, business claim verification, page-level SEO, internal linking structure, and organic growth readiness for Tonmoy Infrastructure and Vision (TIV).

### What Was Wrong
1. **Sitemap Build-Time Timestamp Churn**: The sitemap generation function (`app/sitemap.ts`) evaluated `new Date()` across 45+ static routes and infrastructure endpoints on every build, signaling to search engines that unchanged pages had been updated seconds prior.
2. **Unsupported High-Impact Public Claims**: The data centers and courier service entries in `lib/content.ts` claimed an active commercial fleet of 16 Tier 4 data centers across 11 countries, 845 PB storage fleet, 75 MW power feeds, 99.999% uptime guarantees, 50,000+ daily courier parcels across 17 countries, named global telco partnerships (AT&T, Verizon, etc.), and unverified certifications (ISO 27001, SOC 2 Type II, PCI DSS Level 1, HIPAA, GDPR, GDP). These contradicted the editorial policy in `CONTENT.md` (Rule 4: "No Vanity Metrics") and the financial model in `lib/institutional.ts` (FY2026 total assets of ₹15.6L / ~$18k USD).
3. **Internal Navigation Canonical Dilution**: Primary navigation (`components/navigation/site-nav.tsx`) linked directly to catalog paths (`/products/openmail`, `/products/mercura`, etc.) rather than the canonical entity URLs (`/projects/openmail/`, `/projects/mercura/`), diluting internal PageRank and complicating crawling.
4. **Missing Service Alias Redirect**: The alias `/infrastructure/optical-systems/` lacked an explicit HTTP 301 redirect to its canonical route `/infrastructure/optical/` in `public/_redirects` and `public/.htaccess`.
5. **Crawl Budget Exposure**: The internal operational dashboard route (`/internal/portfolio-economics`) was unshielded in `app/robots.ts`.
6. **Homepage Value Proposition Gaps**: The homepage lacked clear messaging regarding target audiences, genuinely available products, sovereign software capabilities, and commercial inquiry pathways.
7. **Unused SEO Metadata Helpers**: `lib/seo.ts` did not honor `project.seoTitle`, falling back to generic `<Title> — Tonmoy Infrastructure and Vision`.

### What Was Changed
- Repaired `app/sitemap.ts`: removed `new Date()` build-time churn; anchored dynamic routes to genuine publication/update timestamps (`updatedAt`, `releaseDate`, `date`, `publicationDate`); omitted `lastModified` on static pages where no per-page modification date is maintained.
- Reconciled public infrastructure claims in `lib/content.ts`: reframed data centers and courier services as technical research models and reference specifications (`status: 'Research'`, `classification: 'Research'`); removed unsupported metrics (845 PB, 99.999% SLA, 16 operating facilities, 50,000 parcels/day) while preserving technical topologies.
- Enforced honest framing on solutions and status pages (`app/solutions/page.tsx`, `app/status/page.tsx`).
- Enriched product metadata: added explicit `seoTitle` and `seoDescription` to OpenMail, Mercura, M31A, and Octate; updated `lib/seo.ts` to support `project.seoTitle`.
- Consolidated internal linking in `components/navigation/site-nav.tsx` and `components/projects/project-detail-view.tsx` to point directly to canonical `/projects/:slug/` routes.
- Configured 301 redirects for `/infrastructure/optical-systems/` in `public/_redirects` and `public/.htaccess`.
- Added `/internal/` to disallow rules in `app/robots.ts`.
- Structured data: handled organizational authorship cleanly in `lib/structured-data.ts`.
- Updated editorial guidelines in `CONTENT.md` and documentation in `SEO.md`.
- Authored a comprehensive content expansion roadmap in `docs/seo-content-roadmap.md`.
- Added automated regression suite in `tests/seo-recovery.test.mjs` (9 comprehensive tests, 34/34 passing project-wide).

### What Problems Remain (Actionable for Business Owner)
- Off-site verification is required from the founder/owner to determine if any external commercial contracts, colocation agreements, or certifications exist that were not present in the repository.
- Search Console property ownership verification and sitemap resubmission must be performed in the live Google Search Console environment.

---

## B. Evidence-Based Findings

### Finding 1: Sitemap `lastModified` Build-Time Timestamp Churn
- **Severity**: High (Crawl Budget & Indexing Inefficiency)
- **File Path**: `app/sitemap.ts` (lines 14–59, 71)
- **Observed Behavior**: `lastModified: new Date()` was assigned to all static routes and infrastructure services. Every time `npm run build` ran, `sitemap.xml` generated ISO timestamps corresponding to the second of the build (e.g. `2026-10-13T04:06:13.118Z`).
- **Evidence**: Inspection of `out/sitemap.xml` and live `https://tonmoyinfrastructure.org/sitemap.xml` showed all 50+ URLs sharing the exact same build second.
- **Impact**: Googlebot interprets constant changes across unchanged URLs as low-quality signal noise and may downgrade sitemap crawl priority.

### Finding 2: Contradictory & Unsupported Public Claims on Data Centers & Courier
- **Severity**: Critical (Trust, E-E-A-T, & Editorial Integrity)
- **File Path**: `lib/content.ts` (lines 1295–1382)
- **Observed Behavior**:
  - `data-centers`: Claimed active operation of 16 Tier 4 data center facilities across 11 countries, 845 PB storage fleet, 75 MW per facility, 99.999% uptime, Tier 1 carrier transit with AT&T/Verizon/BT/etc., and certifications including ISO 27001, SOC 2 Type II, PCI DSS Level 1, HIPAA, GDPR, SS 564.
  - `courier`: Claimed 50,000+ parcels processed daily across 17 countries, 48-hour delivery SLA, ISO 9001 and GDP compliance.
- **Evidence**:
  - `CONTENT.md` Section 1 explicitly states: *"No Vanity Metrics: Do not publish fictional uptime percentages (e.g. '99.999%'), invented enterprise customer counts, or fabricated industry awards."*
  - `lib/institutional.ts` reports FY2026 balance sheet assets of ₹15.6 Lakhs (~$18,000 USD) and revenue of ₹18.4 Lakhs (~$22,000 USD), making ownership of 16 hyperscale data center facilities and commercial international courier airline fleets economically irreconcilable.
- **Impact**: Severe penalty risk under Google Search quality guidelines (E-E-A-T, deception, misleading claims).

### Finding 3: Primary Navigation Linking to Non-Canonical Entity URLs
- **Severity**: Medium (Internal Link Equity & Canonical Dilution)
- **File Path**: `components/navigation/site-nav.tsx` (lines 22–25)
- **Observed Behavior**: Main navigation linked to `/products/openmail`, `/products/mercura`, `/products/m31a`, and `/products/octate`.
- **Evidence**: `SEO.md` Section 4 establishes `/projects/:slug/` as the sole canonical entity page (`https://tonmoyinfrastructure.org/projects/:slug/`), while `/products/:slug/` is a catalog view with canonical tags pointing back to `/projects/:slug/`.
- **Impact**: Googlebot spends crawl budget resolving cross-canonical links rather than discovering canonical entity pages directly.

### Finding 4: Missing HTTP 301 Redirect for Service Alias `/infrastructure/optical-systems/`
- **Severity**: Low to Medium (Broken Crawl Paths & 404 Vulnerability)
- **File Path**: `public/_redirects`, `public/.htaccess`, `lib/content.ts` (line 1272)
- **Observed Behavior**: In `lib/content.ts`, `optical-systems` was declared as an alias for `optical`. However, neither `public/_redirects` nor `public/.htaccess` contained a redirect rule for `/infrastructure/optical-systems/` to `/infrastructure/optical/`.

### Finding 5: Unshielded Internal Operational Route in `robots.txt`
- **Severity**: Low (Crawl Budget Protection)
- **File Path**: `app/robots.ts`
- **Observed Behavior**: `robots.ts` disallowed `/api/`, `/admin/`, and `/private/`, but did not disallow `/internal/`, despite the presence of `/internal/portfolio-economics` (which is configured with `noIndex: true`).

### Finding 6: Homepage Title & Value Proposition Underspecification
- **Severity**: Medium (Search Relevance & Organic CTR)
- **File Path**: `app/page.tsx` (lines 24–30)
- **Observed Behavior**: The homepage title was generic (`Tonmoy Infrastructure and Vision — Technology Infrastructure`), and copy lacked explicit differentiation regarding what software products are shipped, who the intended audience is, and how enterprise inquiries are handled.

---

## C. Implemented Changes

| File | Change Description | Purpose & Finding Addressed |
|---|---|---|
| `app/sitemap.ts` | Replaced `new Date()` with authentic metadata timestamps for projects, publications, news, and reports. Omitted `lastModified` for static pages where dates are not tracked. | Resolves Finding 1. Eliminates build-time timestamp churn and preserves crawl budget. |
| `lib/content.ts` | Reclassified `data-centers` and `courier` as `Research` / `Planning`. Removed unverified claims (845 PB, 99.999% SLA, 16 operating facilities, 50,000 parcels). Reframed as reference topologies and research models. Added explicit `seoTitle` and `seoDescription` for OpenMail, Mercura, M31A, and Octate. | Resolves Finding 2. Aligns public claims with `CONTENT.md` and Google E-E-A-T search quality guidelines. |
| `app/solutions/page.tsx` | Added architectural reference modeling disclaimer (`Callout`), updated PageHeader metadata to `Reference Model`, and updated page title/description. | Resolves Finding 2. Transparently presents interactive map and metrics as reference topologies. |
| `app/status/page.tsx` | Updated PageHeader and reliability cards to state operational health of TIV software platforms and edge telemetry without unverified 99.999% SLA claims. | Resolves Finding 2. Establishes authentic operational monitoring standards. |
| `components/navigation/site-nav.tsx` | Pointed product navigation items directly to `/projects/openmail`, `/projects/mercura`, `/projects/m31a`, `/projects/octate`. Renamed 'Courier Network' to 'Logistics Architecture'. | Resolves Finding 3. Maximizes canonical link equity flow. |
| `components/projects/project-detail-view.tsx` | Updated related project links and 'Next' navigation link to `/projects/${rel.slug}`. | Resolves Finding 3. Consolidates cross-project links to canonical entity paths. |
| `public/_redirects` | Added `/infrastructure/optical-systems  /infrastructure/optical/  301`. | Resolves Finding 4. Enforces clean HTTP 301 redirection at edge. |
| `public/.htaccess` | Added `RewriteRule ^infrastructure/optical-systems/?$ https://%{HTTP_HOST}/infrastructure/optical/ [R=301,L]`. | Resolves Finding 4. Enforces clean HTTP 301 redirection on Apache / shared hosting. |
| `app/robots.ts` | Added `'/internal/'` to `disallow` array. | Resolves Finding 5. Protects crawl budget from internal operational routes. |
| `lib/seo.ts` | Updated `generateProjectMetadata` to support `project.seoTitle`. | Resolves Finding 6. Enables search-intent-focused title tags for software platforms. |
| `lib/structured-data.ts` | Updated `generateScholarlyArticleSchema` to link author to `Organization` schema ID when author is Tonmoy Infrastructure and Vision. | Improves Schema.org graph validity and semantic entity linkage. |
| `app/page.tsx` | Updated title tag to `Enterprise Infrastructure & Systems Engineering — Tonmoy Infrastructure and Vision`, updated meta description, enhanced hero copy, added capability highlights strip, and added clear CTAs for products, infrastructure, and inquiries. | Resolves Finding 6. Elevates organic relevance, CTR, and visitor orientation. |
| `CONTENT.md` | Formalized Section 1 Item 5: Infrastructure & Operational Claims policy. | Prevents future editorial regressions regarding operational and certification claims. |
| `SEO.md` | Updated canonical routing matrix and Section 6 robots/sitemap directives. | Maintains documentation accuracy with codebase reality. |
| `docs/seo-content-roadmap.md` | Created comprehensive 5-pillar technical content expansion roadmap. | Guides ongoing organic search growth with zero fabrication. |
| `tests/seo-recovery.test.mjs` | Added 9 automated regression tests validating sitemaps, redirects, robots, metadata, schema, and honest claims. | Provides automated quality gates for CI/CD. |
| `package.json` | Included `tests/seo-recovery.test.mjs` in the `npm test` script. | Ensures `npm test` runs all verification suites automatically. |

---

## D. Unresolved Factual Questions Requiring Owner Verification

The following items represent business claims that could not be verified from the codebase. In accordance with Rule 10 and Section 4 of the instructions, they have been qualified conservatively on the public site and flagged here for explicit owner verification:

1. **Commercial Data Center Colocation / Leases**:
   - *Previous Statement*: "TIV operates and connects a distributed fleet of 16 mission-critical data center facilities across North America, Europe... 845 PB aggregate storage... Up to 75 MW per facility".
   - *Current Code Status*: Reclassified as *Research & Reference Architecture*.
   - *Information Required to Verify*: Does TIV own, lease, or operate commercial data center space in any facility? If colocation or wholesale agreements exist with specific third-party providers (e.g. Equinix, Digital Realty), provide facility names, agreement references, and SLA parameters to publish verified partner colocation specifications.
2. **Third-Party Compliance & Certifications**:
   - *Previous Statement*: "ISO 27001, SOC 2 Type II, PCI DSS Level 1, HIPAA, GDPR, SS 564".
   - *Current Code Status*: Framed as *Architectural Standards & Compliance Framework Alignment*.
   - *Information Required to Verify*: Does TIV hold active accredited certification certificates for ISO 27001 or independent CPA audit reports for SOC 2 Type II? If so, provide the certification body, certificate registration number, and issuance date.
3. **Carrier Peering & Transit Contracts**:
   - *Previous Statement*: "Direct low-latency interconnects with primary Tier 1 transit and regional telco carriers (AT&T, Verizon, CenturyLink, BT, Deutsche Telekom, etc.)".
   - *Current Code Status*: Framed as *Carrier-Neutral Meet-Me Room Design*.
   - *Information Required to Verify*: Does TIV possess active Autonomous System Numbers (ASN), BGP peering sessions, or transit agreements with named telcos? If yes, provide the public ASN to document legitimate peering.
4. **Logistics & Courier Commercial Freight**:
   - *Previous Statement*: "50,000+ parcels and freight units processed daily... 17 directly operated hubs... 48-hour delivery SLA".
   - *Current Code Status*: Framed as *Logistics Systems Architecture & Telemetry Research*.
   - *Information Required to Verify*: Does TIV operate or contract a commercial logistics service? If active dispatch partnerships exist, provide carrier licenses and partner names.

---

## E. Validation Results

All checks were executed locally against the real codebase:

| Command | Status | Output / Observation |
|---|---|---|
| `npm run typecheck` (`tsc --noEmit`) | **PASS (Code 0)** | Zero TypeScript errors across all routes, components, and libraries. |
| `npm test` | **PASS (Code 0)** | 34 of 34 tests passed (10 baseline audit tests, 15 portfolio economics tests, 9 SEO recovery tests). Duration: ~155ms. |
| `npm run lint` (`next lint`) | **PASS (Code 0)** | Zero ESLint warnings or errors. |
| `npm run build` | **PASS (Code 0)** | 101 of 101 static pages generated (`out/`), postbuild compatibility mirrors generated for bracketed chunks, `.nojekyll` generated. |

---

## F. Live Verification Results

A comprehensive live network inspection was conducted against the production deployment (`https://tonmoyinfrastructure.org/`):

### 1. HTTP Status & Availability
- Request: `curl -sI https://tonmoyinfrastructure.org/`
  - Result: `HTTP/2 200`
  - Server: `Apache`
  - CDN: `StackCDN` (`x-origin-cache-status: MISS`, `x-cdn-cache-status: MISS`)
- Request (Googlebot User-Agent): `curl -sI -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://tonmoyinfrastructure.org/`
  - Result: `HTTP/2 200`
- Priority Routes Tested:
  - `https://tonmoyinfrastructure.org/infrastructure/`: `HTTP/2 200`
  - `https://tonmoyinfrastructure.org/infrastructure/data-centers/`: `HTTP/2 200`
  - `https://tonmoyinfrastructure.org/projects/`: `HTTP/2 200`
  - `https://tonmoyinfrastructure.org/projects/m31a/`: `HTTP/2 200`
  - `https://tonmoyinfrastructure.org/projects/openmail/`: `HTTP/2 200`
  - `https://tonmoyinfrastructure.org/news/`: `HTTP/2 200`
  - `https://tonmoyinfrastructure.org/robots.txt`: `HTTP/2 200`
  - `https://tonmoyinfrastructure.org/sitemap.xml`: `HTTP/2 200`

### 2. Live Redirect Behavior
- `https://tonmoyinfrastructure.org/openmail` -> `HTTP/2 301` -> `Location: https://tonmoyinfrastructure.org/projects/openmail/`
- `https://tonmoyinfrastructure.org/projects` -> `HTTP/2 301` -> `Location: https://tonmoyinfrastructure.org/projects/`
- `https://tonmoyinfrastructure.org/infrastructure/data-centers` -> `HTTP/2 301` -> `Location: https://tonmoyinfrastructure.org/infrastructure/data-centers/`
- `http://tonmoyinfrastructure.org/` -> `HTTP/1.1 301` -> `Location: https://tonmoyinfrastructure.org/`

### 3. Investigation of Reported 503 Responses
- **Finding**: The site is currently fully available with 100% 200/301 responses across all tested routes for both standard and Googlebot requests.
- **Root Cause Analysis**: On 20i / StackCDN shared Apache infrastructure, temporary HTTP 503 errors occur when:
  1. An origin server restart or cPanel resource-limit exhaustion (e.g., Entry Processes limit reached) coincides with a CDN cache miss.
  2. File uploads/extractions take place during active deployment in `public_html/`.
  3. External crawler rate-limiting is triggered by burst requests without HTTP keep-alive.
- **Remediation**: The static export architecture with immutable asset caching (`Cache-Control: public, max-age=31536000, immutable` for `/_next/static/`) minimizes origin hits. When deploying to 20i / cPanel, upload files to a staging directory and symlink or perform atomic moves to prevent transient 503 errors during extraction.

---

## G. Search Console Action List

Because authenticated access to Google Search Console requires private owner credentials, the following manual action checklist must be executed by the authorized site owner upon deployment:

1. **Verify Canonical Domain Property**:
   - Access [Google Search Console](https://search.google.com/search-console).
   - Ensure the domain property `tonmoyinfrastructure.org` (or URL prefix `https://tonmoyinfrastructure.org/`) is selected.
2. **Resubmit Production Sitemap**:
   - Navigate to **Indexing > Sitemaps**.
   - Submit `https://tonmoyinfrastructure.org/sitemap.xml`.
   - Verify that the status reports **Success** and all 60+ indexable URLs are discovered.
3. **Inspect Priority URLs with URL Inspection Tool**:
   - Inspect `https://tonmoyinfrastructure.org/`
   - Inspect `https://tonmoyinfrastructure.org/projects/openmail/`
   - Inspect `https://tonmoyinfrastructure.org/projects/m31a/`
   - Inspect `https://tonmoyinfrastructure.org/projects/mercura/`
   - Inspect `https://tonmoyinfrastructure.org/projects/octate/`
   - Inspect `https://tonmoyinfrastructure.org/infrastructure/data-centers/`
   - Click **Test Live URL** on each to confirm Googlebot receives `HTTP 200`, detects the correct canonical URL (`User-declared canonical` matches `Google-selected canonical`), and renders the primary HTML without JavaScript errors.
4. **Audit Page Indexing Exclusions**:
   - Review **Indexing > Pages > Why pages aren't indexed**.
   - Confirm that:
     - `Page with redirect` includes expected shortcuts (`/openmail`, `/m31a`, non-trailing slash URLs) and does not contain primary canonical routes.
     - `Duplicate without user-selected canonical` is empty.
     - `Excluded by 'noindex' tag` contains only intentional exclusions (`/search`, `/internal/portfolio-economics`).
5. **Request Indexing for Priority Updated Pages**:
   - For the Homepage, `/projects/openmail/`, and `/projects/m31a/`, click **Request Indexing** once to accelerate re-crawling of the updated metadata.
   - *Rule*: Do not submit batch requests for unchanged pages or redirects.

---

## H. Content Growth Roadmap Summary

A full roadmap has been authored at [`docs/seo-content-roadmap.md`](file:///home/snigdha/Desktop/tonmoyinfrastructure.org/docs/seo-content-roadmap.md). Core priority tracks include:

1. **Commercial & Infrastructure Intent**:
   - *Bare-Metal Infrastructure vs. Cloud Virtualization* (Target: `/infrastructure/compute/bare-metal-vs-cloud/`)
   - *Concurrently Maintainable Power & Thermal Architectures* (Target: `/infrastructure/data-centers/tier-topologies/`)
   - *Optical Transmission Systems & DWDM* (Target: `/infrastructure/optical/dwdm-fundamentals/`)
2. **Product Discovery & Evaluation**:
   - *Deploying Sovereign Email Infrastructure with OpenMail* (Target: `/projects/openmail/operational-guide/`)
   - *Deterministic Pre-Analysis Meets LLM Reasoning with Octate* (Target: `/projects/octate/workflow-guide/`)
   - *High-Assurance Autonomous Agent Execution in M31A* (Target: `/projects/m31a/architecture-deep-dive/`)
   - *Sovereign Repository Management with Mercura* (Target: `/projects/mercura/overview/`)
3. **Technical Education**:
   - *Zero-Failure Mail Deliverability: SPF, DKIM, DMARC & MTA-STS* (Target: `/docs/guides/email-deliverability/`)
   - *Integrating SARIF v2.1.0 into CI/CD Pipelines* (Target: `/docs/guides/sarif-cicd-integration/`)
4. **Research Documentation**:
   - *Towards Autonomous Development Systems: Architectural Frameworks* (Target: `/research/publications/autonomous-development-systems/framework/`)

---

## I. Remaining Risks

1. **Shared Hosting Origin Capacity (20i StackCP / cPanel)**:
   - While static HTML handles traffic efficiently, unoptimized burst traffic to uncached endpoints or heavy simultaneous crawlers could exceed shared process limits and cause transient 503 responses.
   - *Mitigation*: Ensure Cloudflare or StackCDN cache rules cache HTML with short TTLs and revalidate via ETags.
2. **Search Engine Re-indexing Latency**:
   - Search engines take days to weeks to re-crawl and update sitemap records and page titles. The code changes ensure clean signals, but search engine index updates are asynchronous.

---

## J. Final Git Summary

### Modified Files (Tracked)
- `CONTENT.md`: Added Section 1 Item 5 policy for Infrastructure & Operational Claims.
- `SEO.md`: Added optical-systems redirect and updated robots/sitemap documentation.
- `app/page.tsx`: Enhanced homepage SEO metadata, H1 copy, value proposition, capabilities strip, and CTAs.
- `app/robots.ts`: Added `/internal/` to disallow list.
- `app/sitemap.ts`: Replaced `new Date()` churn with authentic metadata dates; omitted dates on untracked static pages.
- `app/solutions/page.tsx`: Added reference architecture disclaimer and updated metadata.
- `app/status/page.tsx`: Updated operational status framing and reliability commitments.
- `components/navigation/site-nav.tsx`: Updated direct product links to canonical `/projects/:slug/` routes.
- `components/projects/project-detail-view.tsx`: Updated cross-project links to canonical `/projects/:slug/` routes.
- `lib/content.ts`: Added `seoTitle`/`seoDescription` for products; reframed data centers and courier as research models.
- `lib/seo.ts`: Added support for `project.seoTitle` in `generateProjectMetadata`.
- `lib/structured-data.ts`: Mapped TIV organization author cleanly in ScholarlyArticle schema.
- `package.json`: Added `tests/seo-recovery.test.mjs` to test script.
- `public/.htaccess`: Added 301 redirect for `/infrastructure/optical-systems/`.
- `public/_redirects`: Added 301 redirect for `/infrastructure/optical-systems/`.

### Newly Created Files (To Be Committed)
- `docs/seo-content-roadmap.md`: 5-pillar technical content expansion roadmap.
- `docs/seo-implementation-report.md`: This comprehensive implementation and verification report.
- `tests/seo-recovery.test.mjs`: Automated regression test suite for SEO recovery.

### Build Artifacts (Not for Git Commit)
- `out/`: Static build output directory (mirrors bracketed chunk folders for cPanel compatibility).
- `.next/`: Next.js compilation cache.
