import logging
from flask import current_app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

logger = logging.getLogger(__name__)

# Global engine and session factory references (scaffolded, inactive, mock-first)
_engine = None
_session_factory = None

def init_db(app):
    """
    Scaffold database components.
    In Phase 2, this remains inert by default. Starting the app does NOT create an engine,
    even if DATABASE_URL is present, until explicitly authorized.
    """
    global _engine, _session_factory
    logger.info("Database connection is scaffolded, inactive, mock-first.")
    # Engine creation is intentionally deferred.


def get_engine():
    """Get the SQLAlchemy engine if initialized."""
    return _engine


def get_session_factory():
    """Get the session factory if initialized."""
    return _session_factory


def get_db_session() -> Session:
    """
    Yields a database session if configured. Raises RuntimeError if not.
    Use this for context manager or dependency injection patterns.
    """
    if _session_factory is None:
        raise RuntimeError("Database is not configured or initialized.")
    return _session_factory()

