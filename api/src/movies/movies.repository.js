'use strict';

const Schema = require('mongoose').Schema;

class MoviesRepository {
  constructor(mongooseConnection) {
    const schema = new Schema({
      title: String,
      imageUrl: String,
      rating: Number,
      releaseYear: Number
    });
    this.Movie = mongooseConnection.model('Movie', schema);
  }

  findAll() {
    return this.Movie.find().exec();
  }

  findOne(id) {
    return this.Movie.findById(id).exec();
  }

  save(movie) {
    const id = movie.id;

    if (id) {
      delete movie.id;
      return this.Movie.findByIdAndUpdate(id, movie, {
        new: true
      })
        .exec();
    }
    return this.Movie.create(movie);
  }

  delete(id) {
    return this.Movie.findByIdAndRemove(id).exec();
  }
}

module.exports = MoviesRepository;
