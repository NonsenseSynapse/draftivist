#!/bin/bash

if [ $# -lt 1 ]; then
  echo 1>&2 "must specify version tag to build"
  exit 2
fi

VERSION_TAG=$1
API_HOST="http://localhost:8000/api"
STATIC_PATH="http://localhost:8000/static"

echo "Starting to build docker image..."
docker build -f Dockerfile.prod --build-arg API_HOST="${API_HOST}" --build-arg STATIC_PATH="${STATIC_PATH}" -t draftivist_staging:"${VERSION_TAG}" .
echo "Build finished!"
