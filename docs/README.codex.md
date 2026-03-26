# GraphenePowers for Codex

Guide for using GraphenePowers with OpenAI Codex through native skill discovery.

## Quick Install

Tell Codex:

```text
Fetch and follow instructions from https://raw.githubusercontent.com/lenchante17/graphenepowers/refs/heads/main/.codex/INSTALL.md
```

## Manual Installation

### Prerequisites

- OpenAI Codex CLI
- Git

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/lenchante17/graphenepowers.git ~/.codex/graphenepowers
   ```

2. Create the skills symlink:
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/graphenepowers/skills ~/.agents/skills/graphenepowers
   ```

3. Restart Codex.

### Windows

Use a junction instead of a symlink:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\graphenepowers" "$env:USERPROFILE\.codex\graphenepowers\skills"
```

## How It Works

Codex scans `~/.agents/skills/` at startup and loads skills on demand. GraphenePowers becomes visible through a single symlink:

```text
~/.agents/skills/graphenepowers/ -> ~/.codex/graphenepowers/skills/
```

The `using-graphenepowers` skill is the entry point. It routes development requests through `triage`, then into design, planning, execution, review, and retrospective.

## Usage

Skills are discovered automatically. Codex can activate them when:

- you mention a skill by name
- the task matches a skill description
- `using-graphenepowers` routes the request to the right workflow

### Personal Skills

Create your own skills in `~/.agents/skills/`:

```bash
mkdir -p ~/.agents/skills/my-skill
```

Create `~/.agents/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: Use when [condition] - [what it does]
---

# My Skill

[Your skill content here]
```

## Updating

```bash
cd ~/.codex/graphenepowers && git pull
```

## Uninstalling

```bash
rm ~/.agents/skills/graphenepowers
```

**Windows (PowerShell):**

```powershell
Remove-Item "$env:USERPROFILE\.agents\skills\graphenepowers"
```

Optionally remove the clone:

```bash
rm -rf ~/.codex/graphenepowers
```

## Troubleshooting

### Skills not showing up

1. Verify the symlink: `ls -la ~/.agents/skills/graphenepowers`
2. Check that skills exist: `find ~/.codex/graphenepowers/skills -maxdepth 2 -name SKILL.md`
3. Restart Codex

## See Also

- [`README.md`](../README.md)
- [`skills/using-graphenepowers/SKILL.md`](../skills/using-graphenepowers/SKILL.md)
