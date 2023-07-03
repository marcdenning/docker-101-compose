import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MovieDetail from './MovieDetail';

function DetailPage({ movieService }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    movieService.findOne(id)
      .then(movie => {
        if (!ignore) {
          setMovie(movie);
        }
      })
    return () => {
      ignore = true;
    };
  }, [movieService, setMovie]);
  
  if (!movie) {
    return (<div></div>);
  }

  return (
    <MovieDetail
      movie={movie}
      deleteMovieCallback={deleteMovie}
    />
  );

  function deleteMovie(id) {
    movieService.delete(id)
      .then(() => {
        navigate('/');
      });
  }
}

export default DetailPage;
