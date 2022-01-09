import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Space from '@components/Layout/Space/Space';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';
import MediaSeasons from '@components/Media/MediaSeasons/MediaSeasons';

import { mediaTypes } from '@services/constants';
import { getDetailSerie } from '@services/series/get-detail-serie';

import { getIdFromParams } from '@utils/helpers/strings';

import styles from '@pages/Series/SeriesPage.module.css';

const SeriesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { data: serie, loading } = useFetch(
    [
      `/api/${mediaTypes.TV}/${id}`,
      {
        append_to_response: [
          'watch/providers',
          'aggregate_credits',
          'external_ids',
          'images',
          'videos'
        ]
      }
    ],
    getDetailSerie
  );
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const { creators, credits, watch_providers, external_ids, number_seasons, seasons, backdrops } =
    serie || {};
  const sections = [
    {
      key: 'seasons',
      heading: `Temporadas (${number_seasons})`,
      data: seasons,
      to: `/${mediaTypes.TV}/${id}/seasons`,
      Element: MediaSeasons
    },
    {
      key: 'credits',
      heading: 'Reparto principal',
      data: { ...credits, creators },
      to: `/${mediaTypes.TV}/${id}/credits`,
      Element: MediaCredits
    }
  ];

  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  return (
    <Space className="full">
      {!loading && <MediaDetail.Background items={backdrops} />}

      <div className={`App-container App-content ${styles.wrapper} ${tablet && styles.tablet}`}>
        <div className={styles.body}>
          <MediaDetail
            skeleton={loading}
            {...serie}
            watch_providers={watch_providers}
            external_ids={external_ids}
            credits={{ ...credits, creators }}
            sections={sections}
            onTrailer={() => onTrailer({ ...serie, type: mediaTypes.TV })}
          />
        </div>
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </Space>
  );
};

export default SeriesDetailPage;
