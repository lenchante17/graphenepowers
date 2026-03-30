# Result Packet W1

**Window ID:** `W1`

**Window Goal:** Land parser fixtures, failing tests, and parser core behind the locked v2 interface.

## Changed Artifacts

- `tests/widget/parser.fixtures.ts`
- `tests/widget/parser.test.ts`
- `src/widget/parser.ts`

## Completed Tasks

- `T1 Add parser fixtures`
- `T2 Add failing parser tests`
- `T3 Implement parser core`

## Acceptance Satisfied

- fixtures cover valid v2 payloads
- failing tests cover success and typed-error paths
- parser accepts locked v2 payloads
- parser errors remain typed

## Verification Evidence

- `npm test -- widget/parser --runInBand`
- outcome: passing

## Graph Delta

- no macro-graph change
- critical path unchanged
- `T3` moved to `review`

## Estimate Delta

- `T3` effort ran slightly above median but stayed within upper bound
- no window-level duration warning triggered

## Remaining Risks

- boundary adapter `T4` may reveal downstream type-coupling
- docs/examples `T5` still deferred

## Recommendation

- open `Quality Review` for `T3`
- if review passes, auto-commit `W2` with `T4` and `T5`
