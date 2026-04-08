---
name: retrospective
description: Use when execution and review are complete, or when repeated deviations or blocker patterns suggest the process itself needs adjustment before closing out the work
---
# Retrospective
Close the loop from evidence, not implementation narrative.
## When To Run
- always after `Feature`
- whenever `code-review` passes and work is ready to close
- also for repeated blocker patterns, repeated review failures, or major estimate overruns
## Outputs
- `Feature`: write or update project-root `retrospective.md`, kept to roughly one A4 page
- if process change is justified: create `docs/graphenepowers/templates/process-change-intake.md`
## Read First
1. `process.md`
2. `docs/graphenepowers/templates/retrospective-summary.md`
## Focus
- Was the plan adequate?
- Where did blockers, churn, or re-windowing come from?
- What held up well?
- Is the issue local implementation noise or a structural workflow problem?
## Non-Negotiables
- Use a clean-context reviewer when possible.
- Do not recommend workflow changes from one noisy incident unless it exposed a clear structural flaw.
- Keep `retrospective.md` human-readable without replaying raw logs.
- Name concrete follow-up changes only when evidence supports them.
## Comes After
- `graphenepowers:executing-plans`
- `graphenepowers:code-review`
