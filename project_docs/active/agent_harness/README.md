# Agent Harness

This folder is the Courtesy-specific backbone for agent work. It defines how agents start, what to read, what not to scan, what commands verify the app, how to avoid destructive writes, and how to protect the schema and secrets.

This harness is inspired by the generic agentic harness pattern from AI_Tool but contains no AI_Tool Decision Intelligence history, archived plans, product-specific statuses, or frontend ownership rules. Courtesy is its own project.

## Current Harness Shape

| Layer | File | Purpose |
| --- | --- | --- |
| Entry instructions | `AGENTS.md` | First rules for any agent |
| Documentation routing | `project_docs/INDEX.md` | Smallest-doc-first navigation |
| Active navigation | `project_docs/active/README.md` | Current state, verification ladder |
| Harness entry | `project_docs/active/agent_harness/README.md` | This file |
| Harness design | `project_docs/active/agent_harness/harness_blueprint.md` | Reusable harness pattern |
| Hook guidance | `project_docs/active/agent_harness/hooks.md` | Hook scripts and safety rules |
| Hook scripts | `.codex/hooks/courtesy_harness_check.py` | Manual validation command |

## How Agents Start

1. Read `AGENTS.md` — commands, protected paths, security constraints.
2. Read `project_docs/INDEX.md` — find the smallest relevant doc for the task.
3. Read `project_docs/active/README.md` — current state and verification ladder.
4. Read this file if the task touches harness, hooks, or agent workflow.
5. Inspect only the source files relevant to the current task.

## What Not To Scan

- Do not scan `AI_Tool/` or any sibling project.
- Do not scan `node_modules/`, `__pycache__/`, `.pytest_cache/`, `frontend/dist/`, or build caches.
- Do not scan `Courtesy Postgres Schema.md` for editing — read it for reference only.
- Do not open every source file. Read routing docs first, then only the files named by the task.

## Verification Commands

| Check | Command | Working Directory | Expected |
| --- | --- | --- | --- |
| Backend tests | `python -m pytest tests/ -v` | `backend/` | 10 tests pass |
| Frontend build | `npm run build` | `frontend/` | Clean build |
| Harness validation | `python .codex/hooks/courtesy_harness_check.py` | repo root | All checks pass |
| Whitespace check | `git diff --check` | repo root | No errors |

## Destructive Write Protection

- Use targeted edits (file editing tools, `apply_patch`), not bulk overwrites.
- Never use `open(path, "w")`, `Path.write_text()`, or PowerShell `Set-Content`/`Out-File` on source files — these can truncate files before contents are read.
- Hook scripts must not rewrite source files automatically.

## Protected Files

- `Courtesy Postgres Schema.md` — schema source of truth, never modify.
- `.env` — local environment, never commit real values.
- `AI_Tool/` — separate project, never modify.

## Evidence-Based Improvements

When adding to this harness, answer these four questions:

1. Does it prevent or reveal a real repeated failure?
2. Can a future agent understand it in under two minutes?
3. Can it be verified with a cheap command or a focused review?
4. Does it preserve existing project rules and app behavior?

If yes to all four, the improvement belongs. If not, it is probably noise.
