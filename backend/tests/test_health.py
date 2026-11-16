from unittest.mock import patch

import pytest
from django.db import connection
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db


@pytest.fixture
def client():
    return APIClient()


def test_health_ok(client):
    response = client.get("/api/v1/health/")
    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "checks": {"application": "ok", "database": "ok", "postgis": "ok"},
    }


def test_health_response_is_safe(client):
    body = client.get("/api/v1/health/").content.decode().lower()
    for leak in ("password", "secret", "postgres://", "host", "user", "version"):
        assert leak not in body


def test_health_reports_database_failure(client):
    with patch.object(connection, "cursor", side_effect=RuntimeError("boom: password=hunter2")):
        response = client.get("/api/v1/health/")
    assert response.status_code == 503
    body = response.json()
    assert body["status"] == "degraded"
    assert body["checks"]["application"] == "ok"
    assert body["checks"]["database"] == "unavailable"
    assert "hunter2" not in response.content.decode()


def test_openapi_schema_and_docs(client):
    schema = client.get("/api/schema/")
    assert schema.status_code == 200
    assert b"/api/v1/health/" in schema.content
    assert client.get("/api/docs/").status_code == 200
    assert client.get("/api/redoc/").status_code == 200
