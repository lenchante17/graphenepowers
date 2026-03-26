# GraphenePowers for OpenCode

Complete guide for using GraphenePowers with [OpenCode.ai](https://opencode.ai).

## Installation

Add GraphenePowers to the `plugin` array in your `opencode.json`:

```json
{
  "plugin": ["graphenepowers@git+https://github.com/lenchante17/graphenepowers.git"]
}
```

Restart OpenCode. The plugin installs from git and registers the GraphenePowers skill tree automatically.

## Usage

### Finding Skills

Use OpenCode's native `skill` tool to list available skills:

```text
use skill tool to list skills
```

### Loading a Skill

```text
use skill tool to load graphenepowers/brainstorming
```

### Personal Skills

Create your own skills in `~/.config/opencode/skills/`:

```bash
mkdir -p ~/.config/opencode/skills/my-skill
```

Create `~/.config/opencode/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: Use when [condition] - [what it does]
---

# My Skill

[Your skill content here]
```

### Project Skills

Create project-specific skills in `.opencode/skills/` inside a repo.

**Skill Priority:** project skills > personal skills > GraphenePowers skills

## Updating

OpenCode reinstalls the plugin from git when it restarts.

To pin a specific revision:

```json
{
  "plugin": ["graphenepowers@git+https://github.com/lenchante17/graphenepowers.git#main"]
}
```

## How It Works

The plugin does two things:

1. injects GraphenePowers bootstrap context into each conversation
2. registers the repository's `skills/` directory so OpenCode can discover the public skill set

### Tool Mapping

When skills reference Claude Code tools, OpenCode should adapt them as follows:

- `TodoWrite` -> `todowrite`
- `Task` with subagents -> OpenCode `@mention` workflows
- `Skill` tool -> OpenCode's `skill` tool
- file operations -> native OpenCode tools

## Troubleshooting

### Plugin not loading

1. Check logs: `opencode run --print-logs "hello" 2>&1 | grep -i graphenepowers`
2. Verify the plugin line in your `opencode.json`
3. Make sure OpenCode is up to date

### Skills not found

1. Use the `skill` tool to list discovered skills
2. Check that the plugin is loading
3. Confirm the repository still contains valid `SKILL.md` files

## See Also

- [`README.md`](../README.md)
- [`skills/using-graphenepowers/SKILL.md`](../skills/using-graphenepowers/SKILL.md)
