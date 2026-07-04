# Courtesy Hooks

This folder contains repo-local validation scripts for Courtesy. They are safe to run manually and are conservative and non-mutating.

The project documentation for these hooks lives at `project_docs/active/agent_harness/hooks.md`.

## Manual Validation

```
python .codex/hooks/courtesy_harness_check.py
```

The scripts enforce project rules that should not depend on an agent remembering every instruction in a long conversation. They check documentation structure, protected file integrity, and credential safety.

## Policy

Hooks must not modify source files. They check and report. See `project_docs/active/agent_harness/hooks.md` for the full policy.
