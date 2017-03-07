'use strict';

const mongoose = require('mongoose');

const isDevelopment = process.env['NODE_ENV'] === 'development';

module.exports = function bootstrapMongoose(mongoUrl) {
  return new Promise((resolve, reject) => {
    let mongooseConnection;

    console.log('Connecting to Mongo');

    mongoose.Promise = Promise;
    mongooseConnection = mongoose.createConnection(mongoUrl, {
      autoIndex: isDevelopment
    });
    mongooseConnection.on('open', () => {
      console.log('Connected to Mongo');
      resolve(mongooseConnection);
    });
    mongooseConnection.on('error', reject);
  });
};
