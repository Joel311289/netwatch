import { useFetchPagination } from '@hooks/useFetchPagination';

import Button from '@components/UI/Button/Button';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaGrid from '@components/Media/MediaGrid/MediaGrid';

import { mediaTypes } from '@services/constants';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';

import styles from '@pages/Movies/MoviesPage.module.css';

const MoviesPage = () => {
  const {
    data: items,
    loading,
    onLoadMore,
    paginationEnd
  } = useFetchPagination(`/api/discover/${mediaTypes.MOVIE}`, getDiscoverMovies, 20);

  return (
    <div className={`App-container App-content ${styles.wrapper}`}>
      <h2 className="heading">Películas</h2>

      <div className="sub-heading">
        <MediaHeading text="Más populares" />
      </div>

      <MediaGrid items={items} skeleton={loading} />

      {!paginationEnd && (
        <div className="block">
          <Button onClick={onLoadMore}>Mostrar más</Button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
