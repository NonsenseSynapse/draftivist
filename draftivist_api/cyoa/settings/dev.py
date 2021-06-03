import os
from .base import PROJECT_ROOT

SECRET_KEY = 'b)7$nz1dt8f)3!la#w8cvkr)vb0v04p1r=+s8@a%&7+wswr0i)'
DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
STATIC_URL = '/static/'
