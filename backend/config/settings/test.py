"""Test settings. Tests run against PostgreSQL/PostGIS, the same engine as production."""

from django.core.management.utils import get_random_secret_key

from .base import *  # noqa: F403
from .base import env_str

DEBUG = False
SECRET_KEY = env_str("DJANGO_SECRET_KEY") or get_random_secret_key()
ALLOWED_HOSTS = ["testserver", "localhost"]

# Fast hashing for tests only.
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
