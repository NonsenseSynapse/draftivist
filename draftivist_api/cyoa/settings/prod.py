import os

from .base import PROJECT_ROOT

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = False

STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
STATIC_URL = 'static/'

# These use AWS prefix even though we are using Digital Ocean. This is because the django-storages package is
# configured to look for settings with specific names.
# AWS_ACCESS_KEY_ID = os.getenv('STATIC_ACCESS_KEY')
# AWS_SECRET_ACCESS_KEY = os.getenv('STATIC_SECRET_KEY')
#
# AWS_STORAGE_BUCKET_NAME = os.getenv('STATIC_BUCKET_NAME')
# AWS_S3_ENDPOINT_URL = os.getenv('STATIC_ENDPOINT_URL')
# AWS_S3_OBJECT_PARAMETERS = {
#     'CacheControl': 'max-age=86400',
# }
# AWS_LOCATION = 'static'
# AWS_DEFAULT_ACL = 'public-read'
#
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
#
# STATIC_URL = '{}/{}/'.format(AWS_S3_ENDPOINT_URL, AWS_LOCATION)
# STATIC_ROOT = 'static/'
