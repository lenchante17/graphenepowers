---
name: writing-plans
description: Use when approved requirements need to become a dependency-aware execution plan and initial progress record before implementation begins, especially when ordering, parallelism, estimates, or re-planning matter
---

# Writing Plans

## Overview

Turn approved requirements into an execution graph. A plan is not a checklist with feelings; it is the dependency model that execution will follow.

**Core principle:** Bad sequencing and vague verification create rework before code does.

This skill has two operating modes:

- `lightweight` for `Small Task`
- `windowed` for `Feature`

**Announce at start:** "I'm using the writing-plans skill to create the execution plan."

**Default outputs:**
- Plan doc: `docs/graphenepowers/plans/YYYY-MM-DD-<topic>.md`
- Progress record: `docs/graphenepowers/plans/YYYY-MM-DD-<topic>-plan-progress.md`
- Templates: `docs/graphenepowers/templates/execution-plan.md`, `docs/graphenepowers/templates/plan-progress.md`
- Packet templates: `docs/graphenepowers/templates/subagent-packets.md`
- Design contract template: `docs/graphenepowers/templates/design-contract.md`
- Reclassification record template: `docs/graphenepowers/templates/reclassification-record.md`
- Human gate matrix: `docs/graphenepowers/human-gates.md`
- Schema: `docs/graphenepowers/schemas/plan-progress.schema.yaml`
- Task-event schema: `docs/graphenepowers/schemas/task-event.schema.yaml`
- Tools: `docs/graphenepowers/tools/validate-plan-progress.cjs`, `docs/graphenepowers/tools/render-plan-progress.cjs`, `docs/graphenepowers/tools/export-plan-progress-graph-model.cjs`, `clairvoyance serve`
- Operations guide: `docs/graphenepowers/plan-progress-operations.md`
- Plans workspace: `docs/graphenepowers/plans/README.md`
- Lightweight example: `docs/graphenepowers/examples/small-task-lightweight/`
- Feature example: `docs/graphenepowers/examples/feature-windowed/`
- Planning review prompt: `writing-plans/review/plan-document-reviewer-prompt.md`
- Plan lint: `writing-plans/scripts/check-plan-placeholders.cjs`
- Router docs: `writing-plans/planning/`, `writing-plans/outputs/`, `writing-plans/replanning/`, `writing-plans/review/`

## Required Inputs

- Approved requirements or spec
- classification summary from `graphenepowers:using-graphenepowers`
- Current project structure
- For `Feature`, an approved design contract or equivalent locked design inputs

If the work reached planning through `contract-confirmation`, the design input may be concise, but it still needs exact interfaces, invariants, autonomy boundaries, and gate triggers.

If classification says `Feature` and no approved design exists, stop and use `graphenepowers:brainstorming`.

## Workflow Router

Read the planning assets in this order:

1. `writing-plans/planning/graph-design.md`
2. `writing-plans/outputs/plan-document.md`
3. `writing-plans/outputs/plan-progress.md`
4. `writing-plans/outputs/execution-packets.md`
5. `writing-plans/review/preflight-and-handoff.md`
6. `writing-plans/replanning/rolling-replan.md`

Keep these concrete assets nearby:

- `writing-plans/review/plan-document-reviewer-prompt.md`
- `writing-plans/scripts/check-plan-placeholders.cjs`
- `docs/graphenepowers/templates/execution-plan.md`
- `docs/graphenepowers/templates/plan-progress.md`
- `docs/graphenepowers/templates/subagent-packets.md`
- `docs/graphenepowers/templates/design-contract.md`
- `docs/graphenepowers/templates/reclassification-record.md`
- `docs/graphenepowers/human-gates.md`

## Quick Reference

| Need | Plan requirement |
|------|------------------|
| Parallel work | disjoint write sets and explicit dependencies |
| Accurate schedule | `duration_pert` |
| Accurate effort tracking | `effort_pert` |
| Re-plan later | coarse late tasks, detailed critical path |
| Readable handoff | `acceptance`, `artifacts`, `review_state` |
| Safe execution | concrete verification per task |
| Plan lint | run `writing-plans/scripts/check-plan-placeholders.cjs <plan-doc>` before handoff |
| Browser preview | run `clairvoyance serve docs/graphenepowers/plans` and open the projected `*-plan-progress.html` page |
| Graph projector input | run `docs/graphenepowers/tools/export-plan-progress-graph-model.cjs <plan-progress.md>` |
| Midstream route change | add `docs/graphenepowers/templates/reclassification-record.md` and update affected artifacts before resuming |

## Common Mistakes

**Linear checklist instead of graph**
- **Problem:** hidden dependencies surface mid-execution
- **Fix:** define `depends_on` explicitly

**One estimate pretending to be two**
- **Problem:** effort and duration get mixed in review and gating
- **Fix:** write separate PERT triplets

**Detailing all future tasks equally**
- **Problem:** wasted planning on work that will change later
- **Fix:** fully specify near critical path, leave late work coarse for rolling re-plan

**Plan without verification**
- **Problem:** execution can claim success without evidence
- **Fix:** every task gets a concrete verification command

**Implicit human gates**
- **Problem:** implementers do not know which risks require a pause versus a status note
- **Fix:** reference `docs/graphenepowers/human-gates.md` and make contract or task-level gates explicit where they matter

**Treating kanban as a second source of truth**
- **Problem:** task status drifts between YAML and Markdown
- **Fix:** seed kanban-friendly task fields in YAML and render the Markdown view from them

**Placeholder language and fuzzy handoff**
- **Problem:** clean-context workers invent missing details and drift from the approved plan
- **Fix:** use exact paths, explicit ownership, concrete verification, and run `writing-plans/scripts/check-plan-placeholders.cjs`

**Skipping planner self-review**
- **Problem:** spec gaps and naming drift survive into execution
- **Fix:** do spec coverage, placeholder scan, and name/interface consistency checks before preflight or handoff

## Integration

**Comes after:**
- `graphenepowers:using-graphenepowers`
- `graphenepowers:brainstorming` for `Feature`

**Hands off to:**
- `graphenepowers:code-review` in preflight mode when needed
- `graphenepowers:executing-plans`
