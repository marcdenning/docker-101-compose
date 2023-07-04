# Docker 101 Node and Mongo

This multi-faceted application demonstrates a full-stack movie browser. The back-end is supported by MongoDB and NodeJS 
and provides an API adhering to the [JSON API specification](http://jsonapi.org/). The front-end is a React app. Each 
component built on Docker containers and managed with [Docker Compose](https://docs.docker.com/compose/overview/).

## Running in Development

Get started by running:

```sh
docker-compose up -d
```

This will by default apply `docker-compose.yml` then `docker-compose.override.yml` for local development settings. 
The command will build and start the `api`, `db`, and `webserver` containers in the background. You can access the API 
at [http://localhost:8000/api/movies](http://localhost:8000/api/movies) (substitute your Docker host address if it is
not `localhost`).

To start the front-end app in development mode, navigate into the `app` directory and run:

```sh
npm install
npm start
```

This will kick of a build of the app and set up a local file watcher to rebuild and reload changes when you make them.
Under the hood, the app makes use of the build process provided by
[Create React App](https://github.com/facebookincubator/create-react-app).

### Using Podman

You may choose to use [Podman](https://podman.io/) for container management instead of Docker.
To manage multiple containers in a declarative fashion for development, use [Podman Compose](https://github.com/containers/podman-compose) which mimics Docker Compose.

```sh
podman-compose up -d
```

**Note:** At the time of writing, I am having trouble getting Podman's networking to function properly with the Windows Subsystem for Linux.
The instructions provided are theoretical for Podman on Windows.

## Deploy to Production

To deploy in a production mode, overlay `docker-compose.prod.yml` on the base `docker-compose.yml` by running:

```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

In addition to the base containers defined in `docker-compose.yml`, this will build the front-end app in its own Docker 
container and mount the output in the webserver container. Other environment settings are also tweaked for 
"production" modes as applicable.
