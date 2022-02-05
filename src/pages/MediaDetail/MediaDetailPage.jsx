import { useState } from 'react';

import { useMediaPath } from '@hooks/useMediaPath';
import { useServiceMediaDetail } from '@hooks/useServiceMediaDetail';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';

import { detailProps, getTrailer } from '@pages/MediaDetail/config';
import styles from '@pages/MediaDetail/MediaDetailPage.module.css';

const MediaDetailPage = () => {
  const { mediaType, id } = useMediaPath('/:mediaType/:key');
  const { append_to_response, sections } = detailProps(mediaType);

  const { data: detail, loading } = useServiceMediaDetail(mediaType, id, append_to_response);
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const onTrailer = (item) =>
    setFetchModalData({ ...item, mode: 'video', videoId: getTrailer(detail) });

  return (
    <div className={`App-container App-content ${tablet && styles.tablet}`}>
      <div className={styles.body}>
        <MediaDetail
          skeleton={loading}
          sections={sections(detail)}
          onTrailer={() => onTrailer({ ...detail, type: mediaType })}
          {...detail}
        />
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default MediaDetailPage;
