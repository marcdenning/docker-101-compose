# Movie Browser App

This React front-end is built with [Vite](https://vite.dev/).

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:5173](http://localhost:5173).

The page will hot-reload when you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.
The build is minified and filenames include content hashes.

### `npm run preview`

Serves the production build locally for verification before deployment.

## Environment Variables

Vite exposes environment variables prefixed with `VITE_` to client-side code via `import.meta.env`.
For example, a variable named `VITE_API_URL` in a `.env` file is available as `import.meta.env.VITE_API_URL`.

See the [Vite env variables documentation](https://vite.dev/guide/env-and-mode) for details.

## API Proxy

In development, requests to `/api` are proxied to `http://localhost:8888`.
This is configured in `vite.config.js` and avoids CORS issues when running the API separately.

## Production Build in Docker

The production Docker setup builds the app in its own container and mounts the `dist` output into the webserver container.
See `docker-compose.prod.yml` at the repo root for details.
