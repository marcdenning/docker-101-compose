import React, { Component } from 'react';

import MovieGrid from './MovieGrid';

class MovieBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = { movies: [] };
  }

  render() {
    return (
      <MovieGrid movies={this.state.movies} />
    );
  }

  componentDidMount() {
    this.props.movieService.findAll()
      .then((movies) => {
        this.setState({
          movies
        });
      });
  }
}

export default MovieBrowser;
