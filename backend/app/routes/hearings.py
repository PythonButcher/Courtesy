"""
Courtesy Backend – Hearings Route

Serves hearing data via the repository layer.
"""

from flask import Blueprint, jsonify, request

from app.repositories import get_repository, HearingRepository

hearings_bp = Blueprint("hearings", __name__)


@hearings_bp.route("/hearings", methods=["GET"])
def list_hearings():
    """
    List all hearings, optionally filtered by case_id.

    Query params:
        case_id (int): Filter hearings by case ID
        upcoming (bool): If 'true', return only hearings with no result yet
    """
    repo = get_repository(HearingRepository)

    case_id_filter = request.args.get("case_id", type=int)
    upcoming_filter = request.args.get("upcoming")

    hearings = repo.get_all(case_id=case_id_filter)

    if upcoming_filter and upcoming_filter.lower() == "true":
        hearings = [h for h in hearings if h["result_summary"] is None]

    return jsonify(hearings)
