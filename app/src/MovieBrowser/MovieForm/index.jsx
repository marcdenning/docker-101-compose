import { useState } from "react";

import { isSafeHttpUrl } from '../../utils/url.js';

function MovieForm ({ movie, submitFormCallback }) {
  const initialMovie = movie || {
    title: '',
    releaseYear: (new Date()).getFullYear(),
    rating: 0.0,
    imageUrl: ''
  };
  const [localMovie, setLocalMovie] = useState(initialMovie);
  const [urlError, setUrlError] = useState('');

  return (
    <form onSubmit={submitForm}>
      <p>Fill out the following fields to add a movie:</p>

      <label htmlFor="movie-title">Title</label>
      <input
        id="movie-title"
        name="title"
        type="text"
        value={localMovie && localMovie.title}
        onChange={updateMovieField}
      />

      <label htmlFor="movie-release-year">Release Year</label>
      <input
        id="movie-release-year"
        name="releaseYear"
        type="number"
        value={localMovie && localMovie.releaseYear}
        onChange={updateMovieField}
      />

      <label htmlFor="movie-rating">Rating</label>
      <input
        id="movie-rating"
        name="rating"
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={localMovie && localMovie.rating}
        onChange={updateMovieField}
      />

      <label htmlFor="movie-image-url">Image URL</label>
      <input
        id="movie-image-url"
        name="imageUrl"
        type="url"
        value={localMovie && localMovie.imageUrl}
        onChange={updateMovieField}
      />
      {urlError && <p role="alert" style={{ color: 'red' }}>{urlError}</p>}

      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );

  function updateMovieField(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'number' ? Number(target.value) : target.value;

    if (name === 'imageUrl') {
      setUrlError('');
    }

    setLocalMovie({
      ...localMovie,
      [name]: value
    });
  }

  function submitForm(event) {
    const movie = Object.assign({}, localMovie);

    event.preventDefault();
    if (!movie.id) {
      delete movie.id;
    }
    if (movie.imageUrl && movie.imageUrl.trim() !== '') {
      if (!isSafeHttpUrl(movie.imageUrl)) {
        setUrlError('Image URL must start with http:// or https://');
        return;
      }
    } else {
      movie.imageUrl = null;
    }
    submitFormCallback(movie);
  }
}

export default MovieForm;
