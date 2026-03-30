# Retrospective Process

Run retrospective from evidence, then decide whether the process or closeout should change.

## Step 1: Load Evidence

Collect:

- classification summary from `graphenepowers:using-graphenepowers`
- plan doc
- design contract when relevant
- `plan-progress.md`
- graph summary or graph snapshots when available
- critical-path history when available
- task card history from events and rendered kanban
- result packets when available
- review findings
- verification evidence

If there is no usable execution record, say so explicitly and do a lightweight retrospective only.

## Step 2: Analyze Deviations

Check:

- effort deviation versus `effort_pert`
- duration deviation versus `duration_pert`
- critical-path movement and slack erosion
- blocker type distribution
- lane churn and task re-open patterns
- artifact and evidence completeness on `review` and `done` cards
- gate frequency
- rolling re-plan frequency
- superseded-card frequency
- review failure patterns

Use these interpretations:

- high effort with normal duration -> expensive but parallelizable
- high duration with normal effort -> waiting or dependency bottleneck
- repeated blocker on critical path -> sequencing problem
- repeated `in_progress -> blocked -> in_progress` on the same card -> blocker surfaced too late
- repeated `review -> dispatch` on the same card -> acceptance, verification, or review timing problem
- many `superseded` cards -> planning granularity or re-plan discipline problem
- missing evidence on `review` or `done` cards -> execution discipline problem
- repeated review failures -> execution discipline or review calibration problem

## Step 3: Decide Process Change

Draft a process change only when:

- the same pattern repeated
- a single incident exposed a structural flaw
- the current protocol hid risk instead of surfacing it

If the issue is local to the implementation, do not mutate the global process.

Target the owning skill:

| Pattern | Target |
|---------|--------|
| Bad classification | `graphenepowers:using-graphenepowers` routing |
| Bad sequencing or estimates | `graphenepowers:writing-plans` |
| Bad orchestration or gate behavior | `graphenepowers:executing-plans` |
| Review blind spot | `graphenepowers:code-review` |
| Root-cause failures | `graphenepowers:systematic-debugging` |

Write short, falsifiable change notes. Record `hypothesis` and `reproducibility` before proposing a process change.

## Step 4: Apply Anti-Overfitting Rules

- a single outlier does not automatically justify changing a skill
- record `hypothesis` and `reproducibility` before proposing a process change
- only propose a skill change immediately when one incident reveals a structural flaw, not just a noisy run

## Step 5: Present Completion Options

If this is a git work item, present exactly these options:

```text
Work is complete. What would you like to do?

1. Merge locally
2. Push and create a Pull Request
3. Keep the branch as-is
4. Discard this work
```

If this is not a git repository, skip directly to the retrospective summary.

### Execute the Chosen Outcome

- Merge locally: verify the merged result, then clean up isolated workspace if applicable
- Push and create PR: include summary and test plan
- Keep as-is: preserve branch or worktree and report location
- Discard: require explicit confirmation before deleting branch or worktree
