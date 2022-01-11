import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Space from '@components/Layout/Space/Space';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';

import { mediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId } from '@services/helpers';
import { getDetailMovie } from '@services/movies/get-detail-movie';

import { getIdFromParams } from '@utils/helpers/strings';

import styles from '@pages/Movies/MoviesPage.module.css';

const MoviesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { data: movie, loading } = useFetch(
    [
      `/api/${mediaTypes.MOVIE}/${id}`,
      { append_to_response: ['watch/providers', 'credits', 'external_ids', 'images', 'videos'] }
    ],
    getDetailMovie
  );
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const { credits, watch_providers, external_ids, backdrops, videos } = movie || {};
  const sections = [
    {
      key: 'credits',
      heading: 'Reparto principal',
      data: { ...credits },
      to: `/${mediaTypes.MOVIE}/${id}/credits`,
      Element: MediaCredits
    }
  ];

  const onTrailer = (item) =>
    setFetchModalData({ ...item, mode: 'video', videoId: getVideoTrailerYoutubeId(videos) });

  return (
    <Space className="full">
      {!loading && <MediaDetail.Background items={backdrops} />}

      <div className={`App-container App-content ${styles.wrapper} ${tablet && styles.tablet}`}>
        <div className={`${styles.body} fade-in-slow`}>
          <MediaDetail
            skeleton={loading}
            {...movie}
            watch_providers={watch_providers}
            external_ids={external_ids}
            credits={credits}
            sections={sections}
            onTrailer={() => onTrailer({ ...movie, type: mediaTypes.MOVIE })}
          />
        </div>

        {fetchModalData.id && (
          <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
        )}
      </div>
    </Space>
  );
};

export default MoviesDetailPage;
