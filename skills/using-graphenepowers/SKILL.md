---
name: using-graphenepowers
description: Use when starting any conversation and deciding which GraphenePowers route applies before responding, especially for development work that may need classification, design, planning, execution, review, or debugging discipline
---
<SUBAGENT-STOP>
If you were dispatched as a subagent for a scoped task, skip this skill.
</SUBAGENT-STOP>
# Using GraphenePowers
Route before acting.
## Read First
- `routing/triage.md`
- `docs/graphenepowers/human-gates.md`
- `docs/graphenepowers/templates/reclassification-record.md` when route changes mid-work
## Default Routes
- `Micro`: `routing/micro.md`, then execute directly.
- `Small Task`: `routing/small-task.md` -> `graphenepowers:writing-plans` -> `graphenepowers:executing-plans` -> `graphenepowers:code-review` -> `graphenepowers:retrospective`
- `Feature`: `routing/feature.md` -> `graphenepowers:brainstorming` -> `graphenepowers:writing-plans` -> `graphenepowers:code-review` preflight -> `graphenepowers:executing-plans` -> `graphenepowers:code-review` -> `graphenepowers:retrospective`
- Bugs or unexplained failures: `routing/cross-cutting.md` -> `graphenepowers:systematic-debugging` -> `graphenepowers:test-driven-development` if code change follows.
## Non-Negotiables
- User instructions win; local instructions override skills when they conflict.
- If confidence is low or the route changes, pause, re-run triage, and record it.
- Execution, review, and retrospective may use clean-context subagents with scoped packets.
## Platform Notes
- Tool mappings live in `references/codex-tools.md` and `references/gemini-tools.md`.
