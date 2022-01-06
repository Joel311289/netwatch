import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchData } from '@hooks/useFetchData';
import { useTrailerModal } from '@hooks/useTrailerModal';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';

import { getDetailMovie } from '@services/movies/get-detail-movie';
import { getWatchProvidersMovie } from '@services/movies/get-watch-providers-movie';
import { getExternalIdsMovie } from '@services/movies/get-external-ids-movie';
import { getCreditsMovie } from '@services/movies/get-credits-movie';

import { getIdFromParams } from '@utils/helpers/strings';
import { truncateArray } from '@utils/helpers/arrays';
import { mediaTypes } from '@services/constants';

const MoviesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { onModalOpen, ModalTrailer } = useTrailerModal();

  const { data: movie, loading } = useFetchData(getDetailMovie.bind(this, id));
  const { data: watch_providers, loading: loadingWatchProviders } = useFetchData(
    getWatchProvidersMovie.bind(this, id)
  );
  const { data, loading: loadingCredits } = useFetchData(getCreditsMovie.bind(this, id));
  const { data: external_ids, loading: loadingExternalIds } = useFetchData(
    getExternalIdsMovie.bind(this, id)
  );

  const isLoading = useMemo(
    () => loading && loadingCredits && loadingWatchProviders && loadingExternalIds,
    [loading, loadingCredits, loadingWatchProviders, loadingExternalIds]
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
        external_ids={external_ids}
        credits={credits}
        onTrailer={() => onModalOpen(mediaTypes.MOVIE, id)}
      />

      <div className="App-container App-content">Detail</div>

      {ModalTrailer}
    </div>
  );
};

export default MoviesDetailPage;
