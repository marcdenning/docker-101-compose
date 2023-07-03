import { useState } from "react";

function MovieForm ({ movie, submitFormCallback }) {
  const initialMovie = movie || {
    title: '',
    releaseYear: (new Date()).getFullYear(),
    rating: 0.0,
    imageUrl: ''
  };
  const [localMovie, setLocalMovie] = useState(initialMovie);

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
        value={localMovie && localMovie.rating}
        onChange={updateMovieField}
      />

      <label htmlFor="movie-image-url">Image URL</label>
      <input
        id="movie-image-url"
        name="imageUrl"
        type="text"
        value={localMovie && localMovie.imageUrl}
        onChange={updateMovieField}
      />

      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );

  function updateMovieField(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'number' ? Number(target.value) : target.value;

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
    if (movie.imageUrl.trim() === '') {
      movie.imageUrl = null;
    }
    submitFormCallback(movie);
  }
}

export default MovieForm;
