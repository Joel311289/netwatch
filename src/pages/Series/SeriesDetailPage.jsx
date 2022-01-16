import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';
import MediaSeasons from '@components/Media/MediaSeasons/MediaSeasons';
import MediaDetailGeneral from '@components/Media/MediaDetail/MediaDetail-general';
import MediaDetailRecommendations from '@components/Media/MediaDetail/MediaDetail-recommendations';

import { mediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId } from '@services/helpers';
import { getDetailSerie } from '@services/series/get-detail-serie';

import { getIdFromParams } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@pages/Series/SeriesPage.module.css';
import MediaDetailVideos from '@components/Media/MediaDetail/MediaDetail-videos';

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
          'videos',
          'recommendations'
        ]
      }
    ],
    getDetailSerie
  );
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const {
    creators,
    credits,
    watch_providers,
    external_ids,
    number_seasons,
    seasons,
    videos,
    recommendations
  } = serie || {};

  const sections = [
    {
      key: 'general',
      heading: 'Vista general',
      data: { ...serie },
      Element: MediaDetailGeneral
    },
    {
      key: 'videos',
      heading: 'Videos',
      data: { items: videos },
      // to: `/${mediaTypes.TV}/${id}/seasons`,
      Element: MediaDetailVideos
    },
    {
      key: 'seasons',
      heading: `Temporadas (${number_seasons})`,
      data: { seasons },
      to: `/${mediaTypes.TV}/${id}/seasons`,
      Element: MediaSeasons
    },
    {
      key: 'credits',
      heading: 'Reparto principal',
      data: { credits: { ...credits, creators } },
      to: `/${mediaTypes.TV}/${id}/credits`,
      Element: MediaCredits
    },
    {
      key: 'recommendations',
      heading: 'Recomendaciones',
      data: !isEmptyArray(recommendations) && { items: recommendations },
      Element: MediaDetailRecommendations
    }
  ];

  const onTrailer = (item) =>
    setFetchModalData({ ...item, mode: 'video', videoId: getVideoTrailerYoutubeId(videos) });

  return (
    <div className={`App-container App-content ${styles.wrapper} ${tablet && styles.tablet}`}>
      <div className={styles.body}>
        <MediaDetail
          skeleton={loading}
          {...serie}
          watch_providers={watch_providers}
          external_ids={external_ids}
          credits={{ ...credits, creators }}
          sections={sections}
          videos={videos}
          onTrailer={() => onTrailer({ ...serie, type: mediaTypes.TV })}
        />
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default SeriesDetailPage;
