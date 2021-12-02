import { useEffect, useState } from 'react';
import MediaGrid from '../../components/UI/Grid/Grid';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import MediaItemSkeleton from '../../components/Media/MediaItem/MediaItem.skeleton';
import Button from '../../components/UI/Button/Button';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getDiscoverMovies } from '../../services/get-discover-movies';
import './MoviesPage.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { data, loading } = useLoadDataPage(() => getDiscoverMovies(page), 20, page);

  useEffect(() => {
    if (data) {
      setMovies((prev) => [...prev, ...data]);
    }
  }, [data]);

  const onLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="container">
      <h2 className="heading">Películas</h2>

      <div className="sub-heading">Más populares</div>

      <MediaGrid gap={15} itemsPerRow={5}>
        {movies && movies.map((item) => (
          <MediaItem key={item.id} to={`/movies/${item.id}`} ratio={1.5} {...item}></MediaItem>
        ))}
      </MediaGrid>
      
      <MediaGrid gap={15} itemsPerRow={5}>
        {loading && loading.map((index) => (
          <MediaItemSkeleton key={index} ratio={1.5}></MediaItemSkeleton>
        ))}
      </MediaGrid>

      {!loading && <div className="block">
        <Button size="large" onClick={onLoadMore}>Mostrar más</Button>
      </div>}
    </div>
  );
};

export default MoviesPage;
