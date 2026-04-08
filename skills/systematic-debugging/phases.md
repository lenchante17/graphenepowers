# Debugging Phases

Complete the phases in order. If a phase fails, go backward instead of stacking more fixes.

## Phase 1: Investigate

- read the full error, warning, stack trace, and affected paths
- reproduce the issue consistently; if you cannot, gather more evidence instead of guessing
- check recent changes, environment drift, config drift, and dependency changes
- in multi-component systems, instrument boundaries before proposing fixes
- if the symptom is deep in the stack, trace the bad value or state backward to its source

Use:

- `techniques/defense-in-depth.md` for boundary instrumentation
- `techniques/root-cause-tracing.md` for backward tracing

Exit only when you can name where the failure appears and what evidence supports that claim.

## Phase 2: Compare

- find working examples in the same codebase
- compare the broken path against the working path completely
- list concrete differences, dependencies, and assumptions
- do not dismiss small differences until evidence rules them out

Exit only when you have a bounded list of meaningful differences to explain.

## Phase 3: Hypothesize

- state one hypothesis clearly: root cause X explains symptom Y because of evidence Z
- design the smallest test, probe, or change that can falsify that hypothesis
- test one variable at a time
- if the result is inconclusive, gather more evidence instead of layering fixes

Exit only when the hypothesis is either supported or disproven by evidence.

## Phase 4: Implement

- create a failing reproduction first; use `graphenepowers:test-driven-development` when code must change
- apply one fix that addresses the root cause, not the symptom
- rerun the targeted check and the most relevant related checks
- if the fix fails, return to Phase 1 with the new evidence
- if three fix attempts fail, stop and question the architecture, boundary design, or escalation path

Exit only when the original failure is resolved and the evidence shows the fix actually holds.

## Stop Signals

If you catch yourself thinking any of these, go back to Phase 1:

- quick fix now, investigate later
- just try this one change
- bundle several fixes and run tests once
- skip the reproduction because the cause seems obvious
- one more fix attempt after repeated failures
