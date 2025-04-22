# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM node:23-slim

# Server
RUN mkdir -p /project/server
WORKDIR /project/server
COPY . .
RUN npm install && npm run build
COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]