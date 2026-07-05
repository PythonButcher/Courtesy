# Active Documentation

This file is the active navigation hub. If it conflicts with an archived or completed document, this file wins.

## Read First

| Step | Read | Why |
| --- | --- | --- |
| 1 | `AGENTS.md` | Agent rules, commands, verification, security constraints |
| 2 | `project_docs/INDEX.md` | Smallest-doc-first routing map |
| 3 | `README.md` | Quick start and project structure |
| 4 | `project_docs/active/agent_harness/README.md` | Agent harness, hooks, validation |

## Current State

Courtesy is in its **starter slice**. The app is a working court operations workspace with:

- **Frontend**: React 18 + TypeScript + Vite + Material UI. Renders the court workspace shell on first load (not a landing page). Components: sidebar navigation, top search, case list, case detail panel with hearings, tasks, documents, and decision-prep sections.
- **Backend**: Flask with mock fixture data. Routes: `/api/health`, `/api/cases`, `/api/cases/:id`, `/api/hearings`, `/api/tasks`. 10 passing tests.
- **Data**: All fictional mock data. No real court records, people, or credentials.
- **Schema**: The user's PostgreSQL schema is at `Courtesy Postgres Schema.md` (17 tables, 1 view). It is protected and must not be modified.

## What Is Deferred

| Feature | Status | Prerequisite |
| --- | --- | --- |
| PostgreSQL connection | Deferred | Map schema to SQLAlchemy models |
| Real court data | Deferred | Schema mapping + access policy |
| AI_Tool bridge | Deferred | Decision-prep packet contract |
| Authentication | Deferred | Core workflows stable first |
| Document storage | Deferred | File handling requirements defined |
| Alembic migrations | Deferred | After model mapping |

Agents must not implement deferred features unless the user explicitly authorizes that work.

## Verification Ladder

Run these checks in order. Each succeeding check assumes the previous one passed.

| Step | Command | Working Dir | Expected |
| --- | --- | --- | --- |
| 1 | `python -m pytest tests/ -v` | `backend/` | 10 tests pass |
| 2 | `npm run build` | `frontend/` | Build succeeds |
| 3 | `python .codex/hooks/courtesy_harness_check.py` | repo root | All checks pass |
| 4 | `git diff --check` | repo root | No whitespace errors |

## Active Areas

| Area | Location | Rule |
| --- | --- | --- |
| Agent rules | `AGENTS.md` | First read for every agent session |
| Project routing | `project_docs/INDEX.md` | Smallest-doc-first navigation |
| Active navigation | `project_docs/active/README.md` | This file |
| Agent harness | `project_docs/active/agent_harness/` | Harness docs, hook guidance |
| Implementation roadmap | `project_docs/active/courtesy_roadmap.md` | 9-phase plan, all 20 items |
| Hook scripts | `.codex/hooks/` | Conservative, non-mutating validation |
| Architecture | `docs/architecture.md` | System overview |
| Integration plan | `docs/integration.md` | PostgreSQL + AI_Tool bridge design |
| Schema notes | `schema/README.md` | Database integration steps |

## Communication Rule

Write plans and rollup summaries in plain language. Use short descriptions, one purpose per task, and direct acceptance checks. Do not use dense shorthand without defining it in the same paragraph.

## Harness Validation

Before calling substantial work complete, run:

```
python .codex/hooks/courtesy_harness_check.py
```

Then run `git diff --check`.
