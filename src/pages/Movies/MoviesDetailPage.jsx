import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MediaDetail from '../../components/Media/MediaDetail/MediaDetail';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getDetailMovie } from '../../services/movies/get-detail-movie';
import { getWatchProvidersMovie } from '../../services/movies/get-watch-providers-movie';
import { getCreditsMovie } from '../../services/movies/get-credits-movie';
import { getIdFromParams, truncateArray } from '../../utils/helpers';

const MoviesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');

  const { data: movie, loading } = useLoadDataPage(getDetailMovie.bind(this, id));
  const { data: watch_providers, loading: loadingWatchProviders } = useLoadDataPage(
    getWatchProvidersMovie.bind(this, id)
  );
  const { data, loading: loadingCredits } = useLoadDataPage(getCreditsMovie.bind(this, id));

  const isLoading = useMemo(
    () => loading && loadingCredits && loadingWatchProviders,
    [loading, loadingCredits, loadingWatchProviders]
  );

  const { directors, writers, cast } = data || {};
  const credits = [
    { label: 'Director', data: truncateArray(directors, 3) },
    { label: 'Escritores', data: truncateArray(writers, 3) },
    { label: 'Actores', data: truncateArray(cast, 3) }
  ];

  return (
    <div>
      <MediaDetail
        skeleton={isLoading}
        {...movie}
        watch_providers={watch_providers}
        credits={credits}
      />

      <div className="App-container App-content">Detail</div>
    </div>
  );
};

export default MoviesDetailPage;
