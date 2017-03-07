'use strict';

module.exports = function jsonApiSerializeResource(type, idKey, attributes, model) {
  const resource = {
    type,
    id: model[idKey],
    attributes: {}
  };

  for (let key of attributes) {
    resource.attributes[key] = model[key] ? model[key] : null;
  }
  return resource;
};
