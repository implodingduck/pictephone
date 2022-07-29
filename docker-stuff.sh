#!/bin/bash
docker stop pictephone
docker build -t pictephone .
docker run --rm -d -p 8080:80 --name pictephone pictephone