import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchData } from '@hooks/useFetchData';
import { useFetch } from '@hooks/useFetch';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';

import { pathDetailMovie, getDetailMovie } from '@services/movies/get-detail-movie';
import { getWatchProvidersMovie } from '@services/movies/get-watch-providers-movie';
import { getExternalIdsMovie } from '@services/movies/get-external-ids-movie';
import { getCreditsMovie } from '@services/movies/get-credits-movie';

import { getIdFromParams } from '@utils/helpers/strings';
import { truncateArray } from '@utils/helpers/arrays';
import { mediaTypes } from '@services/constants';
import MediaModal from '@components/Media/MediaModal/MediaModal';

const MoviesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const [fetchModalData, setFetchModalData] = useState({});

  const { data: movie, loading } = useFetch(pathDetailMovie(id), getDetailMovie);
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

  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  return (
    <div>
      <MediaDetail
        skeleton={isLoading}
        {...movie}
        watch_providers={watch_providers}
        external_ids={external_ids}
        credits={credits}
        onTrailer={() => onTrailer({ ...movie, type: mediaTypes.MOVIE })}
      />

      <div className="App-container App-content">Detail</div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default MoviesDetailPage;
