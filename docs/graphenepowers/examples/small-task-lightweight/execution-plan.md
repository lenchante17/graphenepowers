# Plan-Progress CLI Guardrails Execution Plan

**Goal:** Tighten `plan-progress` CLI guardrails without changing the public workflow spine.

**Inputs:** `docs/graphenepowers/specs/2026-03-27-graphenepowers-improvement-proposals.md`

**Grade:** `Small Task`

**Planning Mode:** `lightweight`

**Execution Skill:** `graphenepowers:executing-plans`

**Progress Record:** `docs/graphenepowers/examples/small-task-lightweight/plan-progress.md`

---

## Macro Graph Overview

| ID | Task | Depends On | Duration E ± σ | Effort E ± σ | Notes |
|----|------|------------|----------------|--------------|-------|
| T1 | Add validator regression tests | `-` | `0.5h ± 0.25` | `0.75h ± 0.35` | Locks desired CLI behavior |
| T2 | Harden shared parser and validator | `T1` | `1.0h ± 0.5` | `1.25h ± 0.5` | Critical path |
| T3 | Update examples and operations docs | `T2` | `0.5h ± 0.25` | `0.75h ± 0.35` | Closes documentation gap |

## Task Detail

### Task T1: Add validator regression tests

**Depends on:** `-`
**Write Set:** `docs/graphenepowers/tools/plan-progress.test.cjs`
**Duration PERT:** `0.25 / 0.5 / 0.75h`
**Effort PERT:** `0.25 / 0.75 / 1.0h`
**Verification:** `node --test docs/graphenepowers/tools/plan-progress.test.cjs`

- [ ] Add a duplicate-task-id regression test
- [ ] Add a missing-blockers-section regression test
- [ ] Run the tests and confirm the desired failure mode first

### Task T2: Harden shared parser and validator

**Depends on:** `T1`
**Write Set:** `docs/graphenepowers/tools/lib/plan-progress.cjs`, `docs/graphenepowers/tools/validate-plan-progress.cjs`, `docs/graphenepowers/tools/render-plan-progress.cjs`
**Duration PERT:** `0.5 / 1.0 / 1.5h`
**Effort PERT:** `0.75 / 1.25 / 1.75h`
**Verification:** `node --test docs/graphenepowers/tools/plan-progress.test.cjs`

- [ ] Refactor common parsing into one shared helper
- [ ] Reject duplicate task ids
- [ ] Require the blockers section for the human view

### Task T3: Update examples and operations docs

**Depends on:** `T2`
**Write Set:** `docs/graphenepowers/examples/small-task-lightweight/`, `docs/graphenepowers/plan-progress-operations.md`
**Duration PERT:** `0.25 / 0.5 / 0.75h`
**Effort PERT:** `0.5 / 0.75 / 1.0h`
**Verification:** `node docs/graphenepowers/tools/validate-plan-progress.cjs docs/graphenepowers/examples/small-task-lightweight/plan-progress.md`

- [ ] Add a non-windowed `Small Task` example
- [ ] Document the task-event contract and operating loop
- [ ] Re-run validation on the new example
