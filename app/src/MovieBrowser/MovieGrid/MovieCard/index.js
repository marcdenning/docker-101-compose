import { Link } from 'react-router-dom';

import './movie-card.css';

function MovieCard ({ movie }) {
  const altText = `Poster for ${movie.title}`;
  const image = movie.imageUrl ? (<img src={movie.imageUrl} alt={altText} className="movie-card__image" />) : '';

  return (
    <li className="movie-card">
      <Link to={`/movie/${movie.id}`}>{image}</Link>

      <h2 className="movie-card__title"><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h2>

      <p><strong>Released:</strong> {movie.releaseYear}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
    </li>
  );
};

export default MovieCard;
