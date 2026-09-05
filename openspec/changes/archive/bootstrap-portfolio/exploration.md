# Exploration: bootstrap-portfolio

## TL;DR

All ten previously blocking product decisions are now confirmed. The change
adopts **Astro + GitHub Actions**, **bilingual ES/EN** with `/es/` and `/en/`
routes plus language navigation, **repo-only assets** in `public/` with
explicit "pending" placeholders, **direct contact** via `mailto:` / `tel:` /
LinkedIn, a **static `public/cv.pdf` slot**, **CSS + Web Animations API only**
with `prefers-reduced-motion` honoured, and **chained stacked-to-main delivery**
under a 400-line review budget. Exploration is **complete**; ready for
`sdd-propose`.

## Topic

Bootstrap a personal GitHub Pages portfolio for José Luis Pintado Vásquez that
conveys dual positioning (Full Stack / Front-End E-commerce developer AND IT
educator), supports strong performance, accessibility, SEO, content growth,
bilingual ES/EN content, and tasteful CSS-driven visual animation, while
remaining reviewable under a 400-line budget per chained slice.

## Current State

- Empty git repo on `main` with no commits. No published site exists yet.
- No `package.json`, `_config.yml`, `Gemfile`, or any other project marker.
- Only OpenSpec scaffolding and the `.atl/skill-registry.md` are present.
- `openspec/config.yaml` declares:
  - Static site, no framework lock-in until a project marker appears.
  - Plain HTML/CSS/JS conventions expected.
  - `strict_tdd: false` (no in-scope runner; manual / live-URL checks only).
  - Verify step requires rendering at `https://josepintado24.github.io`.
  - URL surface for any new page must be stated in the proposal.
  - File paths on published pages are breaking if renamed.
  - Cached `delivery_strategy: single-pr` — **superseded** by orchestrator
    update to `auto-chain` based on workload evidence.
- No existing assets, content, or design tokens are committed yet.
- Confirmed product inputs (visual direction, sections, contact fields) are
  given in the orchestrator prompt — they are the source of truth for the
  proposal. No new mockups must be produced.
- Re-evaluation trigger: introducing Astro means a project marker exists;
  the proposal phase MUST update `openspec/config.yaml` (framework note,
  build pipeline, delivery strategy, verify commands).

## Confirmed Product Decisions (resolves prior blockers)

| # | Decision | Resolution | Effect on scope |
|---|----------|------------|-----------------|
| 1 | Custom domain | None. Publish at `https://josepintado24.github.io`. | Default base path; no DNS, no `CNAME`, no cross-host canonical work. |
| 2 | Languages | Bilingual ES + EN with separate routes (`/es/`, `/en/`) and language navigation. | Adds i18n routing, `<html lang>`, `hreflang`, content collections per locale. |
| 3 | Build & deploy | Astro static build, deployed by GitHub Actions. | Adds `.github/workflows/deploy.yml`; removes local-only and `gh-pages` branch paths. |
| 4 | Asset hosting | Repo `public/` only. | All case-study images, credential PDFs, and OG art live in the repo. |
| 5 | Analytics | None initially. | No third-party script, no cookie banner, no privacy surface. |
| 6 | Contact | Direct `mailto:`, `tel:`, and LinkedIn anchors; no form. | No serverless provider, no spam surface, no anti-abuse layer. |
| 7 | Resume | Static `public/cv.pdf` slot. | Placeholder until the user delivers the file; not generated from collections. |
| 8 | Animation | CSS + Web Animations API; `prefers-reduced-motion` honoured; no animation dependency initially. | Hand-rolled motion only; Motion One / GSAP deferred unless a future need appears. |
| 9 | Pending-asset semantics | Missing images/PDFs must always be visibly marked pending and never presented as verified. | `PendingAsset.astro` is the only render path for missing media; `verify-report.md` enumerates every pending placeholder shipped. |
| 10 | Delivery shape | Split into reviewable slices; `delivery_strategy: auto-chain`; `chain_strategy: stacked-to-main`; `review_budget_lines: 400`. | One feature branch per work unit, each merged directly to `main`; no feature-branch chain, no tracker PR. |

## Affected Areas (proposed)

Paths anticipated for the change; none exist yet. Listing them so the
proposal can confirm scope and reviewers can audit URL surface early.

- `package.json`, `astro.config.mjs`, `tsconfig.json` — Astro project
  markers. The proposal MUST trigger the `openspec/config.yaml`
  re-evaluation.
- `.github/workflows/deploy.yml` — build + upload `dist/` to Pages on push
  to `main`.
- `astro.config.mjs` (i18n) — Astro i18n config: default locale, locales
  list, routing strategy.
- `src/content.config.ts`, `src/content/{es,en}/{case-studies,credentials,education,dual-career}.ts`
  — typed content collections per locale.
- `src/layouts/BaseLayout.astro` — `<head>`, OG/Twitter meta, JSON-LD
  `Person` + `WebSite`, lang attribute, theme color, skip-to-content link,
  language switcher slot, reduced-motion handling.
- `src/i18n/{es,en}.json` — UI string catalogues per locale.
- `src/components/` — `SiteHeader`, `SiteFooter`, `LanguageSwitcher`,
  `Hero`, `SectionHeading`, `CaseStudyCard`, `CredentialItem`,
  `ContactChannels`, `InfinityMark` (abstract infinity signature
  connecting commerce / experience / education), `GradientText`
  (oversized gradient typography primitive), `PendingAsset`.
- `src/pages/index.astro` — locale redirect to the default locale home.
- `src/pages/{es,en}/index.astro` — hero, professional profile, dual
  career path, technical capabilities, contact, social links.
- `src/pages/{es,en}/case-studies/[slug].astro` — detail page for the 5
  case studies (Movistar, Crepier, RadioShack, Desly, CEPRE-UNI).
- `public/` — favicon set, OG image, social-icon SVGs, `cv.pdf` slot,
  `placeholders/` for assets the user has not delivered yet.
- `public/placeholders/` — explicit `pending` placeholders for case-study
  hero images and credential PDFs the user will deliver later.
- `.well-known/`, `robots.txt`, `sitemap.xml` (per locale via
  `@astrojs/sitemap`) — verified after build.

## Approaches Compared

### A. Vanilla HTML / CSS / JS (no build, no framework)

- Pros: zero toolchain, fastest possible TTI, full control over a11y and
  SEO, smallest mental model, easiest rollback.
- Cons: 5 case studies × 2 locales invite duplicated drift; bilingual
  routes need hand-rolled language detection; no content-collection story;
  animation growth is manual; pending-asset state is hand-rolled everywhere.
- Effort: Low for the first slice; grows linearly and painfully.

### B. Jekyll (GitHub Pages native)

- Pros: zero local build (Pages runs it), Liquid + markdown content,
  well-known SEO patterns, broad theme ecosystem.
- Cons: dated developer experience, Liquid limits make per-locale content
  and animation awkward, theme lock-in is a recurring trap, weak fit for
  modern gradient typography + reduced-motion aware animations.
- Effort: Low to start; medium to escape theme conventions later.

### C. Hugo

- Pros: very fast builds, archetypes + markdown content, taxonomies.
- Cons: Go templates are verbose for animation-heavy layouts, JS
  integration is hand-rolled, weaker fit for a bilingual educator-developer
  audience.
- Effort: Medium.

### D. Eleventy (11ty)

- Pros: pure static output, flexible templating, zero client JS by
  default, simple data cascade for case studies.
- Cons: smaller ecosystem, per-locale collections need plugin work, image
  optimisation and SEO/sitemap need plugins, no first-class component
  model.
- Effort: Medium.

### E. Astro + GitHub Actions build

- Pros: islands architecture ships zero JS by default and only hydrates
  `InfinityMark` / hero gradient where animation matters; first-class
  content collections are a perfect fit for bilingual case studies,
  credentials, education, and the dual career path; `@astrojs/sitemap`,
  `<SEO>`, and image optimisation are batteries-included; per-locale
  routes (`/es/`, `/en/`) and `<html lang>` are first-class; MDX leaves
  room for interactive case-study demos later without rewrite; static
  deploy to Pages is trivial.
- Cons: requires a Node toolchain locally and a GH Actions workflow to
  build before Pages serves; introduces framework lock-in
  (`config.yaml` needs a re-evaluation note); 3–4 setup files more than
  the vanilla path.
- Effort: Medium. Pays back as soon as content × locales > 1.

### F. Next.js / SvelteKit (static export)

- Pros: rich component ecosystems.
- Cons: Next.js ships too much client JS for a portfolio; SvelteKit static
  is viable but the toolchain gain over Astro is marginal here and the
  community content-collection story is weaker.
- Effort: Medium-High with diminishing return.

## Recommendation

**Astro with a GitHub Actions build**, bilingual ES + EN with routed
language navigation, content collections per locale, CSS + Web Animations
API only with `prefers-reduced-motion` honoured, and chained stacked-to-main
delivery under a 400-line review budget.

Rationale (mapped to confirmed decisions):

1. **Bilingual first-class.** Astro content collections keyed by locale,
   per-locale routes under `/es/` and `/en/`, and a `LanguageSwitcher`
   component fit the ES + EN decision without third-party i18n plugins
   beyond Astro's built-in routing.
2. **Animation control where it matters, none where it does not.**
   Infinity mark and oversized gradient typography use CSS + Web
   Animations API; everything else stays static HTML. `prefers-reduced-
   motion` is honoured in the layout. No animation dependency is added —
   Motion One / GSAP stay out unless a script is justified later.
3. **Repo-only assets with honest pending state.** `public/` holds
   images, PDFs, and the `cv.pdf` slot. Anything not yet delivered is
   rendered through `PendingAsset.astro` with `data-status="pending"`, an
   `aria-label` naming the missing asset, and a `verify-report.md` entry.
4. **Direct contact, no surface.** `mailto:`, `tel:`, and LinkedIn anchors
   live in `ContactChannels.astro`. No form, no serverless provider, no
   anti-abuse work.
5. **SEO + a11y baseline.** `@astrojs/sitemap`, per-page `<SEO>`, JSON-LD
   `Person` + `WebSite` + per-case-study `CreativeWork`, `<html lang>` per
   locale, skip-to-content, `prefers-reduced-motion`, WCAG 2.1 AA contrast
   on deep black with cyan→blue→amber gradient text (tested at 18pt+ or
   with a solid fallback).
6. **GitHub Pages compatibility.** Astro outputs static `dist/`; the GH
   Actions workflow (`build` job → upload Pages artifact) is the standard
   pattern and requires no custom server.
7. **Chained delivery.** `delivery_strategy: auto-chain` triggered by the
   honest workload estimate; `chain_strategy: stacked-to-main` (each
   slice lands directly to `main`); `review_budget_lines: 400`. No
   tracker PR — slices are independent.

The dual-positioning constraint (developer + educator) is realised by the
information architecture, not the stack: a "dual career path" section sits
between case studies and technical capabilities, and case studies are
classified by audience (`commerce | education | both`).

## Delivery Strategy & Chain Plan

Cached SDD controls (updated by the orchestrator based on workload
evidence):

- `delivery_strategy: auto-chain` (replaces prior `single-pr`)
- `chain_strategy: stacked-to-main`
- `review_budget_lines: 400`

Workload forecast: a single PR carrying Astro scaffold + Actions workflow
+ bilingual base layout + design tokens + header/footer/language switcher
+ hero + contact + placeholder slots for case studies, education, and
credentials + sitemap + robots + JSON-LD + verify-report realistically
exceeds 400 changed lines.

Proposed slice sequence (each slice targets `main` directly; parent
branch is `main` for every slice — no feature-branch chain, no tracker
PR):

| # | Slice | Approx. lines | Dependencies |
|---|-------|---------------|--------------|
| 1 | Astro scaffold + Actions workflow + bilingual base layout + design tokens + `SiteHeader` + `SiteFooter` + `LanguageSwitcher` + `InfinityMark` + `GradientText` + `PendingAsset` + hero + contact + placeholder slots + sitemap + robots + JSON-LD + `verify-report.md`. | ~400 | none |
| 2 | Commerce case studies (Movistar, Crepier, RadioShack) with per-case-study JSON-LD `CreativeWork`. | ~250 | 1 |
| 3 | Education case studies (Desly, CEPRE-UNI) with per-case-study JSON-LD `CreativeWork`. | ~180 | 1 |
| 4 | Education + certifications content collection entries (typed collections per locale). | ~200 | 1 |
| 5 | Documented credentials (PDF downloads in `public/` + listing page). | ~150 | 4 |
| 6 | Animation polish (Motion One upgrade) and any future content additions. | TBD | 1–5 |

If a slice exceeds 400 changed lines after one honest slicing pass, follow
the `chained-pr` skill: report the overage and recommend `size:exception`
rather than shrink content, comments, or a11y attributes to fit the
budget.

`openspec/config.yaml` MUST be updated during the proposal phase:

- `context`: note Astro project marker.
- `rules.apply`: add build/publish path (`pnpm build` →
  `.github/workflows/deploy.yml`).
- `delivery_strategy`: `auto-chain` (replaces cached `single-pr`).
- `verify.build_command`: `pnpm build` (or `npm run build`).
- `verify.manual_checks`: extend with `pnpm build` succeeds, sitemap
  output checked, `prefers-reduced-motion` smoke test, both locales
  rendered at `https://josepintado24.github.io/es/` and `/en/`.

## Risks

- **Empty repo lock-in.** First project marker (Astro's `package.json`)
  becomes the de-facto framework choice. Mitigation: the proposal must
  justify it; alternatives stay open for the next change.
- **Build pipeline dependency.** A GH Actions outage blocks deploys.
  Fallback: local build → manual Pages artifact upload.
- **Bilingual drift.** Translation churn mid-PR is real. Mitigation: each
  locale's copy lives in its own content collection; both locales are
  updated in the same slice that introduces new content.
- **Pending-asset masquerade.** Easy to ship accidentally. Mitigation:
  `PendingAsset.astro` is the only render path for missing media;
  `verify-report.md` lists every pending placeholder shipped in the slice.
- **A11y drift with animation.** Infinity mark and gradient typography must
  honour `prefers-reduced-motion`, expose `aria-label`s for SVG-only
  marks, and meet WCAG 2.1 AA contrast on deep-black (cyan→blue→amber
  gradient text must be tested at 18pt+ or with a solid fallback).
- **Dual-positioning conflation.** A reader landing on hero must
  understand within 5 seconds that this person is both a developer and an
  educator. IA risk: if "Dual career path" is buried under technical
  capabilities, it reads as a footnote. Mitigation: dual-path section
  comes before technical capabilities in the home page order.
- **No test runner.** Strict TDD remains off per `config.yaml`;
  verification is live URL + HTML lint + axe-core smoke. If regression
  risk grows, the proposal should revisit Vitest + Playwright smoke in a
  later change.
- **Chained-PR overhead (`stacked-to-main`).** Each slice merges directly
  to `main`, so each slice must keep the live URL rendering and the
  verify-report in a green state. Mitigation: slice #1 establishes the
  green baseline; every later slice runs `pnpm build`, renders both
  locales at `https://josepintado24.github.io`, and updates the verify
  report before merge.

## Ready for Proposal

**Yes.** All ten previously blocking product decisions are confirmed. The
stack (Astro + Actions), the design direction (already approved), the
bilingual shape (`/es/`, `/en/` with language navigation), the asset
policy (repo `public/` + visible pending placeholders), the contact
surface (mailto / tel / LinkedIn), the animation constraint (CSS + WAAPI
+ reduced-motion, no animation dependency), and the delivery shape
(`auto-chain` → `stacked-to-main`, 400-line budget, six-slice sequence
above) are ready to be written into the proposal.

`openspec/config.yaml` MUST be updated in the proposal phase to reflect
the new project marker, build pipeline, delivery strategy, and verify
commands.

Once `sdd-propose` lands, `sdd-spec` can write the delta spec (bilingual
content, a11y WCAG 2.1 AA, SEO, performance budgets, pending-asset
contract), and `sdd-design` can detail the Astro layouts, content
collections per locale, GH Actions workflow, design tokens, and language
switcher.