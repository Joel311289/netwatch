import { useState } from 'react';

import { useMediaPath } from '@hooks/useMediaPath';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';
import { useServiceMediaDetail } from '@hooks/useServiceMediaDetail';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';
import MediaSeasons from '@components/Media/MediaSeasons/MediaSeasons';
import MediaDetailGeneral from '@components/Media/MediaDetail/MediaDetail-general';
import MediaDetailRecommendations from '@components/Media/MediaDetail/MediaDetail-recommendations';
import MediaDetailVideos from '@components/Media/MediaDetail/MediaDetail-videos';
import MediaDetailImages from '@components/Media/MediaDetail/MediaDetail-images';

import { mediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId, routeMediaDetail } from '@services/helpers';

import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@pages/Series/SeriesPage.module.css';

const SeriesDetailPage = () => {
  const { id } = useMediaPath();
  const { data: serie, loading } = useServiceMediaDetail(mediaTypes.TV, id, [
    'watch/providers',
    'aggregate_credits',
    'external_ids',
    'images',
    'videos',
    'recommendations'
  ]);
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const { credits, number_seasons, seasons, videos, images, recommendations } = serie || {};

  const sections = [
    {
      key: 'general',
      heading: 'Vista general',
      data: { ...serie },
      Element: MediaDetailGeneral
    },
    {
      key: 'seasons',
      heading: `Temporadas (${number_seasons})`,
      data: { seasons },
      to: `${routeMediaDetail(serie)}/seasons`,
      Element: MediaSeasons
    },
    {
      key: 'videos',
      heading: `Videos (${videos && videos.length})`,
      to: `${routeMediaDetail(serie)}/videos`,
      data: videos && !isEmptyArray(videos) && { videos },
      Element: MediaDetailVideos
    },
    {
      key: 'images',
      heading: `Imágenes (${images && images.backdrops.length})`,
      to: `${routeMediaDetail(serie)}/images`,
      data: images &&
        images.backdrops &&
        !isEmptyArray(images.backdrops) && { images: images.backdrops },
      Element: MediaDetailImages
    },
    {
      key: 'credits',
      heading: 'Reparto principal',
      data: { credits },
      to: `${routeMediaDetail(serie)}/credits`,
      Element: MediaCredits
    },
    {
      key: 'recommendations',
      heading: 'Recomendaciones',
      data: recommendations && !isEmptyArray(recommendations) && { recommendations },
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
          sections={sections}
          onTrailer={() => onTrailer({ ...serie, type: mediaTypes.TV })}
          {...serie}
        />
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default SeriesDetailPage;
