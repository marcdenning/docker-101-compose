import React from 'react';

import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => (
  <ul>
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </ul>
);

export default MovieGrid;
