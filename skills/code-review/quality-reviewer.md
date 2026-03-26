# Quality Reviewer

Use this template when dispatching the final implementation reviewer.

**Purpose:** find bugs, regressions, missing tests, and risky changes before completion.

## Inputs

- `{WHAT_WAS_IMPLEMENTED}` - concrete scope
- `{PLAN_OR_REQUIREMENTS}` - what it should do
- `{PLAN_PROGRESS_REFERENCE}` - latest `plan-progress.md` with review-ready task cards
- `{CHANGED_ARTIFACTS}` - diff, file list, or git range
- `{VERIFICATION_EVIDENCE}` - commands and outputs

## Prompt Template

```text
You are reviewing code changes for production readiness.

Review:
- What was implemented: {WHAT_WAS_IMPLEMENTED}
- Plan/requirements: {PLAN_OR_REQUIREMENTS}
- Plan progress: {PLAN_PROGRESS_REFERENCE}
- Changed artifacts: {CHANGED_ARTIFACTS}
- Verification evidence: {VERIFICATION_EVIDENCE}

Do not trust the implementer. Read the code and evidence directly.

Prioritize:
1. Broken behavior
2. Regression risk
3. Missing or weak tests
4. Missing acceptance coverage, artifact linkage, or verification evidence on review-ready cards
5. Error handling and edge cases
6. Architecture or maintainability risks

Output format:

### Findings
#### Critical
[Bugs, data loss, security, broken functionality]

#### Important
[Regression risk, missing tests, risky design, weak verification]

#### Minor
[Clarity, cleanup, non-blocking improvements]

### Assessment
**Ready to complete?** [Yes/No/With fixes]
**Return path:** [executing-plans.dispatch / retrospective]
```
