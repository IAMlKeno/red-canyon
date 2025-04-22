# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM node:23-slim AS development

RUN mkdir -p /project/app
WORKDIR /project/app

COPY . .

RUN npm i -g @vue/cli && npm install
ENV HOST=0.0.0.0
EXPOSE 5173

CMD ["npm", "run", "dev" ]

