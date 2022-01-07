import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchData } from '@hooks/useFetchData';
import { useFetch } from '@hooks/useFetch';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { pathDetailSerie, getDetailSerie } from '@services/series/get-detail-serie';
import { getWatchProvidersSerie } from '@services/series/get-watch-providers-serie';
import { getExternalIdsSerie } from '@services/series/get-external-ids-serie';
import { getCreditsSerie } from '@services/series/get-credits-serie';

import { getIdFromParams } from '@utils/helpers/strings';
import { truncateArray } from '@utils/helpers/arrays';
import { mediaTypes } from '@services/constants';

const SeriesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const [fetchModalData, setFetchModalData] = useState({});

  const { data: serie, loading } = useFetch(pathDetailSerie(id), getDetailSerie);
  const { data: watch_providers, loading: loadingWatchProviders } = useFetchData(
    getWatchProvidersSerie.bind(this, id)
  );
  const { data, loading: loadingCredits } = useFetchData(getCreditsSerie.bind(this, id));
  const { data: external_ids, loading: loadingExternalIds } = useFetchData(
    getExternalIdsSerie.bind(this, id)
  );

  const isLoading = useMemo(
    () => loading && loadingCredits && loadingWatchProviders && loadingExternalIds,
    [loading, loadingCredits, loadingWatchProviders, loadingExternalIds]
  );

  const { creators } = serie || {};
  const { cast } = data || {};
  const credits = [
    { label: 'Creadores', data: truncateArray(creators, 3) },
    { label: 'Actores', data: truncateArray(cast, 3) }
  ];

  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  return (
    <div>
      <MediaDetail
        skeleton={isLoading}
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
