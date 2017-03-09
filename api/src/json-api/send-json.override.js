'use strict';

export default function () {
  return function jsonApiSendOverride (req, res, next) {
    res.set('Content-Type', 'application/vnd.api+json');
    res.json = sendJsonApi.bind(res);
    res.sendError = sendJsonApiError.bind(res);
    next();

    function sendJsonApi(body) {
      this.send(Buffer.from(JSON.stringify(body)));
    }

    function sendJsonApiError(err) {
      if (this.statusCode === null) {
        this.status(500);
      }
      this.json({
        errors: [{
          title: err.message
        }]
      });
    }
  };
};
