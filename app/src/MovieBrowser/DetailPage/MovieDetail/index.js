import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieDetail extends Component {
  constructor(props) {
    super(props);

    this.deleteMovie = this.deleteMovie.bind(this);
  }

  render() {
    const movie = this.props.movie;
    const altText = `Poster for ${movie.title}`;
    const image = movie.imageUrl ? (<img src={movie.imageUrl} alt={altText}/>) : '';

    return (
      <div>
        <h2>{movie.title}</h2>

        <p><strong>Released:</strong> {movie.releaseYear}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>

        {image}

        <p>
          <Link to={`/movie/${movie.id}/edit`}>Edit</Link>
          <button type="button" onClick={this.deleteMovie}>Delete</button>
        </p>
      </div>
    );
  }

  deleteMovie() {
    this.props.deleteMovieCallback(this.props.movie.id);
  }
}

export default MovieDetail;
