'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { auth } from 'express-oauth2-jwt-bearer';

import MoviesRepository from './movies/movies.repository.js';
import configureMoviesRoutes from './movies/movies.router.js';

import jsonApiMediaType from './json-api/media-type.handler.js';
import jsonApiSendOverride from './json-api/send-json.override.js';
import jsonApiErrorHandler from './json-api/error.handler.js';

const isDevelopment = process.env['NODE_ENV'] === 'development';

export default (port, mongooseConnection) => {
  return new Promise((resolve) => {
    const app = express();
    const moviesRepository = new MoviesRepository(mongooseConnection);

    console.log('Configuring Express');

    app.disable('x-powered-by');

    app.use(morgan(isDevelopment ? 'dev' : 'common', {
      immediate: false
    }));

    app.use(jsonApiSendOverride());

    if (process.env['AUTH_ISSUER']) {
      app.use(auth({
        issuer: process.env['AUTH_ISSUER'],
        jwksUri: process.env['AUTH_JWKS_URI'],
        audience: process.env['AUTH_AUDIENCE'],
        tokenSigningAlg: 'RS256'
      }));
    } else {
      console.warn('Environment variable AUTH_ISSUER not set. Disabling authentication.');
    }

    app.use(jsonApiMediaType());

    app.use(bodyParser.json({
      type: 'application/vnd.api+json'
    }));

    app.use('/api/movies', configureMoviesRoutes(moviesRepository));

    app.use(jsonApiErrorHandler());

    app.listen(port, () => {
      console.log(`Express listening on port ${port}`);
      resolve();
    });
  });
};
