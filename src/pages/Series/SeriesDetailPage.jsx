import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { getDetailSerie } from '@services/series/get-detail-serie';

import { getIdFromParams } from '@utils/helpers/strings';
import { truncateArray } from '@utils/helpers/arrays';
import { mediaTypes } from '@services/constants';

const SeriesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { data: serie, loading } = useFetch(
    [
      `/api/${mediaTypes.TV}/${id}`,
      { append_to_response: ['watch/providers', 'aggregate_credits', 'external_ids'] }
    ],
    getDetailSerie
  );
  const [fetchModalData, setFetchModalData] = useState({});

  const { creators, credits: { cast } = {}, watch_providers, external_ids } = serie || {};
  const credits = [
    { label: 'Creadores', data: truncateArray(creators, 3) },
    { label: 'Actores', data: truncateArray(cast, 3) }
  ];

  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  return (
    <div>
      <MediaDetail
        skeleton={loading}
        {...serie}
        watch_providers={watch_providers}
        external_ids={external_ids}
        credits={credits}
        onTrailer={() => onTrailer({ ...serie, type: mediaTypes.TV })}
      />

      <div className="App-container App-content">Detail</div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default SeriesDetailPage;
