# Agent Maintenance Rules

## Gitignore Maintenance
- **Rule**: Always verify that `.gitignore` is up to date and preventing junk files, temporary harness files (e.g., `.codex_tmp_py/`), and caches from being tracked in source control.
- **Trigger**: When generating new types of artifacts, caches, or running new external tools.
- **Action**: Inspect `git status` for untracked junk files and proactively update `.gitignore`.
