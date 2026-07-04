# Courtesy – Agent Rules

## Product

Courtesy is an operations-focused court case workspace. It is a separate app from AI_Tool Decision Intelligence but is designed for later integration.

## Stack

| Layer    | Technology                                        |
| -------- | ------------------------------------------------- |
| Frontend | React 18 + TypeScript, Vite, Material UI          |
| Backend  | Python 3.11+, Flask, SQLAlchemy 2.x, Pydantic     |
| Database | PostgreSQL (deferred — mock data only in starter)  |
| AI/ML    | Deferred — placeholder panels only                 |

## Commands

| Action              | Command                                              | Working Directory |
| ------------------- | ---------------------------------------------------- | ----------------- |
| Install frontend    | `npm install`                                        | `frontend/`       |
| Run frontend dev    | `npm run dev`                                        | `frontend/`       |
| Build frontend      | `npm run build`                                      | `frontend/`       |
| Install backend     | `pip install -r requirements.txt`                    | `backend/`        |
| Run backend dev     | `python run.py`                                      | `backend/`        |
| Run backend tests   | `python -m pytest tests/`                            | `backend/`        |
| Lint frontend       | `npm run lint`                                       | `frontend/`       |
| Type-check frontend | `npx tsc --noEmit`                                   | `frontend/`       |

## Protected Paths

Do **not** modify these without explicit user approval:

- `Courtesy Postgres Schema.md` — the user's actual PostgreSQL schema reference
- `.env` — local environment file (never commit)
- Any file inside `AI_Tool/` — that is a separate project

## Verification Rules

1. Backend must start without errors: `python run.py` should bind to the configured port.
2. `GET /api/health` must return `{"status": "ok"}`.
3. `GET /api/cases` must return valid JSON with at least one case.
4. Frontend must build without TypeScript errors: `npx tsc --noEmit`.
5. Frontend dev server must render the court workspace shell, not a landing page.

## Security Constraints

- **Never commit** `.env`, database credentials, API keys, or real court data.
- **Never include** real people, real case numbers, real SSNs, or real court records.
- **Mock data only** in this starter slice.
- Court data is sensitive — treat all case information as confidential once real data is connected.
- AI placeholders must be disabled or mock-only. Label them as "draft research / preparation aid".
- Do not use language implying legal advice, predictions, guaranteed outcomes, or autonomous decisions.

## Integration Notes

- PostgreSQL schema exists in `Courtesy Postgres Schema.md` at the project root.
- The next slice should map this schema to SQLAlchemy models explicitly.
- AI_Tool bridge is deferred. When ready, Courtesy sends a structured decision-prep packet; AI_Tool returns a decision-support artifact. No silent data sharing.
