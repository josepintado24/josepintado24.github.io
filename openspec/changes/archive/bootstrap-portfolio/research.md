# Research: bootstrap-portfolio

## TL;DR

Selected research outcome: **done**. All five pre-proposal questions are answered by primary, authoritative sources (Astro docs, W3C/WCAG, MDN, GitHub Docs, web).

Critical consequences carried into `sdd-propose` and `sdd-design`:

| # | Consequence | Source |
|---|---|---|
| C1 | `astro.config.mjs` MUST set `site: 'https://josepintado24.github.io'` and MUST NOT set `base` (the `<owner>.github.io` repo pattern opts out of `base`). | S2 |
| C2 | `.github/workflows/deploy.yml` MUST use `withastro/action@v6` with the two-stage job pattern (`build` + `deploy`) and permissions `contents: read`, `pages: write`, `id-token: write`. Repo MUST publish from **GitHub Actions** (Pages settings). | S2 |
| C3 | `i18n` MUST set `locales: ['es','en']`, `defaultLocale: 'es'`, and `routing: { prefixDefaultLocale: true }` so that BOTH routes `/es/` and `/en/` exist (the default `false` would skip the prefix on the default locale, breaking the confirmed bilingual shape). | S3 |
| C4 | Content collections MUST live under `src/content.config.ts` with the `glob()` loader and Zod schemas; per-locale filtering via `id.startsWith('es/'| 'en/')` or via separate collections per locale. | S4 |
| C5 | Repository MUST be named `josepintado24.github.io`; it is a **user site** with the canonical URL `https://josepintado24.github.io`. Custom domain is out of scope (consistent with confirmed decision). | S5 |
| C6 | `prefers-reduced-motion: reduce` MUST guard every CSS keyframe rule AND every Web Animations API instance (the WAAPI is honoured when wrapped in a `@media (prefers-reduced-motion: no-preference)` block that owns the JS, or when each animation is mirrored in CSS that is itself gated by the media query). SC 2.3.3 (AAA) makes the C39 technique sufficient. | S6, S7 |
| C7 | Gradient text (`background-clip: text`) MUST satisfy 4.5:1 contrast for normal text or 3:1 for ≥18pt (or ≥14pt bold) per WCAG 1.4.3 — measured against the *background immediately behind each letter* (G18). Add a fallback `background-color` and gate with `@supports background-clip: text`. | S8, S9, S10 |
| C8 | `<html lang="es">` / `<html lang="en">` MUST be set per page (NOT `meta http-equiv="Content-Language"`); language switcher anchors SHOULD carry `hreflang` (`es`, `en`); do not use flag icons. | S11, S12 |

Contradictions, uncertainty, and freshness: **none blocking**. One open note (Web Animations API and `prefers-reduced-motion`) is documented under C6 — both implementations exist and either is valid; the proposal will choose one and document the rationale.

---

## Evidence sources

All retrieved 2026-09-04 from primary publishers. Source IDs are reused in the claim-mapping tables.

| ID | Class | Title | Publisher | URL | Retrieved | Last updated (publisher) |
|---|---|---|---|---|---|---|
| S1 | documentation | Astro — Deployment overview | Astro | https://docs.astro.build/en/guides/deploy/ | 2026-09-04 | live docs |
| S2 | documentation | Astro — Deploy your Astro Site to GitHub Pages | Astro | https://docs.astro.build/en/guides/deploy/github/ | 2026-09-04 | live docs |
| S3 | documentation | Astro — Internationalization (i18n) Routing | Astro | https://docs.astro.build/en/guides/internationalization/ | 2026-09-04 | live docs |
| S4 | documentation | Astro — Content collections | Astro | https://docs.astro.build/en/guides/content-collections/ | 2026-09-04 | live docs |
| S5 | documentation | GitHub Docs — What is GitHub Pages? | GitHub | https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages | 2026-09-04 | live docs |
| S6 | documentation | WCAG Technique C39 — Using the CSS `prefers-reduced-motion` query to prevent motion | W3C / WAI | https://www.w3.org/WAI/WCAG21/Techniques/css/C39 | 2026-09-04 | 2026-01-12 |
| S7 | documentation | WCAG SC 2.3.3 — Animation from Interactions (Understanding) | W3C / WAI | https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions | 2026-09-04 | 2025-09-16 |
| S8 | documentation | WCAG SC 1.4.3 — Contrast (Minimum) (Understanding) | W3C / WAI | https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum | 2026-09-04 | 2026-06-01 |
| S9 | documentation | WCAG Technique G18 — Ensuring a contrast ratio of at least 4.5:1 | W3C / WAI | https://www.w3.org/WAI/WCAG22/Techniques/general/G18 | 2026-09-04 | 2026-08-10 |
| S10 | documentation | MDN — `background-clip` (Accessibility section) | MDN / Mozilla | https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip | 2026-09-04 | 2026-04-20 |
| S11 | documentation | MDN — `prefers-reduced-motion` CSS media feature | MDN / Mozilla | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion | 2026-09-04 | 2026-06-10 |
| S12 | open-web | W3C Internationalization — Authoring web pages | W3C i18n | https://www.w3.org/International/techniques/authoring-html/en/ | 2026-09-04 | live |

Capability grants used: **documentation** (Astro + W3C + WCAG + MDN + GitHub) and **open-web** (W3C i18n). No Bash, no generic MCP, no persistence-derived sources, no filenames. Resolution: dedicated web/document tools only.

---

## Question 1 — Current Astro static output and official GitHub Pages deployment workflow

### Validated claims

| Claim | Evidence |
|---|---|
| Astro's official deployment path to GitHub Pages is the `withastro/action` GitHub Action (current major `v6`); the recommended workflow installs dependencies, builds the site, uploads it as a Pages artifact, and a separate `deploy` job calls `actions/deploy-pages@v5`. | S2 (literal workflow snippet in "How to deploy" section) |
| The workflow requires these permissions: `contents: read`, `pages: write`, `id-token: write` (provided by the `permissions:` block at the top of the job). | S2 |
| The `withastro/action` autodetects the package manager by scanning the lockfile; the lockfile (`package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` / `bun.lockb`) MUST be committed for the action to pick the right manager. | S2 ("Caution" callout) |
| For repo names matching the `<username>.github.io` pattern, Astro `base` config MUST be unset. The docs show an explicit example: `https://github.com/username/username.github.io/` skips `base`. | S2 (step 3 in "How to deploy") |
| `astro.config.mjs` MUST set `site` to the URL GitHub Pages will serve. For this project: `site: 'https://josepintado24.github.io'`. | S2 |
| Publish source must be set to **GitHub Actions** in repository Settings → Pages; otherwise the workflow's upload does not deploy. | S2 (step 5) |
| Astro's default output mode is `static`; the framework is "all-in-one" for content-focused sites. Static `dist/` output is sufficient for GitHub Pages. | S1 / S4 (Content Collections page confirms static output is the default for build-time collections) |

### Consequence for proposal / design

Proposal MUST specify:

- `.github/workflows/deploy.yml` matching S2's template (build + deploy jobs, permissions block, `withastro/action@v6`, `actions/deploy-pages@v5`).
- `astro.config.mjs` with `site: 'https://josepintado24.github.io'` and **no `base`**.
- Verify step appends: **Pages → Source = GitHub Actions** must be set in repo settings before the workflow runs.

---

## Question 2 — Current Astro i18n routing for `/es/` and `/en/`, including default-locale behaviour

### Validated claims

| Claim | Evidence |
|---|---|
| Astro `i18n` config takes `locales`, `defaultLocale`, and a `routing` object. The middleware implements the routes. | S3 ("Configure i18n routing") |
| `routing.prefixDefaultLocale: false` (default) means the default locale's URLs have **no** prefix; the other locales always get a prefix. | S3 (sub-section "prefixDefaultLocale: false") |
| `routing.prefixDefaultLocale: true` means EVERY locale (including defaultLocale) gets a `/(locale)/` prefix — matching the exploration's chosen `/es/` and `/en/` shape. | S3 (sub-section "prefixDefaultLocale: true") |
| When `prefixDefaultLocale: true`, URLs without a locale prefix return 404 unless a fallback strategy is configured. | S3 |
| Even with `prefixDefaultLocale: true`, the bare home URL `/` does NOT redirect by default; opting into `redirectToDefaultLocale: true` redirects `/` to `/<defaultLocale>/`. | S3 ("Opting out of redirects for the home URL") |
| Astro provides helper functions from `astro:i18n` — notably `getRelativeLocaleUrl(locale, path)` — to compute correctly prefixed URLs in templates and components. | S3 ("Create links") |
| Astro middleware is positioned FIRST in the chain; this affects any custom middleware ordering for locale-aware routing. | S3 ("Routing Logic") |

### Consequence for proposal / design

Proposal MUST specify:

- `i18n.defaultLocale: 'es'` (Spanish is the default — the audience of the confirmed decisions), `locales: ['es', 'en']`.
- `routing.prefixDefaultLocale: true` so that BOTH `/es/` and `/en/` exist with explicit prefixes (matches exploration decision #2).
- `redirectToDefaultLocale: true` only if the home `/` should auto-redirect to `/es/`; otherwise `src/pages/index.astro` MUST contain an explicit redirect to the default locale home.
- `LanguageSwitcher` MUST use `getRelativeLocaleUrl('en', currentPath)` and `getRelativeLocaleUrl('es', currentPath)` (not hard-coded strings) so renaming pages does not break the switcher.

---

## Question 3 — Current Astro content collection APIs suitable for localized case studies/credentials

### Validated claims

| Claim | Evidence |
|---|---|
| Astro content collections are declared in a special `src/content.config.ts` file using `defineCollection()`; each collection exports a single `collections` object. | S4 ("Defining build-time content collections") |
| Two built-in loaders exist: `glob()` for directories of Markdown / MDX / Markdoc / JSON / YAML / TOML, and `file()` for a single JSON / YAML / TOML file containing many entries. | S4 |
| The `glob()` loader takes a `base` path and a `pattern`; a unique `id` for each entry is auto-generated from the file name and can be overridden via frontmatter `slug`. | S4 |
| Optional `schema` is defined with Zod (`import { z } from 'astro/zod'`) and gives every entry type-safety + autocompletion in the editor. | S4 |
| Helper functions `getCollection(collName, filter?)` and `getEntry(collName, id)` are the canonical read APIs. | S4 |
| `getCollection()` accepts a filter callback over `id` and `data` properties; filtering by `id.startsWith('es/')` returns entries in a sub-directory — that is the mechanism for "one collection, two locale folders". | S4 ("Filtering collection queries", example) |
| Build-time collections are cached, prerendered, and ideal for "performance-critical / relatively static data" — exactly the case-studies/credentials/education profile. | S4 ("Types of collections") |
| The `render()` function exposes `<Content />` so Markdown/MDX bodies render as HTML with heading IDs after a build-time query. | S4 ("Rendering body content") |

### Consequence for proposal / design

Proposal MUST specify:

- `src/content.config.ts` defines `caseStudies`, `credentials`, `education` collections (each a build-time collection with the `glob()` loader).
- Per-locale shape via nested folders: `src/content/{es,en}/case-studies/*.md` so entries have ids prefixed by their locale folder. The slice template (e.g. `src/pages/{es,en}/case-studies/[slug].astro`) loads the matching `caseStudies` collection filtered by `id.startsWith('<locale>/')`.
- Each collection entry MUST carry a Zod schema with at least `title`, `summary`, `audience` (`commerce | education | both`), `updated`, plus a body. `verify-report.md` enumerates every entry the slice ships.
- Any references (e.g. an `industry` field linking to a separate `industries` collection) use `reference()` and resolve via `getEntry()` at render time.

---

## Question 4 — GitHub Pages user-site constraints relevant to `josepintado24.github.io`

### Validated claims

| Claim | Evidence |
|---|---|
| Two GitHub Pages site types exist: **user/organization sites** (one per account) and **project sites** (one per repo). | S5 ("Types of GitHub Pages sites") |
| User/organization sites MUST be served from a repository named `<owner>.github.io`. | S5 |
| The default served URL is `http(s)://<owner>.github.io` (NO `/<repo>/` path segment). | S5 ("Default site location") |
| Maximum of ONE Pages site per account for user/organization sites. | S5 ("Limits") |
| Data collection: GitHub logs every visitor IP for security; this runs on GitHub's infrastructure regardless of the site's own analytics posture. | S5 ("Data collection") |
| Source can be a branch OR GitHub Actions; the Astro action path requires GitHub Actions. | S2 (step 5) |

### Consequence for proposal / design

Proposal MUST specify:

- Repo name `josepintado24.github.io` is invariant — it is a **user site**, served at `josepintado24.github.io` with NO `base` path. Custom domain (`CNAME`) is OUT of scope (consistent with exploration decision #1).
- Workflow deployment does not bypass GitHub's first-party logging in the Pages infrastructure. The confirmed "no analytics" decision applies to the *site's* JavaScript; Pages metadata (request count, IP log) is GitHub-side and unaffected.
- Because this is a user site, no second `*.github.io` site can exist on the same account — the proposal needs no multi-site branching.

---

## Question 5 — Accessibility guidance

### 5a. `prefers-reduced-motion`

| Claim | Evidence |
|---|---|
| WCAG Success Criterion 2.3.3 (AAA) — "Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed." | S7 ("Success Criterion") |
| Sufficient techniques for 2.3.3: **C39** (CSS `@media (prefers-reduced-motion)` to prevent motion), **SCR40** (`prefers-reduced-motion` in JavaScript), and "Gx" controls (site-wide toggle). | S7 ("Techniques → Sufficient") |
| C39 is a sufficient technique for 2.3.3 and a sufficient technique for SC 2.2.2 (auto-initiated, by extension). C39 explicitly demonstrates the inverse approach: keep static styles as the default, then add a `@media (prefers-reduced-motion: no-preference)` block that opts into motion. | S6 (Examples 1 and 2) |
| `prefers-reduced-motion` is widely available in browsers since January 2020; both `reduce` and `no-preference` keywords are valid. | S11 ("Baseline" header) |
| Adverse effects of non-honoured motion include vestibular reactions (dizziness, nausea, migraine, bed rest). | S7 ("Note") |

### 5b. Gradient text contrast / fallback

| Claim | Evidence |
|---|---|
| WCAG SC 1.4.3 — text and images of text contrast ratio ≥ 4.5:1 (≥ 3:1 for "large text" — at least 18pt or 14pt bold, ≈ 24px or ≈ 18.5px). | S8 ("Success Criterion") |
| For gradient / patterned backgrounds where relative luminance varies, **contrast must be measured against the background immediately behind each letter** — the entire background does not have to match. Authors may darken the area, add a halo, or adapt the letter luminance to local contrast. | S9 (Description and Examples) |
| `background-clip: text` has explicit accessibility guidance from MDN: check contrast between the color "of the text placed over" the background, add a fallback `background-color`, and gate with `@supports background-clip: text` so the experience degrades gracefully on older engines. | S10 ("Accessibility" section) |
| If only foreground color is set without a corresponding background color (or vice versa), this is a failure of 1.4.3 (F24). | S8 (Failures list) |

### 5c. Language switching (hreflang, `<html lang>`, switcher UX)

| Claim | Evidence |
|---|---|
| The default language of a page MUST be declared on the `<html lang="…">` attribute (NOT `meta http-equiv="Content-Language"`). | S12 (section "Declaring the overall language of a page") |
| Each `<html lang="…">` value SHOULD be a BCP 47 subtag (e.g. `es`, `en`); the IANA Language Subtag Registry is the source of truth. | S12 (section "Choosing language tags") |
| For `<a>` elements pointing to a translated version of the same resource, `hreflang="<locale>"` is allowed. The W3C note cautions against flag icons (regional / political connotations) and recommends text labels. | S12 (sections "Indicating the language of a link destination" and "About languages and flags") |
| W3C authoring techniques for navigation/multilingual sites recommend explicit visible language identifiers in the switcher (text labels, region-blind), not flags. | S12 |

### Consequence for proposal / design

Proposal MUST specify:

- **Motion** — `BaseLayout.astro` (and every motion-bearing component) wraps animations in either:
  - option A (preferred for CSS keyframes): ship a CSS rule gated by `@media (prefers-reduced-motion: no-preference) { /* keyframes */ }`, OR
  - option B (for WAAPI islands): the JS module checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skips `Element.animate(...)` accordingly (mirrors SCR40 / C39 logic).
  Either choice is acceptable per WCAG 2.3.3.
- **Gradient text** — `GradientText.astro` MUST (a) declare a solid `background-color` fallback, (b) gate `background-clip: text` with `@supports`, (c) ensure 4.5:1 contrast for normal text against the *fallback* color OR 3:1 against the fallback when sized at ≥ 18pt (≥ 14pt bold), (d) only apply gradient to oversize typography where the 3:1 large-text rule can be honoured. WebAIM Contrast Checker is the validation tool.
- **Language switcher** — `<html lang="es">` on every ES route, `<html lang="en">` on every EN route, set from a per-locale layout. `LanguageSwitcher` anchors carry `hreflang` and visible text labels (`ES`, `EN`); no flag icons.

---

## Contradictions, uncertainty, freshness

| Item | Status |
|---|---|
| Are CSS animations enough to satisfy 2.3.3, or is WAAPI also inside scope? | Both are inside scope; C39 covers CSS, SCR40 covers JS. The exploration commits to "CSS + WAAPI only". The proposal/design MUST combine the two with a clear pattern (recommend the matching-media-query approach in JS for WAAPI islands). |
| Does `prefixDefaultLocale: true` make `/` a 404? | Only without a fallback strategy; with explicit `src/pages/index.astro` redirect to `/es/`, no 404 occurs. The proposal must include `src/pages/index.astro` as a thin locale router. |
| Does `background-clip: text` count as "essential" to the design? | The exploration calls it "oversized gradient typography primitive"; WCAG 1.4.3 still applies — gradient text is text, so the contrast and fallback rules apply. |
| Freshness | All sources retrieved 2026-09-04; publisher-side last-modified dates are within the past 12 months for the WCAG / MDN family. Astro docs are live. |
| Open questions for future phases | None blocking. Two adjacent concerns the proposal SHOULD mention but does not require research on: (a) Tailwind vs hand-rolled CSS (out of scope for this research lane; the exploration does not opt in), (b) `<select>`-based language switcher vs link list (UX detail — proposal decision). |

---

## Next-step summary for proposal / design

Proposal CAN now:

1. Specify `.github/workflows/deploy.yml` matching S2 verbatim.
2. Specify `astro.config.mjs` with `site`, `i18n` (locales, defaultLocale, prefixDefaultLocale `true`), and `output: 'static'`.
3. Specify `src/content.config.ts` with three build-time collections (`caseStudies`, `credentials`, `education`) using `glob()` + Zod.
4. Specify the bilingual route shape `src/pages/{es,en}/...` with explicit `lang` per layout.
5. Commit to reduced-motion gate (C39 + SCR40), gradient-text fallback + contrast guard (1.4.3, G18, `@supports`), and hreflang + non-flag language switcher (W3C i18n authoring pages).

Design CAN now:

1. Detail `BaseLayout.astro` with the `<html lang>` slot, the `prefers-reduced-motion` media-query wrapper, and the `LanguageSwitcher` slot.
2. Detail `GradientText.astro` with the `@supports` gate and the fallback `background-color`.
3. Detail `PendingAsset.astro` so missing media always renders visibly-marked `data-status="pending"` with an `aria-label` naming the missing asset (honest pending-asset semantics).
4. Detail `InfinityMark.astro` for the abstract infinity signature that connects commerce / experience / education tracks.

This research artifact is referenced by the pre-proposal state file `state.yaml` for this change.
