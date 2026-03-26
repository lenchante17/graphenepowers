---
name: writing-plans
description: Use when approved requirements need to become a dependency-aware execution plan and initial progress record before implementation begins, especially when ordering, parallelism, estimates, or re-planning matter
---

# Writing Plans

## Overview

Turn approved requirements into an execution graph. A plan is not a checklist with feelings; it is the dependency model that execution will follow.

**Core principle:** Bad sequencing and vague verification create rework before code does.

**Announce at start:** "I'm using the writing-plans skill to create the execution plan."

**Default outputs:**
- Plan doc: `docs/graphenepowers/plans/YYYY-MM-DD-<topic>.md`
- Progress record: `docs/graphenepowers/plans/YYYY-MM-DD-<topic>-plan-progress.md`

## Required Inputs

- Approved requirements or spec
- `triage` result
- Current project structure

If `triage` says `Feature` and no approved design exists, stop and use `graphenepowers:brainstorming`.

## The Process

### Step 1: Map the work as a graph

Before writing tasks, identify:

- change units
- dependencies between units
- expected write sets
- verification per unit

Each task node becomes both a DAG node and the future kanban card source. Each task must have:
- stable task id (`T1`, `T2`, ...)
- `depends_on`
- initial status seed (`ready` if dependencies are already satisfied, otherwise `backlog`)
- `owner`
- write set or owned files/modules
- acceptance criteria
- verification command
- expected artifacts
- both `duration` and `effort` estimates

### Step 2: Estimate twice

Every task gets two PERT triplets:

- `duration_pert`: elapsed time for scheduling
- `effort_pert`: total agent work for capacity/cost

Do not reuse one estimate for both.

### Step 3: Identify the critical path

- Compute the dependency path that controls elapsed time
- Mark early parallelizable work
- Pull blockers and interface risks as early as practical

For `Feature`, detail the near-term critical path and risky edges first. Leave later work coarser if it will be refined by rolling re-plan.

### Step 4: Write the plan document

Every plan should start with:

````markdown
# [Topic] Execution Plan

**Goal:** [One sentence]

**Inputs:** [spec path or requirements source]

**Grade:** [Task | Feature]

**Execution Skill:** `graphenepowers:executing-plans`

**Progress Record:** `docs/graphenepowers/plans/YYYY-MM-DD-<topic>-plan-progress.md`

---
````

Use task sections like this:

````markdown
### Task T1: [Name]

**Depends on:** `-`
**Write Set:** `src/foo.ts`, `tests/foo.test.ts`
**Duration PERT:** `0.5 / 1 / 2h`
**Effort PERT:** `0.5 / 1.5 / 2.5h`
**Verification:** `npm test -- foo`

- [ ] Step 1: Write the failing test
- [ ] Step 2: Run it and confirm correct failure
- [ ] Step 3: Implement minimal code
- [ ] Step 4: Run verification and confirm pass
````

### Step 5: Seed `plan-progress.md`

Create the initial machine record and human view. Seed it with:

- `plan_version`
- `grade`
- `confidence`
- `profile_asymmetry`
- `critical_path`
- `estimated_duration`
- `estimated_effort`
- initial task list with `duration_pert` and `effort_pert`
- task `status`
- task `owner`
- task `write_set`
- task `acceptance`
- task `verification`
- task `artifacts`
- task `review_state`
- task `blocker_ids`
- empty `blockers`
- empty `events`

`plan-progress.md` is the state record for `graphenepowers:executing-plans`, not a second plan written from scratch.
The Markdown summary and kanban are rendered views, not handwritten status boards.

At minimum, seed it in this shape:

````markdown
# plan-progress.md

## Machine Record
```yaml
meta:
  plan_version: 1
  grade: Task
  confidence: medium
  profile_asymmetry: 0.40
  critical_path: [T1, T3]
  estimated_duration: 2.5h
  estimated_effort: 3.5h
  started_at: null
  completed_at: null
  writer: executing-plans-orchestrator

tasks:
  - id: T1
    name: Example task
    depends_on: []
    duration_pert: {o: 0.5, m: 1.0, p: 2.0}
    effort_pert: {o: 0.5, m: 1.5, p: 2.5}
    status: ready
    active_agent_time: null
    elapsed_active_time: null
    owner: unassigned
    write_set:
      - src/example.ts
      - tests/example.test.ts
    acceptance:
      - behavior matches the approved requirement
    verification:
      commands:
        - npm test -- example
      evidence: []
    artifacts: []
    review_state: none
    blocker_ids: []

blockers: []
events: []
```

## Human View Summary
| ID | Task | Depends On | Duration E ± σ | Effort E ± σ | Status | Review | Owner |
|----|------|------------|----------------|--------------|--------|--------|-------|

## Human View Kanban
### Ready
- `T1 Example task`
  - owner: `unassigned`
  - acceptance: behavior matches the approved requirement
````

If the machine record is missing these fields, execution will drift and re-planning becomes inconsistent.

### Step 6: Review before execution

If this is `Feature`, or if `triage` used a hard override, run `graphenepowers:code-review` in `Preflight Spec Review` mode before execution.

If preflight review fails:
- fix the plan
- re-run preflight review
- do not start implementation yet

### Step 7: Hand off to execution

After saving both files:

- hand off to `graphenepowers:executing-plans`
- mention whether rolling re-plan is expected
- mention any low-confidence tasks explicitly

## Rolling Re-Plan Rules

Re-plan only when one of these is true:

1. a critical-path predecessor completed
2. a blocker changed the structure of follow-up work
3. re-triage indicates a possible grade increase

When re-planning:

- re-run `graphenepowers:triage` for affected follow-up work
- raise a human gate if grade rises
- raise a human gate if `confidence = low`
- increment `plan_version`
- mark the previous plan slice as superseded instead of creating a new unrelated record
- move replaced cards to `superseded` instead of deleting them

## Thrash Prevention

- Do not re-plan the same task set twice in a row without new evidence
- Prefer updating the critical path and directly dependent tasks first
- If only task order changes slightly, log an event instead of incrementing `plan_version`

## Quick Reference

| Need | Plan requirement |
|------|------------------|
| Parallel work | disjoint write sets and explicit dependencies |
| Accurate schedule | `duration_pert` |
| Accurate effort tracking | `effort_pert` |
| Re-plan later | coarse late tasks, detailed critical path |
| Readable handoff | `acceptance`, `artifacts`, `review_state` |
| Safe execution | concrete verification per task |

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

**Treating kanban as a second source of truth**
- **Problem:** task status drifts between YAML and Markdown
- **Fix:** seed kanban-friendly task fields in YAML and render the Markdown view from them

## Integration

**Comes after:**
- `graphenepowers:triage`
- `graphenepowers:brainstorming` for `Feature`

**Hands off to:**
- `graphenepowers:code-review` in preflight mode when needed
- `graphenepowers:executing-plans`
