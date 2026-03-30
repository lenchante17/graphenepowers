# GraphenePowers v4 Patch Notes

> Terminology note: this document predates the `Small Task` terminology update. Read historical grade references to `Task` as `Small Task` unless the text is explicitly discussing the earlier wording.

This file records what was patched in the copied skill tree while moving from the legacy layout to the GraphenePowers v4 model.

## Applied Core Skill Updates

- [using-graphenepowers](../../../skills/using-graphenepowers/SKILL.md)
  - renamed from the old entry skill
  - updated development entry flow to `triage -> planning/design -> execution -> review -> retrospective`

- [brainstorming](../../../skills/brainstorming/SKILL.md)
  - narrowed to Feature-grade or confidence-low design work
  - updated spec path references to `docs/graphenepowers/specs`

- [triage routing module](../../../skills/using-graphenepowers/routing/triage.md)
  - added as the normal development entry classifier

- [writing-plans](../../../skills/writing-plans/SKILL.md)
  - rewritten for graph-based planning, dual-PERT, and kanban-friendly `plan-progress` seeding

- [executing-plans](../../../skills/executing-plans/SKILL.md)
  - rewritten to the v4 state-machine model with rendered kanban maintenance from task cards

- [code-review](../../../skills/code-review/SKILL.md)
  - added as the unified review skill with preflight/spec-delta/quality modes
  - updated to consume task card artifacts, acceptance, and review state from `plan-progress`

- [retrospective](../../../skills/retrospective/SKILL.md)
  - added as the v4 completion and learning loop
  - updated to read lane churn, card reopen patterns, and artifact completeness

- [test-driven-development](../../../skills/test-driven-development/SKILL.md)
  - updated integration notes for `executing-plans.verify`

- [systematic-debugging](../../../skills/systematic-debugging/SKILL.md)
  - updated handoff guidance to return into `executing-plans`

## Converted Legacy Skills

These skills were originally kept as redirect notes, then removed after their surviving rules were merged into current owners:

- `dispatching-parallel-agents` -> `executing-plans`
- `using-git-worktrees` -> `executing-plans`
- `subagent-driven-development` -> `executing-plans` plus `code-review`
- `requesting-code-review` -> `code-review`
- `receiving-code-review` -> `code-review`
- `verification-before-completion` -> `executing-plans`
- `finishing-a-development-branch` -> `retrospective`

## Supporting File Updates

- [writing-plans/review/plan-document-reviewer-prompt.md](../../../skills/writing-plans/review/plan-document-reviewer-prompt.md)
  - reduced to a compatibility wrapper around preflight review

- [using-graphenepowers/references/codex-tools.md](../../../skills/using-graphenepowers/references/codex-tools.md)
- [using-graphenepowers/references/gemini-tools.md](../../../skills/using-graphenepowers/references/gemini-tools.md)
  - updated wording to match the new orchestration model

## Residual Archive Files

Earlier snapshots left some redirect prompts in place. The current canonical tree no longer keeps those archive wrappers once their useful rules were absorbed into active skills.
