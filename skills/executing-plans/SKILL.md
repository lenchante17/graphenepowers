---
name: executing-plans
description: Use when executing a written plan or plan-progress record with dependencies, blockers, and verification requirements, especially when work may run in parallel or require isolated workspaces
---

# Executing Plans

## Overview

Execute a written plan as an orchestrator, not as a pile of ad-hoc edits.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

**Core principles:**
- The orchestrator is the only writer of `plan-progress.md`
- Graph views and kanban views are rendered from task nodes, never hand-edited
- `duration` and `effort` are different metrics; never compare the wrong one
- `verify` is an explicit state, not a polite suggestion
- A blocker on one task should not freeze unrelated ready work
- Clean-context execution workers receive scoped packets, not the whole session history

If no written plan exists, stop and use `graphenepowers:writing-plans`.

Support assets:

- `executing-plans/subagents/execution-subagent/AGENTS.md`
- `executing-plans/states/core-loop.md`
- `executing-plans/states/recovery-and-close.md`
- `executing-plans/scripts/setup-worktree.sh`
- `executing-plans/feature/windowed-execution.md`
- `executing-plans/tracking/card-update-rules.md`
- `docs/graphenepowers/human-gates.md`
- `docs/graphenepowers/plan-progress-operations.md`
- `docs/graphenepowers/schemas/task-event.schema.yaml`
- `docs/graphenepowers/templates/reclassification-record.md`

## Workflow Router

Read the state documents in order:

1. `executing-plans/states/core-loop.md`
2. `executing-plans/states/recovery-and-close.md`

Load these support docs when needed:

- `executing-plans/feature/windowed-execution.md` for `Feature` work in `windowed` mode
- `executing-plans/tracking/card-update-rules.md` for task state transitions and rendered views
- `executing-plans/subagents/execution-subagent/AGENTS.md` when dispatching clean-context workers
- `executing-plans/scripts/setup-worktree.sh` when worktree setup needs repeatable directory selection and safety checks

## Stop Conditions

Use `docs/graphenepowers/human-gates.md` as the shared stop / continue reference.

Stop and ask your human partner when:
- triage would raise the work to a higher grade
- a new external dependency appears
- a locked interface or invariant is threatened
- a public interface changes unexpectedly
- `confidence` drops to low during re-plan
- debugging cannot identify root cause
- the plan is missing enough information that ownership or verification cannot be assigned

## Gate Behavior

Not every warning is a full stop.

- public interface changes, new external dependencies, and grade raises can force a human gate
- time threshold overruns should normally produce `warning + retrospective candidate`, not automatic full stop
- blocker gates should pause affected work only when unrelated tasks are still runnable
- if `systematic-debugging` still cannot explain the failure, escalate to a human gate

## Quick Reference

| Situation | Action |
|-----------|--------|
| Need code change | Use `graphenepowers:test-driven-development` |
| Root cause unclear | Use `graphenepowers:systematic-debugging` |
| Route changes after planning starts | pause affected work, record `docs/graphenepowers/templates/reclassification-record.md`, update affected artifacts, then resume only if the gate clears |
| Worker finished a task | Attach `artifacts` and `verification`, update graph and kanban views, then move card to `review` |
| Feature plan before execution | Hand off to `graphenepowers:code-review` preflight mode |
| All tasks verified | Hand off review-ready cards to `graphenepowers:code-review` final mode |
| Review passes | Mark cards `done` and hand off to `graphenepowers:retrospective` |
| Review fails | Set `review_state: changes_requested` and return affected cards to `dispatch` |

## Common Mistakes

**Letting workers edit `plan-progress.md`**
- **Problem:** Race conditions, broken history
- **Fix:** Workers emit events; only orchestrator writes state

**Treating the Markdown board as the source of truth**
- **Problem:** YAML and kanban drift apart
- **Fix:** update task nodes only, then re-render the summary and kanban

**Comparing effort to duration**
- **Problem:** Parallel work looks "late" when it is only expensive
- **Fix:** Compare `elapsed_active_time` to duration PERT, `active_agent_time` to effort PERT

**Freezing the whole plan on one blocker**
- **Problem:** Human wait becomes a global bottleneck
- **Fix:** Pause affected work only, continue unrelated ready tasks

**Skipping verify because implementer says it works**
- **Problem:** Completion claims outrun evidence
- **Fix:** No verify evidence, no state transition

**Silent reclassification**
- **Problem:** the work changes grade or gate posture without leaving an audit trail
- **Fix:** pause, re-run triage, record the change, and update the affected plan or contract before proceeding

**Treating time overrun as automatic failure**
- **Problem:** every estimate miss freezes execution
- **Fix:** use `E + 2σ` as warning and retrospective trigger unless the overrun also invalidates scope or risk assumptions

## Integration

**Required workflow skills:**
- **graphenepowers:writing-plans** - Creates the plan and `plan-progress.md`
- **graphenepowers:test-driven-development** - Required before production code
- **graphenepowers:systematic-debugging** - Handles unclear failures and flaky verification
- **graphenepowers:code-review** - Runs preflight and final review passes
- **graphenepowers:retrospective** - Consumes execution data after review

Execution, review, and retrospective may all use clean-context specialist subagents with scoped artifacts.
