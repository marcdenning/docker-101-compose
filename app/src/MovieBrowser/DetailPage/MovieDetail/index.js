import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './movie-detail.css';

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
      <div className="movie-detail">
        <div className="movie-detail__info">
          <h2>{movie.title}</h2>

          <p><strong>Released:</strong> {movie.releaseYear}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>


          <p>
            <Link to={`/movie/${movie.id}/edit`} className="button">Edit</Link>
            <button type="button" onClick={this.deleteMovie} className="button--danger">Delete</button>
          </p>
        </div>

        <div className="movie-detail__image">
          {image}
        </div>
      </div>
    );
  }

  deleteMovie() {
    this.props.deleteMovieCallback(this.props.movie.id);
  }
}

export default MovieDetail;
