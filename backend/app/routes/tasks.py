"""
Courtesy Backend – Tasks Route

Serves mock task/deadline data.
"""

from flask import Blueprint, jsonify, request

# TODO: Replace with database queries when PostgreSQL is connected.
from app.fixtures import get_all_tasks

tasks_bp = Blueprint("tasks", __name__)


@tasks_bp.route("/tasks", methods=["GET"])
def list_tasks():
    """
    List all tasks/deadlines, optionally filtered.

    Query params:
        case_id (int): Filter tasks by case ID
        status (str): Filter by task status (overdue, pending, in_progress, done)
        priority (str): Filter by priority (high, medium, low)
    """
    tasks = get_all_tasks()

    case_id_filter = request.args.get("case_id", type=int)
    status_filter = request.args.get("status")
    priority_filter = request.args.get("priority")

    if case_id_filter:
        tasks = [t for t in tasks if t["case_id"] == case_id_filter]
    if status_filter:
        tasks = [t for t in tasks if t["status"].lower() == status_filter.lower()]
    if priority_filter:
        tasks = [t for t in tasks if t["priority"].lower() == priority_filter.lower()]

    return jsonify(tasks)
