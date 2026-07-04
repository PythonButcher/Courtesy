"""
Courtesy Backend – Hearings Route

Serves mock hearing data.
"""

from flask import Blueprint, jsonify, request

# TODO: Replace with database queries when PostgreSQL is connected.
from app.fixtures import get_all_hearings

hearings_bp = Blueprint("hearings", __name__)


@hearings_bp.route("/hearings", methods=["GET"])
def list_hearings():
    """
    List all hearings, optionally filtered by case_id.

    Query params:
        case_id (int): Filter hearings by case ID
        upcoming (bool): If 'true', return only hearings with no result yet
    """
    hearings = get_all_hearings()

    case_id_filter = request.args.get("case_id", type=int)
    upcoming_filter = request.args.get("upcoming")

    if case_id_filter:
        hearings = [h for h in hearings if h["case_id"] == case_id_filter]
    if upcoming_filter and upcoming_filter.lower() == "true":
        hearings = [h for h in hearings if h["result_summary"] is None]

    return jsonify(hearings)
