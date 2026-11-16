import logging

from django.db import connection
from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)

COMPONENT_STATUS_CHOICES = [("ok", "ok"), ("unavailable", "unavailable")]


class HealthChecksSerializer(serializers.Serializer):
    application = serializers.ChoiceField(choices=["ok"], help_text="The API process is serving.")
    database = serializers.ChoiceField(
        choices=COMPONENT_STATUS_CHOICES, help_text="A trivial query succeeded on the database."
    )
    postgis = serializers.ChoiceField(
        choices=COMPONENT_STATUS_CHOICES, help_text="The PostGIS extension responds."
    )


class HealthSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=["ok", "degraded"])
    checks = HealthChecksSerializer()


def _check_database() -> tuple[str, str]:
    """Return (database, postgis) check results without leaking error details."""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
    except Exception:
        logger.exception("Health check: database unavailable")
        return "unavailable", "unavailable"

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT PostGIS_Version()")
            cursor.fetchone()
    except Exception:
        logger.warning("Health check: PostGIS unavailable", exc_info=True)
        return "ok", "unavailable"
    return "ok", "ok"


class HealthView(APIView):
    """Liveness and basic dependency check. Exposes no configuration or infrastructure details."""

    authentication_classes: list = []
    permission_classes = [AllowAny]

    @extend_schema(
        operation_id="health_retrieve",
        summary="Service health",
        description=(
            "Reports whether the API is serving and whether the database and PostGIS respond. "
            "Returns 200 when healthy and 503 when the database is unavailable. "
            "Redis and background workers are not yet part of the platform and are not reported."
        ),
        responses={
            200: HealthSerializer,
            503: OpenApiResponse(response=HealthSerializer, description="Database unavailable"),
        },
        tags=["health"],
    )
    def get(self, request, *args, **kwargs):
        database, postgis = _check_database()
        healthy = database == "ok" and postgis == "ok"
        body = {
            "status": "ok" if healthy else "degraded",
            "checks": {"application": "ok", "database": database, "postgis": postgis},
        }
        code = status.HTTP_200_OK if healthy else status.HTTP_503_SERVICE_UNAVAILABLE
        return Response(body, status=code)
