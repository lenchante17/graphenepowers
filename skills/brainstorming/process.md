# Brainstorming Process

Run the design phase in four stages.

## Stage 1: Gate

- confirm this is `Feature` work or design confidence is low enough that planning would drift
- confirm implementation is off-limits until the design direction is approved
- choose the initial mode:
  - `exploratory` when concept or structure is still open
  - `contract-confirmation` when the direction mostly exists already
- if Stage 2 changes confidence, switch modes before generating concept options

If the work is really `Small Task`, stop and route back to planning.

## Stage 2: Search, Survey, Briefing

- gather related internal work, current external facts, assumptions, constraints, terminology, invariants, and open unknowns
- the main agent performs this stage directly and keeps the working context for Stage 3; do not offload it to a separate clean-context research subagent
- look for strong references the user should see: good exemplars, best practices, official docs, standards, and adjacent concepts that shape the design space
- verify time-sensitive external knowledge before using it
- turn that research into a concise user-facing guide document at `docs/graphenepowers/specs/YYYY-MM-DD-<topic>-guide.md`
- make the guide useful for the human, not just the model: explain why each reference, concept, or best practice matters for the upcoming design choices
- if the brief reveals the request is too large for one spec, decompose before deeper design work

Do not start ideation from unexamined assumptions.

Stage 2 should normally flow directly into Stage 3. Do not stop after the guide unless the work must be decomposed, re-scoped, or clarified before concept work can continue.

## Stage 3: Clarify Ambiguity And Confirm Concept

- ask one blocking question at a time
- prefer multiple choice when practical
- use the terminal for conceptual questions and `visual/visual-companion.md` only when seeing the option would help more than reading it
- use the Stage 2 guide and the working context gathered there to shape the option set; do not regenerate options from memory alone
- in `exploratory` mode, compare 2-3 plausible directions, recommend one, and confirm the concept plus high-level structure
- in `contract-confirmation` mode, skip option churn and resolve only the uncertainties that block contract lock
- confirm scope boundaries, major components, key interfaces, invariants, and exception gates before writing the detailed spec
- write those options and the recommended direction to `docs/graphenepowers/specs/YYYY-MM-DD-<topic>-concept-brief.md`
- structure that brief so the user can read it and respond with their option selections or approvals in one message

Do not write the full spec until the concept and large structure are approved.

Stage 3 is the approval boundary for Stage 4. Do not begin the detailed spec until the user has explicitly confirmed the selected options, recommended direction, or major structure from the concept brief.

## Stage 4: Write Detailed Spec And Review It Independently

- write the spec to `docs/graphenepowers/specs/YYYY-MM-DD-<topic>-design.md` unless the user wants another location
- include the approved direction, high-level structure, locked interfaces, locked invariants, exception gates, and planning handoff notes
- dispatch a separate clean-context spec reviewer using `review/spec-document-reviewer-prompt.md`
- if the reviewer finds issues, fix the spec and re-dispatch
- after reviewer approval, present the reviewer's self-contained summary and recommendation to the user for approval
- once the user approves, lock the design contract and hand off to `graphenepowers:writing-plans`

The terminal state of brainstorming is an approved spec plus a locked design contract.
