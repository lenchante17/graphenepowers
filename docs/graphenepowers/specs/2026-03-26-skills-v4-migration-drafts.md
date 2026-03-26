# GraphenePowers v4 Patch Notes

This file records what was patched in the copied skill tree while moving from the legacy layout to the GraphenePowers v4 model.

## Applied Core Skill Updates

- [using-graphenepowers](../../../skills/using-graphenepowers/SKILL.md)
  - renamed from the old entry skill
  - updated development entry flow to `triage -> planning/design -> execution -> review -> retrospective`

- [brainstorming](../../../skills/brainstorming/SKILL.md)
  - narrowed to Feature-grade or confidence-low design work
  - updated spec path references to `docs/graphenepowers/specs`

- [triage](../../../skills/triage/SKILL.md)
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

These skills now act as deprecation or redirect notes rather than primary workflows:

- [dispatching-parallel-agents](../../../skills/dispatching-parallel-agents/SKILL.md)
- [using-git-worktrees](../../../skills/using-git-worktrees/SKILL.md)
- [subagent-driven-development](../../../skills/subagent-driven-development/SKILL.md)
- [requesting-code-review](../../../skills/requesting-code-review/SKILL.md)
- [receiving-code-review](../../../skills/receiving-code-review/SKILL.md)
- [verification-before-completion](../../../skills/verification-before-completion/SKILL.md)
- [finishing-a-development-branch](../../../skills/finishing-a-development-branch/SKILL.md)

## Supporting File Updates

- [writing-plans/plan-document-reviewer-prompt.md](../../../skills/writing-plans/plan-document-reviewer-prompt.md)
  - reduced to a compatibility wrapper around preflight review

- [subagent-driven-development/code-quality-reviewer-prompt.md](../../../skills/subagent-driven-development/code-quality-reviewer-prompt.md)
  - redirected to the unified `code-review` templates

- [using-graphenepowers/references/codex-tools.md](../../../skills/using-graphenepowers/references/codex-tools.md)
- [using-graphenepowers/references/gemini-tools.md](../../../skills/using-graphenepowers/references/gemini-tools.md)
  - updated wording to match the new orchestration model

## Residual Archive Files

Some support files remain as archival references because they no longer drive the primary workflow directly:

- `skills/subagent-driven-development/spec-reviewer-prompt.md`
- `skills/subagent-driven-development/implementer-prompt.md`
- `skills/systematic-debugging/*` reference documents

These are not primary entry points in v4, but they were left in place because they still contain reusable patterns.
