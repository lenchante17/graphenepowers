# Recovery and Close

These states handle interruptions, evidence, and handoff.

## `unblock`

Block only the affected work unless the plan itself is no longer valid.

### Responsibilities

- classify blocker type: `Human`, `Environment`, `External`, `SpecAmbiguity`, `TestFlake`
- open a gate only for affected tasks unless the blocker invalidates the plan
- continue unrelated ready work
- use `graphenepowers:systematic-debugging` when root cause is unclear
- move affected cards to `blocked`
- restore cards to `ready` or `backlog` when the blocker clears

### Exit Criteria

- blocker scope is explicit
- unaffected tasks can continue
- blocked cards have `blocker_ids` and recovery conditions

## `verify`

Verification is a state transition with evidence, not a courtesy note.

### Responsibilities

- run the plan's required verification commands
- require command, output summary, and affected artifacts as evidence
- compare `elapsed_active_time` only to duration PERT
- compare `active_agent_time` only to effort PERT
- move successful tasks to `review` unless no further external review is required
- send clearly failed work back for rework
- use `graphenepowers:systematic-debugging` when failure cause is unclear
- mark retrospective candidates when `E + 2sigma` thresholds are exceeded

### Exit Criteria

- every completed verification has durable evidence
- successful tasks are review-ready
- estimate warnings are recorded separately from pass or fail status

## `close`

Close execution only after review state and final tracking views are up to date.

### Responsibilities

- attach a result packet when a `Feature` window completes
- hand off review-ready cards to `graphenepowers:code-review`
- move review-passed cards to `done`
- move review-failed cards back to `ready` or `backlog` with `review_state: changes_requested`
- finalize `plan-progress.md` after the review result is reflected
- summarize what passed, what remains open, and what changed from plan
- hand off to `graphenepowers:retrospective`

### Exit Criteria

- review outcomes are reflected in task state
- final tracking views are current
- next owner is explicit
