# GraphenePowers Fork Rebrand Execution Plan

**Goal:** Rebuild the public face of the `obra/superpowers` fork as `graphenepowers`, with GraphenePowers v4 skills and platform installation docs for new users.

**Inputs:** Approved brainstorming in this session, local GraphenePowers skill tree source, upstream repository in this fork workspace

**Grade:** Feature

**Execution Skill:** `graphenepowers:executing-plans`

**Progress Record:** `docs/graphenepowers/plans/2026-03-26-graphenepowers-fork-rebrand-plan-progress.md`

---

### Task T1: Audit Upstream Public Surface

**Depends on:** `-`
**Write Set:** `-`
**Duration PERT:** `0.25 / 0.5 / 1h`
**Effort PERT:** `0.25 / 0.5 / 1h`
**Verification:** `rg -n "superpowers|graphenepowers|claude|cursor|codex|opencode|gemini" README.md docs .codex .opencode .claude-plugin .cursor-plugin skills package.json gemini-extension.json`

- [ ] Step 1: Inspect upstream README, install docs, plugin manifests, and skill layout.
- [ ] Step 2: Record the user-facing files that must be rebranded or replaced.
- [ ] Step 3: Confirm the target public workflow only exposes the approved core GraphenePowers skills.

### Task T2: Rebrand Docs And Installation Entry Points

**Depends on:** `T1`
**Write Set:** `README.md`, `.codex/INSTALL.md`, `.opencode/INSTALL.md`, `docs/README.codex.md`, `docs/README.opencode.md`, platform or plugin metadata files that surface install names
**Duration PERT:** `1 / 2 / 4h`
**Effort PERT:** `1.5 / 2.5 / 5h`
**Verification:** `rg -n "superpowers" README.md docs .codex .opencode .claude-plugin .cursor-plugin package.json gemini-extension.json`

- [ ] Step 1: Rewrite root and platform docs in English for new GraphenePowers users.
- [ ] Step 2: Replace installation paths, plugin IDs, repo URLs, and invocation examples with `graphenepowers`.
- [ ] Step 3: Preserve explicit lineage to `obra/superpowers` in user-facing docs.

### Task T3: Curate The Skill Tree

**Depends on:** `T1`
**Write Set:** `skills/`, any directly referenced support files under included skills
**Duration PERT:** `1 / 2 / 3h`
**Effort PERT:** `1.5 / 2.5 / 4h`
**Verification:** `find skills -maxdepth 2 -type f | sort && rg -n "using-superpowers|superpowers:" skills`

- [ ] Step 1: Replace upstream skills with the approved GraphenePowers core set and required support files.
- [ ] Step 2: Remove or archive legacy redirect skills from the default public tree.
- [ ] Step 3: Check internal references so exposed skills consistently use `graphenepowers` naming.

### Task T4: Update Platform Integration Metadata

**Depends on:** `T2`, `T3`
**Write Set:** `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.cursor-plugin/plugin.json`, `gemini-extension.json`, `package.json`, `commands/`, `agents/`, `hooks/`
**Duration PERT:** `0.5 / 1 / 2h`
**Effort PERT:** `0.75 / 1.5 / 3h`
**Verification:** `rg -n "superpowers|using-superpowers|write-plan|execute-plan|brainstorm" .claude-plugin .cursor-plugin commands agents hooks package.json gemini-extension.json`

- [ ] Step 1: Rename exposed package, plugin, and command metadata where it must match `graphenepowers`.
- [ ] Step 2: Ensure command help and agent prompts point at the new skill names and workflow.
- [ ] Step 3: Keep the supported platforms list intact for Claude, Cursor, Codex, OpenCode, and Gemini.

### Task T5: Verify And Prepare Remote Handoff

**Depends on:** `T2`, `T3`, `T4`
**Write Set:** `.`
**Duration PERT:** `0.5 / 1 / 2h`
**Effort PERT:** `0.75 / 1.5 / 2.5h`
**Verification:** `git status --short && rg -n "superpowers" . && git diff --stat`

- [ ] Step 1: Run targeted grep verification for stale public `superpowers` references.
- [ ] Step 2: Review the diff for accidental breakage or missing support files.
- [ ] Step 3: Wire or report the target remote state for `lenchante17/graphenepowers`.
