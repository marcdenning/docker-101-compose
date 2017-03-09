import React, { Component } from 'react';

import MovieForm from '../MovieForm';

class AddPage extends Component {
  constructor(props) {
    super(props);

    this.addMovie = this.addMovie.bind(this);
  }

  render() {
    return (
      <div>
        <h2>Add Movie</h2>

        <MovieForm submitFormCallback={this.addMovie} />
      </div>
    );
  }

  addMovie(movie) {
    this.props.movieService.save(movie)
      .then((movie) => {
        this.props.history.push(`/movie/${movie.id}`);
      });
  }
}

export default AddPage;
