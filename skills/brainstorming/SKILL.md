---
name: brainstorming
description: Use when using-graphenepowers routes work to Feature, or when design uncertainty is high enough that implementation should not begin before the architecture and scope are explicitly worked through with the user
---
# Brainstorming
Turn feature ambiguity into approved design inputs.
<HARD-GATE>
Do not invoke implementation or planning work until the design direction is approved, the spec is written, and the design contract is locked.
</HARD-GATE>
## Use When
- `Feature` work enters the design phase
- interfaces, invariants, architecture, or sequencing are still meaningfully uncertain
- requirements are stable enough to design, but not yet stable enough to plan
## Read In Order
1. `process.md`
2. `context/research-context-brief-template.md`
3. `context/concept-options-brief-template.md`
4. `facilitation.md`
5. `deliverables.md`
6. `review/spec-document-reviewer-prompt.md`
7. `visual/visual-companion.md` when visual treatment would help
## Modes
- `exploratory`: concept, interfaces, or major structure are still open
- `contract-confirmation`: the direction mostly exists; resolve blocking ambiguities and lock the contract
## Non-Negotiables
- start from main-agent search, survey, and a concise guide document, not raw intuition
- the main agent must own Stage 2 so Stage 3 option generation can reuse the gathered context directly
- Stage 2 must produce a user-facing guide document with strong references, best practices, and key concepts that sharpen later choices
- Stage 3 must produce a concept-options brief the user can read and answer in one pass
- Stage 2 and Stage 3 should normally run as one continuous flow unless a decomposition or scope problem forces a pause
- confirm concept and high-level structure before writing the full spec
- start Stage 4 only after the user has explicitly confirmed the Stage 3 options or recommended structure
- use a separate clean-context reviewer for the spec review loop
- user approval after spec review should be driven by the reviewer's self-contained summary, not by requiring the user to replay the full review process
- after brainstorming, hand off only to `graphenepowers:writing-plans`
