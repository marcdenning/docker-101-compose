'use strict';

import express from 'express';

import jsonApiSerializeResource from '../json-api/resource.serializer.js';
import jsonApiDeserializeResource from '../json-api/resource.deserializer.js';

export default function (moviesRepository) {
  return express.Router()
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', create)
    .patch('/:id', update)
    .delete('/:id', remove);

  function findAll (req, res, next) {
    moviesRepository.findAll()
      .then((movies) => {
        res.json({
          data: movies.map(serializeMovie)
        });
      })
      .catch(next);
  }

  function findOne (req, res, next) {
    moviesRepository.findOne(req.params.id)
      .then((movie) => {
        if (!movie) {
          res.status(404).send();
          return;
        }
        res.json({
          data: serializeMovie(movie)
        });
      })
      .catch(next);
  }

  function create (req, res, next) {
    let model;

    try {
      model = deserializeMovieRequest(req);
      if (model.id) {
        res.status(403).sendError(new Error('May not specify an "id" property value to use.'));
        return;
      }
    }
    catch (err) {
      res.status(400).sendError(err);
      return;
    }
    moviesRepository.save(model)
      .then((movie) => {
        res.status(201).json({
          data: serializeMovie(movie)
        });
      })
      .catch(next);
  }

  function update (req, res, next) {
    let model, patchModel;

    try {
      model = deserializeMovieRequest(req);
      if (!model.id) {
        res.status(400).sendError(new Error('Must specify an "id" property value to use.'));
        return;
      }
    }
    catch (err) {
      res.status(400).sendError(err);
      return;
    }

    patchModel = {};
    for (let key in model) {
      if (model[key] !== null) {
        patchModel[key] = model[key];
      }
    }
    moviesRepository.save(patchModel)
      .then((movie) => {
        if (!movie) {
          res.status(404).send();
          return;
        }
        res.json({
          data: serializeMovie(movie)
        });
      })
      .catch(next);
  }

  function remove (req, res, next) {
    moviesRepository.delete(req.params.id)
      .then((movie) => {
        if (!movie) {
          res.status(404).send();
          return;
        }
        res.status(204).send();
      })
      .catch(next);
  }
};

function serializeMovie (movie) {
  return jsonApiSerializeResource('movie', '_id', ['title', 'releaseYear', 'rating', 'imageUrl'], movie);
}

function deserializeMovieRequest (req) {
  if (!req.body.data) {
    throw new Error('Must specify a data property at the root level of the object.');
  }

  return jsonApiDeserializeResource('movie', ['title', 'releaseYear', 'rating', 'imageUrl'], req.body.data);
}
