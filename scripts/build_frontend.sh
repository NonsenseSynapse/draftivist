#!/bin/bash

export API_HOST="https://draftivist.com/api"
# TODO: change to CDN once CDN SSL cert is live
export PUBLIC_URL="https://draftivist-space.sfo2.digitaloceanspaces.com"

export UI_DIR=${PROJECT_ROOT}/draftivist_ui/
export API_DIR=${PROJECT_ROOT}/draftivist_api/

echo "BUILDING FRONTEND APPLICATION"
yarn --cwd $UI_DIR build

echo "COPYING INDEX TO DJANGO STATIC PATH"
cp "$UI_DIR/build/index.html" "$API_DIR/static/"

echo "DONE"

#TODO: Automate versioning + uploading of static assets to Spaces