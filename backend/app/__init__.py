"""
Courtesy Backend – App Factory

Creates and configures the Flask application.
"""

from flask import Flask
from flask_cors import CORS

from app.config import load_config


def create_app() -> Flask:
    """Create the Flask application with all routes registered."""
    app = Flask(__name__)
    load_config(app)

    # Enable CORS for frontend dev server
    CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

    # Register route blueprints
    from app.routes.health import health_bp
    from app.routes.cases import cases_bp
    from app.routes.hearings import hearings_bp
    from app.routes.tasks import tasks_bp

    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(cases_bp, url_prefix="/api")
    app.register_blueprint(hearings_bp, url_prefix="/api")
    app.register_blueprint(tasks_bp, url_prefix="/api")

    # TODO: Register PostgreSQL database session teardown here
    # @app.teardown_appcontext
    # def shutdown_session(exception=None):
    #     db_session.remove()

    return app
