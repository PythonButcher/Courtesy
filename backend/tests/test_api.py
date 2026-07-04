"""
Courtesy Backend – Tests

Basic tests for the Flask API endpoints.
Run with: python -m pytest tests/ -v
"""

import json
import pytest
from app import create_app


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_health_endpoint(client):
    """Health endpoint returns status ok."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["status"] == "ok"


def test_cases_list(client):
    """Cases endpoint returns a non-empty list."""
    response = client.get("/api/cases")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) >= 1


def test_cases_list_has_required_fields(client):
    """Each case has the expected fields."""
    response = client.get("/api/cases")
    data = json.loads(response.data)
    required_fields = ["case_id", "case_number", "status", "case_type", "filing_date"]
    for case in data:
        for field in required_fields:
            assert field in case, f"Missing field '{field}' in case {case.get('case_id')}"


def test_case_detail(client):
    """Case detail endpoint returns enriched data."""
    response = client.get("/api/cases/1")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["case_id"] == 1
    assert "hearings" in data
    assert "tasks" in data
    assert "documents" in data
    assert "decision_prep_notes" in data


def test_case_not_found(client):
    """Non-existent case returns 404."""
    response = client.get("/api/cases/9999")
    assert response.status_code == 404


def test_hearings_list(client):
    """Hearings endpoint returns a list."""
    response = client.get("/api/hearings")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_hearings_filter_upcoming(client):
    """Upcoming hearings filter works."""
    response = client.get("/api/hearings?upcoming=true")
    assert response.status_code == 200
    data = json.loads(response.data)
    for hearing in data:
        assert hearing["result_summary"] is None


def test_tasks_list(client):
    """Tasks endpoint returns a list."""
    response = client.get("/api/tasks")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) >= 1


def test_tasks_filter_by_priority(client):
    """Tasks can be filtered by priority."""
    response = client.get("/api/tasks?priority=high")
    assert response.status_code == 200
    data = json.loads(response.data)
    for task in data:
        assert task["priority"] == "high"


def test_cases_filter_by_status(client):
    """Cases can be filtered by status."""
    response = client.get("/api/cases?status=Active")
    assert response.status_code == 200
    data = json.loads(response.data)
    for case in data:
        assert case["status"] == "Active"
