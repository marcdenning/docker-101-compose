'use strict';

const isDevelopment = process.env['NODE_ENV'] === 'development';

export default function () {
  return function jsonApiErrorHandler(err, req, res, next) {
    if (isDevelopment) {
      console.error(err.stack);
    }
    res.sendError(new Error('An internal server error occurred'), 500);
  };
};
