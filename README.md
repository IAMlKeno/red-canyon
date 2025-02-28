# Project Red Canyon

### Local Dev
Under development this project was built using [Docker compose](https://docs.docker.com/compose/).

### The Project Structure

Project structure:
```
.
├── compose.yaml
├── README.md
├── server
└── vuejs
    ├── Dockerfile
    └── ...
```

[_compose.yaml_](compose.yaml)
```
services:
  web:
    build: vuejs
    ports:
    - 80:8080
    volumes:
    - ./vuejs:/project
    - /project/node_modules
```
The compose file defines an application with two services `vuejs` and `expressjs` application.
When deploying the application, docker compose maps port 8080 of the `web` container and 4200 of the `server` container to ports 8080 and 4200, respectively of the host as specified in the file.
Make sure port 8080 and 4200 on the host are not already being in use.

## Running the application with docker compose

1. Navigate to the server directory and run `npm install`
2. Use `docker compose up` to run the application, you can add the `-d` flag to run in detached mode.

## Expected result

Listing containers must show one container running and the port mapping as below:
```
$ docker ps
CONTAINER ID   IMAGE               COMMAND                  CREATED             STATUS             PORTS                    NAMES
f6bfe9f6dabb   red-canyon-server   "docker-entrypoint.s…"   About an hour ago   Up About an hour   0.0.0.0:4200->4200/tcp   red-canyon-server-1
07a0da09e9a2   red-canyon-web      "docker-entrypoint.s…"   2 hours ago         Up About an hour   0.0.0.0:8080->8080/tcp   red-canyon-web-1
```

After the application starts, navigate to `http://localhost:80` in your web browser.

![page](output.jpg)

#### Stop and remove the containers
If the server was run in detached mode:

```
$ docker compose down
[+] Stopping 2/2
 ✔ Container red-canyon-server-1  Stopped
 ✔ Container red-canyon-web-1     Stopped
```
