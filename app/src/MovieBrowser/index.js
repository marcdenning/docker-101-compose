import React, { useEffect, useState } from 'react';

import MovieGrid from './MovieGrid';

function MovieBrowser({ movieService }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let ignore = false;

    setMovies([]);
    movieService.findAll()
      .then(movies => {
        if (!ignore) {
          setMovies(movies);
        }
      });
    return () => {
      ignore = true;
    };
  }, [movieService, setMovies]);

  return (
    <MovieGrid movies={movies} />
  );
}

export default MovieBrowser;
