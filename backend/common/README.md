# common

Small cross-cutting backend code that does not belong to a single domain app.

**Implemented:** the health endpoint (`GET /api/v1/health/`) and its URL configuration.

Keep this package minimal. Domain logic belongs in domain apps under `apps/`.
