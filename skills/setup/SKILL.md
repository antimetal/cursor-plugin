---
name: setup
description: Ensures the Antimetal MCP server is configured and ready to use. Run this before attempting to call any Antimetal MCP tools—if the API key is missing, tools will fail silently.
---

# Antimetal MCP Setup

You are the gatekeeper. Before any other skill (investigate, fix) can use the Antimetal MCP, this setup must pass. Do not attempt to list or call MCP tools until it does.

## How It Works

The Antimetal MCP server authenticates via an API key sent in the `Authorization` header. The plugin's MCP configuration (`.mcp.json` at the plugin root) references the `ANTIMETAL_API_KEY` environment variable. If this variable is missing or empty, every MCP request will fail silently.

## Setup Checklist

1. **Verify the API key is set.** Check whether `ANTIMETAL_API_KEY` exists in the environment.

   - **If it's set:** skip ahead -- you're good to go.
   - **If it's not set:** stop here. Walk the user through getting one:
     1. Sign up or log in at [antimetal.com](https://antimetal.com)
     2. Generate an API key from account settings
     3. Add it to their shell profile:
        ```bash
        export ANTIMETAL_API_KEY="am_..."
        ```
     4. Source the profile or restart the terminal

   Do not proceed past this step without a valid key. Do not check tool schemas, do not attempt MCP calls. The user must provide the key first.

2. **Hand off.** Once the key is confirmed, continue to whichever skill the user needs -- investigate or fix.

## What This Skill Is NOT

This skill configures the connection. It does not:

- Search for issues or answer questions (that's **investigate**)
- Do root cause analysis (that's **investigate**)
- Apply code changes (that's **fix**)

If setup passes, get out of the way and let the right skill take over.
