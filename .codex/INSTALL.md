# Installing GraphenePowers for Codex

Enable GraphenePowers in Codex through native skill discovery.

## Prerequisites

- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lenchante17/graphenepowers.git ~/.codex/graphenepowers
   ```

2. **Create the skills symlink:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/graphenepowers/skills ~/.agents/skills/graphenepowers
   ```

   **Windows (PowerShell):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\graphenepowers" "$env:USERPROFILE\.codex\graphenepowers\skills"
   ```

3. **Restart Codex** so it rescans `~/.agents/skills/`.

## Verify

```bash
ls -la ~/.agents/skills/graphenepowers
```

You should see a symlink or junction pointing at your local `graphenepowers/skills` directory.

## Updating

```bash
cd ~/.codex/graphenepowers && git pull
```

## Uninstalling

```bash
rm ~/.agents/skills/graphenepowers
```

Optionally remove the clone:

```bash
rm -rf ~/.codex/graphenepowers
```
