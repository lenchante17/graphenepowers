# Installing GraphenePowers for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed

## Installation

Add GraphenePowers to the `plugin` array in your `opencode.json`:

```json
{
  "plugin": ["graphenepowers@git+https://github.com/lenchante17/graphenepowers.git"]
}
```

Restart OpenCode. The plugin auto-installs and registers the GraphenePowers skills tree.

## Verify

Ask OpenCode to list available skills or load one explicitly:

```text
use skill tool to list skills
use skill tool to load graphenepowers/brainstorming
```

## Updating

OpenCode reinstalls the plugin from git on restart.

To pin a specific revision, use a branch or tag:

```json
{
  "plugin": ["graphenepowers@git+https://github.com/lenchante17/graphenepowers.git#main"]
}
```

## Troubleshooting

### Plugin not loading

1. Check logs: `opencode run --print-logs "hello" 2>&1 | grep -i graphenepowers`
2. Verify the plugin line in your `opencode.json`
3. Make sure you're running a recent OpenCode build

### Skills not found

1. Use the `skill` tool to list discovered skills
2. Confirm the plugin is loading
3. Check that the repository still contains valid `SKILL.md` files
