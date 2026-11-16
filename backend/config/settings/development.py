"""Local development settings. Convenience defaults live here, never in production."""

from django.core.management.utils import get_random_secret_key

from .base import *  # noqa: F403
from .base import env_bool, env_list, env_str

DEBUG = env_bool("DJANGO_DEBUG", True)

# Falls back to an ephemeral per-process key (sessions reset on restart) if none is configured.
SECRET_KEY = env_str("DJANGO_SECRET_KEY") or get_random_secret_key()

ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", ["localhost", "127.0.0.1"])
CORS_ALLOWED_ORIGINS = env_list("CORS_ALLOWED_ORIGINS", ["http://localhost:3000"])
CSRF_TRUSTED_ORIGINS = env_list("CSRF_TRUSTED_ORIGINS", ["http://localhost:3000"])
