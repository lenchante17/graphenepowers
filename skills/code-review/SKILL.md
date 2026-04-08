---
name: code-review
description: Use when reviewing a plan before execution or reviewing implementation after execution, especially when spec compliance and code quality must be checked by fresh reviewers with tightly scoped context
---
# Code Review
Run scoped reviews from evidence, not implementer narrative.
## Modes
- `Preflight Spec Review`: check plan or spec coherence before execution; return a one-page human-facing brief; failure -> `graphenepowers:writing-plans`
- `Spec Delta Review`: check approved deltas after replans or exception paths; failure -> `graphenepowers:executing-plans.dispatch`
- `Quality Review`: check bugs, regressions, missing tests, and weak verification before completion; failure -> `graphenepowers:executing-plans.dispatch`
## Read First
1. `review-policy.md`
2. the selected prompt in `review-modes/`
3. `docs/graphenepowers/templates/review-packet.md`
## Non-Negotiables
- Use a fresh clean-context reviewer per mode.
- Prefer bounded packets and task cards over session history.
- Do not approve final quality review without verification evidence.
- Treat findings as technical claims to verify, not social commands.
- If review drives a human gate, the returned brief must be self-contained.
## Default Inputs
- `Preflight`: spec or contract, plan, classification summary, `plan-progress` seed
- `Spec Delta`: approved plan, deltas, relevant task cards, changed artifacts, verification evidence
- `Quality`: review-ready task cards, diff, tests, verification evidence
