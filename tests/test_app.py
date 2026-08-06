from copy import deepcopy

import pytest
from fastapi.testclient import TestClient

from src import app as app_module


@pytest.fixture(autouse=True)
def reset_activities():
    initial_activities = deepcopy(app_module.activities)
    app_module.activities = deepcopy(initial_activities)
    yield
    app_module.activities = deepcopy(initial_activities)


@pytest.fixture()
def client():
    return TestClient(app_module.app)


def test_unregister_participant_removes_them_from_activity(client):
    # Arrange
    email = "newstudent@mergington.edu"
    activity_name = "Chess Club"
    app_module.activities[activity_name]["participants"].append(email)

    # Act
    response = client.delete(f"/activities/{activity_name}/participants/{email}")

    # Assert
    assert response.status_code == 200
    assert email not in app_module.activities[activity_name]["participants"]
    assert response.json()["message"] == f"Removed {email} from {activity_name}"


def test_unregister_participant_returns_404_when_missing(client):
    # Arrange
    activity_name = "Chess Club"
    missing_email = "missing@mergington.edu"

    # Act
    response = client.delete(f"/activities/{activity_name}/participants/{missing_email}")

    # Assert
    assert response.status_code == 404
    assert response.json()["detail"] == "Participant not found"
