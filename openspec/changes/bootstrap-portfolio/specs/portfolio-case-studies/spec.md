# Portfolio Case Studies Specification

## Purpose

Localized case-study, dual-career, education, and credential content: structure, routes, ordering, structured data, per-slice verifiability.

## Requirements

### Requirement: Typed Localized Content Entries

Case studies, education entries, and credentials MUST be typed, validated, locale-scoped content. Invalid entries MUST fail the build instead of publishing.

#### Scenario: Valid entry publishes

- GIVEN a complete entry in both locales
- WHEN the site builds
- THEN it publishes under `/es/` and `/en/`

#### Scenario: Invalid entry blocks publication

- GIVEN an entry missing a required field
- WHEN the site builds
- THEN the build fails and nothing is published

### Requirement: Case-Study Detail Routes

Each published case study MUST have a stable per-locale route at `/{locale}/case-studies/{slug}/` using the same slug across locales. Published paths MUST NOT be renamed later.

#### Scenario: Detail route resolves

- GIVEN a published case study
- WHEN `/es/case-studies/{slug}/` is opened
- THEN its localized detail page renders

#### Scenario: Cross-locale slug stability

- GIVEN the same case study in English
- WHEN its `/en/` route is requested with the same slug
- THEN the English detail page renders

### Requirement: Approved Case-Study Inventory

The portfolio MUST present the approved case studies — Movistar, Crepier, RadioShack, Desly, CEPRE-UNI — and MUST NOT publish unapproved ones.

#### Scenario: Inventory complete

- GIVEN all content slices are merged
- WHEN case studies are listed in either locale
- THEN the five approved case studies appear

#### Scenario: Partial delivery stays honest

- GIVEN only some case studies have shipped
- WHEN the listing renders
- THEN only shipped entries appear, with no empty link posing as published work

### Requirement: Dual-Career Presentation

Developer and educator tracks MUST carry equal weight; each case study MUST declare one audience (`commerce`, `education`, `both`), and the dual-career section MUST precede technical capabilities.

#### Scenario: Equal positioning

- GIVEN a first-time visitor on either home page
- WHEN they read the top of the page
- THEN both careers appear without one being subordinate

#### Scenario: Audience classification

- GIVEN any published case study
- WHEN its data is inspected
- THEN exactly one approved audience value is present

### Requirement: Education and Credentials

Education entries and credentials MUST publish per locale. A supplied credential document MUST download from a stable path; an unsupplied one MUST render as pending, never as verified or silently omitted.

#### Scenario: Credential available

- GIVEN a credential document is supplied
- WHEN its download is activated
- THEN the document is served from its stable path

#### Scenario: Credential pending

- GIVEN the document is not supplied
- WHEN the credential renders
- THEN it shows a visible labelled pending state

### Requirement: Case-Study Structured Data

Each case-study detail page MUST expose structured data describing that work, matching the visible localized content.

#### Scenario: Structured data valid

- GIVEN a detail page in either locale
- WHEN its structured data is validated
- THEN it parses cleanly and its title matches the rendered heading

#### Scenario: Locale consistency

- GIVEN both locale versions of one case study
- WHEN their structured data is compared
- THEN each reflects its own locale's title and summary

### Requirement: Per-Slice Content Verifiability

Each content slice MUST build green, render both locales, enumerate the entries and pending assets it ships, and revert without breaking previously published routes.

#### Scenario: Slice verification evidence

- GIVEN a slice ready for review
- WHEN verification runs
- THEN the build passes, both locales render, and entries and pending assets are listed

#### Scenario: Slice revert is safe

- GIVEN a merged slice is reverted
- WHEN the site rebuilds
- THEN only that slice's routes disappear and all others still resolve
