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
