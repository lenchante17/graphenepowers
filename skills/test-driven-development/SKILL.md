---
name: test-driven-development
description: Use when implementing any feature or bugfix, before writing implementation code
---
# Test-Driven Development
Use this skill as the entry and routing document for TDD.
## Read In Order
1. `policy.md`
2. `cycle.md`
3. `guardrails.md`
4. `integration/execution-evidence.md`
## When To Use
- any feature, bugfix, refactor, or behavior change that writes production code
- ask the human before exceptions such as throwaway prototypes, generated code, or config-only changes
## Non-Negotiables
- no production code without a failing test first
- if production code exists before RED, delete or discard it and restart
- one behavior per cycle; no bundled changes
- a task without RED and GREEN evidence is not review-ready
## Handoff
- `graphenepowers:executing-plans` should attach failing and passing test evidence to the task card
