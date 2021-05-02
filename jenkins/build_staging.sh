#!/bin/bash

if [ $# -lt 1 ]; then
  echo 1>&2 "must specify version tag to build"
  exit 2
fi

version_tag=$1

echo "Starting to build docker image..."
docker-compose -f docker-compose.staging.yaml build staging
echo "Build finished!"

echo "Tagging build with version ${version_tag}"
docker image tag draftivist_staging:latest draftivist_staging:"${version_tag}"
echo "Done!"