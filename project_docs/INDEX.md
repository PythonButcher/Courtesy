# Courtesy Documentation Map

This is the top-level routing file. Use it to find the smallest current document needed for the task. Do not scan every Markdown file.

## First Reads

| Order | File | Why |
| --- | --- | --- |
| 1 | `AGENTS.md` | Agent rules, commands, protected paths, security |
| 2 | `project_docs/active/README.md` | Active navigation and current project state |
| 3 | `README.md` | Quick start, structure, verification commands |

## Current Work Map

| Need | Read |
| --- | --- |
| Understand what Courtesy is | `README.md` |
| Check agent rules and verification | `AGENTS.md` |
| See the current project state | `project_docs/active/README.md` |
| Understand system architecture | `docs/architecture.md` |
| Review future integration plan | `docs/integration.md` |
| Check PostgreSQL schema | `Courtesy Postgres Schema.md` (protected — do not modify) |
| Understand schema integration steps | `schema/README.md` |
| Work with the agent harness | `project_docs/active/agent_harness/README.md` |
| See the full implementation roadmap | `project_docs/active/courtesy_roadmap.md` |
| Run harness validation | `python .codex/hooks/courtesy_harness_check.py` |

## Current Product State

Courtesy is a starter-slice court operations workspace. It has a working React frontend (Vite + TypeScript + Material UI) and a Flask backend with mock court data. PostgreSQL, AI_Tool bridge, authentication, and document storage are intentionally deferred.

The first screen is the court workspace shell, not a marketing landing page. All data is fictional.

## Ownership

Any agent working in this repo owns the full stack unless the user restricts scope. There is no Codex-vs-Gemini split here — Courtesy is its own project.

Agents must not modify `AI_Tool/` or any files outside `C:\Users\18022\Desktop\Courtesy`.

## Do Not Do This

- Do not scan `AI_Tool/` for context unless the user explicitly asks for cross-project work.
- Do not modify `Courtesy Postgres Schema.md` — it is the schema source of truth.
- Do not introduce real court data, real people, real case numbers, real credentials, or real API keys.
- Do not use language implying legal advice, predictions, guaranteed outcomes, or autonomous decisions.
- Do not connect to PostgreSQL, AI_Tool APIs, or external services unless the user explicitly authorizes that implementation.
- Do not bulk-overwrite source files. Use targeted edits.
