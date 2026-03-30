# Plan-Progress Operations

This guide turns the `plan-progress.md` rules into an operating loop.

Use it with:

- `graphenepowers:writing-plans`
- `graphenepowers:executing-plans`
- `docs/graphenepowers/templates/plan-progress.md`
- `docs/graphenepowers/schemas/plan-progress.schema.yaml`
- `docs/graphenepowers/schemas/task-event.schema.yaml`
- `docs/graphenepowers/tools/validate-plan-progress.cjs`
- `docs/graphenepowers/tools/render-plan-progress.cjs`

## Source of Truth

`plan-progress.md` is one file with two roles:

- machine record in the `## Machine Record` YAML block
- rendered human views below it

The YAML is the source of truth. Summary tables, graph summaries, kanban views, and review queues are views derived from the task nodes.

## Single-Writer Rule

Only the orchestrator updates `plan-progress.md`.

Workers may:

- implement code or docs
- gather verification evidence
- emit structured events

Workers may not:

- rewrite the machine record directly
- hand-edit rendered kanban sections
- invent review state without evidence

## Lightweight vs Windowed

Use `lightweight` for `Small Task`.

- keep the whole task graph explicit
- omit `current_window_id`, `window_status`, and current-window sections
- still keep blockers, review state, and verification evidence visible

Use `windowed` for `Feature`.

- keep the macro graph visible
- fully detail only the committed window
- attach result packets at window boundaries

See:

- `docs/graphenepowers/examples/small-task-lightweight/`
- `docs/graphenepowers/examples/feature-windowed/`

## Task-Event Contract

Workers should emit `task_event` payloads instead of mutating the state file directly.

Canonical schema:

- `docs/graphenepowers/schemas/task-event.schema.yaml`

Minimum useful event:

```yaml
task_event:
  task_id: T2
  kind: task_completed
  status: review
  active_agent_time: 0.6h
  elapsed_active_time: 0.3h
  verification:
    commands:
      - node --test docs/graphenepowers/tools/plan-progress.test.cjs
    evidence:
      - duplicate-id regression test is green
  artifacts:
    - docs/graphenepowers/tools/validate-plan-progress.cjs
```

## Recommended Loop

1. Seed the file from the plan template.
2. Run the validator before dispatch.
3. Dispatch work with scoped packets.
4. Collect `task_event` payloads.
5. Update the YAML machine record only.
6. Re-render the human sections from the updated task nodes.
7. Run the validator again after each durable state change.

## Verification Commands

Use the validator to catch structural drift:

```bash
node docs/graphenepowers/tools/validate-plan-progress.cjs <plan-progress.md>
```

Use the renderer for quick terminal summaries:

```bash
node docs/graphenepowers/tools/render-plan-progress.cjs <plan-progress.md>
```

Use the tool tests when modifying parser or CLI behavior:

```bash
node --test docs/graphenepowers/tools/plan-progress.test.cjs
```

## Common Failure Modes

- duplicate task ids: review and execution state can attach to the wrong card
- missing blockers section: hidden blocker state drifts outside the record
- hand-edited human views: YAML and rendered status disagree
- worker-written state changes: history becomes race-prone

## Operational Rule of Thumb

If you cannot answer "which task card owns this change, what verified it, and who wrote the state update?" then the `plan-progress.md` record is too weak.
