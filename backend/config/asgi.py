import os

from django.core.asgi import get_asgi_application

# Defaults to production so a misconfigured deployment fails closed.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")

application = get_asgi_application()
