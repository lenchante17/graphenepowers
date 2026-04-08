# TDD Policy

TDD is the default rule for production code.

## Rules

- no production code without a failing test first
- the failing test must fail for the expected reason
- if production code exists before RED, delete or discard it and restart from the test
- one failing behavior, one minimal fix, then refactor
- exceptions require explicit human approval

## Exceptions That Need Approval

- throwaway prototypes
- generated code
- config-only changes

## Red Flags

- "I'll test after"
- "It's too small to test"
- "I already manually checked it"
- "I'll keep this code as reference"
