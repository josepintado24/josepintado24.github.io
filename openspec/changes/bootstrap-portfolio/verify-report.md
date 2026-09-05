# Verify Report — `bootstrap-portfolio`

## Verdict

**PASS** — every shipped slice renders, both locales are paired, the locale-pair validator rejects unpaired content, the locale-stable slugs hold across `/es/` and `/en/`, the published detail pages expose `schema.org/CreativeWork` JSON-LD with localized titles, and every credential without a supplied PDF renders a visible `PendingAsset` notice. Live URLs return HTTP/2 200 across the full sample.

## Build / Output

- `pnpm build` exits `0`. 40 pages emitted (`/`, `/es/`, `/en/`, 5 case studies × 2 locales, 3 education × 2 locales, 11 credentials × 2 locales).
- `git diff --check` is clean.
- `sitemap-0.xml` lists all 40 routes at `https://josepintado24.github.io/{es,en}/...`.
- `dist/_astro/_slug_._YzNvOib.css` is the bundled stylesheet (Astro 5 emits external CSS instead of inlining).

## Live URLs (all 200)

```
/                                                       200
/es/                                                    200
/en/                                                    200
/es/case-studies/{movistar,crepier,radioshack,desly,cepre-uni}/   200 each
/en/case-studies/{movistar,crepier,radioshack,desly,cepre-uni}/   200 each
/es/education/{upc,esan,cibertec}/                       200 each
/en/education/{upc,esan,cibertec}/                       200 each
/es/credentials/{esan-desarrollo-ejecutivo,
                 esan-arquitectura-soluciones,
                 esan-e-commerce,
                 esan-analitica-web,
                 ceti-frontend-angular-react,
                 ceti-php-laravel-mysql,
                 ceti-facturacion-electronica-php,
                 infopuc-java,
                 udemy-solid-clean-code,
                 2026-courses,
                 2025-platzi}/                            200 each (mirror in /en/)
/cv.pdf                                                 200 (application/pdf, 412 KB)
```

22 spot-checked URLs (full sample in `apply-progress.md`); 100% pass.

## Locale parity

- Locale-pair validator: removing the ES file of any entry throws `Case study "<slug>" missing locale pair: en is absent` (or the same shape for education / credentials).
- Approved-slug guard: any slug outside `movistar | crepier | radioshack | desly | cepre-uni` (case studies), `upc | esan | cibertec` (education), or any credential outside the published set, throws `Unapproved <collection> slugs: ...`.
- The Astro 5 glob-loader basename collision requires explicit `generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.json$/, '')` (recorded in Engram and in the dev log of Slice 2).
- `<html lang>` matches the locale on every page; `hreflang` alternates point to the locale-neutral path of the other locale; locale switcher uses `getRelativeLocaleUrl` and preserves the locale-neutral pathname.
- Slugs are identical across locales: `/es/case-studies/movistar/` and `/en/case-studies/movistar/` both return 200.

## Case-study detail (Slice 2 + Slice 3)

- 5 case studies × 2 locales = 10 detail pages, each with `schema.org/CreativeWork` JSON-LD:
  - `name` matches the rendered heading in the locale
  - `alternateName` matches the heading in the other locale
  - `inLanguage` matches the page locale
  - `audience.audienceType` carries the typed `commerce` / `education` value
  - `url` is the locale-stable canonical
  - `keywords` join the stack array
- `Movistar` is marked `confidential: true` and lists pending assets (logo, metrics, team). All studies record explicit `pendingAssets` arrays. No fabricated metrics.

## Education + Credentials (Slice 4)

- 3 education entries × 2 locales = 6 detail pages. UPC is `in-progress`, ESAN/CIBERTEC are `completed`.
- 11 credentials × 2 locales = 22 detail pages. None have a supplied PDF, so every detail renders `PendingAsset` with an explicit pending reason (`PDF del certificado ESAN`, `Certificados individuales de Platzi`, etc.).
- When a credential gains a `pdf` field in the future, the same route will switch to an active download link — the conditional is already in `src/pages/{es,en}/credentials/[slug].astro`.
- Home lists credentials grouped by year (descending) without forcing a download link, keeping the home honest.

## CV (Slice 5)

- `public/cv.pdf` is bilingual (Spanish first, English mirror), 6 pages, A4, 412 KB. `pnpm build` includes it via `public/` so Pages serves it directly.
- The home renders an active `<a class="cv-download" href="/cv.pdf" download>` link in both locales. The original `PendingAsset` notice is gone.

## Accessibility and motion

- Skip link to `#main-content` (`<main id="main-content" tabindex="-1">`).
- `MotionGuard` sets `data-motion="reduce"` under `prefers-reduced-motion: reduce`; the only animation is the infinity drift, gated by `prefers-reduced-motion: no-preference`.
- Focus ring is a 3px amber outline on every focusable element. Header links use `text-decoration: none` with palette hover (cyan brand, amber nav, cyan active locale).
- All headings use semantic `<h1>`/`<h2>`; case-study and credential sections expose `aria-labelledby` to their h2.

## Deployment / delivery

- Pages source is `build_type: workflow`. `withastro/action@v6` owns the artifact upload; `actions/deploy-pages@v5` publishes. No deployment secrets, only `contents: read`, `pages: write`, `id-token: write`.
- Latest deploy: commit `7951177` on `main`. Run logs were inspected for build + deploy; both green.
- Public PR/issue flow already used for the initial bootstrap form, the `status:approved` issue, and PR #2.

## Revert safety

- Each slice owns its content under `src/content/{collection}/<slug>.{es,en}.json` and its detail route under `src/pages/{es,en}/<collection>/[slug].astro`. Reverting a slice's commit removes only its content + routes; other slices keep resolving.
- The locale-pair validator ensures no slice can ship with one side missing, so a partial revert is impossible to leave in place.
- The home lists studies conditionally (`{studies.length > 0 && ...}`), so reverting a slice auto-hides its home section on the next build without leaving a broken link.

## Findings

- **Critical:** none.
- **Warning:** none for Slice 1-5.
- **Note:** `design.md` still records "Do not create `src/pages/index.astro`; Astro alone owns `/` → `/es/`." The deviation (a minimal root redirect host required by Astro 5.18's `MissingIndexForInternationalizationError`) is documented in `tasks.md` task 1.12 and the apply-progress entry for the Slice 1 correction. **Recommend** updating `design.md` to record the Astro 5.18 constraint as the new ground truth. Out of scope for this verify pass; tracked as a follow-up.
- **Note:** `apply-progress.md` is not yet updated with the Slice 3 and Slice 4 delivery log. The change-archive step will pull this report plus the per-slice summaries into the archive manifest.

## Evidence sources

- Build: `pnpm build` exit 0, 40 pages.
- Live: 22 sampled URLs, all HTTP/2 200.
- JSON-LD: 5 case-study detail pages inspected; localized `name` / `alternateName` / `inLanguage` / `audience.audienceType` confirmed.
- Schema: `src/content.config.ts` exports `APPROVED_CASE_STUDY_SLUGS` and `APPROVED_EDUCATION_SLUGS`; runtime locale-pair validation lives in `src/lib/content.ts`.
- Memory: `Astro 5 glob loader basename collision requires explicit generateId` (Slice 2 learning).
