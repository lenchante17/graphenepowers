# TDD Cycle

Follow the cycle in order. Do not skip steps because the change feels small.

## RED

Write one minimal test for one behavior, then watch it fail for the right reason.

### Requirements

- one behavior per test
- clear name
- real behavior, not mock theater, unless mocking is unavoidable

### Verify RED

Run the specific test and confirm:

- it fails, not errors
- the failure message is expected
- it fails because the feature is missing, not because of setup noise

If the test passes immediately, you are testing existing behavior or the wrong thing. Fix the test first.

## GREEN

Write the smallest production change that makes the failing test pass.

### Rules

- implement only what the failing test demands
- do not add adjacent features
- do not refactor unrelated code yet
- if other tests fail, fix the implementation now

### Verify GREEN

Run the targeted test again and confirm:

- the new test passes
- related tests still pass
- output is clean enough to trust

## REFACTOR

Refactor only after green.

### Allowed Work

- remove duplication
- improve names
- extract helpers
- simplify structure

### Rules

- keep behavior unchanged
- keep tests green throughout
- do not smuggle new behavior into refactor work

Then repeat with the next failing test.
