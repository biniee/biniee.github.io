#!/bin/sh

docker-compose -f ./conf/docker-compose.build.yml run --rm deploy
