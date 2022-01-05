import { useLoadMore } from '@hooks/useLoadMore';
import { useDetailModal } from '@hooks/useDetailModal';
import { useTrailerModal } from '@hooks/useTrailerModal';

import Button from '@components/UI/Button/Button';
import Grid from '@components/Layout/Grid/Grid';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';

const MoviesPage = () => {
  const { onModalOpen: onModalDetail, ModalDetail } = useDetailModal();
  const { onModalOpen: onModalTrailer, ModalTrailer } = useTrailerModal();
  const { data: movies, loading, onLoadMore } = useLoadMore(getDiscoverMovies, 20);

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
            onDetail={() => onModalDetail(item)}
            onTrailer={() => onModalTrailer(mediaTypes.movie, item.id)}
            {...item}
          />
        ))}
      </Grid>

      {!loading && (
        <div className="block">
          <Button size="large" onClick={onLoadMore}>
            Mostrar más
          </Button>
        </div>
      )}

      {ModalDetail}
      {ModalTrailer}
    </div>
  );
};

export default MoviesPage;
