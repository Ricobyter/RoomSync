# backend

The RoomSync Django backend: a modular monolith exposing a versioned REST API.

## Status

**Implemented:** project and settings structure, custom UUID `User` model (email login) with admin, `GET /api/v1/health/`, OpenAPI schema and docs, tests, Ruff.

**Not implemented:** registration, login, password reset, email verification, profiles, any housing or matching feature, Redis, Celery, Docker. These come in later tasks.

## Stack

Python 3.12, Django 5.2 LTS, Django REST Framework, GeoDjango, drf-spectacular, django-cors-headers, psycopg 3, PostgreSQL + PostGIS, pytest + pytest-django, Ruff. Dependencies are declared in `pyproject.toml` and locked in `uv.lock`.

## Layout

```text
backend/
├── config/        # settings (base, development, production, test), urls, asgi, wsgi
├── apps/
│   └── accounts/  # custom User model, manager, admin, tests
├── common/        # cross-cutting code (health endpoint)
├── tests/         # project-level tests
├── manage.py
└── pyproject.toml
```

## System requirements

- PostgreSQL with the PostGIS extension available. The database user needs permission to create the extension (superuser, or pre-create it with `CREATE EXTENSION postgis;`). Tests create a `test_<name>` database and need `CREATEDB`.
- GDAL and GEOS shared libraries on the machine running Django, because GeoDjango loads them at startup. GDAL 3.9 or newer is recommended (Django warns `gis.W001` on older versions).
  - Linux: `apt install libgdal-dev` (or your distribution's equivalent).
  - macOS: `brew install gdal`.
  - Windows: install GDAL (for example via OSGeo4W) and set `GDAL_LIBRARY_PATH` and `GEOS_LIBRARY_PATH` if Django cannot find them. Docker (planned for Task 05) will avoid this setup.

## Setup

Uses [uv](https://docs.astral.sh/uv/):

```bash
cd backend
uv sync                 # creates .venv and installs locked dependencies
```

## Environment

Settings read environment variables, optionally from `backend/.env` (loaded by `python-dotenv`; real environment variables win). Variables:

| Variable                                                                         | Notes                                                                   |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `DJANGO_SETTINGS_MODULE`                                                         | `config.settings.development` (default in `manage.py`), `.production`, `.test` |
| `DJANGO_SECRET_KEY`                                                              | Required in production. Development and tests fall back to a random per-process key. |
| `DJANGO_DEBUG`                                                                   | Development only (default `True`). Production is always `False`.       |
| `DJANGO_ALLOWED_HOSTS`                                                           | Comma-separated. Required in production.                                |
| `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT` | PostGIS connection. Password and host are required in production.      |
| `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`                                   | Comma-separated. Development defaults to `http://localhost:3000`.       |
| `DJANGO_SECURE_SSL_REDIRECT`                                                     | Production only (default `True`).                                       |
| `DJANGO_LOG_LEVEL`                                                               | Default `INFO`.                                                         |

Create `backend/.env` with these (a `backend/.env.example` template could not be created by the tooling in this environment because of a file-permission rule; copy the table above). Never commit real secrets.

Production settings fail at import if a mandatory variable is missing.

## Commands

Run from `backend/`:

```bash
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py runserver          # http://localhost:8000
uv run pytest
uv run ruff check .
uv run ruff format .
uv run python manage.py spectacular --file schema.yml --validate   # OpenAPI schema
uv run python manage.py makemigrations --check --dry-run           # migration consistency
```

## API

| Endpoint                | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `GET /api/v1/health/`   | `200` when the API, database and PostGIS respond; `503` otherwise. Reveals no configuration. Redis is not reported because it is not integrated yet. |
| `GET /api/schema/`      | OpenAPI schema                                                           |
| `GET /api/docs/`        | Swagger UI                                                               |
| `GET /api/redoc/`       | ReDoc                                                                    |

Endpoints are versioned in the path (`/api/v1/`). DRF is configured to require authentication by default; endpoints that must be public (such as health) opt out explicitly.

## OpenAPI and the frontend

The schema is generated from the code. TypeScript types will be generated from it into `@roomsync/contracts` with `openapi-typescript` in a later task; nothing has been generated or hand-written yet.

## User model

`accounts.User` extends `AbstractBaseUser` and `PermissionsMixin`: UUID primary key, email as `USERNAME_FIELD`, no username. Emails are stripped and lowercased, with a case-insensitive unique constraint and a non-empty check. `AUTH_USER_MODEL = "accounts.User"` was set before the first migration (`accounts/0001_initial`).

## Tests

Tests run against PostgreSQL/PostGIS, not SQLite. See Settings above for connection variables.
