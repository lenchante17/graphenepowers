# Widget Parser Migration Execution Plan

**Goal:** Migrate widget parsing to the v2 contract without breaking typed error handling.

**Inputs:** `docs/graphenepowers/specs/2026-03-30-widget-parser-design.md`

**Grade:** `Feature`

**Planning Mode:** `windowed`

**Execution Skill:** `graphenepowers:executing-plans`

**Progress Record:** `docs/graphenepowers/examples/feature-windowed/plan-progress.md`

**Design Contract:** `docs/graphenepowers/specs/2026-03-30-widget-parser-design.md`

---

## Macro Graph Overview

| ID | Task | Depends On | Duration E ± σ | Effort E ± σ | Notes |
|----|------|------------|----------------|--------------|-------|
| T1 | Add parser fixtures | `-` | `0.5h ± 0.25` | `0.75h ± 0.35` | Enables downstream tests |
| T2 | Add failing parser tests | `T1` | `0.75h ± 0.35` | `1.0h ± 0.5` | TDD entry |
| T3 | Implement parser core | `T2` | `1.5h ± 0.75` | `2.5h ± 1.0` | Critical path |
| T4 | Adapt boundary layer | `T3` | `1.0h ± 0.5` | `1.5h ± 0.75` | Critical path |
| T5 | Update docs/examples | `T4` | `0.5h ± 0.25` | `0.5h ± 0.25` | Deferred outside W1 |

## Current Window

**Window ID:** `W1`

**Window Goal:** Land parser fixtures, failing tests, and parser core behind the locked v2 interface.

**Admitted Tasks:** `T1`, `T2`, `T3`

**Deferred Outside Window:** `T4`, `T5`

**Replan Triggers:**

- locked parser interface must change
- new external dependency becomes necessary
- parser core reveals unresolved structural discovery

## Task Detail

### Task T1: Add parser fixtures

**Depends on:** `-`
**Write Set:** `tests/widget/parser.fixtures.ts`
**Duration PERT:** `0.25 / 0.5 / 0.75h`
**Effort PERT:** `0.25 / 0.75 / 1.0h`
**Verification:** `npm test -- widget/parser --runInBand`

- [ ] Add canonical fixtures for v2 payloads
- [ ] Confirm fixture coverage includes typed error cases

### Task T2: Add failing parser tests

**Depends on:** `T1`
**Write Set:** `tests/widget/parser.test.ts`
**Duration PERT:** `0.5 / 0.75 / 1.25h`
**Effort PERT:** `0.75 / 1.0 / 1.5h`
**Verification:** `npm test -- widget/parser --runInBand`

- [ ] Write failing tests for accepted v2 payloads
- [ ] Write failing tests for typed parser errors
- [ ] Run tests and confirm correct failure

### Task T3: Implement parser core

**Depends on:** `T2`
**Write Set:** `src/widget/parser.ts`, `tests/widget/parser.test.ts`
**Duration PERT:** `1.0 / 1.5 / 2.25h`
**Effort PERT:** `1.5 / 2.5 / 3.5h`
**Verification:** `npm test -- widget/parser --runInBand`

- [ ] Implement minimal parser behavior to pass W1 tests
- [ ] Keep errors typed under locked contract
- [ ] Run verification and capture evidence
