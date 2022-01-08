import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';

import { getDetailSerie } from '@services/series/get-detail-serie';

import { getIdFromParams } from '@utils/helpers/strings';
import { mediaTypes } from '@services/constants';

import styles from '@pages/Series/SeriesPage.module.css';
import MediaSeasons from '@components/Media/MediaSeasons/MediaSeasons';

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

  const { creators, credits, watch_providers, external_ids, number_seasons, seasons } = serie || {};

  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  return (
    <div>
      <MediaDetail
        skeleton={loading}
        {...serie}
        watch_providers={watch_providers}
        external_ids={external_ids}
        credits={{ ...credits, creators }}
        onTrailer={() => onTrailer({ ...serie, type: mediaTypes.TV })}
      />

      {!loading && (
        <div className="App-container App-content">
          <div className={styles.section}>
            <div className={styles['section-heading']}>
              <MediaHeading
                text={`Temporadas (${number_seasons})`}
                to={`/${mediaTypes.TV}/${id}/seasons`}
              />
            </div>

            <MediaSeasons to={`/${mediaTypes.TV}/${id}/seasons`} seasons={seasons} />
          </div>

          <div className={styles.section}>
            <div className={styles['section-heading']}>
              <MediaHeading text="Reparto principal" to={`/${mediaTypes.TV}/${id}/credits`} />
            </div>

            <MediaCredits to={`/${mediaTypes.TV}/${id}/credits`} credits={credits} />
          </div>
        </div>
      )}

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default SeriesDetailPage;
