import { useState } from 'react';
import { useFetch } from '@hooks/useFetch';
import { useMediaPath } from '@hooks/useMediaPath';

import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';

import { mediaTypes } from '@services/constants';
import { getDetailSerie } from '@services/series/get-detail-serie';

import { sections, getTrailer } from '@pages/SerieDetail/config';
import styles from '@pages/SerieDetail/SerieDetailPage.module.css';

const SerieDetailPage = () => {
  const { id } = useMediaPath('/:mediaType/:key');
  const [fetchModalData, setFetchModalData] = useState({});
  const { data: detail, loading } = useFetch(
    [
      `/api/${mediaTypes.TV}/${id}`,
      {
        append_to_response: [
          'watch/providers',
          'aggregate_credits',
          'external_ids',
          'images',
          'videos',
          'recommendations'
        ]
      }
    ],
    getDetailSerie
  );

  const onTrailer = (item) =>
    setFetchModalData({ ...item, mode: 'video', videoId: getTrailer(detail) });

  return (
    <div className={`App-container App-content`}>
      <div className={styles.body}>
        <MediaDetail
          skeleton={loading}
          sections={sections(detail)}
          onTrailer={() => onTrailer({ ...detail, type: mediaTypes.TV })}
          {...detail}
        />
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default SerieDetailPage;
