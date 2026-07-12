# Contributing to TIV

Thank you for your interest in contributing to Tonmoy Infrastructure and Vision (TIV). We welcome contributions from engineers, researchers, and technical writers who share our dedication to robust, open, and self-reliant digital infrastructure.

---

## 1. Code of Conduct & Values

We maintain an environment focused on technical rigor, intellectual honesty, and mutual respect:
- Technical arguments should be supported by measurements, benchmarks, or formal specifications.
- Code must be clear, readable, and devoid of unnecessary abstractions.
- Respect privacy, user autonomy, and open-source principles.

---

## 2. Development Workflow

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/tonmoy-infrastructure/website.git
   cd website
   npm install
   ```

2. **Branching**:
   - Use descriptive branch names: `feature/new-research-area`, `fix/route-breadcrumbs`, `docs/architecture-update`.

3. **Validation & Verification**:
   - Ensure your code passes all type checks and lint rules:
     ```bash
     npm run typecheck
     npm run lint
     npm test
     ```

4. **Commit Messages**:
   - Follow standard semantic commit guidelines:
     - `feat: add dw-dm optical simulation notes`
     - `fix: correct breadcrumbs link on security page`
     - `docs: update content schema guidelines`

---

## 3. Pull Request Checklist

Before submitting a pull request, ensure:
- [ ] No regression errors in `npm run typecheck`.
- [ ] No ESLint warnings in `npm run lint`.
- [ ] Project statuses respect canonical rules (OpenMail, Mercura, M31A, Octate are Stable Releases).
- [ ] Any new data structures conform to Zod schemas in `lib/schemas.ts`.
- [ ] All interactive elements are accessible via keyboard and respect WCAG 2.2 AA standards.
