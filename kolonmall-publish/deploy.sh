#!/bin/sh

if [ -z "$TARGET_DEPLOY_TCP" ]; then
	echo "no TARGET_DEPLOY_TCP"
	exit
fi

DOCKER_LATEST_TAG=latest

if [ -z "$DOCKER_REGISTRY_PORT" ]; then
	DOCKER_REGISTRY_NAME=$DOCKER_REGISTRY_IP/$DOCKER_APP_NAME
else
    DOCKER_REGISTRY_NAME=$DOCKER_REGISTRY_IP:$DOCKER_REGISTRY_PORT/$DOCKER_APP_NAME
fi

COMMIT_HASH="$(git show-ref --head | grep -h HEAD | cut -d':' -f2 | head -n 1 | head -c 10)"

# build app
echo "--- build app"
docker pull node:boron-onbuild
docker build --force-rm=true -f Dockerfile -t ${DOCKER_REGISTRY_NAME}:$COMMIT_HASH .
docker tag ${DOCKER_REGISTRY_NAME}:$COMMIT_HASH ${DOCKER_REGISTRY_NAME}:$DOCKER_LATEST_TAG
LATEST_IMAGE_ID=$(docker images | grep ${DOCKER_REGISTRY_NAME} | grep $DOCKER_LATEST_TAG | awk '{print $3}')
for image_id in `docker images | grep ${DOCKER_REGISTRY_NAME} | grep -v $LATEST_IMAGE_ID | awk '{print $3}' | uniq`; do
  docker rmi -f $image_id
done

echo "--- push app - ${DOCKER_REGISTRY_NAME}"
docker push ${DOCKER_REGISTRY_NAME}

echo "--- deploy app - ${DOCKER_REGISTRY_NAME}"
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -f conf/docker-compose.yml pull
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -f conf/docker-compose.yml down
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -f conf/docker-compose.yml up -d
