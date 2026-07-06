"""
Courtesy Backend – Health Route

Simple health check endpoint.
"""

from flask import Blueprint, jsonify
from app.database import get_engine

health_bp = Blueprint("health", __name__)


@health_bp.route("/health", methods=["GET"])
def health_check():
    """Return a simple health status."""
    db_status = "configured" if get_engine() is not None else "not configured"
    return jsonify({"status": "ok", "database": db_status})
