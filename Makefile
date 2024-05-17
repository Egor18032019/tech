.ONESHELL:
.PHONY: builder-shell build docker images run run_docker

PROJECT_NAME=tech
BRANCH := $(shell git rev-parse --abbrev-ref HEAD | sed -e 's/-/./g;s=/=.=g')
COMMIT := $(shell git rev-parse --short HEAD)
APP_JAR=app.local.jar
BUILDER_IMAGE ?= maven:3.8.4-eclipse-temurin-17
#BUILDER_IMAGE ?= maven:3.8.4-openjdk-17
BUILDER_CMD ?= mvn -f pom.xml clean package -D maven.test.skip=true
RUNNER_IMAGE ?= eclipse-temurin:17-jre
#RUNNER_IMAGE ?= eclipse-temurin:17-jre-alpine
#RUNNER_IMAGE ?= amazoncorretto:17
RUNNER_CMD ?= sh -c "env; sh"
#RUNNER_CMD ?= sh -c ". .env && java -jar ${APP_JAR}"

builder-shell:
        docker run -it --rm -u `id -u`:`id -g` -v `pwd` : /root -w /root \
                -e HOME="/root" \
                $(BUILDER_IMAGE) sh

build:
        docker run -it --rm -u `id -u`:`id -g` -v `pwd`:/root -w /root \
                -e HOME="/root" \
                $(BUILDER_IMAGE) $(BUILDER_CMD) \
        && mv ./target/*.jar ${APP_JAR} \
        && ls -al ${APP_JAR}

fix:
        docker run -it --rm -v `pwd`:/root -w /root \
                $(RUNNER_IMAGE) chmod 755 dbData && ls -al | grep dbData

docker:
        docker build -t $(PROJECT_NAME):$(BRANCH) --progress plain \
                -f Dockerfile .
        docker images | grep $(PROJECT_NAME)

docker-dev:
        docker build -t $(PROJECT_NAME):$(BRANCH) --progress plain \
                -f Dockerfile.dev .
        docker images | grep $(PROJECT_NAME)

clean:
        docker run -it --rm -v `pwd`:/mnt -w /mnt busybox rm -rf dbData
        docker container prune -f ; docker image prune -f ; docker volume prune                                                                                                              -f

list-images:
        docker images | grep $(PROJECT_NAME)

run-dev:
        docker run -it --rm -u `id -u`:`id -g` -v `pwd`:/mnt -w /mnt \
                -e HOME="/mnt" \
                -p 8091:8080 \
                $(RUNNER_IMAGE) $(RUNNER_CMD)

run-docker:
        docker run -it --rm -u `id -u`:`id -g` \
                $(PROJECT_NAME):$(BRANCH)
