# Human Gates Matrix

Use this page as the shared stop-or-continue rule across routing, planning, execution, review, and retrospective.

## Decision Levels

| Level | Meaning | Default Action |
|-------|---------|----------------|
| Continue | No meaningful approval risk | proceed and report normally |
| Continue And Report | Useful for visibility but not approval-worthy | proceed, record evidence, mention in status |
| Pause And Ask | Material decision or risk boundary | stop affected work and ask the human |
| Hard Stop | Unsafe or destructive without approval | do not proceed until the human approves |

## Gate Matrix

| Trigger | Applies In | Level | Required Artifact |
|---------|------------|-------|-------------------|
| New external dependency | planning, execution | Pause And Ask | design contract or execution-plan delta plus reclassification record if grade changes |
| Locked interface or invariant would change | brainstorming, planning, execution, review | Pause And Ask | design-contract delta |
| Public interface change appears unexpectedly | planning, execution, review | Pause And Ask | design-contract delta plus review packet update |
| Route grade rises after work started | triage, debugging, execution | Pause And Ask | reclassification record |
| Confidence drops to `low` during rolling re-plan | planning, execution | Pause And Ask | reclassification record or plan delta note |
| Design is already known and only needs confirmation | `Feature` routing | Continue And Report | note `contract-confirmation` mode in the spec or plan handoff |
| Brainstorming reveals unresolved architecture, interface, or invariant questions | brainstorming | Pause And Ask | updated context brief or design delta |
| Root cause still unknown after systematic debugging | execution | Pause And Ask | debugging evidence summary |
| Review finding conflicts with approved contract | review | Pause And Ask | review packet plus contract excerpt |
| Time or effort overrun without contract/risk change | execution, retrospective | Continue And Report | retrospective summary |
| Single blocker on one card while unrelated work remains | execution | Continue | keep unaffected work moving and record blocker evidence |
| Destructive git or filesystem action not explicitly requested | any stage | Hard Stop | explicit human confirmation |
| Push, PR creation, merge, or discard outcome | retrospective close-out | Pause And Ask | close-out choice prompt |

## Route-Specific Notes

- `Micro`: only escalate when the work stops being isolated or starts threatening a public or destructive boundary.
- `Small Task`: prefer continuing with explicit status notes unless the change raises grade, changes a locked interface, or introduces a new dependency.
- `Feature`: treat contract drift as a first-class gate. If the contract is no longer stable, pause the affected lane and resolve that before continuing.

## Reclassification Rule

When the route changes after work has already started:

1. pause the affected work
2. re-run triage with current evidence
3. record the change using `docs/graphenepowers/templates/reclassification-record.md`
4. update the affected plan, contract, or review packet
5. resume only after the required gate clears

## Rule Of Thumb

Ask the human when continuing would silently change cost, commitment, interface, or external effect. Report without asking when the system is still behaving within an already approved envelope.
