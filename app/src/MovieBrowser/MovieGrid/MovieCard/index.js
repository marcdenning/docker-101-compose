import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const altText = `Poster for ${movie.title}`;
  const image = movie.imageUrl ? (<img src={movie.imageUrl} alt={altText} />) : '';

  return (
    <li>
      <Link to={`/movie/${movie.id}`}><h2>{movie.title}</h2></Link>

      <p><strong>Released:</strong> {movie.releaseYear}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>

      {image}
    </li>
  );
};

export default MovieCard;
