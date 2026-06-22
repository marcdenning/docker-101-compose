# AGENTS.md

This file provides context for AI coding agents working in this repository.

## Project Overview

A full-stack movie browser application demonstrating Docker containerization and Docker Compose orchestration. The stack consists of:

- **MongoDB** — database for movie records
- **Node.js/Express API** — REST API following the [JSON API specification](http://jsonapi.org/)
- **React** — front-end single-page application built with [Vite](https://vite.dev/)
- **Nginx** — web server / reverse proxy

## Repository Structure

```
.
├── api/                    # Node.js/Express backend
│   ├── src/
│   │   ├── index.js                        # Entry point
│   │   ├── express.bootstrap.js            # Express app setup
│   │   ├── mongoose.bootstrap.js           # MongoDB connection
│   │   ├── movies/
│   │   │   ├── movies.router.js            # Movie route handlers
│   │   │   └── movies.repository.js        # Mongoose data access
│   │   └── json-api/                       # JSON API spec helpers
│   └── Dockerfile
├── app/                    # React front-end
│   ├── src/
│   │   ├── App.jsx                         # Root component and routing
│   │   ├── MovieBrowser/
│   │   │   ├── MovieGrid/                  # List/grid view
│   │   │   ├── DetailPage/                 # Movie detail view
│   │   │   ├── AddPage/                    # Create movie
│   │   │   ├── EditPage/                   # Edit movie
│   │   │   ├── MovieForm/                  # Shared form component
│   │   │   └── MovieService/               # API client
│   │   └── JsonApi/                        # JSON API serialization helpers
│   └── Dockerfile
├── webserver/              # Nginx configuration and Dockerfile
├── docker-compose.yml              # Base compose configuration
├── docker-compose.override.yml     # Development overrides
└── docker-compose.prod.yml         # Production overrides
```

## Running the Application

### Development

```sh
docker compose up -d
```

This applies `docker-compose.yml` then `docker-compose.override.yml` automatically. Three containers start:

- **db** — MongoDB on internal network
- **api** — Node.js API, exposed on port `8888`
- **webserver** — Nginx proxy, exposed on port `8000`

API is accessible at `http://localhost:8000/api/movies`.

To run the React app with Vite with hot reload:

```sh
cd app
npm install
npm start
```

Vite proxies API requests to `http://localhost:8888` (configured in `app/package.json`).

### Production

```sh
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

The production compose file adds a build container that compiles the React app and mounts the output into the webserver container.

### Podman

```sh
podman-compose -f docker-compose.yml up -d
```

## Services and Ports

| Service    | Internal Port | Host Port |
|------------|--------------|-----------|
| api        | 8888         | 8888      |
| webserver  | 80           | 8000      |
| db (mongo) | 27017        | (none)    |

## API

The API follows the [JSON API specification](http://jsonapi.org/) and exposes movie resources at `/api/movies`.

Environment variable `MONGO_URL` configures the database connection (default in compose: `mongodb://db:27017/movies`).

## Front-end

Built with [Vite](https://vite.dev/), React 18 and React Router v6. The `MovieService` in `app/src/MovieBrowser/MovieService/` handles all API communication and JSON API serialization/deserialization.

## Key Conventions

- The API is an ES module (`"type": "module"` in `api/package.json`); use `import`/`export` syntax.
- The front-end uses common Vite conventions for React apps including JSX files named with `.jsx`.
- JSON API request/response handling is encapsulated in the `json-api/` (API) and `JsonApi/` (app) directories — keep serialization logic there.
- MongoDB data access is isolated in `movies.repository.js`; route handlers in `movies.router.js` should not contain query logic.

## Testing

```sh
# Front-end unit tests
cd app
npm test
```

The API currently has no automated test suite.
