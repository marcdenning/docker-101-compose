'use strict';

const mongoose = require('mongoose');

const MONGO_URL = process.env['MONGO_URL'];
const PORT = process.env['PORT'];

const bootstrapMongoose = require('./mongoose.bootstrap');
const bootstrapExpress = require('./express.bootstrap').call(null, PORT);

bootstrapMongoose(MONGO_URL)
  .then(bootstrapExpress)
  .catch((err) => {
    console.error(`Failed to bootstrap app: ${err}`);
  });
