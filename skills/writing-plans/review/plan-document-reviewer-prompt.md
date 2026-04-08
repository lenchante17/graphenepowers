# Plan Document Reviewer Prompt Template

Use this prompt shape when dispatching a plan reviewer directly, or when adapting `graphenepowers:code-review` preflight review for a human-facing brief.

In GraphenePowers v4, plan review normally routes through `graphenepowers:code-review` in `Preflight Spec Review` mode. This file defines the human-facing output contract that preflight review should preserve.

## Reviewer Goal

Read the full plan bundle, then return a self-contained preflight brief that a human can review without re-reading the raw plan.

## Output Contract

- keep the full response to roughly one A4 page
- summarize the plan before critiquing it
- include critical path or explicit parallel-safe lanes
- call out human gates, low-confidence tasks, and risky dependencies
- end with an execution verdict

## Recommended Output Shape

```markdown
## Plan Summary
- Goal and scope:
- Execution shape:
- Critical path:
- Parallel-safe lanes:
- Main gates or risks:

## Review Findings
### Critical
- ...

### Important
- ...

### Minor
- ...

## Approval
- Approved to execute: Yes | No | With changes
- Required next step:
```
