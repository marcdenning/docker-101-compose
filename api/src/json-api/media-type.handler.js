'use strict';

module.exports = function () {
  return function jsonApiMediaType(req, res, next) {
    const acceptHeader = req.get('Accept');
    const contentTypeHeader = req.get('Content-Type');
    const acceptMatches = acceptHeader ? acceptHeader.match(/application\/vnd.api\+json;?/) : null;

    if (contentTypeHeader && contentTypeHeader.match(/application\/vnd.api\+json\s*;/)) {
      res.sendStatus(415);
      return;
    }
    if (acceptMatches && acceptMatches.every((mediaType) => mediaType.match(/;/))) {
      res.sendStatus(406);
      return;
    }
    next();
  };
};
