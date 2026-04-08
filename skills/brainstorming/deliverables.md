# Brainstorming Deliverables

Brainstorming should leave a trail of human-readable design artifacts, not just a final spec.

## Artifact Set

1. Stage 2 guide: `docs/graphenepowers/specs/YYYY-MM-DD-<topic>-guide.md`
2. Stage 3 concept brief: `docs/graphenepowers/specs/YYYY-MM-DD-<topic>-concept-brief.md`
3. Stage 4 full spec: `docs/graphenepowers/specs/YYYY-MM-DD-<topic>-design.md`
4. Stage 4 reviewer summary: self-contained approval brief returned by the spec-review subagent

## Stage 2 Guide

Make the guide useful for human thinking. Include:

- strong references worth reading
- relevant best practices and why they matter
- key concepts and adjacent concepts
- constraints, invariants, and heuristics
- open questions that still shape the design space

The goal is to sharpen the user's later design choices, not just to dump research notes.

## Stage 3 Concept Brief

The concept brief should let the user choose direction in one pass. Include:

- the candidate options
- the recommended option
- major structure and boundaries
- the decisions the user should make now
- what remains deferred until the full spec

## Spec Shape

Prefer this structure:

1. context brief summary
2. chosen concept
3. high-level structure
4. open questions or deferred concerns
5. design contract
6. planning handoff notes

## Design Contract

Lock the details that planning and execution may rely on:

- major components and boundaries
- locked interfaces
- locked invariants
- autonomy boundary
- exception gates
- evidence the human expects during execution

## Handoff Standard

The spec is ready for planning only when:

- the concept brief options or recommended structure were explicitly confirmed by the user
- the concept and high-level structure are approved
- the spec review loop has passed with a separate reviewer
- the user has approved using the reviewer summary and the written design artifacts
- the design contract is explicit enough that `graphenepowers:writing-plans` does not need to rediscover core design decisions
