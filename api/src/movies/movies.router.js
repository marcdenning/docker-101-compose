'use strict';

const express = require('express');

const jsonApiSerializeResource = require('../json-api/resource.serializer');
const jsonApiDeserializeResource = require('../json-api/resource.deserializer');

module.exports = function configureMoviesRoutes(moviesRepository) {
  return express.Router()
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', create)
    .patch('/:id', update)
    .delete('/:id', remove);

  function findAll (req, res) {
    moviesRepository.findAll()
      .then((movies) => {
        res.json({
          data: movies.map(serializeMovie)
        });
      });
  }

  function findOne (req, res) {
    moviesRepository.findOne(req.params.id)
      .then((movie) => {
        if (!movie) {
          res.status(404).send();
          return;
        }
        res.json({
          data: serializeMovie(movie)
        });
      });
  }

  function create (req, res) {
    let model;

    try {
      model = deserializeMovieRequest(req);
      if (model.id) {
        res.status(403).sendError(new Error('May not specify an "id" property value to use.'));
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
      });
  }

  function update (req, res) {
    let model, patchModel;

    try {
      model = deserializeMovieRequest(req);
      if (!model.id) {
        res.status(400).sendError(new Error('Must specify an "id" property value to use.'));
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
      });
  }

  function remove (req, res) {
    moviesRepository.delete(req.params.id)
      .then((movie) => {
        if (!movie) {
          res.status(404).send();
          return;
        }
        res.status(204).send();
      });
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
