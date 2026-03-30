# Micro Fast Path

Use this guide when `graphenepowers:using-graphenepowers` routes work to `Micro`.

`Micro` work should feel lighter, not sloppier. The fast path exists to cut document overhead while keeping verification discipline.

## When `Micro` Fits

Choose the fast path when all of the following are true:

- the change is isolated enough that one person can fully hold it in working memory
- rollback is easy
- no public interface changes are expected
- no new external dependency appears
- the verification command is obvious before editing starts

Typical `Micro` examples:

- adjust one validation branch in a single file
- tighten an error message or log line without changing behavior contracts
- fix a typo in a command, script, or doc example
- add a missing assertion to an existing focused test
- repair a broken path in a local workflow script

## Minimum Evidence

`Micro` skips the full plan document, but it does not skip evidence.

Always keep these four things visible:

1. what you intended to change
2. which files you touched
3. which command verified the result
4. whether any follow-up risk remains

A compact close-out is enough:

```text
Scope: fix the missing blockers-section check in the validator
Files: docs/graphenepowers/tools/validate-plan-progress.cjs
Verification: node --test docs/graphenepowers/tools/plan-progress.test.cjs
Residual risk: parser still only supports the canonical plan-progress shape
```

## What You May Skip

For true `Micro` work, you may skip:

- a full execution plan
- `plan-progress.md`
- explicit subagent packets
- retrospective beyond a brief note when nothing unusual happened

Do not skip:

- verification
- clear scope statement
- escalation when the work stops being `Micro`

## Promotion Signals

Promote the work out of `Micro` immediately if any of these appear:

- the write set expands across multiple modules
- the fix needs a new invariant or design choice
- a public interface may change
- verification requires multiple commands or multi-step coordination
- the root cause is unclear enough to require `graphenepowers:systematic-debugging`
- the same task keeps reopening after review or verification

If promotion happens, re-run the classification step in `canonical-skills/skills/using-graphenepowers/routing/triage.md`. Do not keep using the fast path because the work started small.

## Micro Workflow

1. Confirm the change is still isolated.
2. State the verification command before editing.
3. Make the narrowest effective change.
4. Run verification immediately.
5. Report scope, files, verification, and residual risk.

## Worked Examples

### Example A: Single-file validator fix

- scope: reject duplicate task ids in `plan-progress.md`
- verification: `node --test docs/graphenepowers/tools/plan-progress.test.cjs`
- still `Micro` because the change is local and the test boundary is obvious

### Example B: Small doc correction

- scope: fix a stale command path in a skill reference
- verification: manual path check plus any directly affected doc command
- still `Micro` because no workflow contract changed

### Example C: Promotion to `Small Task`

- initial scope: tweak one validator check
- discovered scope: example docs, schema, shared parser, and rendering output all need updates
- result: promote to `Small Task`, write a lightweight plan, and track the work explicitly
