import { useEffect, useState } from 'react';

import MovieForm from '../MovieForm';
import { useNavigate, useParams } from 'react-router-dom';

function EditPage ({ movieService }) {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let ignore = false;

    movieService.findOne(id)
      .then(movie => {
        if (!ignore) {
          setMovie(movie);
        }
      });
    return () => {
      ignore = true;
    };
  }, [movieService, setMovie, id]);

  if (!movie) {
    return (<div></div>);
  }

  return (
    <div>
      <h2>Edit: {movie.title}</h2>

      <MovieForm movie={movie} submitFormCallback={updateMovie} />
    </div>
  );

  function updateMovie(movie) {
    movieService.save(movie)
      .then(movie => {
        navigate(`/movie/${movie.id}`);
      });
  }
}

export default EditPage;
