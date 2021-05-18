#!/bin/bash

# Require at least 1 argument
if [ $# -lt 1 ]; then
  echo 1>&2 "must specify version tag to deploy"
  exit 2
fi

VERSION_TAG=$1

ssh -t root@staging.draftivist.com -o StrictHostKeyChecking=no \
 echo "Testing docker config..." && \
 cat ~/.docker/config.json && \
 echo "Pulling latest image from DockerHub..." && \
 docker pull nonsensesynapse/draftivist:${VERSION_TAG} && \
 echo "Stopping existing container..." && \
 echo "TODO: STOP EXISTING CONTAINER" && \
 docker-compose -f /root/draftivist/docker-compose.staging.yaml up -d

# docker run -d --env-file /root/draftivist/.env --expose 8000:8000

#echo "Exporting docker image..."
#docker save draftivist_staging:"${VERSION_TAG}" > ~/draftivist_staging_${VERSION_TAG}.tar
#echo "Copying compiled docker image to remote server..."
#scp ~/draftivist_staging_${VERSION_TAG}.tar root@staging.draftivist.com:~/
#echo "Done!"
#
#echo "Re-establishing connection to remote server to load and run docker image..."
#ssh -t root@staging.draftivist.com -o StrictHostKeyChecking=no \
# echo "Connection established." && \
# docker load < ~/draftivist_staging_${VERSION_TAG}.tar && \
# echo "Image loaded." && \
# docker-compose -f /root/draftivist/docker-compose.staging.yaml up -d && \
# echo "Done!"
#docker build -f Dockerfile.prod --build-arg API_HOST="${API_HOST}" --build-arg STATIC_PATH="${STATIC_PATH}" -t draftivist_staging:"${VERSION_TAG}" .
#echo "Build finished!"
