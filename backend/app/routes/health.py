"""
Courtesy Backend – Health Route

Simple health check endpoint.
"""

from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__)


@health_bp.route("/health", methods=["GET"])
def health_check():
    """Return a simple health status."""
    return jsonify({"status": "ok"})
