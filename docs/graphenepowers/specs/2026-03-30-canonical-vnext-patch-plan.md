# Canonical vNext Patch Plan

## Goal

Record the canonical vNext merge plan that brought the existing GraphenePowers spine forward with minimal disruption.

## Guiding Constraints

- keep `triage` as the single entry point
- preserve the current canonical skill names
- avoid introducing a new top-level replacement workflow
- add clean-context specialist subagents for execution, review, and retrospective
- strengthen graph scheduling, packet-based execution, and user-visible tracking

## Patch Order

1. `using-graphenepowers`
2. `triage`
3. `brainstorming`
4. `writing-plans`
5. `executing-plans`
6. `code-review`
7. `retrospective`

## Patch Intent by Skill

### 1. `using-graphenepowers`

- update the routing summary to `Micro`, `Small Task`, `Feature`
- make it explicit that `Feature` work may use design contract locking and windowed execution
- keep the public spine unchanged: classify -> plan/design -> execute -> review -> retrospective

### 2. `triage`

- reinterpret canonical `Task` as `Small Task`
- keep `Micro` and `Feature`
- add promotion guidance for `Feature` when design contract or committed windows are needed

### 3. `brainstorming`

- keep brainstorming as the feature-design entry point
- add a design-contract lock before handoff to planning
- keep the spec review loop and user review gate

### 4. `writing-plans`

- add `lightweight` and `windowed` planning modes
- preserve graph-first planning
- strengthen graph and kanban coupling
- define execution packet expectations for clean-context workers
- strengthen user-visible graph tracking requirements

### 5. `executing-plans`

- preserve the state machine and single-writer rule
- allow clean-context execution subagents under orchestrator control
- make graph-oriented and kanban-oriented tracking views explicit
- add result packet and next-window decision rules for feature work

### 6. `code-review`

- make clean-context specialist subagents explicit for each review pass
- preserve review modes
- keep scoped-artifact review as the default
- make review state visible in tracking views

### 7. `retrospective`

- make clean-context specialist retrospective agents explicit
- add graph, critical-path, kanban-history, and result-packet evidence for feature work
- preserve anti-overfitting rules

## Expected Outcome

After this patch:

- small work stays fast
- large work gains stronger anti-collapse planning
- execution, review, and retrospective become more isolated
- graph scheduling and kanban tracking become more visible to the user

## Risks

- terminology migration from `Task` to `Small Task` may leave residual wording in older docs
- `windowed` feature behavior may remain partially implicit until examples and templates are added
- user-visible tracking requirements will still need concrete renderer/templates later

## Completed Follow-Up Assets

The following support assets now exist:

- `docs/graphenepowers/templates/execution-plan.md`
- `docs/graphenepowers/templates/plan-progress.md`
- `docs/graphenepowers/templates/subagent-packets.md`
- `docs/graphenepowers/examples/feature-windowed/`
- `docs/graphenepowers/schemas/plan-progress.schema.yaml`
- `docs/graphenepowers/tools/validate-plan-progress.cjs`
- `docs/graphenepowers/tools/render-plan-progress.cjs`

## Remaining Follow-Up Work

1. align any remaining legacy docs that still assume only `Task`
2. decide whether draft copies of execution/review/retrospective subagent instruction files should remain for historical comparison or be reduced to references now that canonical copies exist
