# TIV Content System & Authoring Guidelines

This guide details the editorial principles, data models, and schema validation rules governing content on the TIV website.

---

## 1. Content Integrity Guarantees

TIV enforces strict content integrity across all published pages:

1. **Software Status Accuracy**:
   - **OpenMail, Mercura, M31A, and Octate** are **Stable Releases** built and shipped by TIV.
   - They must **never** be labeled as "upcoming", "in development", "concept", or "experimental".
   - Product status is `Stable Release`, while development maintenance is `Active`.
2. **Financial Data Integrity**:
   - All financial numbers must be explicitly labeled as unaudited management estimates.
   - Do not claim audited status or cite unverified audit firms.
3. **Personnel & Governance**:
   - Founder is **Eshan Roy** (`eshanized`).
   - Do not invent fictional board members, executive teams, or employee headcounts.
4. **No Vanity Metrics**:
   - Do not publish fictional uptime percentages (e.g. "99.999%"), invented enterprise customer counts, or fabricated industry awards.
5. **Infrastructure & Operational Claims**:
   - **TIV Data Center Ground Truth**: Tonmoy Infrastructure and Vision operates an **existing, physical sovereign data center facility** located in **Jayapura, Papua, Indonesia**. The facility physically exists and is actively operational—it must **never** be downgraded to "planned", "proposed", or "research".
   - **Operational Scope vs. Commercial Offering**: The Jayapura facility hosts TIV's internal infrastructure, authoritative DNS, and software platforms (OpenMail, Mercura, M31A, Octate). TIV does not operate a public retail self-service colocation portal; enterprise hosting and sovereign infrastructure capacity are evaluated via private inquiry.
   - **Local Operational Facility vs. Global Blueprints**: The confirmed physical facility in Jayapura must not be conflated with unverified global hyperscale claims. Do not claim TIV owns or operates 16 data centers across 11 countries, 845 PB of aggregate storage, or 99.999% SLAs unless verified by authoritative operational evidence.
   - **Logistics & Courier Architecture**: Logistics systems and freight corridors are modeled as systems architecture, cryptographic custody verification, and hardware transit telemetry research.
   - **Certifications & Compliance**: Do not claim accredited third-party compliance certifications (e.g. ISO 27001, SOC 2 Type II, PCI DSS, HIPAA, GDP) unless external audit certificates exist; describe architectures as aligned with recognized security and distribution principles.

---

## 2. Content Schemas

All content objects in `lib/content.ts` and `lib/institutional.ts` are validated using Zod schemas defined in `lib/schemas.ts`:

### Adding a Project

Projects must conform to `ProjectSchema`:

```typescript
{
  slug: string; // Unique URL slug
  title: string;
  tagline: string;
  description: string;
  category: 'Software' | 'Internet Infrastructure' | 'Network Infrastructure' | 'Research';
  status: 'Stable Release' | 'Research' | 'Planning' | 'Archived';
  developmentStage: 'Active' | 'Maintenance' | 'Planning';
  featured?: boolean;
  version?: string; // e.g. "v1.0.0"
  problem: string;
  approach: string;
  architecture: string;
  features: string[];
  roadmap: { phase: string; title: string; status: string; items: string[] }[];
  releases?: string[];
  techStack?: string[];
  repositoryUrl?: string;
  content: string; // Markdown body
}
```

### Adding a Release Note

Releases must conform to `ReleaseSchema`:

```typescript
{
  slug: string;
  project: string; // matches project slug
  version: string; // e.g. "1.0.0"
  date: string; // YYYY-MM-DD
  status: 'Released' | 'Pre-release' | 'Draft';
  summary: string;
  notes: {
    type: 'Added' | 'Fixed' | 'Changed' | 'Security' | 'Breaking' | 'Deprecated';
    items: string[];
  }[];
}
```

---

## 3. Formatting & Style Rules

- **Headings**: Sentence case for headings ("Vulnerability disclosure policy", not "Vulnerability Disclosure Policy").
- **Icons**: Use Lucide React icons through `@/components/shared/tiv-icon` or direct imports. No emoji characters allowed in UI text.
- **Numbers**: Use SI units and explicit currency markings (e.g., `₹18.4L`).

---

## 4. Corporate Address & Contact Integrity

The official office address and contact coordinates are centralized in `lib/site-config.ts` and validated via `lib/schemas.ts`:
- **Street**: `Pusat Bisnis Jayapura, Jl. Pasifik Permai`
- **City**: `Jayapura`
- **Region / Province**: `Papua`
- **Postal Code**: `99111`
- **Country**: `Indonesia`
- **Phone**: `(0967) 551888` (`tel:+62967551888`)
- **Coordinates**: `-2.543186, 140.714993`
- **Privacy Guarantee**: Private recipient email addresses are not exposed in the frontend source.

---

## 5. TIV I/O Event Identity & Disclosure Rules

- **Event Name**: Tonmoy Infrastructure and Vision I/O (display name: **TIV I/O**)
- **Category**: Technology, software, developer infrastructure, networking, and research
- **Organizer**: Tonmoy Infrastructure and Vision
- **No Speculative Fabrication**: Dates, venue, registration availability, ticket prices, attendance figures, and session rosters remain unannounced until officially verified. Truthful wording such as "To be announced" must be used.
- **Independent Identity**: TIV I/O is an independent developer conference for TIV engineering work. It is never portrayed as a Google affiliate or Google I/O clone.
