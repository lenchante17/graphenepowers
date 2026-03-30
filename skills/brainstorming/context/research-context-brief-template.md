# Pre-Brainstorm Research Context Brief Template

Use this before invoking `graphenepowers:brainstorming` on `Feature` work, or whenever design quality depends on domain context that is not yet explicit.

## Gather

- related internal work
  - similar specs
  - related plans or retrospectives
  - prior implementations or adjacent modules
- latest external knowledge
  - official docs
  - primary standards or regulations
  - current ecosystem capabilities and constraints
- implicit assumptions
  - what is being assumed true without explicit confirmation
- background knowledge
  - domain facts the user may not realize the design depends on
- knowledge extraction
  - terminology
  - invariants
  - constraints
  - heuristics
- mental models
  - useful frames for decomposition, risk, or tradeoff discussion
- open unknowns
  - questions that still block a sound design

## Tell The User

Keep the brief concise. The goal is to improve the design conversation, not to dump notes.

Use a structure like:

1. relevant precedents or similar work
2. latest knowledge that materially changes the design space
3. implicit assumptions currently in play
4. background knowledge and extracted constraints
5. mental models worth using
6. open questions to resolve next

## Rules

- verify time-sensitive external facts before relying on them
- prefer official or primary sources for external knowledge
- prefer repo-local evidence for existing project behavior and conventions
- surface uncertainty explicitly instead of laundering guesses into assumptions
- if the brief reveals the work is too large or differently scoped than expected, decompose before deeper brainstorming
