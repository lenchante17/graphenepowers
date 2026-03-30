# [Topic] Execution Plan

**Goal:** [One sentence]

**Inputs:** [spec path or requirements source]

**Grade:** [Small Task | Feature]

**Planning Mode:** [lightweight | windowed]

**Execution Skill:** `graphenepowers:executing-plans`

**Progress Record:** `docs/graphenepowers/plans/YYYY-MM-DD-<topic>-plan-progress.md`

**Design Contract:** `[optional path for Feature]`

---

## Macro Graph Overview

Use this section for `Feature` work. For `Small Task`, keep it brief or omit it.

| ID | Task | Depends On | Duration E ± σ | Effort E ± σ | Notes |
|----|------|------------|----------------|--------------|-------|
| T1 | [task] | `-` | [value] | [value] | [note] |
| T2 | [task] | `T1` | [value] | [value] | [note] |

## Current Window

**Window ID:** `W1`

**Window Goal:** [one sentence]

**Admitted Tasks:** `T1`, `T2`

**Deferred Outside Window:** `T3`, `T4`

**Replan Triggers:**

- [trigger]
- [trigger]

## Task Detail

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

### Task T2: [Name]

**Depends on:** `T1`
**Write Set:** `src/bar.ts`, `tests/bar.test.ts`
**Duration PERT:** `0.5 / 1 / 2h`
**Effort PERT:** `0.5 / 1.5 / 2.5h`
**Verification:** `npm test -- bar`

- [ ] Step 1: Write the failing test
- [ ] Step 2: Run it and confirm correct failure
- [ ] Step 3: Implement minimal code
- [ ] Step 4: Run verification and confirm pass
