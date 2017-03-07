'use strict';

const mongoose = require('mongoose');

const MONGO_URL = process.env['MONGO_URL'];
const PORT = process.env['PORT'];

const bootstrapMongoose = require('./mongoose.bootstrap');
const bootstrapExpress = (mongooseConnection) => {
  return require('./express.bootstrap')(PORT, mongooseConnection);
};

bootstrapMongoose(MONGO_URL)
  .then(bootstrapExpress)
  .catch((err) => {
    console.error(`Failed to bootstrap app: ${err}`);
  });
