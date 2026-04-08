---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
---
# Systematic Debugging
Debug from evidence. Do not guess.
## When To Use
- test failures
- production bugs
- unexpected behavior
- build or integration failures
- performance issues with unclear cause
## Read In Order
1. `phases.md`
2. `techniques/root-cause-tracing.md` when the failure is deep in the stack or a bad value must be traced backward
3. `techniques/defense-in-depth.md` when multiple components or boundaries may be involved
4. `techniques/condition-based-waiting.md` when timing, races, or flaky waits are involved
## Non-Negotiables
- no fixes without root cause investigation first
- reproduce, read errors fully, and check recent changes before proposing fixes
- instrument boundaries before guessing in multi-component systems
- form one hypothesis at a time and test it minimally
- if code change is needed, create a failing reproduction first through `graphenepowers:test-driven-development`
- if three fix attempts fail, stop and question the architecture or escalation path
## Handoff
- return to execution only with concrete evidence, a root-cause hypothesis, or a verified fix
