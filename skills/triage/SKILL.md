---
name: triage
description: Use when starting a request or re-planning work and deciding whether it belongs on the Micro, Task, or Feature path, especially when scope, uncertainty, coupling, or external dependencies may raise the required process level
---

# Triage

## Overview

Classify work before doing it. Hard overrides beat averages.

**Core principle:** A single high-risk dimension can force a heavier process even when the total score looks small.

**Announce at start:** "I'm using the triage skill to classify this work."

## The Process

### Step 1: Score 5 dimensions

| Dimension | 1 | 2 | 3 |
|-----------|---|---|---|
| Scope | Single file | Multiple files, one module | Multiple modules |
| Uncertainty | Requirements clear | Some ambiguity | Core spec unclear |
| Coupling | Isolated change | Internal dependencies | Public interface change |
| External dependency | None | Existing external system | New external dependency |
| Risk / cost | Easy rollback, low blast radius | Moderate | Rollback hard or cost high |

Score from evidence, not vibes. If a score depends on guessing, mark it provisional.

### Step 2: Calculate base grade

- `Micro`: total `<= 7`
- `Task`: total `8-11`
- `Feature`: total `>= 12`

### Step 3: Apply hard overrides

These rules beat the total:

- `coupling = 3` -> at least `Task`
- `external dependency = 3` -> at least `Task` and human gate
- `risk / cost = 3` -> at least `Task` and human gate
- `uncertainty = 3` and `scope >= 2` -> `Feature`
- two or more dimensions at `3` -> `Feature`

### Step 4: Assess stability

**`confidence`** is about boundary distance and evidence quality:

- `low`: one point away from regrade, or any provisional score
- `medium`: two points away from regrade, all scores justified
- `high`: three or more points away, all scores justified

**`profile_asymmetry`** is the standard deviation of the 5 scores. Treat it as a risk signal, not as confidence.

### Step 5: Choose path

- `Micro` -> execute directly, keep scope tight, verify before completion
- `Task` -> use `graphenepowers:writing-plans`
- `Feature` -> use `graphenepowers:brainstorming`
- `confidence = low` -> ask human or move one level up

On rolling re-plan, re-run triage for affected follow-up work.

## Quick Reference

| Signal | Action |
|--------|--------|
| High total, no overrides | Follow score band |
| Low total, one hard override | Use override |
| Provisional score | `confidence = low` |
| Re-triage raises grade | Human gate |
| Two 3-point dimensions | `Feature` |

## Common Mistakes

**Averaging away a sharp risk**
- **Problem:** "Everything else is small, so this is Micro"
- **Fix:** Hard overrides win

**Treating asymmetry as confidence**
- **Problem:** High stddev = "uncertain"
- **Fix:** Use stddev as a separate risk signal only

**Guessing missing facts**
- **Problem:** Invent scores to get moving
- **Fix:** Mark provisional, lower confidence, escalate if needed

## Integration

**Hands off to:**
- `graphenepowers:brainstorming` for `Feature`
- `graphenepowers:writing-plans` for `Task`
- direct execution for `Micro`

**Re-run when:**
- rolling re-plan changes scope
- public interfaces appear
- external dependencies appear
- risk class rises mid-execution
