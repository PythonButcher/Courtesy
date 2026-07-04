"""
Courtesy Backend – Configuration

Loads settings from .env file and environment variables.
"""

import os
from pathlib import Path

from dotenv import load_dotenv


def load_config(app):
    """Load configuration into the Flask app from .env and environment."""
    # Load .env from the project root (one level above backend/)
    env_path = Path(__file__).resolve().parent.parent.parent / ".env"
    if env_path.exists():
        load_dotenv(env_path)
    else:
        # Fall back to .env.example for variable names
        example_path = Path(__file__).resolve().parent.parent.parent / ".env.example"
        if example_path.exists():
            load_dotenv(example_path)

    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-change-me")
    app.config["DEBUG"] = os.getenv("FLASK_DEBUG", "1") == "1"
    app.config["BACKEND_HOST"] = os.getenv("BACKEND_HOST", "127.0.0.1")
    app.config["BACKEND_PORT"] = os.getenv("BACKEND_PORT", "5000")

    # TODO: Database configuration (deferred)
    # app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    # app.config["SQLALCHEMY_POOL_SIZE"] = int(os.getenv("DB_POOL_SIZE", "5"))
    # app.config["SQLALCHEMY_MAX_OVERFLOW"] = int(os.getenv("DB_MAX_OVERFLOW", "10"))

    # TODO: AI_Tool bridge configuration (deferred)
    # app.config["AITOOL_API_BASE_URL"] = os.getenv("AITOOL_API_BASE_URL")
    # app.config["AITOOL_API_KEY"] = os.getenv("AITOOL_API_KEY")
