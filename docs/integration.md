# Future Integration Plan

## Overview

Courtesy is designed for two future integrations:

1. **PostgreSQL** — Connect to the user's existing court database
2. **AI_Tool Decision Intelligence** — Exchange decision-prep packets for AI-assisted analysis

Both integrations are intentionally deferred in the starter slice.

---

## Integration 1: PostgreSQL Schema Mapping

### What Exists

The user's PostgreSQL schema is documented in `Courtesy Postgres Schema.md` at the project root. It contains 17 tables and 1 view covering the full court domain: cases, parties, hearings, charges, dispositions, judges, courts, attorneys, and more.

### Integration Steps

1. **Generate SQLAlchemy models** from the documented schema (do not guess)
2. **Configure Alembic** for migration management
3. **Define read/write policy** — which tables Courtesy can modify vs. read-only
4. **Replace mock fixtures** with real database queries in the data layer
5. **Add connection pooling** via `DATABASE_URL` in `.env`
6. **Test with a staging database** before touching production data

### Connection Pattern

```python
# backend/app/config.py — deferred configuration
DATABASE_URL = os.getenv("DATABASE_URL")  # postgresql://user:pass@host:port/db

# backend/app/database.py — future setup
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=10)
SessionLocal = sessionmaker(bind=engine)
```

---

## Integration 2: AI_Tool Decision Intelligence Bridge

### Concept

Courtesy sends a **structured decision-prep packet** to AI_Tool Decision Intelligence and receives a **decision-support artifact** back. This is a preparation aid, not a legal conclusion.

### Decision-Prep Packet Structure (Draft)

```json
{
  "packet_type": "decision_prep",
  "case_id": "2025-CV-00142",
  "case_metadata": {
    "case_type": "Civil",
    "status": "Active",
    "filing_date": "2025-01-15",
    "court": "Superior Court",
    "assigned_judge": "Hon. J. Smith"
  },
  "selected_facts": [
    "Contract signed 2024-06-01",
    "Breach alleged 2024-11-15"
  ],
  "source_references": [
    {"type": "filing", "title": "Complaint", "date": "2025-01-15"},
    {"type": "hearing", "title": "Status Conference", "date": "2025-03-01"}
  ],
  "tasks": [
    {"title": "Review discovery responses", "due": "2025-04-01", "priority": "high"}
  ],
  "user_notes": "Focus on breach timeline and damages calculation"
}
```

### Decision-Support Artifact (Draft Response)

```json
{
  "artifact_type": "decision_support",
  "case_id": "2025-CV-00142",
  "label": "DRAFT RESEARCH AID — NOT LEGAL ADVICE",
  "analysis": {
    "summary": "Timeline analysis of key contract dates...",
    "evidence_gaps": ["Missing signed amendment from Q3 2024"],
    "suggested_next_steps": ["Request amendment document in discovery"]
  },
  "generated_at": "2025-03-15T10:30:00Z",
  "requires_user_approval": true
}
```

### Security Constraints

- **Explicit user approval required** — No silent data sharing
- **No private court data sent without consent** — User selects what goes in the packet
- **All AI outputs labeled as drafts** — Never presented as legal conclusions
- **Audit trail** — Every packet sent and artifact received is logged

### Integration Steps

1. **Define API contract** between Courtesy and AI_Tool
2. **Create bridge service** in Courtesy backend
3. **Add user approval UI** — confirmation dialog before sending packet
4. **Implement artifact display** — show returned analysis with clear draft labels
5. **Add audit logging** — track all bridge interactions
