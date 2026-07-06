"""
Courtesy Backend – Cases Route

Serves court case data via the repository layer.
"""

from flask import Blueprint, jsonify, request

from app.repositories import (
    get_repository,
    CaseRepository,
    HearingRepository,
    TaskRepository,
    DocumentRepository,
    DecisionPrepRepository,
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
    repo = get_repository(CaseRepository)
    status_filter = request.args.get("status")
    type_filter = request.args.get("case_type")

    cases = repo.get_all(status=status_filter, case_type=type_filter)
    return jsonify(cases)


@cases_bp.route("/cases/<int:case_id>", methods=["GET"])
def get_case(case_id: int):
    """
    Get a single case by ID with related hearings, tasks, documents,
    and decision-prep notes.
    """
    case_repo = get_repository(CaseRepository)
    case = case_repo.get_by_id(case_id)
    if case is None:
        return jsonify({"error": "Case not found"}), 404

    hearing_repo = get_repository(HearingRepository)
    task_repo = get_repository(TaskRepository)
    doc_repo = get_repository(DocumentRepository)
    prep_repo = get_repository(DecisionPrepRepository)

    # Enrich with related data
    enriched = {
        **case,
        "hearings": hearing_repo.get_by_case_id(case_id),
        "tasks": task_repo.get_by_case_id(case_id),
        "documents": doc_repo.get_by_case_id(case_id),
        "decision_prep_notes": prep_repo.get_by_case_id(case_id),
    }

    return jsonify(enriched)
