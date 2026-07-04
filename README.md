# Courtesy

**Operations-focused court case workspace.**

Courtesy is a full-stack application for managing court cases, hearings, deadlines, filings, and decision-preparation workflows. It is designed to sit alongside [AI_Tool Decision Intelligence](../AI_Tool) for later integration, but operates independently.

> **Starter Slice**: This is the foundation environment. PostgreSQL and AI_Tool API integrations are intentionally deferred. All data is mock/fictional.

---

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **pip** (Python package manager)

### 1. Clone & Configure

```bash
cd C:\Users\18022\Desktop\Courtesy
copy .env.example .env
# Edit .env with your local values (the defaults work for the starter)
```

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
python run.py
```

The backend starts at `http://127.0.0.1:5000`. Verify:

```bash
curl http://127.0.0.1:5000/api/health
# → {"status": "ok"}

curl http://127.0.0.1:5000/api/cases
# → JSON array of mock court cases
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at `http://localhost:5173` (Vite default). Open it in a browser to see the court workspace.

---

## Project Structure

```
Courtesy/
├── AGENTS.md              # Agent rules and verification
├── README.md              # This file
├── .env.example           # Environment variable template
├── .gitignore             # Git ignore rules
├── Courtesy Postgres Schema.md  # User's actual PostgreSQL schema
│
├── frontend/              # React + TypeScript + Vite app
│   ├── src/
│   │   ├── components/    # UI components (shell, case list, detail, etc.)
│   │   ├── services/      # API service layer (courtApi.ts)
│   │   ├── types/         # TypeScript interfaces
│   │   └── data/          # Mock/fallback data
│   └── package.json
│
├── backend/               # Flask + Python API
│   ├── app/
│   │   ├── routes/        # API route blueprints
│   │   ├── models/        # Domain models (SQLAlchemy-ready)
│   │   ├── fixtures/      # Mock court data
│   │   └── config.py      # Configuration from .env
│   ├── run.py             # Entrypoint
│   ├── requirements.txt
│   └── tests/
│
├── schema/                # Database schema intake notes
│   └── README.md          # Instructions for schema integration
│
└── docs/                  # Project documentation
    ├── architecture.md    # System architecture overview
    └── integration.md     # Future integration plan
```

---

## Verification Commands

| Check                     | Command                              | Working Dir  | Expected Result          |
| ------------------------- | ------------------------------------ | ------------ | ------------------------ |
| Backend starts            | `python run.py`                      | `backend/`   | Server on :5000          |
| Health endpoint           | `curl localhost:5000/api/health`     | anywhere     | `{"status": "ok"}`       |
| Cases endpoint            | `curl localhost:5000/api/cases`      | anywhere     | JSON array               |
| Frontend builds           | `npm run build`                      | `frontend/`  | No errors                |
| TypeScript type-check     | `npx tsc --noEmit`                   | `frontend/`  | No errors                |
| Frontend dev server       | `npm run dev`                        | `frontend/`  | Workspace shell renders  |

---

## What Is Deferred

| Feature                        | Status     | Next Slice                                      |
| ------------------------------ | ---------- | ----------------------------------------------- |
| PostgreSQL connection          | Deferred   | Map `Courtesy Postgres Schema.md` → SQLAlchemy  |
| Real court data                | Deferred   | After schema mapping and access policy           |
| AI_Tool bridge                 | Deferred   | Decision-prep packet → AI_Tool → artifact back   |
| Authentication                 | Deferred   | After core workflows are stable                  |
| Document storage               | Deferred   | After file handling requirements are defined     |

---

## Security Notes

- All data in this starter is **fictional mock data**.
- No real people, case numbers, SSNs, or court records are included.
- `.env` is gitignored and must never contain real credentials in version control.
- Court data is treated as sensitive — see `AGENTS.md` for full constraints.
- AI placeholders are disabled/mock-only and labeled as "draft preparation aids".

---

## Manual Browser Checklist

After starting both backend and frontend dev servers:

1. Open `http://localhost:5173`
2. ✅ Court workspace shell renders (not a landing page)
3. ✅ Left navigation sidebar is visible
4. ✅ Case list displays mock cases
5. ✅ Clicking a case shows detail panel
6. ✅ Deadlines/hearings section shows upcoming items
7. ✅ Decision-prep panel shows placeholder with appropriate language
8. ✅ Search bar is present in the top area

> **Note**: The user controls browser-level acceptance. This checklist is provided for manual verification.
