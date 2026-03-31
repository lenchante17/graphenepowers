---
name: using-graphenepowers
description: Use when starting any conversation and deciding which GraphenePowers route applies before responding, especially for development work that may need classification, design, planning, execution, review, or debugging discipline
---

<SUBAGENT-STOP>
If you were dispatched as a subagent for a scoped task, skip this skill.
</SUBAGENT-STOP>

# Using GraphenePowers

## Overview

GraphenePowers is a workflow system, not a bag of optional tips.

**Core principle:** Route the work before acting. Rationalizing "I'll do one quick thing first" is exactly what this system exists to stop.

## Instruction Priority

1. User instructions
2. GraphenePowers skills
3. Default assistant behavior

If local instructions conflict with a skill, the local instructions win.

## The Rule

Use `graphenepowers:using-graphenepowers` as the single public entrypoint for workflow routing.

This skill owns internal routing modules:

- `routing/triage.md` - classification, hard overrides, confidence, and route selection
- `routing/micro.md` - fast path for isolated work
- `routing/small-task.md` - lightweight planning and execution route
- `routing/feature.md` - design-first route for larger or low-confidence work
- `routing/cross-cutting.md` - debugging and TDD rules that can interrupt any route

Shared operating docs:

- `docs/graphenepowers/human-gates.md` - one-page stop / continue policy
- `docs/graphenepowers/templates/reclassification-record.md` - record any route or grade change after work has started

## Default Route

For development work, start here:

```text
Request
-> graphenepowers:using-graphenepowers
-> routing/triage.md
-> Micro:
     -> routing/micro.md
     -> execute directly
-> Small Task:
     -> routing/small-task.md
     -> graphenepowers:writing-plans (lightweight)
     -> graphenepowers:executing-plans
     -> graphenepowers:code-review
     -> graphenepowers:retrospective
-> Feature:
     -> routing/feature.md
     -> research similar work and latest knowledge
     -> present context brief
     -> choose mode:
          -> exploratory design -> graphenepowers:brainstorming (exploratory)
          -> stable existing design -> graphenepowers:brainstorming (contract-confirmation)
     -> lock design contract
     -> graphenepowers:writing-plans (windowed)
     -> graphenepowers:code-review (Preflight Spec Review)
     -> graphenepowers:executing-plans
     -> graphenepowers:code-review
     -> graphenepowers:retrospective
```

Execution, review, and retrospective may dispatch clean-context specialist subagents with scoped artifacts instead of full session history.

For bugs or unexplained failures:

```text
Request
-> graphenepowers:using-graphenepowers
-> routing/cross-cutting.md
-> graphenepowers:systematic-debugging
-> if code change required: graphenepowers:test-driven-development
```

## Red Flags

These thoughts mean stop:

- "This is simple, I don't need a skill"
- "Let me inspect files first"
- "I remember the routing already"
- "I'll just do one thing before checking"
- "The workflow is probably overkill"

## Skill Priority

Use this order when multiple skills might apply:

1. Entry / control skills: `graphenepowers:using-graphenepowers`, `graphenepowers:systematic-debugging`
2. Design skills: `graphenepowers:brainstorming`
3. Planning skills: `graphenepowers:writing-plans`
4. Execution / review / closure: `graphenepowers:executing-plans`, `graphenepowers:code-review`, `graphenepowers:retrospective`

## Shared Rules

- Use `docs/graphenepowers/human-gates.md` as the shared approval reference across routes.
- If the route changes after planning or execution has started, pause the affected work, re-run triage, and record the change with `docs/graphenepowers/templates/reclassification-record.md`.

## Platform Adaptation

Skills use Claude Code tool names. Non-CC platforms should use the mappings in:

- `references/codex-tools.md`
- `references/gemini-tools.md`

## Bottom Line

User intent says what to do. GraphenePowers says how to route it without drifting.
