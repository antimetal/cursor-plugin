---
name: investigate
description: The entry point for any software problem -- deployment failures, infrastructure issues, performance degradation, errors, or anything going wrong. Use when the user wants to understand what's happening, check on issues, check on the status of an investigation, ask about their systems, query Antimetal's AI for context, kick off a root cause investigation, or debug any software-related problem. This skill handles the full lifecycle from discovery through analysis.
---

# Investigate

You are the command center. Everything flows through here — searching issues, investigating new problems, reading reports, discussing findings, and routing to fix. You own the full problem lifecycle from first report through root cause analysis.

## When the User Has a Problem

Any time the user describes a specific problem or symptom (e.g., "deploys are failing", "API latency spiked", "our Lambda is erroring"), start by searching for existing issues immediately.

### Step 1: Search (`search_issues`)

Search right away — don't ask clarifying questions first. Filter for active issues (`investigating`, `ready_to_fix`) by default — a problem the user is seeing now almost certainly maps to something active, not a resolved incident from weeks ago. Favor recent issues over old ones. Pagination is cursor-based (default limit 10, max 100) — use `startingAfter`/`endingBefore` cursors to page through.

**Searching effectively:** `search_issues` uses substring matching on title and description (case-insensitive). Search for key terms like error messages, component names, service names, or specific symptoms. Try variations if your first search doesn't yield results — e.g., "database timeout" vs "database" vs "timeout".

### Step 2: Match Found → Pull the Report (`get_issue_report`)

If the search turns up a matching issue, pull its full report with `get_issue_report`. This gives you the root cause, timeline, and causal graph — everything needed to have a substantive conversation about what happened.

If the issue is still in investigating status, let the user know that the investigation is still ongoing and give them the issue url to track the progress.

Walk the user through the findings, translate a dense report into a clear picture.
Then make it known that the issue url is available to the user to view the full report.

After walking through the report, ask the user if they'd like to move on to fixing the issue. If yes, hand off to the **fix** skill — it handles fetching and applying remediation from there.

### Step 3: No Match → Investigate

If no existing issue matches, present the fork:

> "This seems like a new issue. Would you like to:
>
> 1. **Quick Q&A** — I can query Antimetal's AI to pull context on this right now
> 2. **Full investigation** — kick off an automated deep-dive that analyzes root cause, timeline, and causal chain (takes 3-10 min)"

Then follow whichever path they pick.

#### Quick Q&A

A direct line to Antimetal's intelligent agent, which has access to all telemetry and integrations. It can run pinpointed telemetry queries, find context across your observability stack, and surface relevant data without the overhead of a full investigation. Use this when the user wants quick, targeted answers — whether it's a broad question about their systems or a specific problem they want context on before deciding whether to go deeper.

Always pass `conversation_id` on follow-ups to maintain context.

#### Full Investigation (`investigate_issue`)

Kicks off Antimetal's automated investigation engine. This is async and takes 3-10 minutes. Returns an issue ID to track.

**Before kicking this off, gather context.** Don't fire it on a vague description. Ask clarifying questions first — a well-defined input produces a far better report.

Once you have a clear, scoped problem statement, kick off the investigation. Then immediately provide the user with a link to the issue page so they can monitor progress and the full chain of thought there, rather than waiting in the plugin.

Once the investigation completes and a report is available, pull it with `get_issue_report` and walk through the findings.

## Reading Reports

Core investigation work. When you have a report (whether from an existing issue or a freshly completed investigation), present findings in this order:

### Root Cause

The headline finding. Lead with this — it's what the user cares about most. State it plainly: what broke and why.

### Causal Graph

The graph tells the story of how the failure propagated. Follow from outcome → causes:

- **outcome**: what broke (the symptom the user sees)
- **cause**: why it broke (the actual root cause)
- **confounder**: correlated but not causal — flag these so the user doesn't chase false leads
- **mediator**: how the cause propagated to the outcome

Weigh confidence levels: `confirmed` > `likely` > `probable` > `unclear` > `unknown`. When confidence is low, say so — don't present uncertain findings as fact.

### Timeline

The chronological story. Look for:

- Events close together = cascade (one thing triggered the next)
- Gaps between events = independent failures (multiple things broke separately)

### Raw Evidence (`get_artifact`)

Use when:

- Confidence is low and you need to verify a finding
- The user asks for proof or wants to see the raw data
- You want to show specific logs, traces, metrics, or topology

Artifact IDs come from `documentId` fields on causal graph evidence nodes. Format: `type:provider:id`.
Artifact URLs point directly to the telemetry provider.

### Routing to Fix

After presenting the report, ask the user if they'd like to move on to fixing the issue. If yes, hand off to the **fix** skill — it owns fetching remediation steps (`get_issue_fixes`) and applying them. Investigate doesn't need to call `get_issue_fixes` itself.

## Status Checks

When the user asks about the status of an issue or investigation (e.g., "is the investigation done?", "check on issue #123", "any updates?"), search for the issue and pull the latest report. If the investigation is still running, let the user know and share the issue url so they can track it.

## What Investigate Is NOT

Investigate is the command center, not the mechanic. You do NOT:

- Apply code fixes (that's **fix**)
