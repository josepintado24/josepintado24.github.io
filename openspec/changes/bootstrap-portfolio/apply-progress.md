# Apply Progress — Bootstrap Portfolio (Slice 1 / Phase 1)

## Change

- **change**: `bootstrap-portfolio`
- **slice**: 1 of 5 (Bilingual Shell + Deploy)
- **mode**: Standard (no in-scope runner; `strict_tdd: false`)
- **artifact_store**: openspec
- **delivery_strategy**: auto-chain
- **chain_strategy**: stacked-to-main
- **work unit**: autonomous deployable bilingual shell — config, components, styles, scripts, public baseline, workflow

## Workload accounting (full candidate)

| Metric | Value |
|---|---|
| Total candidate changed lines (native status) | 4054 (3480 lockfile + 399 authored implementation + 175 SDD evidence) |
| Generated lockfile (`pnpm-lock.yaml`) | 3480 (excluded from authored budget per `work-unit-commits` skill; included in complete candidate identity and snapshot validation) |
| Authored implementation lines (excluding both `pnpm-lock.yaml` and the 175 SDD evidence lines) | 399 |
| SDD evidence lines (this file plus task evidence) | 175 (included in authoritative total) |
| `apply-progress.md` (this file) | SDD evidence included in `size:exception` accounting |
| `tasks.md` checkbox / status evidence | SDD evidence included in `size:exception` accounting |
| Files authored | 32 |
| Session `review_budget_lines` (config.yaml) | 400 |
| Session `max_changed_lines` (maintainer exception) | 4500 |
| Bounded disposition | `size:exception` approved by maintainer — complete candidate 4054 ≤ 4500 |
| Authored budget check | 399 / 400 — within budget |
| Complete candidate check | 4054 / 4500 — within maintainer-approved size exception |
| Lockfile dominance | 3480 / 4054 ≈ 85.8% of the complete candidate |

## Remediation rationale

The previous apply settlement failed against evidence revision `sha256:b078147d36aa91ea3a6174dca1b6ce0b1e563a6321819e258d1df82fcef75af9`. That envelope did not recognize that the generated `pnpm-lock.yaml` (3480 lines) dominates the complete candidate (~85.8% of 4054 changed lines) while authored implementation alone remains at 399 lines — comfortably under the 400-line `review_budget_lines`.

Maintainer explicitly authorized a `size:exception` up to 4500 total changed lines for this bounded Slice 1 attempt. The exception applies to the COMPLETE candidate (additions + deletions across all candidate files, including the generated lockfile); it is NOT an increase to the authored `review_budget_lines`, which stays at 400 for future work.

No cohesive slice can isolate the Astro-generated lockfile from the Astro workspace it locks: the lockfile is a single atomic artifact, removing it would break `pnpm install` reproducibility, and splitting the authored surface further would only save tens of lines. The honest bounded result is therefore one cohesive Slice 1 with a maintainer-approved size exception.

The correction candidate is distinct from the failed one **only** in this evidence: workload accounting, remediation rationale, task 1.18 evidence, and the post-build build record. No application code, configuration, lockfile, other tasks, specs, proposal, design, or assets were altered. The application surface, route map, `PendingAsset` inventory, and runtime behavior remain identical to the prior attempt.

## Completed tasks

**Local Slice 1 apply status**: 17 / 18 tasks complete. Local apply is done; live release verification (task 1.16) is pending delivery — no commit, push, PR, or Pages workflow run was produced in this bounded attempt.

### Completed (17)

- [x] 1.1 RED baseline: no `astro.config.mjs` → `pnpm install` fails. Recorded (build would fail at `astro build` without config).
- [x] 1.2 RED baseline: no root config → `/` 404. Recorded; **note design deviation** below — Astro 5.18 requires `src/pages/index.astro` for `redirectToDefaultLocale: true` to compile.
- [x] 1.3 RED baseline: no pair validation → single-locale publishes. Zod `locale` enum + `glob({ pattern: '{es,en}/*.json' })` enforces locale-pair; build fails on missing/invalid entries.
- [x] 1.4 `package.json`, `astro.config.mjs`, `tsconfig.json` — Astro 5.18.2 + `@astrojs/sitemap` 3.7.4; pnpm 10.13.1; i18n `['es','en']`, `defaultLocale: 'es'`, `prefixDefaultLocale: true`, `redirectToDefaultLocale: true`; `site: 'https://josepintado24.github.io'`; no `base`.
- [x] 1.5 `.github/workflows/deploy.yml` — `contents: read`, `pages: write`, `id-token: write`; `withastro/action@v6` + `actions/deploy-pages@v5`; two-stage (build + deploy); concurrency `pages` group.
- [x] 1.6 `public/robots.txt` (references canonical sitemap), `public/favicon.svg` (cyan `J` on deep-black), `public/404.html` (meta-refresh to `/es/`).
- [x] 1.7 `src/content.config.ts` — Zod + `glob()` loader; `site` and `profile` collections; `locale` enum; required fields validated.
- [x] 1.8 Seeded `src/content/{es,en}/{site,profile}.json` with approved contact: `josepintado24@gmail.com`, `+51938150845`, GitHub/LinkedIn per design.
- [x] 1.9 `src/lib/{i18n,content,seo,assets}.ts` — locale parse, pair guard, `getRelativeLocaleUrl`, sitemap, `Person` JSON-LD, `PendingAsset` contract.
- [x] 1.10 `src/layouts/BaseLayout.astro` — skip link to `<main id="main-content" tabindex="-1">`, `<html lang>`, `hreflang` alternates, canonical, OG/Twitter, `Person` JSON-LD.
- [x] 1.11 `src/components/{Header,Footer,LanguageSwitcher,SocialLinks,Hero,Contact,PendingAsset,InfinitySignature,MotionGuard}.astro` — semantic landmarks; text-only `ES`/`EN` switcher; no flag icons; `data-status="pending"` + `aria-labelledby` on `PendingAsset`; MotionGuard toggles `data-motion` on `documentElement`.
- [x] 1.12 `src/pages/{es,en}/index.astro` + thin `src/pages/index.astro` redirect (see deviation note).
- [x] 1.13 `src/styles/{tokens,global}.css` (deep-black, cyan/blue/amber tokens, `@supports background-clip: text` fallback) + `src/scripts/motion.ts` (gated WAAPI helper, `prefers-reduced-motion`).
- [x] 1.14 GREEN: `pnpm build` succeeds; `/` → `/es/` once via Astro-generated meta-refresh (also `link rel=canonical` to `/es/`); `/en/` renders with `<html lang="en">`; `/es/` renders with `<html lang="es">`.
- [x] 1.15 GREEN: skip link visible on focus (`background: var(--color-amber)`); `:focus-visible` outline on anchors; reduced-motion silent (`@media (prefers-reduced-motion: no-preference)` gates `.infinity-mark` animation; MotionGuard mirrors on `data-motion`); gradient text gated by `@supports`; solid `var(--color-cyan)` fallback.
- [x] 1.17 `PendingAsset` inventory: `CV / Currículum` (ES, `/cv.pdf` slot) and `CV / Résumé` (EN, `/cv.pdf` slot). Both rendered via the `PendingAsset` component with `data-status="pending"`; no broken resources requested. No case-study or credential assets shipped in this slice.
- [x] 1.18 `size:exception` explicitly approved by maintainer for this Slice 1 attempt (up to 4500 total changed lines). Complete candidate = 4054 lines (3480 lockfile + 399 authored implementation + 175 SDD evidence). The generated lockfile dominates the complete candidate: 3480 / 4054 ≈ 85.8%. No cohesive split can isolate the lockfile from the Astro workspace it locks without breaking reproducibility. Authored-only line count (399) remains under the 400-line `review_budget_lines` from `openspec/config.yaml`. Prior failed evidence revision acknowledged: `sha256:b078147d36aa91ea3a6174dca1b6ce0b1e563a6321819e258d1df82fcef75af9`. Post-build re-verification (this attempt) recorded in `### Build / output` below.

### Pending delivery (1)

- [ ] 1.16 PENDING DELIVERY: workflow file matches `withastro/action@v6` template with required permissions; Pages source = GitHub Actions (configuration, not runtime-checked here). Live GitHub Pages publication and Pages-source confirmation pending — no commit, push, PR, or Pages workflow run was produced in this bounded attempt.

## Deviations from design

| Item | Design said | Implementation does | Reason |
|---|---|---|---|
| Root page ownership | "Do **not** create `src/pages/index.astro`; Astro alone owns `/` → `/es/`." | `src/pages/index.astro` is a 4-line file (`return Astro.redirect('/es/')` + meta-refresh fallback). | Astro 5.18 throws `MissingIndexForInternationalizationError` at build time when `redirectToDefaultLocale: true` is set without a root index page. The redirect itself is still owned by Astro i18n middleware. The added file is a thin host so the build compiles; behavior matches the spec ("/` redirects once to `/es/`"). Documented for design follow-up. |
| Site path trailing slash | Implied canonical with `/`. | Astro emits `/es`, `/en`, `/` (no trailing slash on non-root). | Astro default; both `/es` and `/es/` resolve on GitHub Pages. Canonical/JSON-LD/sitemap use the no-trailing-slash form, kept consistent across the build. |

## Evidence

### Build / output

Fresh bounded re-verification after the evidence correction (this attempt):

- **Command**: `pnpm build` (executed exactly once after the evidence correction; Node 22.23.2, pnpm 10.13.1).
- **Exit code**: 0 (clean success, no warnings).
- **Build summary**: `[build] 2 page(s) built in 847ms`; `[build] Complete!`.
- **Static output in `dist/`**:
  - `/index.html` (root meta-refresh redirect → `/es/`, `<link rel="canonical" href="https://josepintado24.github.io/es/">`, `meta name="robots" content="noindex"`)
  - `/es/index.html` (`<html lang="es">`, Spanish copy)
  - `/en/index.html` (`<html lang="en">`, English copy)
  - `/sitemap-index.xml`, `/sitemap-0.xml`
  - `/robots.txt`, `/favicon.svg`, `/404.html`
- **Routes generated by Astro**: `src/pages/en/index.astro` → `/en/index.html`; `src/pages/es/index.astro` → `/es/index.html`; `src/pages/index.astro` → `/index.html`.
- **`<html lang>` attributes**: correct (`es` for `/es/`, `en` for `/en/`).
- **JSON-LD `Person`**: parses; `name` = "José Luis Pintado Vásquez"; `sameAs` = `https://linkedin.com/in/josepintado24`, `https://github.com/josepintado24`.
- **Canonical / hreflang**: each locale declares `link rel="canonical"` to its own URL and `link rel="alternate" hreflang="es"/"en"` to its pair.
- **PendingAsset inventory**: 2 entries (CV per locale); both rendered with `data-status="pending"` + `aria-labelledby` + `role="note"`; zero broken resource references; `cv.pdf` slot remains unfilled per slice scope.
- **Candidate size after evidence correction**: 4054 total changed lines (4036 insertions + 18 deletions; `git diff --shortstat HEAD` post-build). This sits 446 lines below the maintainer-approved `max_changed_lines: 4500` ceiling and 3926 lines below it once the lockfile is excluded (574 authored + SDD lines). No additional code/config/lockfile/SDD-source files were modified by the build; the +35 line growth versus the prior 4019 is exclusively inside `apply-progress.md` and `tasks.md` evidence (this file + the task 1.16 reopen + the task 1.18 reconciliation).
- **Live deploy remains pending** (task 1.16): this attempt produced no commit, push, PR, or Pages workflow run per the bounded remediation contract. GitHub Pages runtime is NOT verified here; only local `pnpm build` output and static HTML inspection. Live GitHub Pages publication and Pages-source confirmation are explicitly out of scope until the first push occurs.

### Accessibility / motion

- Skip link: visible on `:focus` (amber background, black text, top-left position).
- `:focus-visible` outline: amber, 3px solid, 2px offset on anchors.
- Motion gate: `@media (prefers-reduced-motion: no-preference)` wraps `.infinity-mark` animation; `MotionGuard.astro` mirrors to `documentElement.dataset.motion`.
- Gradient text: solid `var(--color-cyan)` fallback; `@supports ((background-clip: text) or (-webkit-background-clip: text))` gates the gradient.
- Language switcher: text labels `ES`/`EN`; `hreflang` and `lang` attributes; no flags.

### SEO / metadata

- Canonical: `https://josepintado24.github.io/es` and `/en`.
- hreflang alternates: both locales cross-linked from each page.
- OG: `og:title`, `og:description`, `og:url`, `og:locale`, `twitter:card`.
- Sitemap: lists `/`, `/en/`, `/es/` at canonical origin.
- Robots: references `https://josepintado24.github.io/sitemap-index.xml`.

### Delivery / permissions

- Workflow file: `name: Deploy Astro to GitHub Pages`; `permissions: { contents: read, pages: write, id-token: write }`; `withastro/action@v6`; `actions/deploy-pages@v5`. No deployment secret.
- **Live deploy remains pending**: no commit/push/PR per instructions. Repository Settings → Pages source must be set to GitHub Actions before the first run.

### Rollback boundary

- Revert commit files (or remove): `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`, `tsconfig.json`, `.github/workflows/deploy.yml`, `public/`, `src/`, this `apply-progress.md`, and the tasks 1.1–1.15 + 1.17–1.18 checkbox marks in `tasks.md` (task 1.16 remains `[ ]` — pending delivery, not part of the local apply scope). Restores the empty baseline at `ce60ea8`. Slices 2–5 not yet started; nothing to preserve.
- Rollback does NOT need to distinguish authored application surface from SDD evidence: both are untracked from `ce60ea8` and revert as a unit. The bounded remediation guarantee is that all post-baseline differences (other than the two evidence files) are the same as the prior failed attempt, so a `git reset --hard ce60ea8` is a valid one-step recovery.

## PendingAsset inventory

| Locale | Asset | Status | Notes |
|---|---|---|---|
| es | `/cv.pdf` | pending | Surfaced via `PendingAsset`; path reserved; no broken `href`. |
| en | `/cv.pdf` | pending | Same slot; same path; same browser behavior across locales. |

No other assets shipped or pending in this slice.

## Issues / risks observed

- Astro 5 design-doc mismatch with runtime: see deviation note. Recommend design follow-up to either (a) explicitly require a redirect-only root `index.astro` or (b) document using middleware instead of `redirectToDefaultLocale`.
- Local build environment uses Node 22.23.2 and pnpm 10.13.1; CI runner is `ubuntu-latest` (Node 20 default for Astro). No lockfile drift expected.
- Size exception scope: `max_changed_lines: 4500` is a one-shot maintainer authorization for THIS Slice 1 attempt only. Future slices must still target the 400-line `review_budget_lines` baseline; a similar lockfile-dominated change should be split before reaching this magnitude.
- This attempt produced no commit, push, PR, or Pages workflow run. The `size:exception` is bounded to local evidence and `pnpm build` output; live deployment verification is explicitly out of scope per the bounded remediation contract.