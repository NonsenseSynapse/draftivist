#!/bin/bash

# Require at least 1 argument
if [ $# -lt 1 ]; then
  echo 1>&2 "must specify version tag to deploy"
  exit 2
fi

VERSION_TAG=$1

echo "Exporting docker image..."
docker save draftivist_staging:"${VERSION_TAG}" > ~/draftivist_staging_${VERSION_TAG}.tar
scp ~/draftivist_staging_${VERSION_TAG}.tar ${remote_user}:${remote_password}@${remote_address}:~/
#docker build -f Dockerfile.prod --build-arg API_HOST="${API_HOST}" --build-arg STATIC_PATH="${STATIC_PATH}" -t draftivist_staging:"${VERSION_TAG}" .
echo "Build finished!"
