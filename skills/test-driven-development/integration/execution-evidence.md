# Execution Evidence

`graphenepowers:executing-plans` should treat TDD evidence as task evidence.

## Attach to the Task Card

- failing and passing test commands in `verification.commands`
- proof of those runs in `verification.evidence`
- test files, logs, and generated fixtures in `artifacts`

## Verify Gate

A task without TDD evidence is not review-ready:

- no watched failing test -> not ready
- no watched passing test -> not ready
- implementer narration without command evidence -> not ready
