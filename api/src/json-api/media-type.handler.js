'use strict';

module.exports = function () {
  return function jsonApiMediaType(req, res, next) {
    const acceptHeader = req.get('Accept');
    const contentTypeHeader = req.get('Content-Type');
    const acceptMatches = acceptHeader ? acceptHeader.match(/application\/vnd.api\+json;?/) : null;

    if (contentTypeHeader && contentTypeHeader.match(/application\/vnd.api\+json\s*;/)) {
      res.status(415).send();
      return;
    }
    if (acceptMatches && acceptMatches.every((mediaType) => mediaType.match(/;/))) {
      res.status(406).send();
      return;
    }
    next();
  };
};
