#!/usr/bin/env bash

export CATTLE_BOOTSTRAP_PASSWORD=$(openssl rand -hex 12)

docker rm -f rancher
docker run -d --network=host --restart=unless-stopped --privileged \
  --name rancher -e CATTLE_BOOTSTRAP_PASSWORD \
  rancher/rancher:v2.9.3

echo "Rancher started"
echo "Bootstrap Password: $CATTLE_BOOTSTRAP_PASSWORD"
echo "Wait a minute and then access Rancher at https://172.17.0.1"
