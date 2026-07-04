#!/usr/bin/env python3
"""
Courtesy Harness Check

Conservative, non-mutating validation script for the Courtesy project.
Run from the Courtesy repo root:

    python .codex/hooks/courtesy_harness_check.py

This script checks:
  1. Required documentation files exist.
  2. Hook scripts in .codex/hooks/ parse without syntax errors.
  3. Protected files (schema, .env.example) exist.
  4. Schema file has not been modified in the current git diff.
  5. No tracked files contain patterns that look like real secrets or credentials.
  6. Key source directories exist.

Exit code 0 = all checks pass. Exit code 1 = at least one FAIL.
Warnings (WARN) do not cause failure.

This script does NOT modify any files. It only reads and reports.
"""

import os
import sys
import re
import subprocess
import py_compile
import tempfile
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Run from repo root
REPO_ROOT = Path(__file__).resolve().parent.parent.parent

REQUIRED_DOCS = [
    "AGENTS.md",
    "README.md",
    "project_docs/INDEX.md",
    "project_docs/active/README.md",
    "project_docs/active/agent_harness/README.md",
    "project_docs/active/agent_harness/harness_blueprint.md",
    "project_docs/active/agent_harness/hooks.md",
    ".env.example",
    ".gitignore",
    "docs/architecture.md",
    "docs/integration.md",
    "schema/README.md",
]

PROTECTED_FILES = [
    "Courtesy Postgres Schema.md",
]

REQUIRED_DIRS = [
    "backend/app",
    "backend/app/routes",
    "backend/app/fixtures",
    "backend/tests",
    "frontend/src",
    "frontend/src/components",
    "frontend/src/services",
    "frontend/src/types",
    "frontend/src/data",
]

# Patterns that suggest real credentials or sensitive data in tracked files.
# These are conservative — they flag things that look like real values, not
# placeholder patterns.
SECRET_PATTERNS = [
    # Real PostgreSQL connection strings (not commented-out placeholders or code examples)
    # Requires a non-comment, non-code-fence context with an actual hostname
    (r'^(?!\s*#)(?!\s*```).*postgresql://\w+:[^@\s]+@(?!localhost|host)', "Real PostgreSQL connection string"),
    # API keys that look real (long hex/alphanumeric strings assigned to variables)
    (r'(?:API_KEY|SECRET_KEY|PASSWORD)\s*=\s*["\'][A-Za-z0-9+/=]{32,}["\']', "Possible real API key or secret"),
    # SSN patterns (###-##-####)
    (r'\b\d{3}-\d{2}-\d{4}\b', "Possible SSN pattern"),
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

pass_count = 0
warn_count = 0
fail_count = 0


def report(status: str, message: str):
    """Print a check result."""
    global pass_count, warn_count, fail_count
    if status == "PASS":
        pass_count += 1
    elif status == "WARN":
        warn_count += 1
    elif status == "FAIL":
        fail_count += 1
    print(f"  [{status}] {message}")


def git_available() -> bool:
    """Check if git is available and we are in a git repo."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--git-dir"],
            cwd=str(REPO_ROOT),
            capture_output=True,
            text=True,
            timeout=10,
        )
        return result.returncode == 0
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


def get_tracked_files() -> list[str]:
    """Get list of tracked files from git."""
    try:
        result = subprocess.run(
            ["git", "ls-files"],
            cwd=str(REPO_ROOT),
            capture_output=True,
            text=True,
            timeout=10,
        )
        if result.returncode == 0:
            return [f.strip() for f in result.stdout.splitlines() if f.strip()]
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass
    return []


def check_schema_unmodified() -> bool:
    """Check if the schema file has uncommitted changes."""
    try:
        result = subprocess.run(
            ["git", "diff", "--name-only", "Courtesy Postgres Schema.md"],
            cwd=str(REPO_ROOT),
            capture_output=True,
            text=True,
            timeout=10,
        )
        if result.returncode == 0:
            return result.stdout.strip() == ""
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass
    return True  # If git is unavailable, don't fail on this


# ---------------------------------------------------------------------------
# Checks
# ---------------------------------------------------------------------------

def check_required_docs():
    """Check that all required documentation files exist."""
    print("\n1. Required Documentation")
    for doc in REQUIRED_DOCS:
        path = REPO_ROOT / doc
        if path.exists():
            report("PASS", f"{doc} exists")
        else:
            report("FAIL", f"{doc} is MISSING")


def check_hook_scripts():
    """Check that all Python scripts in .codex/hooks/ parse without errors."""
    print("\n2. Hook Script Parsing")
    hooks_dir = REPO_ROOT / ".codex" / "hooks"
    if not hooks_dir.exists():
        report("FAIL", ".codex/hooks/ directory does not exist")
        return

    py_files = list(hooks_dir.glob("*.py"))
    if not py_files:
        report("WARN", "No Python scripts found in .codex/hooks/")
        return

    for py_file in py_files:
        try:
            py_compile.compile(str(py_file), doraise=True)
            report("PASS", f"{py_file.name} parses OK")
        except py_compile.PyCompileError as e:
            report("FAIL", f"{py_file.name} has syntax error: {e}")


def check_protected_files():
    """Check that protected files exist and are unmodified."""
    print("\n3. Protected Files")
    for pf in PROTECTED_FILES:
        path = REPO_ROOT / pf
        if path.exists():
            report("PASS", f"{pf} exists")
        else:
            report("FAIL", f"{pf} is MISSING — this is the schema source of truth")

    if git_available():
        if check_schema_unmodified():
            report("PASS", "Courtesy Postgres Schema.md has no uncommitted changes")
        else:
            report("FAIL", "Courtesy Postgres Schema.md has been modified — revert changes")
    else:
        report("WARN", "Git not available — cannot verify schema is unmodified")


def check_secret_patterns():
    """Scan tracked files for patterns that look like real credentials."""
    print("\n4. Secret / Credential Scan")
    if not git_available():
        report("WARN", "Git not available — skipping secret scan")
        return

    tracked_files = get_tracked_files()
    if not tracked_files:
        report("WARN", "No tracked files found — skipping secret scan")
        return

    found_any = False
    for rel_path in tracked_files:
        full_path = REPO_ROOT / rel_path
        # Skip binary files and large files
        if not full_path.exists() or full_path.stat().st_size > 500_000:
            continue
        # Only scan text-like files
        suffix = full_path.suffix.lower()
        if suffix in ('.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.lock'):
            continue

        try:
            content = full_path.read_text(encoding="utf-8", errors="ignore")
        except (OSError, UnicodeDecodeError):
            continue

        for pattern, description in SECRET_PATTERNS:
            matches = re.findall(pattern, content, re.MULTILINE)
            if matches:
                report("WARN", f"{rel_path}: {description} ({len(matches)} match(es))")
                found_any = True

    if not found_any:
        report("PASS", "No real-secret patterns found in tracked files")


def check_required_dirs():
    """Check that key source directories exist."""
    print("\n5. Source Directory Structure")
    for d in REQUIRED_DIRS:
        path = REPO_ROOT / d
        if path.is_dir():
            report("PASS", f"{d}/ exists")
        else:
            report("FAIL", f"{d}/ is MISSING")


def check_env_not_committed():
    """Warn if .env is tracked by git."""
    print("\n6. Environment File Safety")
    if not git_available():
        report("WARN", "Git not available — cannot check .env tracking")
        return

    tracked = get_tracked_files()
    if ".env" in tracked:
        report("FAIL", ".env is tracked by git — it should be gitignored")
    else:
        report("PASS", ".env is not tracked (or does not exist)")

    env_path = REPO_ROOT / ".env"
    if env_path.exists():
        report("WARN", ".env file exists locally — ensure it contains no real credentials before committing")
    else:
        report("PASS", "No local .env file (will use .env.example defaults)")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print("  Courtesy Harness Check")
    print(f"  Repo root: {REPO_ROOT}")
    print("=" * 60)

    check_required_docs()
    check_hook_scripts()
    check_protected_files()
    check_secret_patterns()
    check_required_dirs()
    check_env_not_committed()

    # Summary
    print("\n" + "=" * 60)
    total = pass_count + warn_count + fail_count
    print(f"  Results: {pass_count} PASS, {warn_count} WARN, {fail_count} FAIL ({total} total)")
    print("=" * 60)

    if fail_count > 0:
        print("\n  [X] HARNESS CHECK FAILED -- fix the FAIL items above.")
        sys.exit(1)
    elif warn_count > 0:
        print("\n  [!] HARNESS CHECK PASSED with warnings -- review WARN items.")
        sys.exit(0)
    else:
        print("\n  [OK] HARNESS CHECK PASSED -- all checks clean.")
        sys.exit(0)


if __name__ == "__main__":
    main()
