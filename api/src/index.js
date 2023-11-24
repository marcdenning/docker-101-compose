'use strict';

import bootstrapMongoose from './mongoose.bootstrap.js';
import bootstrapExpress from './express.bootstrap.js';

const MONGO_URL = process.env['MONGO_URL'];
const PORT = process.env['PORT'] || 8888;

const bootstrapExpressWithPort = (mongooseConnection) => {
  return bootstrapExpress(PORT, mongooseConnection);
};

bootstrapMongoose(MONGO_URL)
  .then(bootstrapExpressWithPort)
  .catch((err) => {
    console.error(`Failed to bootstrap app: ${err}`);
  });
