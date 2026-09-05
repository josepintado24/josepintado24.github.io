# Tasks: Bootstrap Portfolio

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~700-900 (slice 1 ~350-400; slices 2-5 ~80-150) |
| 400-line budget risk | High (slice 1); Low per content slice |
| Chained PRs recommended | Yes |
| Suggested split | 5 stacked PRs to main |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | PR | Focused test | Runtime harness | Rollback |
|------|------|-----|--------------|-----------------|----------|
| 1 | Bilingual shell + deploy | PR 1 | `pnpm build`; `/`→`/es/` once | josepintado24.github.io/{es,en}/ | Revert tooling, config, src/, public/, workflow |
| 2 | Commerce studies (Movistar/Crepier/RadioShack) | PR 2 | `pnpm build`; slug render per locale | josepintado24.github.io/{es,en}/case-studies/{slug}/ | Revert 3 study entries |
| 3 | Education studies (Desly/CEPRE-UNI) | PR 3 | `pnpm build`; slug render per locale | josepintado24.github.io/{es,en}/case-studies/{slug}/ | Revert 2 study entries |
| 4 | Education + credentials list | PR 4 | `pnpm build`; parity render | josepintado24.github.io/{es,en}/#education | Revert education + credentials content |
| 5 | Credential downloads | PR 5 | HEAD/GET on each asset | josepintado24.github.io/cv.pdf | Remove only added `public/` assets |

## Phase 1: Slice 1 — Bilingual Shell + Deploy (PR 1)

Dependencies: none. Blocks slices 2-5.

### RED baselines

- [x] 1.1 RED: no `astro.config.mjs` → `pnpm install` fails (record)
- [x] 1.2 RED: no root config → `/` 404 (record)
- [x] 1.3 RED: no pair validation → single-locale publishes (record)

### GREEN

- [x] 1.4 `package.json`, `pnpm-lock.yaml`, `astro.config.mjs` (i18n `es`/`en`, `defaultLocale: 'es'`, prefixed default, `site`, no `base`), `tsconfig.json`
- [x] 1.5 `.github/workflows/deploy.yml` (`contents: read`, `pages: write`, `id-token: write`)
- [x] 1.6 `public/robots.txt`, favicon, `404.html`
- [x] 1.7 `src/content.config.ts` (Zod; locale-pair + audience validation)
- [x] 1.8 Seed `src/content/{es,en}/{profile,site}.{json,md}` (approved contact)
- [x] 1.9 `src/lib/{i18n,content,seo,assets}.ts` (locale parse, sitemap, `PendingAsset`)
- [x] 1.10 `src/layouts/BaseLayout.astro` (skip link, `<html lang>`, `hreflang`, JSON-LD)
- [x] 1.11 `src/components/{Header,Footer,LanguageSwitcher,Hero,Contact,SocialLinks,PendingAsset,InfinitySignature,MotionGuard}.astro`
- [x] 1.12 `src/pages/index.astro` as the minimal root redirect host, plus `src/pages/{es,en}/index.astro` locale pages; Astro runtime requires the root host when `redirectToDefaultLocale: true`, as documented in the design deviation.
- [x] 1.13 `src/styles/{tokens,global}.css` + `src/scripts/motion.ts` (gated WAAPI, solid fallback)

### Verify slice 1

- [x] 1.14 GREEN: `pnpm build`; `/`→`/es/` once; `/en/`; both `lang` correct
- [x] 1.15 GREEN: tab skip link; focus visible; reduced-motion silent; contrast passes
- [x] 1.16 Workflow publishes; live `/es/` verified; Pages source set to GitHub Actions. Workflow run `33988462241` (commit `9e6a5f9`) succeeded end-to-end. Pages source was changed from `legacy` to `workflow` via `PUT /repos/josepintado24/josepintado24.github.io/pages` with `build_type=workflow`. Live verification: `https://josepintado24.github.io/` redirects once to `/es/`; `/es/` renders the Spanish hero, social links, contact (mail and tel), honest CV pending notice, and the footer; `/en/` renders the English mirror; `sitemap-index.xml` lists `/`, `/en/`, `/es/` with hreflang alternates.
- [x] 1.17 Record `PendingAsset` inventory (none shipped)
- [x] 1.18 `size:exception` approved by maintainer (up to 4500 total changed lines). Complete candidate = 4054 lines; the generated `pnpm-lock.yaml` (3480 lines, ~85.8% of the complete candidate) dominates because the lockfile cannot be split from the Astro workspace it locks. Authored implementation = 399 lines (under 400-line `review_budget_lines`); SDD evidence = 175 lines. Post-build re-verification (this attempt) recorded in `apply-progress.md` `### Build / output`. Prior failed evidence revision: `sha256:b078147d36aa91ea3a6174dca1b6ce0b1e563a6321819e258d1df82fcef75af9`.

## Phase 2: Slice 2 — Commerce Studies (PR 2)

Dependencies: Slice 1 merged.

- [ ] 2.1 RED: missing pair or non-approved `audience` → build fails
- [ ] 2.2 `src/pages/{es,en}/case-studies/[slug].astro` (detail + JSON-LD)
- [ ] 2.3 `src/content/{es,en}/case-studies/{movistar,crepier,radioshack}.{json,md}` (`audience: 'commerce'` or `'both'`)
- [ ] 2.4 List studies on home (both locales)
- [ ] 2.5 GREEN: `pnpm build`; `/{es,en}/case-studies/{slug}/` renders; same slug
- [ ] 2.6 GREEN: JSON-LD parses; query/hash preserved on switch
- [ ] 2.7 Live: josepintado24.github.io/{es,en}/case-studies/{slug}/ = 200
- [ ] 2.8 Record pending assets per study

## Phase 3: Slice 3 — Education Studies (PR 3)

Dependencies: Slice 1 merged.

- [ ] 3.1 RED: missing pair or non-approved `audience` → build fails
- [ ] 3.2 `src/content/{es,en}/case-studies/{desly,cepre-uni}.{json,md}` (`audience: 'education'` or `'both'`)
- [ ] 3.3 Re-list studies; dual-career equal weight preserved
- [ ] 3.4 GREEN: `pnpm build`; detail routes render; live URLs 200; pending assets enumerated

## Phase 4: Slice 4 — Education + Credentials List (PR 4)

Dependencies: Slices 1-3 merged.

- [ ] 4.1 RED: unpaired entry → build fails
- [ ] 4.2 `src/content/{es,en}/{education,credentials}.{json,md}` (typed)
- [ ] 4.3 Render on home + detail; per-locale parity
- [ ] 4.4 GREEN: `pnpm build`; pending credentials show `PendingAsset`; live URLs 200

## Phase 5: Slice 5 — Credential Downloads (PR 5)

Dependencies: Slice 4 merged; user supplies `/cv.pdf` + certs.

- [ ] 5.1 RED: absent `/cv.pdf` → home shows pending, link inactive (record)
- [ ] 5.2 `public/cv.pdf` + per-credential PDFs; update `assets.ts`
- [ ] 5.3 GREEN: `pnpm build`; HEAD/GET on each asset = 200
- [ ] 5.4 Live: josepintado24.github.io/cv.pdf serves correctly
- [ ] 5.5 Re-run reduced-motion + bilingual checks post-deploy

## Cross-slice rules

- Ship BOTH `es` and `en` content together; never a half-locale.
- Each slice records `PendingAsset` inventory in PR description.
- Each slice runs live GitHub Pages verification on canonical origin.
- Slices revert independently; prior routes and assets MUST keep resolving.
- After one slicing pass, if a slice still > 400 lines → `size:exception`; stop shrinking.
