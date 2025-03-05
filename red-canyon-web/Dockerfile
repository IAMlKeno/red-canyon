# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM node:22-bookworm-slim AS development

RUN mkdir /project
WORKDIR /project

COPY . .

RUN yarn global add @vue/cli
RUN npm install
ENV HOST=0.0.0.0
EXPOSE 5173
CMD ["npm", "run", "dev" ]

FROM development as dev-envs
RUN <<EOF
apt update
apt add git
EOF

RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD ["npm", "run", "dev" ]

