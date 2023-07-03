import MovieForm from '../MovieForm';
import { useNavigate } from 'react-router-dom';

function AddPage({ movieService }) {

  const navigate = useNavigate();

  return (
    <div>
      <h2>Add Movie</h2>

      <MovieForm submitFormCallback={addMovie} />
    </div>
  );

  function addMovie(movie) {
    movieService.save(movie)
      .then((movie) => {
        navigate(`/movie/${movie.id}`);
      });
  }
}

export default AddPage;
