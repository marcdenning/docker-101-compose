import React, { Component } from 'react';

import MovieDetail from './MovieDetail';

class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = { movie: null };
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  render() {
    if (!this.state.movie) {
      return (<div></div>);
    }

    return (
      <MovieDetail
        movie={this.state.movie}
        deleteMovieCallback={this.deleteMovie}
      />
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

  deleteMovie(id) {
    this.props.movieService.delete(id)
      .then(() => {
        this.props.history.push('/');
      });
  }
}

export default DetailPage;
