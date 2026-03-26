# plan-progress.md

## Machine Record
```yaml
meta:
  plan_version: 1
  grade: Feature
  confidence: medium
  profile_asymmetry: 0.49
  critical_path: [T1, T2, T4, T5]
  estimated_duration: 6.5h
  estimated_effort: 8.5h
  started_at: 2026-03-26
  completed_at: 2026-03-26
  writer: executing-plans-orchestrator

tasks:
  - id: T1
    name: Audit upstream public surface
    depends_on: []
    duration_pert: {o: 0.25, m: 0.5, p: 1.0}
    effort_pert: {o: 0.25, m: 0.5, p: 1.0}
    status: done
    active_agent_time: null
    elapsed_active_time: null
    owner: codex
    write_set: []
    acceptance:
      - User-facing files that need rebranding or replacement are identified.
      - The approved public core skill set is mapped to concrete files.
    verification:
      commands:
        - rg -n "superpowers|graphenepowers|claude|cursor|codex|opencode|gemini" README.md docs .codex .opencode .claude-plugin .cursor-plugin skills package.json gemini-extension.json
      evidence:
        - public surface audited before rebrand
    artifacts:
      - docs/graphenepowers/plans/2026-03-26-graphenepowers-fork-rebrand.md
    review_state: none
    blocker_ids: []
  - id: T2
    name: Rebrand docs and installation entry points
    depends_on: [T1]
    duration_pert: {o: 1.0, m: 2.0, p: 4.0}
    effort_pert: {o: 1.5, m: 2.5, p: 5.0}
    status: done
    active_agent_time: null
    elapsed_active_time: null
    owner: codex
    write_set:
      - README.md
      - .codex/INSTALL.md
      - .opencode/INSTALL.md
      - docs/README.codex.md
      - docs/README.opencode.md
    acceptance:
      - New users see GraphenePowers branding first.
      - Installation examples use graphenepowers paths and invocation names.
      - Fork lineage to obra/superpowers remains explicit.
    verification:
      commands:
        - rg -n "superpowers" README.md docs .codex .opencode .claude-plugin .cursor-plugin package.json gemini-extension.json
      evidence:
        - root README and install docs rewritten for graphenepowers
    artifacts: []
    review_state: none
    blocker_ids: []
  - id: T3
    name: Curate the skill tree
    depends_on: [T1]
    duration_pert: {o: 1.0, m: 2.0, p: 3.0}
    effort_pert: {o: 1.5, m: 2.5, p: 4.0}
    status: done
    active_agent_time: null
    elapsed_active_time: null
    owner: codex
    write_set:
      - skills/
    acceptance:
      - Only the approved GraphenePowers core skills are publicly exposed.
      - Required companion files remain present for exposed skills.
      - Exposed skills consistently use graphenepowers naming.
    verification:
      commands:
        - find skills -maxdepth 2 -type f | sort
        - rg -n "using-superpowers|superpowers:" skills
      evidence:
        - curated skills copied from local graphenepowers tree
    artifacts: []
    review_state: none
    blocker_ids: []
  - id: T4
    name: Update platform integration metadata
    depends_on: [T2, T3]
    duration_pert: {o: 0.5, m: 1.0, p: 2.0}
    effort_pert: {o: 0.75, m: 1.5, p: 3.0}
    status: done
    active_agent_time: null
    elapsed_active_time: null
    owner: codex
    write_set:
      - .claude-plugin/plugin.json
      - .claude-plugin/marketplace.json
      - .cursor-plugin/plugin.json
      - gemini-extension.json
      - package.json
      - commands/
      - agents/
      - hooks/
    acceptance:
      - Public metadata surfaces graphenepowers identifiers where required.
      - Command and agent metadata point at the new workflow.
      - Supported platforms remain intact.
    verification:
      commands:
        - rg -n "superpowers|using-superpowers|write-plan|execute-plan|brainstorm" .claude-plugin .cursor-plugin commands agents hooks package.json gemini-extension.json
      evidence:
        - plugin metadata and bootstrap files rebranded
    artifacts: []
    review_state: none
    blocker_ids: []
  - id: T5
    name: Verify and prepare remote handoff
    depends_on: [T2, T3, T4]
    duration_pert: {o: 0.5, m: 1.0, p: 2.0}
    effort_pert: {o: 0.75, m: 1.5, p: 2.5}
    status: done
    active_agent_time: null
    elapsed_active_time: null
    owner: codex
    write_set:
      - .
    acceptance:
      - Stale public superpowers references are either removed or intentionally documented.
      - The diff is reviewable and no required support files are missing.
      - The target remote state is clearly reported.
    verification:
      commands:
        - git status --short
        - rg -n "superpowers" .
        - git diff --stat
      evidence:
        - origin pushed successfully to lenchante17/graphenepowers
        - local branch now tracks origin/main over SSH
    artifacts: []
    review_state: none
    blocker_ids: []

blockers: []

events:
  - task_id: T1
    kind: task_completed
    note: Audited upstream public surface and identified public rebrand targets.
  - task_id: T2
    kind: task_ready_for_review
    note: Rewrote root and platform install docs for graphenepowers.
  - task_id: T3
    kind: task_ready_for_review
    note: Replaced the public skill tree with the curated GraphenePowers core set.
  - task_id: T4
    kind: task_ready_for_review
    note: Rebranded plugin metadata, bootstrap hooks, and OpenCode package entry point.
  - task_id: T5
    kind: blocker_opened
    note: Remote origin was configured, but GitHub auth blocked non-interactive verification.
  - task_id: T5
    kind: blocker_resolved
    note: SSH authentication succeeded and the target repository was created.
  - task_id: T5
    kind: task_completed
    note: Local commit fed3bf6 was pushed to origin/main and tracking was configured.
```

## Human View Summary
| ID | Task | Depends On | Duration E +/- sigma | Effort E +/- sigma | Status | Review | Owner |
|----|------|------------|----------------------|--------------------|--------|--------|-------|
| T1 | Audit upstream public surface | - | 0.54h +/- 0.16h | 0.54h +/- 0.16h | done | none | codex |
| T2 | Rebrand docs and installation entry points | T1 | 2.17h +/- 0.50h | 2.75h +/- 0.58h | done | none | codex |
| T3 | Curate the skill tree | T1 | 2.00h +/- 0.33h | 2.58h +/- 0.42h | done | none | codex |
| T4 | Update platform integration metadata | T2, T3 | 1.08h +/- 0.25h | 1.63h +/- 0.38h | done | none | codex |
| T5 | Verify and prepare remote handoff | T2, T3, T4 | 1.08h +/- 0.25h | 1.54h +/- 0.29h | done | none | codex |

## Human View Kanban
### Done
- `T2 Rebrand docs and installation entry points`
  - owner: `codex`
  - acceptance: GraphenePowers branding and install names replace superpowers in the public docs
- `T3 Curate the skill tree`
  - owner: `codex`
  - acceptance: only the approved GraphenePowers core skills are publicly exposed
- `T4 Update platform integration metadata`
  - owner: `codex`
  - acceptance: plugin and command metadata point at graphenepowers
- `T5 Verify and prepare remote handoff`
  - owner: `codex`
  - acceptance: stale public superpowers references are reviewed and the remote state is reported
