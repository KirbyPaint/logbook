# ./Dockerfile
FROM node:16.13.1 AS base
WORKDIR /usr/src/app
RUN apt-get -y update \ 
  && apt-get add bash \
  && rm -rf /var/cache/apk/*
COPY . . 
RUN yarn install --frozen-lockfile
RUN yarn prisma generate