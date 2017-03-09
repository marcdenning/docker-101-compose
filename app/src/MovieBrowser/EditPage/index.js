import React, { Component } from 'react';

import MovieForm from '../MovieForm';

class EditPage extends Component {
  constructor(props) {
    super(props);

    this.state = { movie: null };

    this.updateMovie = this.updateMovie.bind(this);
  }

  render() {
    const movie = this.state.movie;

    if (!movie) {
      return (<div></div>);
    }

    return (
      <div>
        <h2>Edit: {movie.title}</h2>

        <MovieForm movie={movie} submitFormCallback={this.updateMovie} />
      </div>
    );
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;

    this.props.movieService.findOne(movieId)
      .then((movie) => {
        this.setState({
          movie
        });
      });
  }

  updateMovie(movie) {
    this.props.movieService.save(movie)
      .then((movie) => {
        this.props.history.push(`/movie/${movie.id}`);
      });
  }
}

export default EditPage;
