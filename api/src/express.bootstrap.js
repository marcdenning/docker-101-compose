'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const MoviesRepository = require('./movies/movies.repository');
const configureMoviesRoutes = require('./movies/movies.router');

const jsonApiMediaType = require('./json-api/media-type.handler');
const jsonApiSendOverride = require('./json-api/send-json.override');
const jsonApiErrorHandler = require('./json-api/error.handler');

const isDevelopment = process.env['NODE_ENV'] === 'development';

module.exports = function bootstrapExpress (port, mongooseConnection) {
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

    app.use('/movies', configureMoviesRoutes(moviesRepository));

    app.use(jsonApiErrorHandler());

    app.listen(port, () => {
      console.log(`Express listening on port ${port}`);
      resolve();
    });
  });
};
