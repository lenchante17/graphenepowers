# Rolling Re-Plan Rules

Re-plan only when one of these is true:

1. a critical-path predecessor completed
2. a blocker changed the structure of follow-up work
3. reclassification indicates a possible grade increase

## Re-Planning Rules

- re-run the classification step in `using-graphenepowers/routing/triage.md` for affected follow-up work
- raise a human gate if grade rises
- raise a human gate if `confidence = low`
- prefer re-windowing over whole-plan rewrite for `Feature`
- increment `plan_version`
- mark the previous plan slice as superseded instead of creating a new unrelated record
- move replaced cards to `superseded` instead of deleting them

## Thrash Prevention

- do not re-plan the same task set twice in a row without new evidence
- prefer updating the critical path and directly dependent tasks first
- if only task order changes slightly, log an event instead of incrementing `plan_version`
