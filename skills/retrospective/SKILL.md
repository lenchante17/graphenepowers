---
name: retrospective
description: Use when execution and review are complete, or when repeated deviations or blocker patterns suggest the process itself needs adjustment before closing out the work
---

# Retrospective

## Overview

Close the loop after implementation. Measure what actually happened, decide whether the process should change, then finish the branch outcome.

**Core principle:** A failed estimate, repeated blocker, or recurring review finding is a process signal until proven otherwise.

**Announce at start:** "I'm using the retrospective skill to analyze execution results and close out the work."

## When to Run

**Mandatory:**
- after `Feature` completes
- when `code-review` passes and work is ready to close

**Also run when:**
- `active_agent_time > E_effort + 2σ_effort` once
- `elapsed_active_time > E_duration + 2σ_duration` once
- the same blocker pattern appears 3 times
- `code-review` fails 2 times in a row
- the same work type has accumulated 5 executions since the last retrospective

## The Process

### Step 1: Load evidence

Collect:
- `triage` summary
- plan doc
- `plan-progress.md`
- task card history from `plan-progress.md` events and rendered kanban
- review findings
- verification evidence

If there is no usable execution record, say so explicitly and do a lightweight retrospective only.

### Step 2: Analyze deviations

Check:
- effort deviation versus `effort_pert`
- duration deviation versus `duration_pert`
- blocker type distribution
- lane churn and task re-open patterns
- artifact/evidence completeness on `review` and `done` cards
- gate frequency
- rolling re-plan frequency
- superseded-card frequency
- review failure patterns

Separate one-off noise from repeated structure.

Use these interpretations:

- high effort with normal duration -> expensive but parallelizable
- high duration with normal effort -> waiting or dependency bottleneck
- repeated blocker on critical path -> sequencing problem
- repeated `in_progress -> blocked -> in_progress` on the same card -> blocker surfaced too late
- repeated `review -> dispatch` on the same card -> acceptance, verification, or review timing problem
- many `superseded` cards -> planning granularity or re-plan discipline problem
- `review` or `done` cards missing artifacts/evidence -> execution discipline problem
- repeated review failures -> execution discipline or review calibration problem

### Step 3: Decide whether the process should change

Only draft a skill/process change when one of these is true:
- the same pattern repeated
- a single incident exposed a structural flaw
- the current protocol hid risk instead of surfacing it

If the issue is local to the implementation, do not mutate the global process.

### Step 4: Draft improvement notes

Target the skill that owns the mistake:

| Pattern | Target |
|---------|--------|
| Bad classification | `graphenepowers:triage` |
| Bad sequencing or estimates | `graphenepowers:writing-plans` |
| Bad orchestration or gate behavior | `graphenepowers:executing-plans` |
| Review blind spot | `graphenepowers:code-review` |
| Root-cause failures | `graphenepowers:systematic-debugging` |

Write short, falsifiable change notes. Do not write mythology.

### Step 5: Apply anti-overfitting rules

- A single outlier does not automatically justify changing a skill
- Record `hypothesis` and `reproducibility` before proposing a process change
- Only propose a skill change immediately when one incident reveals a structural flaw, not just a noisy run

### Step 6: Present completion options

If this is a git work item, present exactly these options:

```text
Work is complete. What would you like to do?

1. Merge locally
2. Push and create a Pull Request
3. Keep the branch as-is
4. Discard this work
```

If this is not a git repository, skip directly to the retrospective summary.

### Step 7: Execute the chosen outcome

- Merge locally: verify merged result, then clean up isolated workspace if applicable
- Push and create PR: include summary and test plan
- Keep as-is: preserve branch/worktree and report location
- Discard: require explicit confirmation before deleting branch/worktree

## Quick Reference

| Signal | Interpretation |
|--------|----------------|
| Repeated blocker on critical path | sequencing problem |
| Effort high, duration normal | expensive but parallelizable |
| Duration high, effort normal | waiting or dependency bottleneck |
| Same card keeps reopening from review | acceptance or verification gap |
| Done cards missing artifacts | execution discipline issue |
| Review failures repeat | review criteria or execution discipline issue |
| One weird incident | record first, avoid overfitting |

## Trigger Table

| Trigger Type | Condition |
|--------------|-----------|
| Frequency | `Feature` complete |
| Frequency | same work type reached 5 runs |
| Event | `active_agent_time > E_effort + 2σ_effort` |
| Event | `elapsed_active_time > E_duration + 2σ_duration` |
| Event | same blocker pattern 3 times |
| Event | `code-review` failed twice consecutively |

## Common Mistakes

**Treating every surprise as a process failure**
- **Problem:** thrash the system after one noisy task
- **Fix:** distinguish repeated pattern from isolated event

**Skipping the close-out decision**
- **Problem:** work is technically done but operationally unfinished
- **Fix:** present explicit completion options

**Writing vague improvement ideas**
- **Problem:** nothing actionable changes
- **Fix:** point to one target skill and one concrete rule change

## Integration

**Comes after:**
- `graphenepowers:executing-plans`
- `graphenepowers:code-review`

**Feeds into:**
- `graphenepowers:writing-skills` when a process change is accepted
