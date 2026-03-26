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
- The Markdown board is rendered from task nodes, never hand-edited
- `duration` and `effort` are different metrics; never compare the wrong one
- `verify` is an explicit state, not a polite suggestion
- A blocker on one task should not freeze unrelated ready work

If no written plan exists, stop and use `graphenepowers:writing-plans`.

## State Machine

### `prepare`
- Read the plan and `plan-progress.md`
- Reserve write ownership before dispatching work
- Decide whether isolation is required
- Normalize initial task lanes: no unmet dependencies -> `ready`, otherwise `backlog`
- Create worktrees when predicted write sets overlap or multiple writers would touch the same module/interface

### `dispatch`
- Select tasks whose `depends_on` is fully satisfied
- Dispatch only tasks with disjoint write sets
- For implementation work, announce and use `graphenepowers:test-driven-development` before writing production code
- Record ownership before execution starts
- Move selected cards from `ready` to `in_progress`

### `track`
- Collect structured worker events
- Update `plan-progress.md`
- Measure `elapsed_active_time` and `active_agent_time`
- Update card fields: `status`, `blocker_ids`, `artifacts`, `verification`, `review_state`
- Re-render the human summary and kanban after each durable transition
- Watch for grade changes, blocker patterns, and verification debt
- Compare running metrics against plan thresholds and record warnings early

### `unblock`
- Classify blocker type: `Human`, `Environment`, `External`, `SpecAmbiguity`, `TestFlake`
- Open a gate only for affected work unless the issue invalidates the plan
- Continue unrelated ready work
- If root cause is unclear, use `graphenepowers:systematic-debugging`
- Move affected cards to `blocked`, attach `blocker_ids`, and restore them to `ready` or `backlog` when the blocker clears

### `verify`
- Run the plan's required verification commands
- Require evidence: command, output summary, and affected artifacts
- Compare `elapsed_active_time` only to duration PERT
- Compare `active_agent_time` only to effort PERT
- On success, attach artifacts/evidence and move the task to `review` unless no further external review is required
- If verification fails clearly, send task back for rework
- If verification fails unclearly, use `graphenepowers:systematic-debugging`
- If `elapsed_active_time > E_duration + 2σ_duration`, record a duration warning and mark retrospective candidate
- If `active_agent_time > E_effort + 2σ_effort`, record an effort warning and mark retrospective candidate

### `close`
- Hand off review-ready cards to `graphenepowers:code-review`
- Move review-passed cards to `done`
- Move review-failed cards back to `ready` or `backlog` with `review_state: changes_requested`
- Finalize `plan-progress.md` after the review result is reflected
- Summarize what passed, what is still open, and what changed from plan
- Hand off to `graphenepowers:retrospective`

## Card Update Rules

- `backlog`: planned but dependencies are not yet satisfied
- `ready`: runnable, unassigned or waiting for dispatch
- `in_progress`: owned by an active writer
- `blocked`: linked to one or more `blocker_ids`
- `review`: verification evidence attached, awaiting external review
- `done`: review passed or no further review is required
- `superseded`: replaced by a rolling re-plan but preserved for history

## Stop Conditions

Stop and ask your human partner when:
- triage would raise the work to a higher grade
- a new external dependency appears
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
| Worker finished a task | Attach `artifacts` and `verification`, then move card to `review` |
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
