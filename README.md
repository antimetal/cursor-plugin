# Antimetal Plugin

Bring [Antimetal's](https://antimetal.com) software investigation intelligence into your AI coding environment. Triage problems, investigate root causes, fetch observability artifacts, and apply remediations—all without leaving your editor or terminal.

## Setup

### 1. Get an API Key

Sign up at [antimetal.com](https://antimetal.com) and generate an API key from your account settings.

### 2. Set Your Environment Variable

```bash
export ANTIMETAL_API_KEY="your-api-key-here"
```

Add this to your shell profile (`~/.zshrc`, `~/.bashrc`, etc.) so it persists.

### 3. Install the Plugin

#### Claude Code

Add the Antimetal marketplace and install the plugin:

```
/plugin marketplace add antimetal/antimetal-plugin
/plugin install antimetal@antimetal
```

#### Cursor

Install from the [Cursor Marketplace](https://cursor.com/marketplace) by searching for **Antimetal**, or use the command palette:

```
/add-plugin antimetal
```

Once installed, the skills activate automatically based on your task context.

## What's Included

### MCP Server

Connects to Antimetal's remote MCP server at `mcp.antimetal.com`, giving the AI agent access to these tools:

| Tool | Description |
|------|-------------|
| `search_issues` | Paginated list of issues with severity, status, and environment |
| `get_issue_report` | Full investigative report—root cause, timeline, causal graph |
| `get_issue_fixes` | Remediation steps (code changes, CLI commands, context) |
| `investigate_issue` | Create a new issue and start async automated investigation |
| `get_artifact` | Retrieve raw evidence: logs, traces, metrics, events, files, topology |
| `ask` | Ask Antimetal's AI about infrastructure, software, deployments, telemetry, logs, code |

### Skills

- **investigate** — Entry point for any software problem. Searches issues, queries Antimetal's AI, reads investigative reports and causal graphs, and routes to fix
- **fix** — Apply Antimetal's remediation to your codebase, adapted for your local environment
- **setup** — Configure and verify your Antimetal API key

### Rules

- **antimetal-conventions** — Conventions for working with Antimetal data (artifact ID formats, status values, etc.)

## Example Prompts

```
Investigate issue #42
What are the open high severity issues?
Apply the remediation for issue #15
What services had the most errors last week?
Triage my current incidents
```

## Links

- [Antimetal](https://antimetal.com)
- [Documentation](https://docs.antimetal.com)
- [MCP Server](https://mcp.antimetal.com)
