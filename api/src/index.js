'use strict';

import bootstrapMongoose from './mongoose.bootstrap';
import bootstrapExpress from './express.bootstrap';

const MONGO_URL = process.env['MONGO_URL'];
const PORT = process.env['PORT'];

const bootstrapExpressWithPort = (mongooseConnection) => {
  return bootstrapExpress(PORT, mongooseConnection);
};

bootstrapMongoose(MONGO_URL)
  .then(bootstrapExpressWithPort)
  .catch((err) => {
    console.error(`Failed to bootstrap app: ${err}`);
  });
