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
import MediaDetailVideos from '@components/Media/MediaDetail/MediaDetail-videos';
import MediaDetailImages from '@components/Media/MediaDetail/MediaDetail-images';

import { mediaTypes, routeMediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId } from '@services/helpers';
import { getDetailSerie } from '@services/series/get-detail-serie';

import { getIdFromParams } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

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
          'videos',
          'recommendations'
        ]
      }
    ],
    getDetailSerie
  );
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const { credits, number_seasons, seasons, videos, backdrops, recommendations } = serie || {};

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
      to: `/${routeMediaTypes.TV}/${id}/seasons`,
      Element: MediaSeasons
    },
    {
      key: 'videos',
      heading: `Videos (${videos && videos.length})`,
      to: `/${routeMediaTypes.tv}/${id}/videos`,
      data: videos && !isEmptyArray(videos) && { videos },
      Element: MediaDetailVideos
    },
    {
      key: 'images',
      heading: `Imágenes (${backdrops && backdrops.length})`,
      to: `/${routeMediaTypes.tv}/${id}/images`,
      data: backdrops && !isEmptyArray(backdrops) && { images: backdrops },
      Element: MediaDetailImages
    },
    {
      key: 'credits',
      heading: 'Reparto principal',
      data: { credits },
      to: `/${routeMediaTypes.tv}/${id}/credits`,
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
