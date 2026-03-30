# Spec Delta Reviewer

Use this template when dispatching a reviewer after execution changed the plan.

**Purpose:** verify that execution stayed inside approved deltas.

## Inputs

- `{SPEC_REFERENCE}` - approved design/spec
- `{PLAN_REFERENCE}` - latest approved plan
- `{PLAN_PROGRESS_REFERENCE}` - latest `plan-progress.md` with relevant task cards
- `{DELTA_LOG_REFERENCE}` - rolling re-plan entries or exception log
- `{CHANGED_ARTIFACTS}` - files changed or git range
- `{VERIFICATION_EVIDENCE}` - commands and outputs

## Prompt Template

```text
You are reviewing whether implementation matches the approved plan deltas.

Review these artifacts only:
- Spec: {SPEC_REFERENCE}
- Plan: {PLAN_REFERENCE}
- Plan progress: {PLAN_PROGRESS_REFERENCE}
- Deltas: {DELTA_LOG_REFERENCE}
- Changed artifacts: {CHANGED_ARTIFACTS}
- Verification evidence: {VERIFICATION_EVIDENCE}

Do not trust the implementer's report. Verify against code and recorded deltas.

Check:
1. Was everything changed that the approved delta required?
2. Was anything changed that the approved delta did not allow?
3. Were emergency path changes recorded properly?
4. Do task cards, artifacts, and verification evidence describe the same changed scope?
5. Do verification artifacts cover the changed behavior?

Output format:

### Findings
#### Critical
[Silent scope creep, missing required behavior, unapproved interface changes]

#### Important
[Weak delta logging, partial compliance, missing verification]

#### Minor
[Documentation drift, naming, cleanup]

### Assessment
**Spec-compliant with deltas?** [Yes/No/With fixes]
**Return path:** [executing-plans.dispatch / human gate / quality review]
```
