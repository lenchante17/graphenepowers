# Review Policy

Reviewers should work from bounded artifacts, not full session history.

## Default Input Policy

- prefer relevant task cards from `plan-progress.md`
- include only the files, diffs, plans, and evidence the selected review mode needs
- keep classification or delta summaries short and concrete
- require verification evidence before final quality review

## Mode-Specific Input Focus

| Mode | Primary Inputs |
|------|----------------|
| `Preflight Spec Review` | spec or design contract, plan, classification summary, `plan-progress` seed |
| `Spec Delta Review` | approved plan, deltas, relevant task cards, result packets, changed files |
| `Quality Review` | review-ready task cards, diff, tests, verification evidence |

## Reviewer Discipline

- each review mode uses a fresh clean-context specialist reviewer
- never let the same reviewer do two modes for the same work item
- never pass session history when scoped artifacts will do
- prefer task cards over ad-hoc summaries when task cards contain the needed scope and evidence

## Review State Discipline

- keep review state visible in rendered tracking views
- Important or Critical findings block completion
- if a reviewer is wrong, push back with evidence, not vibes

## Handling Review Feedback

Treat review findings as technical claims to verify, not social commands to perform.

- read the full finding set before editing
- if any item is unclear, clarify the unclear items before implementing any subset
- check requested changes against codebase reality, compatibility constraints, and actual usage before accepting them
- if a finding conflicts with the approved plan, design contract, or a locked interface, stop and route back through the orchestrator or human gate
- push back factually when a reviewer is wrong, out of scope, or asking for unused speculative work
- implement confirmed fixes one item at a time and rerun the relevant verification instead of batching blind edits
- acknowledge correct feedback with the concrete fix or next technical action, not performative agreement
