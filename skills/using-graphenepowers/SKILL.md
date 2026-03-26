---
name: using-graphenepowers
description: Use when starting any conversation to decide which GraphenePowers skill applies before responding, especially for development work that may need triage, design, planning, execution, review, or debugging discipline
---

<SUBAGENT-STOP>
If you were dispatched as a subagent for a scoped task, skip this skill.
</SUBAGENT-STOP>

# Using GraphenePowers

## Overview

GraphenePowers is a workflow system, not a bag of optional tips.

**Core principle:** Check skills before action. Rationalizing "I'll do one quick thing first" is exactly what this system exists to stop.

## Instruction Priority

1. User instructions
2. GraphenePowers skills
3. Default assistant behavior

If local instructions conflict with a skill, the local instructions win.

## The Rule

Invoke relevant or requested skills before responding or acting. If there is even a small chance a skill applies, check it.

For development work, default entry is:

```text
Request
-> graphenepowers:triage
-> Micro: execute directly
-> Task: graphenepowers:writing-plans
-> Feature: graphenepowers:brainstorming -> graphenepowers:writing-plans
-> graphenepowers:executing-plans
-> graphenepowers:code-review
-> graphenepowers:retrospective
```

For bugs or unexplained failures:

```text
Request
-> graphenepowers:systematic-debugging
-> if code change required: graphenepowers:test-driven-development
```

## Red Flags

These thoughts mean stop:

- "This is simple, I don't need a skill"
- "Let me inspect files first"
- "I remember the skill already"
- "I'll just do one thing before checking"
- "The workflow is probably overkill"

## Skill Priority

Use this order when multiple skills might apply:

1. Entry / control skills: `graphenepowers:triage`, `graphenepowers:systematic-debugging`
2. Design skills: `graphenepowers:brainstorming`
3. Planning skills: `graphenepowers:writing-plans`
4. Execution / review / closure: `graphenepowers:executing-plans`, `graphenepowers:code-review`, `graphenepowers:retrospective`

## Platform Adaptation

Skills use Claude Code tool names. Non-CC platforms should use the mappings in:

- `references/codex-tools.md`
- `references/gemini-tools.md`

## Bottom Line

User intent says what to do. GraphenePowers says how to do it without drifting.
