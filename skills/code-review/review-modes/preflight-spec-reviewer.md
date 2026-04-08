# Preflight Spec Reviewer

Use this template when dispatching a pre-execution spec reviewer.

**Purpose:** catch bad plans before implementation burns time.

**Human gate output:** produce a self-contained preflight brief sized to roughly one A4 page so a human can review the plan without re-reading the raw artifacts unless they choose to.

## Inputs

- `{SPEC_REFERENCE}` - approved design/spec
- `{PLAN_REFERENCE}` - execution plan
- `{CLASSIFICATION_SUMMARY}` - score, hard overrides, confidence
- `{PLAN_PROGRESS_REFERENCE}` - initial `plan-progress.md` if present

## Prompt Template

```text
You are reviewing a plan before implementation begins.

Review these artifacts only:
- Spec: {SPEC_REFERENCE}
- Plan: {PLAN_REFERENCE}
- Classification: {CLASSIFICATION_SUMMARY}
- Plan progress seed: {PLAN_PROGRESS_REFERENCE}

Do not trust the author's summary. Read the artifacts directly.

Check:
1. Does the plan actually implement the approved spec?
2. Are dependencies and ordering coherent?
3. Are verification steps concrete and sufficient?
4. Did classification under-route risky work?
5. Are there hidden interface or dependency changes?
6. Do seeded task cards have plausible `status`, `write_set`, `acceptance`, `verification`, and expected artifacts?

Output format:

### Plan Summary
[Concise summary of goal, execution shape, critical path, parallel-safe lanes, and major gates or risks]

### Findings
#### Critical
[Missing gates, broken sequencing, wrong grade, unsafe omissions]

#### Important
[Weak verification, missing dependencies, unclear ownership]

#### Minor
[Clarity and polish]

### Assessment
**Approved to execute?** [Yes/No/With changes]
**Return path:** [writing-plans / human gate / execute]

Keep the full response to roughly one A4 page. The summary and findings should be self-contained enough for human review.
```
