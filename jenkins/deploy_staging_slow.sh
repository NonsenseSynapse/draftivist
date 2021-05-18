#!/bin/bash

# Require at least 1 argument
if [ $# -lt 1 ]; then
  echo 1>&2 "must specify version tag to deploy"
  exit 2
fi

VERSION_TAG=$1

echo "Copying compiled docker image to remote server..."
scp ~/draftivist_staging_${VERSION_TAG}.tar root@staging.draftivist.com:~/
echo "Done!"

echo "Re-establishing connection to remote server to load and run docker image..."
ssh -t root@staging.draftivist.com -o StrictHostKeyChecking=no \
 echo "Connection established." && \
 docker load < ~/draftivist_staging_${VERSION_TAG}.tar && \
 echo "Image loaded." && \
 docker-compose -f /root/draftivist/docker-compose.staging.yaml up -d

echo "Done!"

