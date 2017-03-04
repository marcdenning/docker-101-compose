'use strict';

const mongoose = require('mongoose');

const isDevelopment = process.env['NODE_ENV'] === 'development';

module.exports = function bootstrapMongoose(mongoUrl) {
  console.log('Connecting to Mongo');

  mongoose.Promise = Promise;

  return mongoose.connect(mongoUrl, {
    autoIndex: isDevelopment
  })
    .then(() => {
      console.log('Connected to Mongo');
    });
};
