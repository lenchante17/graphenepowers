# TDD Guardrails

Good tests make the desired behavior obvious, and good TDD refuses rationalization.

## Test Quality

### Good Test Traits

- minimal: one behavior at a time
- clear: the name describes behavior
- intent-revealing: the test demonstrates the desired API or effect

### When Stuck

| Problem | Response |
|---------|----------|
| Don't know how to test | Write the wished-for API first and assert on it |
| Test setup is huge | Extract helpers, then simplify the design if it stays heavy |
| Must mock everything | The code is probably too coupled |
| Test feels awkward | The interface may be poorly shaped |

### Testing Anti-Patterns

Read `references/testing-anti-patterns.md` before adding mocks or test utilities. The main failure modes are:

- testing mock behavior instead of real behavior
- adding test-only methods to production code
- mocking without understanding the dependency boundary

## Rationalizations

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code still breaks. |
| "I'll test after" | Passing immediately proves nothing. |
| "Already manually tested" | Ad-hoc checks are not durable verification. |
| "Deleting this is wasteful" | Sunk cost does not create trust. |
| "It's spirit, not ritual" | Tests-after and tests-first are not equivalent. |
| "Need to explore first" | Exploration can be disposable, production code cannot. |

## Red Flags

If any of these are true, stop and restart the cycle:

- code existed before the failing test
- the test passed immediately
- you cannot explain the failure
- you are adding tests later
- you are defending an exception instead of asking for one
