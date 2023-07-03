import { Link } from 'react-router-dom';

import './movie-detail.css';

function MovieDetail({ movie, deleteMovieCallback }) {
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
          <button type="button" onClick={deleteMovie} className="button--danger">Delete</button>
        </p>
      </div>

      <div className="movie-detail__image">
        {image}
      </div>
    </div>
  );

  function deleteMovie() {
    deleteMovieCallback(movie.id);
  }
}

export default MovieDetail;
