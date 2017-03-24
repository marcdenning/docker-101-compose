'use strict';

import bootstrapMongoose from './mongoose.bootstrap';
import bootstrapExpress from './express.bootstrap';

const MONGO_URL = getMongoUrl(process.env);
const PORT = process.env['PORT'];

const bootstrapExpressWithPort = (mongooseConnection) => {
  return bootstrapExpress(PORT, mongooseConnection);
};

export default () => {
  bootstrapMongoose(MONGO_URL)
    .then(bootstrapExpressWithPort)
    .catch((err) => {
      console.error(`Failed to bootstrap app: ${err}`);
    });
};

function getMongoUrl(env) {
  if (env['VCAP_SERVICES']) {
    return JSON.parse(env['VCAP_SERVICES']).mlab[0].credentials.uri;
  }
  return process.env['MONGO_URL'];
}
