import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MediaDetail from '../../components/Media/MediaDetail/MediaDetail';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getDetailSerie } from '../../services/series/get-detail-serie';
import { getWatchProvidersSerie } from '../../services/series/get-watch-providers-serie';
import { getExternalIdsSerie } from '../../services/series/get-external-ids-serie';
import { getCreditsSerie } from '../../services/series/get-credits-serie';
import { getIdFromParams, truncateArray } from '../../utils/helpers';

const SeriesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');

  const { data: serie, loading } = useLoadDataPage(getDetailSerie.bind(this, id));
  const { data: watch_providers, loading: loadingWatchProviders } = useLoadDataPage(
    getWatchProvidersSerie.bind(this, id)
  );
  const { data, loading: loadingCredits } = useLoadDataPage(getCreditsSerie.bind(this, id));
  const { data: external_ids, loading: loadingExternalIds } = useLoadDataPage(
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

  return (
    <div>
      <MediaDetail
        skeleton={isLoading}
        {...serie}
        watch_providers={watch_providers}
        external_ids={external_ids}
        credits={credits}
      />

      <div className="App-container App-content">Detail</div>
    </div>
  );
};

export default SeriesDetailPage;
