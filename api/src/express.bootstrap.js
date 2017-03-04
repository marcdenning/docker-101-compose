'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const moviesRouter = require('./movies/movies.router');

module.exports = function bootstrapExpress (port) {
  return new Promise((resolve) => {
    const app = express();

    console.log('Configuring Express');

    app.use(bodyParser.json());

    app.use('/movies', moviesRouter);

    app.listen(port, () => {
      console.log(`Express listening on port ${port}`);
      resolve();
    });
  });
};
