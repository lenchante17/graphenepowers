# Plan Document

Write a human-readable plan that matches the execution graph.

## Required Header

````markdown
# [Topic] Execution Plan

**Goal:** [One sentence]

**Inputs:** [spec path or requirements source]

**Grade:** [Small Task | Feature]

**Planning Mode:** [lightweight | windowed]

**Execution Skill:** `graphenepowers:executing-plans`

**Human Gates:** `docs/graphenepowers/human-gates.md`

**Progress Record:** `docs/graphenepowers/plans/YYYY-MM-DD-<topic>-plan-progress.md`

**Design Contract:** [required path for `Feature`, optional for `Small Task`]

**Reclassification Record:** [optional path if the route changed after initial triage]

---
````

## Task Section Template

````markdown
### Task T1: [Name]

**Depends on:** `-`
**Write Set:** `src/foo.ts`, `tests/foo.test.ts`
**Duration PERT:** `0.5 / 1 / 2h`
**Effort PERT:** `0.5 / 1.5 / 2.5h`
**Verification:** `npm test -- foo`

- [ ] Step 1: Write the failing test
- [ ] Step 2: Run it and confirm correct failure
- [ ] Step 3: Implement minimal code
- [ ] Step 4: Run verification and confirm pass
````

## Exactness Rules

- use exact file paths, task ids, and verification commands
- make `write_set`, acceptance, and produced artifacts specific enough that a clean-context worker does not have to infer ownership
- when a step changes code, name the concrete files, functions, interfaces, or tests involved instead of saying "update logic" or "handle edge cases"
- do not reference functions, types, files, or commands that the plan never defines
- call out any task-specific human gate when a task can threaten a locked interface, invariant, dependency, or public surface

## No Placeholders

These phrases are plan failures unless replaced with concrete detail:

- `TBD`, `TODO`, `implement later`, `fill in details`
- `add appropriate error handling`, `add validation`, `handle edge cases`
- `write tests for the above`
- `similar to Task ...`
- any step that names work without naming the owned files, acceptance target, or verification command

Use `writing-plans/scripts/check-plan-placeholders.cjs <plan-doc>` against saved plan documents before handoff.

## Self-Review

Before preflight review or execution handoff:

1. check spec coverage: every locked requirement should map to at least one task
2. run a placeholder scan and replace vague language with concrete ownership, paths, and commands
3. check name and interface consistency across tasks so later steps do not call symbols or files that earlier tasks never introduced
