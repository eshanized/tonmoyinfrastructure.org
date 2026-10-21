# TIV Design System & Visual Specification

This document codifies the design language, token taxonomy, typography rules, and accessibility standards for Tonmoy Infrastructure and Vision.

---

## 1. Design Philosophy: Restraint, Structure, Permanence

The TIV visual aesthetic reflects an engineering organization that builds foundational infrastructure:

- **Monochromatic Dignity**: Dark, near-black canvases (`#09090b`) paired with warm high-contrast text (`#fafafa`).
- **Signature Accent**: Coral Red (`#E5484D`) applied with restraint to signify active states, key data metrics, and navigational landmarks.
- **Hairline Precision**: 1px borders (`border-border`), tabular data grids, and monospaced timestamps create a sense of mechanical exactitude.
- **SVG Schematics**: We prefer crisp vector schematics over marketing illustrations or stock photography.

---

## 2. Color Palette & Tokens

| Token | CSS Variable | Hex (Dark) | Usage |
| :--- | :--- | :--- | :--- |
| **Brand Accent** | `--brand` | `#E5484D` | Action buttons, active badges, highlights |
| **Brand Foreground** | `--brand-foreground`| `#FFFFFF` | Text rendered on top of brand backgrounds |
| **Canvas Background**| `--background` | `#09090B` | Root page canvas |
| **Card Surface** | `--card` | `#111113` | Panels, modules, cards |
| **Secondary Canvas** | `--secondary` | `#18181B` | Alternating section backgrounds |
| **Hairline Border** | `--border` | `rgba(255,255,255,0.1)` | Structural dividers and bounding boxes |
| **Foreground Text** | `--foreground` | `#FAFAFA` | High-emphasis body and headings |
| **Muted Text** | `--muted-foreground`| `#A1A1AA` | Secondary labels, descriptions, metadata |

---

## 3. Typography Hierarchy

- **Primary Typeface**: [Fira Sans](https://fonts.google.com/specimen/Fira+Sans) (`var(--font-fira-sans)`) used consistently across all headings, display titles, body copy, UI controls, navigation labels, badges, and code/technical elements.

---

## 4. Accessibility (WCAG 2.2 AA)

- **Color Contrast**: All normal text maintains a minimum contrast ratio of 4.5:1 against its background. Large text (>= 24px) maintains >= 3:1.
- **Motion Restraint**: All CSS transitions and Framer Motion wrappers check `prefers-reduced-motion`. When reduced motion is requested, animation durations drop to 0s or simple opacity fades.
- **Keyboard Traversal**: Clear focus rings (`focus-visible:ring-2 focus-visible:ring-brand`) on all interactive buttons, cards, and hyperlinks.
- **Screen Reader Semantics**: All SVGs include `role="img"` and an explicit `aria-label` describing their topological purpose.

---

## 5. Research Publications Visual System

The research library (`/research/publications` and `/research/publications/[slug]`) implements an academic editorial aesthetic:

- **Institutional Catalogue Hero**: Displays verified document counts, live search input with keyboard shortcuts (`Cmd+K`), and faceted filter toggles (Area, Type, Status).
- **Featured Paper Spotlight**: Highlights landmark research with distinct border framing, prominent abstract preview, and direct PDF download CTA.
- **Academic Paper Presentation**:
  - Two-column reading layout: Comfortable 65-75 character reading measure paired with a sticky 320px metadata & navigation sidebar.
  - Heading Anchors: Subtle hover hash markers (`#`) linking to section anchor IDs with smooth scroll padding (`scroll-mt-24`).
  - Table of Contents: Dynamically highlights active sections using a lightweight client scroll observer.
  - Academic Metadata List: Dual-column tabular display of identifier, status badge, area, license, DOI, and project relations.
  - Formatted Citation Block: One-click copyable citations in APA 7th, BibTeX, and Inline citation styles with immediate visual feedback (`sonner` toast / copy state).
  - High-Assurance Status Banners: Semantic warning cards for `Draft` and `Experimental` papers; clear directional notices for `Superseded` publications.

