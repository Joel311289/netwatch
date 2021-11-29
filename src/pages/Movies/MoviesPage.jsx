import { useEffect, useState } from 'react';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import Button from '../../components/UI/Button/Button';
import Link from '../../components/UI/Link/Link';
import { getDiscoverMovies } from '../../services/get-discover-movies';
import './MoviesPage.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getDiscoverMovies(page).then((response) => setMovies(response));
  }, []);

  return (
    <div>
      <h2 className="App-heading">Películas</h2>

      <div className="App-sub-heading">Más populares</div>

      <div className="App-flexbox">
        {movies && movies.map(item => (
          <MediaItem key={item.id} to={`/movies/${item.id}`} ratio={1.5} {...item}></MediaItem>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
