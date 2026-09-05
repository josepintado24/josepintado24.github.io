# Archive Report — `bootstrap-portfolio`

## Summary

The bilingual Astro personal portfolio for José Luis Pintado Vásquez is published at https://josepintado24.github.io/ and ready for archive.

| Field | Value |
|---|---|
| Change | `bootstrap-portfolio` |
| Plan | stacked-to-main, auto-chain, ≤400 lines authored per slice (Slice 1 used a 4500-line size:exception authorized by `josepintado24` due to the 3480-line `pnpm-lock.yaml`) |
| Final state | All 39 tasks complete; verify report passes |
| Live site | `https://josepintado24.github.io/` |
| Last commit | `6fcbfe1` (`test(verify): add live URL smoke test and formalize verify envelope`) |

## What shipped

- **Slice 1** — bilingual Astro shell, accessible Header/Hero/Contact/MotionGuard/PendingAsset, SEO/sitemap/robots/JSON-LD, GitHub Actions Pages workflow.
- **Slice 2** — commerce case studies: Movistar, Crepier, RadioShack (ES + EN).
- **Slice 3** — education case studies: Desly, CEPRE-UNI (ES + EN).
- **Slice 4** — education (UPC, ESAN, CIBERTEC) and credentials (11 entries: ESAN modules, CETI diplomas, PUCP Java, Udemy SOLID, year-grouped 2026/2025 courses).
- **Slice 5** — bilingual CV at `public/cv.pdf` (ES first, EN mirror, 6 pages, 412 KB).

40 pages live. Both locales pair perfectly. Locale-pair validator, approved-slug guard, JSON-LD `CreativeWork` per case-study detail, `PendingAsset` for every unsupplied credential.

## Verified

- `pnpm build` exit `0`, 40 pages.
- 18 sampled live URLs all return HTTP/2 200.
- JSON-LD on case-study detail carries localized `name` / `alternateName` / `inLanguage` / `audience.audienceType`.
- Every credential without a PDF renders `PendingAsset` with an explicit pending reason.
- Sitemap lists every published route at canonical origin.

Verify report: [`verify-report.md`](./verify-report.md).

## Lessons recorded (engram)

- Astro 5 `glob()` content loader deduplicates by basename. Solution: provide explicit `generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.json$/, '')`. Layout: `<collection>/<slug>.<locale>.json`.
- Headless Chrome (`/Applications/Google Chrome.app`) generates clean A4 PDFs from print-ready HTML without downloading Playwright/puppeteer.
- `background-clip: text` with gradient overflows PDF page width in Chrome headless — keep the gradient on section underlines, use solid color for the title.
- GitHub Pages OAuth tokens minted without the `workflow` scope reject pushes that add `.github/workflows/*.yml`. Refresh via `gh auth refresh --scopes "gist,read:org,repo,workflow"`.
- Astro content collections with Zod strip unknown fields by default; extend the schema when adding optional fields.

## Pending follow-ups (out of scope for archive)

- Update `design.md` to record the Astro 5.18 root-index constraint as ground truth (the doc still says "Do not create `src/pages/index.astro`" but the runtime requires the minimal root host).
- If you supply individual credential PDFs, drop them into `public/credentials/<slug>.pdf` and add the path to the corresponding JSON's `pdf` field. The detail page will switch from `PendingAsset` to an active download link automatically.
- If `jlpintado.com` is provisioned, add it to the header social links and contact section.

## Status

**Archived.** This change can be referenced from future changes (or left as a closed milestone).
