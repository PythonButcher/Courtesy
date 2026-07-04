# Schema Integration Notes

## Current State

The user's PostgreSQL schema is documented in [`Courtesy Postgres Schema.md`](../Courtesy%20Postgres%20Schema.md) at the project root. This file contains the complete table definitions and foreign key constraints for the court database.

## Schema File Expectations

When ready for real database integration, place schema files here:

| File                     | Purpose                                                |
| ------------------------ | ------------------------------------------------------ |
| `schema/courtesy.sql`   | Full DDL export from PostgreSQL (`pg_dump --schema-only`) |
| `schema/seed.sql`       | Optional seed data for development                      |
| `schema/migrations/`    | Alembic migration files (generated after model mapping)  |

## Tables in the Schema

The following tables are defined in the user's PostgreSQL database:

- `attorneys` — Bar-admitted attorneys with firm affiliation
- `case_parties` — Junction table linking cases to people with roles
- `case_status` — Lookup table for case status values
- `cases` — Core case records with type, status, court, judge
- `charges` — Charges filed against cases, linked to offenses
- `court_case_type` — Lookup table for case type codes
- `courts` — Court entities with jurisdiction and level
- `dispositions` — Charge dispositions with dates and results
- `hearings` — Scheduled and completed hearings per case
- `judges` — Judges with appointment dates and court assignments
- `offenses` — Offense definitions with statute codes and severity
- `payments` — Payments made against cases
- `people` — Person records (parties, defendants, witnesses)
- `plea_type` — Lookup table for plea types
- `pleas` — Pleas entered on charges
- `sentences` — Sentencing details per disposition
- `vw_case_summary` — View summarizing case data
- `warrants` — Warrants issued per case

## What the Backend Needs Before Real Integration

1. **Database connection string** — `DATABASE_URL` in `.env`
2. **SQLAlchemy model mapping** — Each table above → a Python model class
3. **Read/write policy** — Which tables Courtesy can read vs. write
4. **Migration strategy** — Whether to use Alembic or manual DDL management
5. **Data sensitivity classification** — Which columns contain PII or privileged data

## Next Steps

The next integration slice should:

1. Read `Courtesy Postgres Schema.md` and generate SQLAlchemy 2.x models
2. Create Alembic migration configuration
3. Define a data access layer with explicit read/write boundaries
4. Replace mock fixtures with real database queries
5. Add connection pooling configuration via `.env`

## Important

- Do **not** invent or guess schema changes — map the existing tables as-is
- Do **not** store real database credentials in version control
- Do **not** create migrations from guessed table structures
- The schema file at the project root is the single source of truth
