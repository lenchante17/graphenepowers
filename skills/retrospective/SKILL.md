---
name: retrospective
description: Use when execution and review are complete, or when repeated deviations or blocker patterns suggest the process itself needs adjustment before closing out the work
---

# Retrospective

## Overview

Close the loop after implementation. Measure what actually happened, decide whether the process should change, then finish the branch outcome.

**Core principle:** A failed estimate, repeated blocker, or recurring review finding is a process signal until proven otherwise.

Run retrospective through a clean-context specialist agent when possible. Retrospective should work from evidence, not from implementation narrative.

**Announce at start:** "I'm using the retrospective skill to analyze execution results and close out the work."

Support asset for retrospective specialists:

- `retrospective/subagents/retrospective-subagent/AGENTS.md`
- `retrospective/process.md`

## When to Run

**Mandatory:**
- after `Feature` completes
- when `code-review` passes and work is ready to close

For `Small Task`, a lightweight retrospective is acceptable when close-out is straightforward and no deeper trigger fired. Focus on estimate miss, blocker pattern, review findings, and whether the work should have been `Feature`.

**Also run when:**
- `active_agent_time > E_effort + 2σ_effort` once
- `elapsed_active_time > E_duration + 2σ_duration` once
- the same blocker pattern appears 3 times
- `code-review` fails 2 times in a row
- the same work type has accumulated 5 executions since the last retrospective

## Workflow Router

Read these files in order:

1. `retrospective/process.md`

## Anti-Overfitting Rules

- a single outlier does not automatically justify changing a skill
- record `hypothesis` and `reproducibility` before proposing a process change
- only propose a skill change immediately when one incident reveals a structural flaw, not just a noisy run

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
- the external skill-management workflow when a process change is accepted

Retrospective should be handled by a clean-context specialist agent that was not the primary planner, implementer, or reviewer for the same work item.
