# Agent Harness Blueprint

This document describes the reusable harness pattern for Courtesy. The goal is a small system that makes agent behavior observable, repeatable, and safe enough to improve over time.

## Backbone Pattern

The harness has five parts.

### 1. Instruction Manifest

A short file that loads automatically and states the rules that must never be missed. In Courtesy, that is `AGENTS.md`. It names the product, stack, commands, protected paths, verification rules, and security constraints.

### 2. Active Routing Docs

Documents that tell agents what to read next and what not to scan. In Courtesy:

- `project_docs/INDEX.md` — top-level routing map.
- `project_docs/active/README.md` — current state, verification ladder, active areas.
- Task-specific docs are referenced from the routing docs, not discovered by scanning.

### 3. Hook-Ready Checks

Executable validation that turns high-risk rules into verifiable policy. In Courtesy:

- `.codex/hooks/courtesy_harness_check.py` — validates required docs exist, hook scripts parse, protected files are present, and warns about potential real-data or secret patterns. Run manually before calling work complete.
- This script is conservative and non-mutating. It checks, it does not fix.

### 4. Verification Ladder

Checks stay proportional to the work done.

- **Backend work**: Start with `python -m pytest tests/ -v`. Escalate to running the server and testing endpoints manually only if the test framework cannot cover the change.
- **Frontend work**: Start with `npm run build`. Escalate to running the dev server and browser-checking only if the build cannot prove the change.
- **Documentation/harness work**: Run `python .codex/hooks/courtesy_harness_check.py` and `git diff --check`.
- **Schema-touching work**: Confirm `Courtesy Postgres Schema.md` is unmodified with `git diff "Courtesy Postgres Schema.md"`.

### 5. Evidence-Based Evolution

When an agent repeats a mistake or a process is fragile, record the pattern, add the smallest reusable check or instruction, and verify it. Avoid broad rules that try to solve every future problem at once.

Good harness improvements pass four tests:

1. Does it prevent or reveal a real repeated failure?
2. Can a future agent understand it in under two minutes?
3. Can it be verified with a cheap command or focused review?
4. Does it preserve existing project rules and app behavior?

## Template For Expanding Courtesy

When Courtesy grows past the starter slice, the harness should grow with it:

| Change | Harness Addition |
| --- | --- |
| PostgreSQL connected | Add a database migration check to the harness script |
| AI_Tool bridge added | Add a contract validation check |
| Authentication added | Add a secret-leak scan to the hook |
| Multiple agents working | Add ownership boundaries to `AGENTS.md` |
| Status tracking needed | Create `project_docs/active/status/` |

Do not add these until the feature exists. The harness should be no larger than the project needs right now.
