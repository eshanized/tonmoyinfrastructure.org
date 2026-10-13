# TIV Data Center Page Upgrade & Visual Gallery Implementation Report

**Target URL**: `https://tonmoyinfrastructure.org/infrastructure/data-centers/`  
**Repository**: `https://github.com/eshanized/tonmoyinfrastructure.org`  
**Status**: Completed & Verified (Static Export Validated)  
**Date**: 2026-10-13  

---

## 1. Executive Summary

This engineering effort upgrades the official Tonmoy Infrastructure and Vision (TIV) sovereign data center page (`/infrastructure/data-centers/`). Four high-resolution, branded data center visualization assets have been integrated into a production-grade editorial presentation. The implementation reinforces institutional credibility, adheres strictly to TIV content integrity rules (no speculative capacity, uptime, or certification claims), integrates interactive visual inspection with an accessible Radix UI dialog, preserves single-source-of-truth principles, and exports cleanly via Next.js static export (`out/`).

---

## 2. Files Inspected

Before making changes, the following architectural guidelines, content specifications, schemas, tests, and configuration files were inspected:

- `CONTENT.md` — Authoring integrity guarantees (Jayapura ground truth, software release statuses, sentence case headings, prohibition of vanity metrics).
- `SEO.md` — Canonical hierarchy, Schema.org graph design, sitemap and robots directives, and trailing-slash rules.
- `DEPLOYMENT.md` — Static output architecture (`output: 'export'`), base paths, and hosting workflows.
- `README.md` — Portfolio overview, physical infrastructure layers, and engineering baseline rates.
- `DESIGN_SYSTEM.md` — Visual tokens, monochromatic dignity canvas (`#09090b`), Coral Red accent (`#E5484D`), hairline borders, and WCAG 2.2 AA standards.
- `package.json` — Verified installed packages (Next.js 15.5.24, React 18, Radix UI Dialog, Tailwind CSS 3.4, Lucide React).
- `next.config.js` — Verified static export options (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`).
- `lib/site-config.ts` — Verified canonical address (`Pusat Bisnis Jayapura, Jl. Pasifik Permai`), phone, coordinates, and founder profile.
- `lib/types.ts` — Examined `InfrastructureService` type definition.
- `lib/content.ts` — Examined existing `data-centers` entry and service definitions.
- `lib/seo.ts` — Analyzed `generateInfrastructureMetadata` helper.
- `lib/structured-data.ts` — Analyzed `generatePageGraph` JSON-LD schema builder.
- `app/infrastructure/[slug]/page.tsx` — Dynamic route handler and page template.
- `app/infrastructure/page.tsx` — Infrastructure overview directory.
- `components/infrastructure/data-center-diagram.tsx` — Facility topology schematic.
- `components/ui/dialog.tsx` — Pre-existing accessible Radix UI Dialog component.
- `tests/audit.test.mjs`, `tests/portfolio-economics.test.mjs`, `tests/seo-recovery.test.mjs` — Comprehensive automated test suite.

---

## 3. New & Modified Files

### Modified Files:
1. `lib/types.ts`
   - Extended `InfrastructureService` with optional fields: `location`, `gallery` (`InfrastructureGalleryItem[]`), and `areas` (`InfrastructureArea[]`).
   - Defined typed interfaces `InfrastructureGalleryItem` and `InfrastructureArea`.

2. `lib/content.ts`
   - Enriched the `data-centers` service object with structured gallery metadata (4 items with titles, captions, alt text, and disclaimers), 6 structured infrastructure areas (principles, considerations, confirmed scope), and factual markdown content.
   - Maintained single-source-of-truth integrity while strictly satisfying all assertions in `tests/seo-recovery.test.mjs`.

3. `components/infrastructure/data-center-diagram.tsx`
   - Removed speculative metrics (`2N+2 Concurrent Maintainability`, `N+2 Diesel Turbo Arrays (72h Fuel)`, `Up to 35kW per rack`, `<1.2ms Metropolitan SLA`).
   - Replaced with factual architectural descriptions (`Dual Substation Feeds`, `Auxiliary Backup Generation`, `Concurrently Maintainable A/B Bus Distribution`, `Direct Optical Patch Demarcation`).

4. `lib/seo.ts`
   - Enhanced `generateInfrastructureMetadata` to assign the dedicated exterior image (`https://tonmoyinfrastructure.org/images/infrastructure/datacenter/exterior.png`) as OpenGraph and Twitter card preview image for `data-centers`.
   - Appended localized keywords (`Jayapura`, `Papua`, `Indonesia`, `Sovereign Data Center`).

5. `app/infrastructure/[slug]/page.tsx`
   - Added conditional routing for `slug === 'data-centers'` to render the rich `DataCenterDetail` component with breadcrumbs and JSON-LD, while preserving standard rendering for all other infrastructure routes.

### Newly Created Files:
1. `components/infrastructure/data-center-gallery.tsx`
   - Client-side gallery component displaying the 4 illustrations in a responsive 2-column grid.
   - Integrated full-resolution Radix UI dialog modal with previous/next controls, keyboard navigation (Escape, ArrowLeft, ArrowRight), and accessibility focus rings.
   - Prominently displays the mandatory visual disclosure banner and card-level disclaimer notices.

2. `components/infrastructure/data-center-areas.tsx`
   - Structured presentation of the 6 core engineering domains.
   - Distinguishes general data center engineering principles from confirmed TIV Jayapura implementations.

3. `components/infrastructure/data-center-detail.tsx`
   - Primary editorial page component orchestrating all 7 required sections (Hero, Overview, Gallery, Areas, Reliability, Location & Inquiries, Related Systems).

4. `docs/datacenter-page-implementation-report.md`
   - This implementation report documenting all changes, mappings, tests, and validation steps.

---

## 4. Image Asset Mappings

The source assets were located in `public/datacenter_*.png` and `assets/incoming/` and have been placed into the canonical production directory `public/images/infrastructure/datacenter/`:

| Asset Role | Incoming Asset | Production Path | Resolution | Size | Alt Text |
|:---|:---|:---|:---:|:---:|:---|
| **Exterior View** | `datacenter_outside.png` | `public/images/infrastructure/datacenter/exterior.png` | 1672 × 941 | 2.44 MB | "Illustrative exterior view of the TIV data center in Jayapura, Papua, Indonesia." |
| **Server Room** | `datacenter_inside.png` | `public/images/infrastructure/datacenter/server-room.png` | 1671 × 941 | 2.32 MB | "Illustrative server room with black equipment racks, network cabling, and status lights." |
| **Firewall Monitoring** | `datacenter_firewall.png` | `public/images/infrastructure/datacenter/firewall-monitoring.png` | 1670 × 942 | 1.93 MB | "Illustrative firewall monitoring dashboard with network traffic and security panels." |
| **Technician Maintenance**| `datacenter_mainitaining.png` | `public/images/infrastructure/datacenter/technician-maintenance.png` | 1670 × 942 | 2.24 MB | "Illustrative technician inspecting network cabling in a server rack." |

All assets are exported into `out/images/infrastructure/datacenter/` during `npm run build` and resolve correctly in development and static production.

---

## 5. Page Sections Implemented

The upgraded `/infrastructure/data-centers/` page is organized into seven distinct, editorial sections:

### Section A — Hero
- Full-width hero section pairing a comprehensive title and metadata summary with the framed exterior visualization (`exterior.png`).
- Heading: *"TIV sovereign data center in Jayapura, Papua, Indonesia"*.
- Location badge: `"Jayapura, Papua, Indonesia"`.
- Verified status tags: `Production Facility`, `Internal Sovereign Infrastructure`.
- Concise summary of the facility's actual role: sovereign host for core software platforms (OpenMail, Mercura, M31A, Octate), authoritative DNS, and internal systems engineering.
- CTAs linking to `#gallery`, `/infrastructure`, and `/contact`.
- Preserves 16:10 visual framing without text clipping or overlapping across mobile, tablet, and desktop viewports.

### Section B — Facility Overview
- Explains the strategic necessity of sovereign infrastructure in Eastern Indonesia.
- Lists actual hosted workloads (OpenMail, Mercura, M31A, Octate, DNS resolution).
- Ground truth callout clarifying that TIV does not operate a public retail self-service colocation storefront or public cloud portal.
- Explicit distinction between the confirmed local operational facility in Jayapura and hypothetical global blueprints (refuting unverified claims of 16 global facilities, 845 PB, or 99.999% SLAs).

### Section C — Infrastructure Visual Gallery
- Four distinct cards presenting the four image assets:
  1. **The data center** (`exterior.png`): External perimeter, security envelope, and regional deployment context.
  2. **Computing infrastructure** (`server-room.png`): Modular equipment racks, structured cable hygiene, and high-density compute nodes.
  3. **Network security and monitoring** (`firewall-monitoring.png`): Perimeter firewall telemetry, DDoS filtering, and BGP route inspection.
  4. **Infrastructure maintenance** (`technician-maintenance.png`): Equipment inspection routines, optical patch integrity, and access governance.
- Interactive modal / lightbox allowing full-screen inspection, keyboard cycling (arrow keys), and escape closing.
- Schematic Topology section immediately follows the gallery, embedding the updated `DataCenterDiagram`.

### Section D — Infrastructure Areas
Structured breakdown of the six core engineering areas:
1. **Computing and server infrastructure**: cgroups v2 ceilings, POSIX rlimits, ZFS storage pools, IPMI/serial console.
2. **Network connectivity and cabling**: Cat6A/fiber patch cabling, ToR switching, bend-radius management, regional fiber demarcation.
3. **Security and monitoring**: Stateful Layer 3/4 firewalling, default-deny ingress/egress, ISO 27001 & SOC 2 alignment.
4. **Power protection and distribution**: Dual distribution feeds (A/B), online double-conversion UPS battery systems, auxiliary generator backup, metered ePDUs.
5. **Cooling and environmental management**: Hot/cold aisle isolation, ASHRAE intake temperature adherence (18°C–27°C), dew point monitoring.
6. **Physical security and maintenance**: Multi-factor physical entry authentication, visitor escorts, cleanroom dust discipline, component chain-of-custody.

### Section E — Operations & Reliability
- Grounded, non-speculative overview of data center reliability:
  - Proactive telemetry & continuous observability.
  - Scheduled preventative runbooks (battery impedance, generator load tests, optical loss verification).
  - Equatorial climate equilibrium.
  - Defense-in-depth and runtime policy gates (referencing M31A 11-stage policy gates and ASVS L1 hardening).
  - Cryptographic backups & cold-restart recovery runbooks.
  - Honest reliability reporting (rejecting fabricated 99.999% SLA marketing claims).

### Section F — Location & Contact
- Confirmed physical address: `Pusat Bisnis Jayapura, Jl. Pasifik Permai, Jayapura, Papua 99111, Indonesia`.
- Geographic coordinates: `-2.543186° S, 140.714993° E`.
- Telephone: `(0967) 551888`.
- Dedicated inquiries card explaining private consultation procedures for enterprise colocation and peering via `/contact`.

### Section G — Related Infrastructure
- Contextual navigation cards linking to:
  - **Networking** (`/infrastructure/networking`)
  - **Optical Systems** (`/infrastructure/optical`)
  - **Compute** (`/infrastructure/compute`)
  - **Hosting** (`/infrastructure/hosting`)
  - **Security Center** (`/security`)

---

## 6. Visual Disclosure Policy & Image Presentation

To maintain absolute institutional honesty without cluttering image presentation, visual representations are presented with clean imagery and prominent, dedicated disclosures:

### General Banner Disclosure (Positioned above the gallery):
> **MANDATORY VISUAL DISCLOSURE**  
> *"Visual representations are AI-generated visualizations and do not constitute documentary photographs of the physical facility. Dashboard values shown are simulated samples and are not live operational measurements."*

### Image-Specific Refinements:
- **Clean Image Presentation**: Overlaid badges stamped directly on top of the images were removed to preserve unobstructed image visibility and visual dignity.
- **Removed "Illustrative Purpose" / "Explanatory Purpose"**: Replaced repetitive boilerplate phrases across alt tags, captions, and disclaimers with concise, objective descriptions.
- **Firewall Monitoring Card & Lightbox**: Includes an explicit warning that all visible dashboard metrics (such as throughput, blocked events, uptime, and rule counts) are simulated sample values and not live operational measurements.
- **Technician Maintenance Card & Lightbox**: Explicitly notes that the technician depicted is a generated character demonstrating maintenance protocols and is not an actual TIV employee.

---

## 7. Technical SEO & Accessibility Improvements

1. **Title & Meta Description**:
   - `title`: `"Data Centers — TIV Infrastructure"`
   - `description`: `"TIV operates a sovereign data center facility in Jayapura, Papua, Indonesia — engineered for internal platform workloads, high-density compute, and resilient sovereign systems."`
2. **Canonical URL**:
   - Strictly enforces canonical URL: `https://tonmoyinfrastructure.org/infrastructure/data-centers/`.
3. **OpenGraph & Twitter Cards**:
   - `og:image` and `twitter:image` set to `https://tonmoyinfrastructure.org/images/infrastructure/datacenter/exterior.png`.
   - `twitter:card`: `summary_large_image`.
4. **Structured Data (Schema.org)**:
   - Automated JSON-LD `@graph` connects:
     - `Organization` (Tonmoy Infrastructure and Vision with founder node, official postal address, and geo-coordinates).
     - `WebSite` (with search Action).
     - `WebPage` (`https://tonmoyinfrastructure.org/infrastructure/data-centers/#webpage`).
     - `BreadcrumbList` (`Home > Infrastructure > Data Centers`).
   - Zero unsupported claims (no artificial ratings, certifications, or capacity metrics).
5. **Accessibility (WCAG 2.2 AA)**:
   - Descriptive `alt` attributes on all images.
   - Keyboard accessible modal dialog with focus trapping and `Escape`, `ArrowLeft`, `ArrowRight` listener.
   - High contrast ratios (exceeding 4.5:1 for body and 3:1 for headers).
   - Clear focus rings (`focus-visible:ring-2 focus-visible:ring-brand`).
   - SVG schematics include `role="img"` and descriptive `aria-label`.

---

## 8. Verification & Validation Results

### Command 1: Type Checking
```bash
npm run typecheck
```
**Result**: `tsc --noEmit` exited with code `0`. Zero TypeScript errors.

### Command 2: Linting
```bash
npm run lint
```
**Result**: `next lint` exited with code `0`. Zero ESLint warnings or errors.

### Command 3: Test Suite
```bash
npm test
```
**Result**: Executed 34 tests across `tests/audit.test.mjs`, `tests/portfolio-economics.test.mjs`, and `tests/seo-recovery.test.mjs`.  
`pass 34, fail 0, cancelled 0, skipped 0`. All tests passed.

### Command 4: Production Static Export
```bash
npm run build
```
**Result**: Successfully generated 101 pre-rendered static routes and exported to `out/`.
- Verified `out/infrastructure/data-centers/index.html` (247 KB) contains all text, images, canonical tags, and structured data.
- Verified all 4 assets exist in `out/images/infrastructure/datacenter/`:
  - `out/images/infrastructure/datacenter/exterior.png`
  - `out/images/infrastructure/datacenter/server-room.png`
  - `out/images/infrastructure/datacenter/firewall-monitoring.png`
  - `out/images/infrastructure/datacenter/technician-maintenance.png`

---

## 9. Remaining Items & Factual Confirmations

1. **Physical Photography**: As physical facility photography becomes available in the future, documentary photos can replace or supplement the AI-generated illustrations.
2. **Carrier Interconnects**: Specific local telecommunications partners in Jayapura can be named once bilateral public disclosure agreements are formalized.
3. **Public Deployment Authorization**: Static output is validated and ready in `out/`. No deployment has been initiated without authorization.
