'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import MoviesRepository from './movies/movies.repository';
import configureMoviesRoutes from './movies/movies.router';

import jsonApiMediaType from './json-api/media-type.handler';
import jsonApiSendOverride from './json-api/send-json.override';
import jsonApiErrorHandler from './json-api/error.handler';

const isDevelopment = process.env['NODE_ENV'] === 'development';

export default function bootstrapExpress (port, mongooseConnection) {
  return new Promise((resolve) => {
    const app = express();
    const moviesRepository = new MoviesRepository(mongooseConnection);

    console.log('Configuring Express');

    app.disable('x-powered-by');

    app.use(morgan(isDevelopment ? 'dev' : 'common', {
      immediate: false
    }));

    app.use(jsonApiMediaType());

    app.use(jsonApiSendOverride());

    app.use(bodyParser.json({
      type: 'application/vnd.api+json'
    }));

    app.use('/api/movies', configureMoviesRoutes(moviesRepository));

    app.use('/', (req, res) => {
      res.set('Content-Type', 'text/plain');
      res.send('Server up');
    });

    app.use(jsonApiErrorHandler());

    app.listen(port, () => {
      console.log(`Express listening on port ${port}`);
      resolve();
    });
  });
};
