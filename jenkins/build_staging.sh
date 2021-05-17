#!/bin/bash

# Require at least 1 argument, which should be the version tag to checkout on git
if [ $# -lt 1 ]; then
  echo 1>&2 "must specify version tag to build"
  exit 2
fi

VERSION_TAG=$1
API_HOST="http://staging.draftivist.com/api"
STATIC_PATH="http://staging.draftivist.com/static"

echo "Starting to build docker image..."
docker build -f Dockerfile.prod --build-arg API_HOST="${API_HOST}" --build-arg STATIC_PATH="${STATIC_PATH}" -t nonsensesynapse/draftivist:"${VERSION_TAG}" .
echo "Build finished!"
