import { useState } from 'react';

import { useMediaPath } from '@hooks/useMediaPath';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';
import { useServiceMediaDetail } from '@hooks/useServiceMediaDetail';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';
import MediaDetailGeneral from '@components/Media/MediaDetail/MediaDetail-general';
import MediaDetailRecommendations from '@components/Media/MediaDetail/MediaDetail-recommendations';
import MediaDetailVideos from '@components/Media/MediaDetail/MediaDetail-videos';
import MediaDetailImages from '@components/Media/MediaDetail/MediaDetail-images';

import { mediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId, routeMediaDetail } from '@services/helpers';

import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@pages/Movies/MoviesPage.module.css';

const MoviesDetailPage = () => {
  const { id } = useMediaPath();
  const { data: movie, loading } = useServiceMediaDetail(mediaTypes.MOVIE, id, [
    'watch/providers',
    'credits',
    'external_ids',
    'images',
    'videos',
    'recommendations'
  ]);
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const { credits, videos, images, recommendations } = movie || {};

  const sections = () => [
    {
      key: 'general',
      heading: 'Vista general',
      data: { ...movie },
      Element: MediaDetailGeneral
    },
    {
      key: 'videos',
      heading: `Videos (${videos && videos.length})`,
      to: `${routeMediaDetail(movie)}/videos`,
      data: videos && !isEmptyArray(videos) && { videos },
      Element: MediaDetailVideos
    },
    {
      key: 'images',
      heading: `Imágenes (${images && images.backdrops.length})`,
      to: `${routeMediaDetail(movie)}/images`,
      data: images &&
        images.backdrops &&
        !isEmptyArray(images.backdrops) && { images: images.backdrops },
      Element: MediaDetailImages
    },
    {
      key: 'credits',
      heading: 'Reparto principal',
      data: { credits },
      to: `${routeMediaDetail(movie)}/credits`,
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
    <div className={`App-container App-content ${tablet && styles.tablet}`}>
      <div className={styles.body}>
        <MediaDetail
          skeleton={loading}
          sections={sections()}
          onTrailer={() => onTrailer({ ...movie, type: mediaTypes.MOVIE })}
          {...movie}
        />
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default MoviesDetailPage;
