# `plan-progress.md`

Seed the machine record once, then let execution own updates.

## Required Seed Fields

- `plan_version`
- `grade`
- `planning_mode`
- `confidence`
- `profile_asymmetry`
- `graph_version`
- `critical_path`
- `ready_parallel_lanes`
- `estimated_duration`
- `estimated_effort`
- initial task list with `duration_pert` and `effort_pert`
- task `status`
- task `owner`
- task `write_set`
- task `acceptance`
- task `verification`
- task `artifacts`
- task `review_state`
- task `blocker_ids`
- empty `blockers`
- empty `events` seeded for workflow events such as route reclassification

`plan-progress.md` is the state record for `graphenepowers:executing-plans`, not a second plan written from scratch.

## Route Reclassification

If the route changes after planning starts, append a structured event under `events` using `docs/graphenepowers/templates/reclassification-record.md`. Do not silently overwrite the previous grade or confidence without leaving a record of why the route changed and who approved it.

## Minimum Shape

````markdown
# `plan-progress.md`

## Machine Record
```yaml
meta:
  plan_version: 1
  grade: Small Task
  planning_mode: lightweight
  confidence: medium
  profile_asymmetry: 0.40
  graph_version: 1
  critical_path: [T1, T3]
  ready_parallel_lanes: [[T1]]
  estimated_duration: 2.5h
  estimated_effort: 3.5h
  started_at: null
  completed_at: null
  writer: executing-plans-orchestrator

tasks:
  - id: T1
    name: Example task
    depends_on: []
    duration_pert: {o: 0.5, m: 1.0, p: 2.0}
    effort_pert: {o: 0.5, m: 1.5, p: 2.5}
    status: ready
    active_agent_time: null
    elapsed_active_time: null
    owner: unassigned
    write_set:
      - src/example.ts
      - tests/example.test.ts
    acceptance:
      - behavior matches the approved requirement
    verification:
      commands:
        - npm test -- example
      evidence: []
    artifacts: []
    review_state: none
    blocker_ids: []

blockers: []
events: []
```

## Human View Summary
| ID | Task | Depends On | Duration E +/- sigma | Effort E +/- sigma | Status | Review | Owner |
|----|------|------------|-----------------------|--------------------|--------|--------|-------|

## Human View Graph Summary
- critical path: `T1 -> T3`
- ready parallel lanes: `T1`

## Human View Kanban
### Ready
- `T1 Example task`
  - owner: `unassigned`
  - acceptance: behavior matches the approved requirement
````

## Feature Additions

For `windowed` `Feature` plans, also add:

- `contract_ref`
- `current_window_id`
- `window_status`
- `critical_path_history`
- `replan_triggers`
- `result_packets`

Expose these human-facing views:

- graph summary
- current committed window
- deferred nodes outside the window
- review queue
- blocker table
