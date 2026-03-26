# GraphenePowers

GraphenePowers is a curated fork of [`obra/superpowers`](https://github.com/obra/superpowers), rebuilt around the GraphenePowers v4 workflow.

It keeps the upstream multi-platform repository shape, but fully rebrands installation, bootstrap, and skill invocation to `graphenepowers`. The public workflow is intentionally smaller than upstream: new users start from `using-graphenepowers`, then move through `triage`, `brainstorming` or `writing-plans`, `executing-plans`, `code-review`, and `retrospective`.

## Lineage

- Forked from `obra/superpowers`
- Reworked for the GraphenePowers v4 execution model
- Legacy upstream skills are preserved under [`archive/skills-superpowers`](archive/skills-superpowers) but are not part of the default public install

## Supported Platforms

- Claude Code
- Cursor
- Codex
- OpenCode
- Gemini CLI

## Installation

### Codex

Codex can install directly from this repository today.

```text
Fetch and follow instructions from https://raw.githubusercontent.com/lenchante17/graphenepowers/refs/heads/main/.codex/INSTALL.md
```

Detailed guide: [`docs/README.codex.md`](docs/README.codex.md)

### OpenCode

OpenCode can install directly from this repository today.

```text
Fetch and follow instructions from https://raw.githubusercontent.com/lenchante17/graphenepowers/refs/heads/main/.opencode/INSTALL.md
```

Detailed guide: [`docs/README.opencode.md`](docs/README.opencode.md)

### Gemini CLI

```bash
gemini extensions install https://github.com/lenchante17/graphenepowers
```

To update:

```bash
gemini extensions update graphenepowers
```

### Claude Code

This repository includes a Claude Code plugin manifest at [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json).

- For local development or self-hosted testing, run Claude Code against this repository with `--plugin-dir /path/to/graphenepowers`.
- For one-command `/plugin install` distribution, publish the included manifest through a Claude Code plugin marketplace.

### Cursor

This repository includes a Cursor plugin manifest at [`.cursor-plugin/plugin.json`](.cursor-plugin/plugin.json).

- For local development, use Cursor's local plugin workflow against this repository.
- For one-click marketplace installs, publish the included manifest through Cursor's plugin distribution channel.

## Quick Start

After installation, ask your agent to help with a real development task:

- "Help me design this feature."
- "Plan this refactor."
- "Debug this failing test."

The entry skill should route work through the GraphenePowers workflow automatically.

## Public Workflow

1. `using-graphenepowers`
2. `triage`
3. `brainstorming` for Feature-grade work, or `writing-plans` for Task-grade work
4. `executing-plans`
5. `code-review`
6. `retrospective`

Supporting implementation skills:

- `test-driven-development`
- `systematic-debugging`
- `writing-skills`

## Exposed Skills

- `using-graphenepowers`
- `triage`
- `brainstorming`
- `writing-plans`
- `executing-plans`
- `code-review`
- `retrospective`
- `test-driven-development`
- `systematic-debugging`
- `writing-skills`

## Repository Layout

- [`skills/`](skills/) contains the public GraphenePowers skill set
- [`docs/graphenepowers/specs/`](docs/graphenepowers/specs/) contains v4 design notes and migration references
- [`docs/graphenepowers/plans/`](docs/graphenepowers/plans/) contains execution plans for repo work
- [`archive/skills-superpowers/`](archive/skills-superpowers/) preserves upstream skill material that is no longer publicly exposed

## Notes For Fork Maintainers

- Codex, OpenCode, and Gemini consume this repository directly.
- Claude Code and Cursor need marketplace publication if you want end users to install the fork with the same one-command flows as upstream `superpowers`.
- The included plugin manifests, commands, hooks, and bootstrap files are already rebranded for `graphenepowers`.

## License

MIT License. See [`LICENSE`](LICENSE).
