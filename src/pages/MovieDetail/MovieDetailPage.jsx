import { useState } from 'react';
import { useFetch } from '@hooks/useFetch';
import { useMediaPath } from '@hooks/useMediaPath';

import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';

import { mediaTypes } from '@services/constants';
import { getDetailMovie } from '@services/movies/get-detail-movie';

import { sections, getTrailer } from '@pages/MovieDetail/config';
import styles from '@pages/MovieDetail/MovieDetailPage.module.css';

const MovieDetailPage = () => {
  const { id } = useMediaPath('/:mediaType/:key');
  const [fetchModalData, setFetchModalData] = useState({});
  const { data: detail, loading } = useFetch(
    [
      `/api/${mediaTypes.MOVIE}/${id}`,
      {
        append_to_response: [
          'watch/providers',
          'credits',
          'external_ids',
          'images',
          'videos',
          'recommendations'
        ]
      }
    ],
    getDetailMovie
  );

  const onTrailer = (item) =>
    setFetchModalData({ ...item, mode: 'video', videoId: getTrailer(detail) });

  return (
    <div className={`App-container App-content`}>
      <div className={styles.body}>
        <MediaDetail
          skeleton={loading}
          sections={sections(detail)}
          onTrailer={() => onTrailer({ ...detail, type: mediaTypes.MOVIE })}
          {...detail}
        />
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default MovieDetailPage;
