# Card Update Rules

Task cards are rendered from task nodes. Do not hand-edit status boards.

## Canonical Statuses

- `backlog`: planned but dependencies are not yet satisfied
- `ready`: runnable, unassigned, or waiting for dispatch
- `in_progress`: owned by an active writer
- `blocked`: linked to one or more `blocker_ids`
- `review`: verification evidence attached, awaiting external review
- `done`: review passed or no further review is required
- `superseded`: replaced by a rolling re-plan but preserved for history

## Tracking Rules

- the orchestrator is the only writer of `plan-progress.md`
- graph views and kanban views are rendered from task nodes
- update task nodes first, then re-render human views
- task evidence belongs in `verification.evidence` and `artifacts`, not in free-form summaries
