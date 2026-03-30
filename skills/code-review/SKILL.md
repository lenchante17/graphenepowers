---
name: code-review
description: Use when reviewing a plan before execution or reviewing implementation after execution, especially when spec compliance and code quality must be checked by fresh reviewers with tightly scoped context
---

# Code Review

## Overview

One public skill, multiple review passes.

**Core principle:** Reviewers do not trust implementers, and implementers do not review themselves.

**Announce at start:** "I'm using the code-review skill to run scoped review passes."

Support asset for clean-context reviewers:

- `code-review/subagents/review-subagent/AGENTS.md`
- `code-review/review-policy.md`

Workflow assets in this skill:

- `code-review/review-modes/` - mode-specific reviewer prompts
- `code-review/subagents/` - reviewer agent instructions
- `code-review/review-policy.md` - input policy and shared review rules

## Review Modes

### `Preflight Spec Review`
Use after `writing-plans` for `Feature`, or for any `Small Task` elevated by a classification hard override.

- Checks plan/spec coherence before expensive execution starts
- Checks that seeded task cards have usable `write_set`, `acceptance`, `verification`, and expected artifacts
- For `Feature`, checks the design contract, macro graph, and first committed window
- Failure returns to `graphenepowers:writing-plans`
- Template: `code-review/review-modes/preflight-spec-reviewer.md`

### `Spec Delta Review`
Use after execution if rolling re-plan, exception paths, or scope drift occurred.

- Checks implementation against approved deltas, not implementer claims
- Uses relevant task cards from `plan-progress.md` and result packets as the primary scope/evidence summary when available
- Failure returns to `graphenepowers:executing-plans.dispatch`
- Template: `code-review/review-modes/spec-delta-reviewer.md`

### `Quality Review`
Use after execution is complete and verification evidence exists.

- Checks bugs, regressions, missing tests, risky design, and production readiness
- Uses review-ready task cards, artifacts, and verification evidence instead of implementer summaries when available
- Failure returns to `graphenepowers:executing-plans.dispatch`
- Template: `code-review/review-modes/quality-reviewer.md`

## Workflow Router

Read these files before choosing a review mode:

1. `code-review/review-policy.md`
2. the specific prompt in `code-review/review-modes/`

## Quick Reference

| Mode | Inputs | Failure Return |
|------|--------|----------------|
| `Preflight Spec Review` | spec or design contract, plan, classification summary, `plan-progress` seed | `graphenepowers:writing-plans` |
| `Spec Delta Review` | approved plan, deltas, relevant task cards, result packets, changed files | `graphenepowers:executing-plans.dispatch` |
| `Quality Review` | review cards, diff, tests, verification evidence | `graphenepowers:executing-plans.dispatch` |

## Common Mistakes

**One reviewer for every pass**
- **Problem:** Same blind spot repeated
- **Fix:** Fresh reviewer per mode

**Sending session history**
- **Problem:** Reviewer follows your narrative instead of the artifacts
- **Fix:** Send only scoped context and concrete files

**Reviewing without verification evidence**
- **Problem:** "Looks fine" replaces proof
- **Fix:** Require commands, outputs, and changed artifacts

**Ignoring task cards and trusting the summary**
- **Problem:** Reviewer misses acceptance criteria, artifacts, or blocked scope drift already recorded in `plan-progress.md`
- **Fix:** Load the relevant task cards first, then inspect code and evidence

**Treating findings as orders instead of technical claims**
- **Problem:** implementers blindly apply unclear or context-free review comments
- **Fix:** verify each finding against code, tests, and the approved contract before changing anything

**Partial implementation of unclear feedback**
- **Problem:** linked issues get fixed inconsistently and create new drift
- **Fix:** clarify all unclear items first, then implement confirmed fixes one item at a time with verification

## Integration

**Called by:**
- `graphenepowers:executing-plans`
- `graphenepowers:writing-plans` for preflight review

**Uses templates:**
- `code-review/review-modes/preflight-spec-reviewer.md`
- `code-review/review-modes/spec-delta-reviewer.md`
- `code-review/review-modes/quality-reviewer.md`
