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

- **Display Serif / Sans**: `var(--font-display)` (Instrument Serif / Syne) for major editorial statements, section indices, and hero headlines.
- **Body Sans**: `var(--font-sans)` (Inter) for readable paragraphs, navigation labels, and UI controls.
- **Monospace**: `var(--font-jetbrains)` (JetBrains Mono) for timestamps, version numbers (`v1.0.0`), IP/BGP routing numbers, and cryptographic keys.

---

## 4. Accessibility (WCAG 2.2 AA)

- **Color Contrast**: All normal text maintains a minimum contrast ratio of 4.5:1 against its background. Large text (>= 24px) maintains >= 3:1.
- **Motion Restraint**: All CSS transitions and Framer Motion wrappers check `prefers-reduced-motion`. When reduced motion is requested, animation durations drop to 0s or simple opacity fades.
- **Keyboard Traversal**: Clear focus rings (`focus-visible:ring-2 focus-visible:ring-brand`) on all interactive buttons, cards, and hyperlinks.
- **Screen Reader Semantics**: All SVGs include `role="img"` and an explicit `aria-label` describing their topological purpose.
