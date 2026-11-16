import os

from django.core.wsgi import get_wsgi_application

# Defaults to production so a misconfigured deployment fails closed.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")

application = get_wsgi_application()
