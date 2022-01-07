import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { getDetailMovie } from '@services/movies/get-detail-movie';

import { getIdFromParams } from '@utils/helpers/strings';
import { truncateArray } from '@utils/helpers/arrays';
import { mediaTypes } from '@services/constants';

const MoviesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { data: movie, loading } = useFetch(
    [
      `/api/${mediaTypes.MOVIE}/${id}`,
      { append_to_response: ['watch/providers', 'credits', 'external_ids'] }
    ],
    getDetailMovie
  );
  const [fetchModalData, setFetchModalData] = useState({});

  const { credits: { directors, writers, cast } = {}, watch_providers, external_ids } = movie || {};
  const credits = [
    { label: 'Director', data: truncateArray(directors, 3) },
    { label: 'Escritores', data: truncateArray(writers, 3) },
    { label: 'Actores', data: truncateArray(cast, 3) }
  ];

  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  return (
    <div>
      <MediaDetail
        skeleton={loading}
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
