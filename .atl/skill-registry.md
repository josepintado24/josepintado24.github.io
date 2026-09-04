# Skill Registry — josepintado24.github.io

Detected: 2026-09-04
Project: josepintado24.github.io
Project root: /Users/joselu/Sites/josepintado24.github.io
Source-of-truth scope: user-level (opencode) — empty repo, no project-level skills yet.

## Convention Files

| Path | Scope | Notes |
| ---- | ----- | ----- |
| `/Users/joselu/.config/opencode/AGENTS.md` | user | Global agent instructions (loaded as system prompt). |

No project-level `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `GEMINI.md`, or `copilot-instructions.md` exists yet.

## Skills Index

The registry is an index. Sub-agents must read the full `SKILL.md` from the path before invoking any skill. Trigger text is quoted from the `description` frontmatter.

| Skill | Path | Trigger |
| ----- | ---- | ------- |
| adobe-commerce-standards | `/Users/joselu/.config/opencode/skills/adobe-commerce-standards/SKILL.md` | "Trigger: Adobe Commerce standards, Magento official standards, extension quality, Adobe docs. Apply official Commerce conventions." |
| branch-pr | `/Users/joselu/.config/opencode/skills/branch-pr/SKILL.md` | "Create Gentle AI pull requests with issue-first checks. Trigger: creating, opening, or preparing PRs for review." |
| chained-pr | `/Users/joselu/.config/opencode/skills/chained-pr/SKILL.md` | "Trigger: PRs over 400 lines, stacked PRs, review slices. Split oversized changes into chained PRs that protect review focus." |
| claude-code-magento-agents | `/Users/joselu/.config/opencode/skills/claude-code-magento-agents/SKILL.md` | "Trigger: Magento agents, split Magento work, module agent, checkout agent, debugging agent, performance agent. Route work by specialty." |
| cognitive-doc-design | `/Users/joselu/.config/opencode/skills/cognitive-doc-design/SKILL.md` | "Design docs that reduce cognitive load. Trigger: writing guides, READMEs, RFCs, onboarding, architecture, or review-facing docs." |
| comment-writer | `/Users/joselu/.config/opencode/skills/comment-writer/SKILL.md` | "Write warm, direct collaboration comments. Trigger: PR feedback, issue replies, reviews, Slack messages, or GitHub comments." |
| gentle-ai-bench | `/Users/joselu/.config/opencode/skills/gentle-ai-bench/SKILL.md` | "Trigger: bench, journey, journeys, driven mode, gentle-ai-bench, journey corpus, j-numbers, bench axis. Author and verify gentle-ai bench journeys; go test ./bench never proves driven execution." |
| go-testing | `/Users/joselu/.config/opencode/skills/go-testing/SKILL.md` | "Trigger: Go tests, go test coverage, Bubbletea teatest, golden files. Apply focused Go testing patterns." |
| issue-creation | `/Users/joselu/.config/opencode/skills/issue-creation/SKILL.md` | "Trigger: issue creation, bug reports, feature requests, or issue approval. Create and triage GitHub issues from repository evidence." |
| judgment-day | `/Users/joselu/.config/opencode/skills/judgment-day/SKILL.md` | "Trigger: judgment day, dual review, adversarial review, juzgar. Run explicit blind dual review with at most two scoped fix/re-judgment rounds." |
| magento-ai-toolkit | `/Users/joselu/.config/opencode/skills/magento-ai-toolkit/SKILL.md` | "Trigger: Magento 2, Mage-OS, Adobe Commerce, module development, debugging, hosting. Apply Magento AI toolkit workflows." |
| magento-coding-standards-mcp | `/Users/joselu/.config/opencode/skills/magento-coding-standards-mcp/SKILL.md` | "Trigger: Magento coding standards, PHPCS, PHTML, JS, LESS, CSS, MCP standards. Enforce Magento code style rules." |
| movistar-total-checkout | `/Users/joselu/.config/opencode/skills/movistar-total-checkout/SKILL.md` | "Trigger: MovistarTotalCheckout, Movistar Total checkout, Telefonica_MovistarTotalCheckout. Work safely in the Magento checkout module." |
| rdd-defect-workflow | `/Users/joselu/.config/opencode/skills/rdd-defect-workflow/SKILL.md` | "Trigger: RDD, receipt-driven development, review authority, receipt/lineage, correction/recovery, delivery gate/kill switch, bounded review defects. Guide work." |
| skill-creator | `/Users/joselu/.config/opencode/skills/skill-creator/SKILL.md` | "Trigger: new skills, agent instructions, documenting AI usage patterns. Create LLM-first skills with valid frontmatter." |
| skill-improver | `/Users/joselu/.config/opencode/skills/skill-improver/SKILL.md` | "Trigger: improve skills, audit skills, refactor skills, skill quality. Audit and upgrade existing LLM-first skills." |
| systemic-issue-triage | `/Users/joselu/.config/opencode/skills/systemic-issue-triage/SKILL.md` | "Trigger: new issue, bug report, triage, backlog, issue flood, community report, root cause, dead-end, blocked user. Attack issues by root class, never one-by-one; fixes must shrink the system, not grow it." |
| work-unit-commits | `/Users/joselu/.config/opencode/skills/work-unit-commits/SKILL.md` | "Plan commits as reviewable work units. Trigger: implementation, commit splitting, chained PRs, or keeping tests and docs with code." |

## Excluded From Registry

Skipped per init rules (built-in / shared / SDD pipeline skills not indexed here):

- `_shared/`
- `sdd-init`, `sdd-explore`, `sdd-propose`, `sdd-spec`, `sdd-design`, `sdd-tasks`, `sdd-apply`, `sdd-verify`, `sdd-archive`, `sdd-onboard`, `sdd-research`
- `skill-registry`
- `customize-opencode` (built-in, not a user-installed skill)

## Duplicates Observed Across User Scopes

Same skill folders exist under `/Users/joselu/.claude/skills/`, `/Users/joselu/.gemini/skills/`, `/Users/joselu/.gemini/antigravity/skills/`, `/Users/joselu/.cursor/skills/`, `/Users/joselu/.copilot/skills/`, `/Users/joselu/.codex/skills/`, and `/Users/joselu/.codeium/windsurf/skills/`. The opencode path is canonical for this session; other scopes are duplicates and not indexed separately.
