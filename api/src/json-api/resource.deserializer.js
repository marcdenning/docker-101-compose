'use strict';

export default function (type, attributes, resource) {
  const model = {};

  if (!resource.type) {
    throw new Error('Must specify a resource "type" property.')
  }
  if (resource.type !== type) {
    throw new Error(`May not specify a "type" property value other than "${type}".`);
  }
  if (resource.id && typeof resource.id !== 'string') {
    throw new Error('Must specify the "id" property of the resource as a string.');
  }
  if (!resource.attributes) {
    throw new Error('Must specify the "attributes" property of the resource.');
  }
  if (typeof resource.attributes !== 'object') {
    throw new Error('Must specify the "attributes" property of the resource as an object.');
  }

  model.id = resource.id;
  for (let key of attributes) {
    model[key] = resource.attributes[key] ? resource.attributes[key] : null;
  }
  return model;
};
