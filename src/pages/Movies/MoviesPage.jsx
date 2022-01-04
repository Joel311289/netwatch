import { useDetailModal } from '@hooks/useDetailModal';
import { useLoadMore } from '@hooks/useLoadMore';

import Button from '@components/UI/Button/Button';
import Grid from '@components/Layout/Grid/Grid';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';

import { routeMediaDetail } from '@services/helpers';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';

import { isEmptyArray } from '@utils/helpers';

const MoviesPage = () => {
  const { onModalOpen, ModalDetail } = useDetailModal();
  const [movies, loading, onLoadMore] = useLoadMore(getDiscoverMovies, 20);

  return (
    <div className="App-container App-content">
      <h2 className="heading">Películas</h2>

      <div className="sub-heading">
        <MediaHeading text="Más populares"></MediaHeading>
      </div>

      <Grid>
        {movies.map((item, index) => (
          <MediaItem
            key={index}
            ratio={1.5}
            skeleton={!item}
            to={routeMediaDetail(item)}
            onDetail={() => onModalOpen(item)}
            {...(item || {})}
          />
        ))}
      </Grid>

      {!loading && !isEmptyArray(movies) && (
        <div className="block">
          <Button size="large" onClick={onLoadMore}>
            Mostrar más
          </Button>
        </div>
      )}

      {ModalDetail}
    </div>
  );
};

export default MoviesPage;
