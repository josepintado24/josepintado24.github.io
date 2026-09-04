# Design: Bootstrap Portfolio

## Technical Approach

Build a static Astro site sharing components across `/es/` and `/en/`. `src/content/{es,en}/` is the source of truth; Zod and locale-pair validation prevent partial publication. Hand-rolled CSS and gated WAAPI enhance static HTML. Actions publishes `dist/` at the canonical root.

## Architecture Decisions

| Decision | Choice and rationale |
|---|---|---|
| Root routing | Use only Astro i18n: `locales: ['es','en']`, `defaultLocale: 'es'`, `routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true }`. Do **not** create `src/pages/index.astro`; Astro alone owns `/` → `/es/`. |
| Locale parity and switching | Every route passes its prefix locale to `BaseLayout`, which emits `<html lang={locale}>`. Parse pathname/query/hash; remove exactly the pathname's leading locale, verify its pair, call `getRelativeLocaleUrl(targetLocale, localeNeutralPath)`, then append the unchanged query/hash. Home maps `/es/` ↔ `/en/`; missing pairs fail the build. Anchors show `ES`/`EN`, carry `hreflang`, and use no flags. |
| Content and career hierarchy | Zod `glob()` collections use `{locale}/{slug}` IDs; validation rejects missing translations, duplicates, and unapproved studies. Immediately after the hero, **Developer** and **Educator** receive equal heading level, layout area, emphasis, and CTA weight. This section precedes technical capabilities at every breakpoint. |
| Accessibility and assets | `BaseLayout` begins with a focus-visible skip link to `<main id="main-content" tabindex="-1">`. `PendingAsset` renders localized `assetName` and `pendingLabel` visibly, names both through `aria-labelledby`, emits `data-status="pending"`, and requests no broken resource. CSS animation and WAAPI run only under `no-preference`. |
| Gradient text | Base CSS supplies contrast-validated solid text/background colors. Only `@supports ((background-clip: text) or (-webkit-background-clip: text))` applies gradient and transparent fill. Every stop against the immediate dark background passes 4.5:1, or 3:1 for qualifying large text. |
| Delivery | Official Pages Actions uses no long-lived deployment secret and requests exactly `contents: read`, `pages: write`, `id-token: write`. Repository Settings → Pages source must be **GitHub Actions**. `site` is the canonical origin; `base` and custom domain are absent. |

## Data Flow

    localized content → Zod + pair/inventory checks → route loaders
      → shared layout/components → HTML + metadata → dist/ → Pages
    current URL → strip locale → verify pair → target-locale URL

## File Changes

| File | Action | Description |
|---|---|---|
| `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`, `tsconfig.json` | Create | Static build, sole redirect, canonical `site`, sitemap; no `base`. |
| `src/content.config.ts`, `src/content/{es,en}/**/*` | Create | Typed paired content and approved inventory. |
| `src/lib/{i18n,content,seo,assets}.ts` | Create | Pairing, URL mapping, metadata, asset contracts. |
| `src/layouts/BaseLayout.astro`, `src/components/*.astro` | Create | Accessible shell, equal careers, contact, visual primitives. |
| `src/pages/{es,en}/index.astro`, `src/pages/{es,en}/case-studies/[slug].astro` | Create | Localized homes/details; intentionally no root page. |
| `src/styles/{tokens,global}.css`, `src/scripts/motion.ts` | Create | Contrast fallbacks, focus, responsive layout, gated motion. |
| `public/`, `.github/workflows/deploy.yml` | Create | Stable assets/robots and least-privilege Pages deployment. |

## Interfaces / Contracts

`Locale = 'es' | 'en'`; `Audience = 'commerce' | 'education' | 'both'`; assets use `available | pending`. Explicit design-phase input confirmed by the user approves only: email `josepintado24@gmail.com`, phone `+51 938 150 845` (`tel:+51938150845`), LinkedIn `https://linkedin.com/in/josepintado24`, and GitHub `https://github.com/josepintado24`. Header social links are GitHub and LinkedIn.

## Testing Strategy

| Layer | Approach |
|---|---|---|
| Build/output | `pnpm build`; prove malformed/unpaired content fails; assert `/` redirects once to `/es/`, deep-page switching preserves the resource, every page has the matching `lang`, and metadata/routes remain paired. |
| Accessibility | HTML/axe and keyboard checks cover skip link, focus, pending names, no-JS, reduced motion, career order, and solid/gradient contrast with clipping unsupported. |
| Delivery/evidence | Inspect permissions and absence of deployment tokens; verify Pages source/live URLs. Each slice enumerates **every shipped entry** and **every pending asset**, plus results. |

## Threat Matrix

| Boundary | Applicability |
|---|---|---|
| Documentation-like paths | N/A — no executable-file classification. |
| Git repository selection | N/A — no repository selector or `git -C`. |
| Commit state | N/A — no commit automation. |
| Push state | N/A — workflow consumes a `main` push and never pushes. |
| PR commands | N/A — no PR command composition. |

Routing is applicable outside these execution rows. Safe behavior is one `/` → `/es/` redirect and paired current-page links; invalid/unpaired routes fail the build or 404 without cross-locale fallback. RED tests cover root ownership, deep links, query/hash retention, and missing pairs.

## Migration / Rollout

No data migration. `delivery_strategy: auto-chain`; `chain_strategy: stacked-to-main`; review budget: **400 authored additions + deletions**. Slices target `main`: (1) bilingual shell, configuration, components/styles/scripts, public baseline, and workflow; rollback removes them and restores the empty baseline. (2) commerce studies, (3) education studies, (4) education/credentials, and (5) downloads each roll back only their enumerated content, routes, assets, and evidence while preserving prior paths. After one honest split, recommend `size:exception` for an indivisible overage.

## Open Questions

None.
