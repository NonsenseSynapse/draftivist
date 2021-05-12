#!/bin/bash

# Require at least 1 argument
if [ $# -lt 1 ]; then
  echo 1>&2 "must specify version tag to deploy"
  exit 2
fi

VERSION_TAG=$1

echo "Exporting docker image..."
docker save draftivist_staging:"${VERSION_TAG}" > ~/draftivist_staging_${VERSION_TAG}.tar
echo "Export finished!"
