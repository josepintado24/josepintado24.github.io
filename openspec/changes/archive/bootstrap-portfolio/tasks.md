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

- [x] 2.1 RED (recorded): with one ES file removed, build failed with `Case study "movistar" missing locale pair: en is absent`; schema Zod enum on `audience` rejects any value outside `commerce | education | both`.
- [x] 2.2 `src/pages/{es,en}/case-studies/[slug].astro` (detail + JSON-LD). Dynamic route emits `schema.org/CreativeWork` per detail with localized name, alternate name, audience, stack keywords, and locale-stable canonical URL.
- [x] 2.3 `src/content/case-studies/{movistar,crepier,radioshack}.{es,en}.json` with `audience: 'commerce'`. Locale-prefixed filenames avoid the Astro 5 glob-loader basename collision; flat layout replaces the earlier `{locale}/case-studies/` tree.
- [x] 2.4 Home lists the three commerce case studies under "Casos de e-commerce" / "E-commerce case studies" with locale-stable detail links and accessibility-correct headings.
- [x] 2.5 GREEN: `pnpm build` succeeds; `/es/case-studies/{movistar,crepier,radioshack}/` and `/en/case-studies/{slug}/` all render with the same slug in both locales.
- [x] 2.6 GREEN: CreativeWork JSON-LD parses; switching language uses `getRelativeLocaleUrl` and preserves the locale-neutral pathname; locale switcher exposes `hreflang` and `lang` attributes.
- [x] 2.7 Live: `curl -sI` returns HTTP/2 200 for all six `/es/` and `/en/` case-study URLs and the two home URLs.
- [x] 2.8 Pending assets recorded per study: each entry's `pendingAssets` array enumerates screenshots and metrics pending owner validation; Movistar is marked `confidential: true` for corporate details.

## Phase 3: Slice 3 — Education Studies (PR 3)

Dependencies: Slice 1 merged.

- [x] 3.1 RED (recorded): the locale-pair validator from Slice 2 fires the same way for education studies — removing the EN file fails the build with `Case study "desly" missing locale pair: en is absent`. Approved-slug guard already in place.
- [x] 3.2 `src/content/case-studies/{desly,cepre-uni}.{es,en}.json` with `audience: 'education'`. Locale-stable slugs, identical slug in both locales.
- [x] 3.3 Home now renders two parallel sections: "Casos de e-commerce" and "Casos de educación" / "E-commerce case studies" and "Education case studies". Dual-career parity preserved at the same heading level.
- [x] 3.4 GREEN: `pnpm build` succeeds (12 pages); `/es/case-studies/desly/`, `/es/case-studies/cepre-uni/`, `/en/case-studies/desly/`, `/en/case-studies/cepre-uni/` all return HTTP/2 200. Pending assets enumerated per study.

## Phase 4: Slice 4 — Education + Credentials List (PR 4)

Dependencies: Slices 1-3 merged.

- [x] 4.1 RED (recorded): removing either ES or EN for any education or credential entry fails the build with `Credential "<slug>" missing locale pair: en is absent` / same for education.
- [x] 4.2 `src/content/{education,credentials}/*.json` (typed). Education schema: locale, slug, institution, title, period, status (`in-progress | completed`), description, pendingAssets. Credentials schema: locale, slug, title, issuer, year (1900-2100), hours, summary, optional pdf, pendingAssets. Both approved-slug guards in place.
- [x] 4.3 Home renders four parallel sections (commerce cases, education cases, education degrees, credentials). Detail routes at `/{es,en}/education/{slug}/` and `/{es,en}/credentials/{slug}/` with locale-stable slugs, hreflang alternates, JSON-LD via BaseLayout. Per-locale parity enforced by the locale-pair validator.
- [x] 4.4 GREEN: `pnpm build` succeeds (40 pages); all credentials without a supplied PDF render `PendingAsset` with explicit pending reason; live URLs return HTTP/2 200.

## Phase 5: Slice 5 — Credential Downloads (PR 5)

Dependencies: Slice 4 merged; user supplies `/cv.pdf` + certs.

- [x] 5.1 RED (recorded): before commit, absent `/cv.pdf` rendered the PendingAsset notice on `/es/` and `/en/` (build verified locally; deliverable behavior reproduced the documented contract).
- [x] 5.2 `public/cv.pdf` (bilingual, ES then EN, A4, 6 pages, 412 KB) generated via headless Chrome from `public/cv.html`; `assets.ts` extended through `profile.cvPdf`/`cvLabel`/`cvDetail`; per-credential PDFs are out of scope until the user supplies them.
- [x] 5.3 GREEN: `pnpm build` succeeds; `HEAD /cv.pdf` returns 200 with `content-type: application/pdf`; `HEAD /cv.html` returns 200; both `/es/` and `/en/` render the active `<a class="cv-download" href="/cv.pdf">` link and the PendingAsset fallback is no longer present.
- [x] 5.4 Live: `curl -sI https://josepintado24.github.io/cv.pdf` returns HTTP/2 200 with `content-type: application/pdf` and `last-modified: Sat, 05 Sep 2026 21:43:56 GMT`. The home pages expose the link in both locales; deploy workflow run `33993861060` succeeded end-to-end on commit `06c1095`.
- [x] 5.5 Re-run reduced-motion + bilingual checks post-deploy: home still emits no animation when `prefers-reduced-motion: reduce` (the `MotionGuard` script is intact); both locales resolve at canonical origin with correct `<html lang>` and `hreflang` alternates; the new `.cv-download` style honors `prefers-reduced-motion` only through the same global guard (no extra animation introduced).

## Cross-slice rules

- Ship BOTH `es` and `en` content together; never a half-locale.
- Each slice records `PendingAsset` inventory in PR description.
- Each slice runs live GitHub Pages verification on canonical origin.
- Slices revert independently; prior routes and assets MUST keep resolving.
- After one slicing pass, if a slice still > 400 lines → `size:exception`; stop shrinking.
