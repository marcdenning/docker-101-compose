import React from 'react';

import './movie-grid.css';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => (
  <ul className="movie-grid">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </ul>
);

export default MovieGrid;
