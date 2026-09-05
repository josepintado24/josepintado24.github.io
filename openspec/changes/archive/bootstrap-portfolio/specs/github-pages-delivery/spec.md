# GitHub Pages Delivery Specification

## Purpose

Build and publication of the portfolio at the canonical user site `https://josepintado24.github.io`: reproducibility, automated deployment, path stability, release verification.

## Requirements

### Requirement: Reproducible Static Build

A single documented build command MUST produce fully static output, with a committed lockfile so local and CI builds resolve identical dependencies. No runtime server MUST be required.

#### Scenario: Clean build succeeds

- GIVEN a clean checkout with the committed lockfile
- WHEN the build command runs
- THEN static output is produced and the command exits successfully

#### Scenario: Build failure blocks release

- GIVEN the build command fails
- WHEN the change is evaluated
- THEN it MUST NOT be merged or deployed

### Requirement: Canonical Site Addressing

The build MUST target `https://josepintado24.github.io` with no path prefix, so canonical tags, sitemap entries, and assets resolve at the user-site root. A custom domain MUST NOT be configured.

#### Scenario: Absolute URLs resolve

- GIVEN a deployed page
- WHEN canonical URLs, sitemap entries, and assets are inspected
- THEN each uses the canonical origin with no extra path segment

#### Scenario: Assets load at root

- GIVEN a visitor loads any deployed page
- WHEN styles, images, and documents are requested
- THEN every request resolves without a 404

### Requirement: Automated Deployment on Merge

Publication MUST be automated by a CI workflow on merge to the default branch, with the repository Pages source set to GitHub Actions. Manual upload MUST NOT be the normal path.

#### Scenario: Merge publishes

- GIVEN a change is merged to the default branch
- WHEN the deployment workflow succeeds
- THEN the updated site is live at the canonical URL

#### Scenario: Failed workflow does not publish

- GIVEN the build stage fails
- WHEN the workflow ends
- THEN nothing deploys and the live site stays intact

### Requirement: Least-Privilege Deployment

The workflow MUST request only repository read, Pages publication, and deployment identity. Long-lived deployment secrets MUST NOT be required.

#### Scenario: Permission review

- GIVEN the workflow definition
- WHEN its permissions are reviewed
- THEN only those three grants are present

#### Scenario: No stored deployment secret

- GIVEN the deployment configuration
- WHEN secrets are inspected
- THEN no manually managed deployment token exists

### Requirement: Published Path Stability

A published path MUST keep resolving unless a change deliberately retires it; renaming a published page or asset is breaking and MUST be stated in that change.

#### Scenario: Later slice preserves paths

- GIVEN a slice adds new content
- WHEN it deploys
- THEN previously published routes and asset paths still resolve

#### Scenario: Deliberate retirement

- GIVEN a published path must be removed
- WHEN the change is proposed
- THEN the removal and its consequence are stated before merge

### Requirement: Per-Slice Release Verification

Each deployed slice MUST be verified live: build passes, both locale home pages and new routes render at the canonical URL, sitemap and robots reference that origin, and reduced motion is smoke-tested.

#### Scenario: Slice verified live

- GIVEN a slice has deployed
- WHEN verification runs
- THEN both locales and new routes render and sitemap and robots use the canonical origin

#### Scenario: Verification failure triggers rollback

- GIVEN live verification fails
- WHEN the failure is confirmed
- THEN only that slice is reverted and the prior green state is restored
