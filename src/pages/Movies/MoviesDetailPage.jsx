import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';

import { getDetailMovie } from '@services/movies/get-detail-movie';

import { getIdFromParams } from '@utils/helpers/strings';
import { mediaTypes } from '@services/constants';

import styles from '@pages/Movies/MoviesPage.module.css';

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

  const { credits, watch_providers, external_ids } = movie || {};

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

      {!loading && (
        <div className="App-container App-content">
          <div className={styles.section}>
            <div className={styles['section-heading']}>
              <MediaHeading text="Reparto principal" to={`/${mediaTypes.MOVIE}/${id}/credits`} />
            </div>

            <MediaCredits to={`/movie/${mediaTypes.MOVIE}/credits`} credits={credits} />
          </div>
        </div>
      )}

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default MoviesDetailPage;
