# Proposal: Bootstrap Portfolio

## Intent

Launch José Luis Pintado Vásquez's accessible bilingual portfolio, presenting his e-commerce developer and IT educator careers equally.

## Scope

### In Scope
- Astro static site deployed by Actions at the canonical URL; `/` redirects to explicit `/es/`, alongside `/en/`.
- Approved deep-black system, oversized cyan→blue→amber typography, infinity signature, and CSS/WAAPI motion guarded by reduced-motion preferences.
- Localized profile, dual-career path, capabilities, education, credentials, and Movistar, Crepier, RadioShack, Desly, and CEPRE-UNI case studies.
- Header social links; direct `mailto:`, `tel:`, and LinkedIn; `/cv.pdf`; repo-only assets with accessible, visible pending placeholders.
- WCAG 2.1 AA, semantic HTML, hreflang, sitemap, robots, social metadata, JSON-LD, minimal JavaScript, and asset optimization.

### Out of Scope
- Custom domain, analytics, contact backend, CMS, false final-asset claims, and animation libraries.

## Capabilities

### New Capabilities
- `localized-portfolio`: Bilingual navigation/content, contact, visual language, accessibility, SEO, performance, and honest assets.
- `portfolio-case-studies`: Typed localized case studies, education, credentials, detail routes, and structured data.
- `github-pages-delivery`: Reproducible Astro build and Actions deployment.

### Modified Capabilities
None; no existing specifications.

## Approach

Use Astro static output with canonical `site`, no `base`, prefixed i18n, and typed `glob()`/Zod collections. Components centralize layout, text-only language switching, contact/social links, motion, and `PendingAsset`. `withastro/action@v6` plus `actions/deploy-pages@v5` publishes `dist/` with required permissions.

Delivery is `auto-chain`, `stacked-to-main`, ≤400 authored lines: **(1)** autonomous deployable bilingual shell, visuals, chrome, hero/contact, pending slots, SEO, verification; **(2)** commerce studies; **(3)** education studies; **(4)** education/certifications; **(5)** credential downloads. Each remains green and independently revertible.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `package.json`, `astro.config.mjs`, `src/` | New | Build, localized UI/content, pages, styles |
| `public/`, `.github/workflows/deploy.yml` | New | Assets, pending slots, CV, deployment |
| URL surface | New | `/`, `/es/`, `/en/`, `/{locale}/case-studies/{slug}/`, `/cv.pdf`, sitemap and robots |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Locale or pending-state drift | Med | Ship locales together; one renderer and inventory |
| Motion/contrast regression | Med | Motion gates, solid fallback, axe/manual checks |
| Deploy or slice failure | Med | Lockfile, local build, green main; one re-slice then `size:exception` |

## Rollback Plan

Revert only the failing slice. Slice 1 restores the empty baseline; slices 2–5 remove only their content, routes/assets, and evidence. Preserve published asset paths.

## Dependencies

- Node/pnpm, Astro, Pages using **GitHub Actions**, and eventual user-supplied media/CV.

## Success Criteria

- [ ] Build/deploy renders both locales, case-study URLs, sitemap, robots, metadata, and structured data.
- [ ] Keyboard, contrast, language, reduced-motion, markup, and static-first performance checks pass in both locales.
- [ ] Missing assets are visibly pending and inventoried; social/contact links expose only approved details.
