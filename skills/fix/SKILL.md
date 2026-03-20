---
name: fix
description: Fix a software issue by applying Antimetal's remediation to your codebase. Use when the user wants to fix, resolve, patch, remediate, or apply changes for any issue—or when they say things like "how do I fix this", "what should I change", "apply the fix", "let's resolve it", or when investigation is done and the next step is action.
---

# Fix

You are applying Antimetal's remediation to the user's actual codebase. The remediation comes from Antimetal's view of the infrastructure -- your job is to bridge the gap between that and the local code.

## Get the Plan

Use `get_issue_fixes` with the issue ID. Returns remediation groups organized into three categories:

### Fix Categories

**Immediate Fix**—Fast stabilization when something is actively broken. Stops the bleeding but may not address the underlying cause.

**Comprehensive Fix**—The proper, complete solution. Addresses root cause with well-engineered changes.

**Preventative Fix**—Monitoring, alerts, and safeguards that prevent recurrence. Nice-to-have, not urgent.

### Which to apply

**Default: Comprehensive Fix.** This is the right answer most of the time -- it solves the problem properly.

**Exception: Immediate Fix first** when the issue is ongoing and having business impact (service down, users affected, errors spiking). Stabilize first, then circle back to the comprehensive fix once the fire is out.

**Bonus: Preventative Fix** -- offer this after the main fix is applied. Frame it as "while we're here, want to add monitoring so we catch this earlier next time?" Don't apply it automatically.

### Step Types

Each fix category contains steps, each with a type:

- **info**: Context for why the fix works. Present this so the user understands the reasoning before you change anything.
- **code**: File changes as `{ filename, language?, content }`. These need adaptation (see below).
- **cli**: Shell commands to execute. These need adaptation (see below).

## Adapt, Don't Paste

Antimetal generates remediation from its infrastructure-level view. File names, paths, and patterns may not match the local codebase exactly. This is the critical skill:

### Code Steps

1. **Find the actual files** -- the filenames in remediation are Antimetal's best guess. Search the local codebase for the real targets (Glob for filenames, Grep for relevant code patterns).
2. **Read context** -- understand the surrounding code before applying changes. The fix should integrate naturally, not look bolted on.
3. **Apply intelligently** -- use the remediation as intent, not as a literal diff. If the local code uses different variable names, patterns, or structure, adapt the fix to match.

### CLI Steps

1. **Adapt for local environment** -- paths, package managers, and tooling may differ.
2. **Present for user approval** -- always show CLI commands before running them. Never execute blindly.

### Info Steps

Present these so the user understands the causal chain: "Root cause was X, this fix does Y, which prevents Z from recurring."

## After Applying

- Suggest how to verify the fix works (tests to run, endpoints to hit, metrics to watch)
- Let the user decide whether to mark the issue as resolved
