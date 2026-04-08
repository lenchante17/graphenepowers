---
name: writing-plans
description: Use when approved requirements need to become a dependency-aware execution plan and initial progress record before implementation begins, especially when ordering, parallelism, estimates, or re-planning matter
---
# Writing Plans
Turn approved requirements into an execution graph the orchestrator can run.
## Modes
- `lightweight` for `Small Task`
- `windowed` for `Feature`
## Required Inputs
- approved requirements or spec
- classification summary
- current project structure
- locked design contract for `Feature`
If `Feature` lacks an approved design, stop and use `graphenepowers:brainstorming`.
## Read In Order
1. `planning/graph-design.md`
2. `outputs/plan-document.md`
3. `outputs/plan-progress.md`
4. `outputs/execution-packets.md`
5. `review/preflight-and-handoff.md`
6. `replanning/rolling-replan.md`
## Non-Negotiables
- Plan a dependency graph, not a checklist.
- Every task needs exact `write_set`, acceptance, verification, and expected artifacts.
- Estimate `duration_pert` and `effort_pert` separately.
- Split parallel-safe work into separate tasks when write sets and side effects are disjoint.
- Run `scripts/check-plan-placeholders.cjs <plan-doc>` before handoff.
- `Feature` and hard-override work require preflight review and a self-contained one-page reviewer brief for the human gate.
## Outputs And Handoff
- Plan: `docs/graphenepowers/plans/YYYY-MM-DD-<topic>.md`
- Progress: `docs/graphenepowers/plans/YYYY-MM-DD-<topic>-plan-progress.md`
- Hand off to `graphenepowers:executing-plans`; mention planning mode, low-confidence tasks, and expected rolling re-plan.
