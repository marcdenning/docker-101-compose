'use strict';

const express = require('express');
const moviesRouter = express.Router();
const moviesRepository = require('./movies.repository');

moviesRouter.get('/', (req, res) => {
  moviesRepository.findAll()
    .then((movies) => {
      res.json({
        data: movies
      });
    });
});

moviesRouter.get('/:id', (req, res) => {
  moviesRepository.findOne(req.params.id)
    .then((movie) => {
      res.json({
        data: movie
      });
    });
});

moviesRouter.post('/', (req, res) => {
  moviesRepository.save(req.body)
    .then((movie) => {
      res.json({
        data: movie
      });
    });
});

moviesRouter.put('/:id', (req, res) => {
  if (!req.body.id) {
    req.body.id = req.params.id;
  }
  moviesRepository.save(req.body)
    .then((movie) => {
      res.json({
        data: movie
      });
    });
});

moviesRouter.delete('/:id', (req, res) => {
  moviesRepository.delete(req.params.id)
    .then((movie) => {
      res.json({
        data: movie
      });
    });
});

module.exports = moviesRouter;
