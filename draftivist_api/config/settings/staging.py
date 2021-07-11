import os
from .base import PROJECT_ROOT

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = False

ALLOWED_HOSTS = ['*']

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    'http://localhost:8000',
]

STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
STATIC_URL = '/static/'
