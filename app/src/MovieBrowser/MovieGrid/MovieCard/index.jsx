import { Link } from 'react-router-dom';

import { isSafeHttpUrl } from '../../../utils/url.js';
import './movie-card.css';

function MovieCard ({ movie }) {
  const altText = `Poster for ${movie.title}`;
  const safeUrl = isSafeHttpUrl(movie.imageUrl) ? movie.imageUrl : null;
  const image = safeUrl ? (<img src={safeUrl} alt={altText} className="movie-card__image" />) : '';

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
