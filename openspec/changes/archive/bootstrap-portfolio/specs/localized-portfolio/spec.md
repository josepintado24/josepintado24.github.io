# Localized Portfolio Specification

## Purpose

Bilingual portfolio surface: routing, parity, contact, legibility, honest assets, accessibility, SEO, performance.

## Requirements

### Requirement: Bilingual Route Surface

Every page MUST be served under an explicit locale prefix (`/es/`, `/en/`), and `/` MUST resolve to the default locale home.

#### Scenario: Locale entry points

- GIVEN `/` and `/en/` are requested
- WHEN the site responds
- THEN `/` reaches `/es/` without a 404
- AND `/en/` serves the English home page with its prefix

### Requirement: Locale Parity

Both locales MUST expose the same routes and sections; nothing MUST publish in one locale only.

#### Scenario: Route inventory matches

- GIVEN the built output
- WHEN routes are listed per locale
- THEN each `/es/` route has an `/en/` counterpart and vice versa

#### Scenario: Untranslated entry

- GIVEN an entry lacks a translation
- WHEN the site builds
- THEN it is withheld from both locales or the build fails

### Requirement: Language Declaration and Switching

Each page MUST declare its BCP 47 language, expose `hreflang` alternates, and offer a text-labelled switcher that preserves the current page. Flags MUST NOT be used.

#### Scenario: Switching from a deep page

- GIVEN a visitor on an `/es/` case study
- WHEN they activate `EN`
- THEN the same case study renders under `/en/`
- AND the root language tag matches the new locale

### Requirement: Approved Contact and Social Channels

The header MUST expose social links, and the site MUST offer direct email, phone, and LinkedIn actions using only owner-approved details. No contact form or backend is permitted.

#### Scenario: Approved channels only

- GIVEN a visitor on either locale
- WHEN a contact channel is activated
- THEN its approved email, phone, or LinkedIn destination opens directly
- AND no unapproved contact value appears anywhere in the output

### Requirement: Static CV Availability

The CV MUST publish at the stable path `/cv.pdf`; while unsupplied, its entry point MUST read as pending, never as a working download.

#### Scenario: CV not yet supplied

- GIVEN `/cv.pdf` is absent
- WHEN the page renders
- THEN the CV shows as pending and the path stays reserved

### Requirement: Pending-Asset Honesty

Unsupplied assets MUST render through one visible pending state that is announced to assistive technology, names the asset, and is listed in verification evidence. They MUST NOT look final or broken.

#### Scenario: Missing media

- GIVEN an image is not supplied
- WHEN the page renders
- THEN a visible labelled placeholder replaces it, not a broken image

#### Scenario: Pending inventory

- GIVEN a slice ships pending assets
- WHEN verification runs
- THEN every pending asset is enumerated

### Requirement: Accessibility Baseline

Pages MUST meet WCAG 2.1 AA: semantic landmarks, skip link, keyboard operability, visible focus, text alternatives, passing contrast.

#### Scenario: Keyboard traversal

- GIVEN a keyboard-only visitor
- WHEN they tab a page
- THEN every control is reachable, focus is visible, no trap occurs

#### Scenario: Audit in both locales

- GIVEN an audit of `/es/` and `/en/`
- WHEN it runs
- THEN no WCAG 2.1 AA violation is reported

### Requirement: Reduced-Motion Respect

Motion MUST be suppressed when reduced motion is requested, MAY play otherwise, and MUST never carry information on its own.

#### Scenario: Reduced motion requested

- GIVEN `prefers-reduced-motion: reduce`
- WHEN a page loads
- THEN no animation plays and content stays readable

### Requirement: Gradient Text Legibility

Gradient typography MUST fall back to a solid color where clipping is unsupported and MUST meet 4.5:1 contrast, or 3:1 when large.

#### Scenario: Legible in every engine

- GIVEN gradient headings on the dark background
- WHEN contrast is measured behind each letter
- THEN the applicable threshold is met
- AND engines without gradient clipping show the legible solid fallback

### Requirement: Discoverability Metadata

Pages MUST expose canonical URLs, locale alternates, social preview metadata, and valid `Person` plus `WebSite` structured data. The build MUST publish a both-locale sitemap plus a robots file referencing it.

#### Scenario: Metadata published

- GIVEN a successful build
- WHEN output is inspected
- THEN the sitemap lists both locales under the canonical origin, robots references it, and structured data parses cleanly

### Requirement: Static-First Performance

Content and navigation MUST work without client-side JavaScript; scripts MAY serve optional motion only, and render-blocking third-party resources MUST NOT be added.

#### Scenario: JavaScript disabled

- GIVEN scripts are disabled
- WHEN either locale is browsed
- THEN all content, navigation, and links remain usable
- AND no analytics or render-blocking third party is requested
