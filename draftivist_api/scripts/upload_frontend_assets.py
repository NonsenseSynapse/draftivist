import os

from boto3 import session
from botocore.client import Config

ACCESS_ID = os.environ.get('STATIC_ACCESS_KEY')
SECRET_KEY = os.environ.get('STATIC_SECRET_KEY')
SPACES_ENDPOINT = os.environ.get('STATIC_ENDPOINT_URL')

print(ACCESS_ID)
print(SECRET_KEY)
print(SPACES_ENDPOINT)

# Initiate session
session = session.Session()
client = session.client('s3',
                        region_name='sfo2',
                        endpoint_url=SPACES_ENDPOINT,
                        aws_access_key_id=ACCESS_ID,
                        aws_secret_access_key=SECRET_KEY)

# Upload a file to your Space
files_to_upload = []
for root, dirs, files in os.walk("frontend/static"):
    for file in files:
        files_to_upload.append({
            'path': root,
            'name': file
        })

# TODO: Fix to upload into separate css/ and js/ folders
for file in files_to_upload:
    file_path = os.path.join(file['path'], file['name'])
    print(f'uploading {file_path}')
    upload_path = file['path'].replace('frontend/', '')
    client.upload_file(file_path, upload_path, file['name'])
