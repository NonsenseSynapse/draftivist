#!/bin/bash

# TODO: just build, don't include "up -d"
docker-compose -f docker-compose.prod.yaml up -d --build
