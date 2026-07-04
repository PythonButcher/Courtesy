# Hooks

Hooks are optional automation around the agent lifecycle. In Courtesy, they start as conservative checks, not hidden source-modifying automation.

## Current Scripts

### `courtesy_harness_check.py`

`.codex/hooks/courtesy_harness_check.py` is a manual validation command. It checks:

1. **Required docs exist**: `AGENTS.md`, `README.md`, `project_docs/INDEX.md`, `project_docs/active/README.md`, `project_docs/active/agent_harness/README.md`.
2. **Hook scripts parse**: All `.py` files in `.codex/hooks/` compile without syntax errors.
3. **Protected files exist**: `Courtesy Postgres Schema.md` is present and unmodified from git HEAD.
4. **No real secrets**: Scans tracked files for patterns that look like real database URLs, API keys, or SSN-like strings.
5. **Schema file not modified**: Checks `git diff` for changes to `Courtesy Postgres Schema.md`.

Run it before calling substantial work complete:

```
python .codex/hooks/courtesy_harness_check.py
```

## Safe Adoption Path

Start by running hooks manually. Do not wire them into automated lifecycle events until they have been tested and trusted.

Keep hook scope narrow. A hook that validates one important invariant is better than a hook that tries to enforce every rule.

## Hook Policy

- Hooks must **not** edit files automatically.
- Hooks must **not** weaken sandbox, approval, or ownership rules.
- Hooks must **not** modify `Courtesy Postgres Schema.md`.
- Hooks must **not** use bulk-overwrite patterns (`open(f, "w")`, `Path.write_text()`, shell redirects).
- Hooks that warn about a condition must explain the exact project rule being checked.
- If a hook becomes noisy, disable it and revise before relying on it again.

## Adding New Hooks

When adding a new hook:

1. State the repeated failure it prevents.
2. Keep the check non-mutating and idempotent.
3. Make the output clear: PASS, WARN, or FAIL with the relevant file and rule.
4. Test it manually before promoting it to a required check.
5. Document it in this file.
