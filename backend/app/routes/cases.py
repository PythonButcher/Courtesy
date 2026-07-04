"""
Courtesy Backend – Cases Route

Serves mock court case data. When PostgreSQL is connected, the fixture
imports below will be replaced with database queries.
"""

from flask import Blueprint, jsonify, request

# TODO: Replace fixture imports with database queries when PostgreSQL is connected.
from app.fixtures import (
    get_all_cases,
    get_case_by_id,
    get_documents_by_case,
    get_hearings_by_case,
    get_tasks_by_case,
    get_decision_prep_by_case,
)

cases_bp = Blueprint("cases", __name__)


@cases_bp.route("/cases", methods=["GET"])
def list_cases():
    """
    List all cases, optionally filtered by status or case_type.

    Query params:
        status (str): Filter by case status name
        case_type (str): Filter by case type code
    """
    cases = get_all_cases()

    # Optional filtering
    status_filter = request.args.get("status")
    type_filter = request.args.get("case_type")

    if status_filter:
        cases = [c for c in cases if c["status"].lower() == status_filter.lower()]
    if type_filter:
        cases = [c for c in cases if c["case_type"].lower() == type_filter.lower()]

    return jsonify(cases)


@cases_bp.route("/cases/<int:case_id>", methods=["GET"])
def get_case(case_id: int):
    """
    Get a single case by ID with related hearings, tasks, documents,
    and decision-prep notes.
    """
    case = get_case_by_id(case_id)
    if case is None:
        return jsonify({"error": "Case not found"}), 404

    # Enrich with related data
    enriched = {
        **case,
        "hearings": get_hearings_by_case(case_id),
        "tasks": get_tasks_by_case(case_id),
        "documents": get_documents_by_case(case_id),
        "decision_prep_notes": get_decision_prep_by_case(case_id),
    }

    return jsonify(enriched)
