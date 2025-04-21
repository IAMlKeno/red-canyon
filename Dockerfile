# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM node:23-slim AS development

RUN mkdir -p /project/app /project/server

# FRONT END
WORKDIR /project/app
COPY ./red-canyon-web/ .

RUN npm i -g @vue/cli && npm install
ENV HOST=0.0.0.0
EXPOSE 5173

# SERVER
WORKDIR /project/server
COPY ./server/ .
RUN npm install && npm run build

# SETUP PROJECT
WORKDIR /project
RUN apt-get update && apt-get install supervisor -y && apt-get clean
COPY ./supervisord.conf /etc/supervisor
COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]
