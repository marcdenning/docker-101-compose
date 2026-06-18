'use strict';

const VALIDATORS = {
  title (value) {
    if (typeof value !== 'string') throw new Error('The "title" attribute must be a string.');
    if (value.length > 500) throw new Error('The "title" attribute must be 500 characters or fewer.');
  },
  releaseYear (value) {
    if (typeof value !== 'number' || !Number.isInteger(value)) throw new Error('The "releaseYear" attribute must be an integer.');
    if (value < 1888 || value > 2200) throw new Error('The "releaseYear" attribute must be a valid year (1888–2200).');
  },
  rating (value) {
    if (typeof value !== 'number') throw new Error('The "rating" attribute must be a number.');
    if (value < 0 || value > 10) throw new Error('The "rating" attribute must be between 0 and 10.');
  },
  imageUrl (value) {
    if (typeof value !== 'string') throw new Error('The "imageUrl" attribute must be a string.');
    if (value.length > 2048) throw new Error('The "imageUrl" attribute must be 2048 characters or fewer.');
    if (!/^https?:\/\//i.test(value)) throw new Error('The "imageUrl" attribute must be an http or https URL.');
  }
};

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

  for (let key of attributes) {
    const value = resource.attributes[key];
    if (value != null && VALIDATORS[key]) {
      VALIDATORS[key](value);
    }
    model[key] = value != null ? value : null;
  }

  model.id = resource.id;
  return model;
};
