# Courtesy Architecture

## System Overview

Courtesy is a separated full-stack application with clear boundaries between frontend, backend, and future external integrations.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │              Courtesy Frontend (React + TS)               │   │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐  │   │
│  │  │Case List│ │Case Detail│ │ Hearings │ │Decision Prep│  │   │
│  │  └────┬────┘ └─────┬────┘ └─────┬────┘ └──────┬──────┘  │   │
│  │       └────────────┼────────────┼─────────────┘          │   │
│  │                    ▼                                      │   │
│  │            courtApi.ts (Service Layer)                     │   │
│  └───────────────────────┬───────────────────────────────────┘   │
│                          │ HTTP / REST                            │
└──────────────────────────┼───────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│               Courtesy Backend (Flask + Python)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────────────┐   │
│  │ Routes   │  │ Models   │  │ Data Layer                    │   │
│  │ /health  │  │ Case     │  │ ┌──────────┐  ┌───────────┐  │   │
│  │ /cases   │  │ Hearing  │  │ │Mock JSON │  │PostgreSQL │  │   │
│  │ /hearings│  │ Task     │  │ │(current) │  │(deferred) │  │   │
│  │ /tasks   │  │ Document │  │ └──────────┘  └───────────┘  │   │
│  └──────────┘  └──────────┘  └──────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                           │ (deferred)
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    External Services                              │
│  ┌──────────────────┐  ┌─────────────────────────────────────┐   │
│  │    PostgreSQL     │  │   AI_Tool Decision Intelligence     │   │
│  │  (User's schema)  │  │  (Decision-prep packet exchange)   │   │
│  └──────────────────┘  └─────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

## Design Principles

1. **Separation of concerns** — Frontend, backend, and data layers have explicit boundaries
2. **Service layer abstraction** — All API calls go through `courtApi.ts`, making it easy to swap mock → real
3. **Mock-first development** — Everything works with fictional data; real integrations plug in later
4. **No legal advice** — All AI/decision features are labeled as preparation aids, never conclusions
5. **Schema-driven** — The real PostgreSQL schema is the source of truth; models map to it, not vice versa

## API Contract

All routes are prefixed with `/api`.

| Method | Route              | Description                  | Status     |
| ------ | ------------------ | ---------------------------- | ---------- |
| GET    | `/api/health`      | Health check                 | Active     |
| GET    | `/api/cases`       | List all cases               | Mock data  |
| GET    | `/api/cases/:id`   | Get case by ID               | Mock data  |
| GET    | `/api/hearings`    | List upcoming hearings       | Mock data  |
| GET    | `/api/tasks`       | List tasks and deadlines     | Mock data  |
| POST   | `/api/decision-prep` | Submit decision-prep packet | Deferred   |

## Technology Choices

| Choice               | Rationale                                                    |
| -------------------- | ------------------------------------------------------------ |
| Vite + React 18 + TS | Modern, fast builds; TypeScript for court-data type safety   |
| Material UI          | Dense, professional components suited for operations tools    |
| Flask                | Matches parent AI_Tool stack; lightweight for API service      |
| SQLAlchemy 2.x       | Ready for the user's PostgreSQL schema mapping                |
| Pydantic             | Validation layer for API data; matches modern Python patterns |
