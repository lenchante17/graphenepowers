# Core Loop

Read these states in order during normal execution.

## `prepare`

Read the plan and `plan-progress.md` before dispatching any work.

### Responsibilities

- load the plan, current `plan-progress.md`, and any current `Feature` window summary
- reserve write ownership before assigning work
- decide whether workspace isolation is required
- normalize task lanes: no unmet dependencies -> `ready`, otherwise `backlog`
- create worktrees when predicted write sets overlap or multiple writers would touch the same module or interface

### Workspace Isolation Rules

When using git worktrees:

- choose the directory in this priority order: existing `.worktrees/`, existing `worktrees/`, otherwise explicit local convention or a new `.worktrees/`
- for project-local worktree directories, verify the directory is ignored before creation; if ignore rules are missing, stop and fix that before adding the worktree
- after creating the worktree, inspect project manifests to determine setup commands instead of assuming one stack
- verify a clean baseline in the fresh worktree before implementation; if baseline verification already fails, classify it as pre-existing environment or test debt and ask whether to proceed
- prefer `executing-plans/scripts/setup-worktree.sh` when you want the directory selection and ignore checks automated the same way every time

### Exit Criteria

- ready tasks are identified
- writer ownership is clear
- required isolation is in place
- initial task lanes are consistent with dependencies

## `dispatch`

Start only work that is actually runnable.

### Responsibilities

- select tasks whose `depends_on` set is fully satisfied
- dispatch only tasks with disjoint write sets
- send clean-context execution packets to workers when using subagents
- announce and use `graphenepowers:test-driven-development` before any production-code task
- record ownership before execution starts
- move selected cards from `ready` to `in_progress`

### Exit Criteria

- each running task has one owner
- overlapping write sets are not active in parallel
- every dispatched task has acceptance and verification context

## `track`

Capture durable state changes, not narration.

### Responsibilities

- collect structured worker events
- update `plan-progress.md`
- measure `elapsed_active_time` and `active_agent_time`
- update `status`, `blocker_ids`, `artifacts`, `verification`, and `review_state`
- re-render graph summary, review queue, and kanban after each durable transition
- watch for grade changes, blocker patterns, and verification debt
- record estimate warnings early when thresholds are crossed

### Exit Criteria

- machine record matches the latest durable execution state
- rendered human views match task nodes
- warnings and blockers are visible before they become surprises
