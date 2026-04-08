# Plan Progress

Seed the machine record once, then let execution own updates.

Use a human-facing title like `Plan Progress` for the document heading. Keep the filename as `plan-progress.md`, but do not reuse the literal filename as the first `#` heading because HTML projections use that heading as the page title.

Prefer a human-first document order:

1. human view sections
2. `## Machine Record`

The YAML block is still the source of truth even when it appears later in the document.

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
# Plan Progress

## Human View Summary
| Focus | Value |
|-------|-------|
| Grade | `Small Task` |
| Planning Mode | `lightweight` |
| Confidence | `medium` |
| Estimated Duration | `2.5h` |
| Estimated Effort | `3.5h` |

### Execution Snapshot
| ID | Task | Status | Review | Owner |
|----|------|--------|--------|-------|

### Dependencies And Estimates
| ID | Depends On | Duration E +/- sigma | Effort E +/- sigma |
|----|------------|-----------------------|--------------------|

## Human View Graph Summary
| Focus | Value |
|-------|-------|
| Critical Path | `T1 -> T3` |
| Ready Parallel Lanes | `T1` |

### Dependency Levels
| Level | Tasks |
|-------|-------|
| 0 | `T1` |
| 1 | `T2` |
| 2 | `T3` |

## Human View Kanban
| Status | Tasks |
|--------|-------|
| Ready | `T1 Example task` |

## Human View Review Queue
| Review Item | State |
|-------------|-------|
| `T1 Quality Review` | `not needed` |

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
