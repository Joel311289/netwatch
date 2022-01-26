import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';
import MediaDetailGeneral from '@components/Media/MediaDetail/MediaDetail-general';
import MediaDetailRecommendations from '@components/Media/MediaDetail/MediaDetail-recommendations';
import MediaDetailVideos from '@components/Media/MediaDetail/MediaDetail-videos';
import MediaDetailImages from '@components/Media/MediaDetail/MediaDetail-images';

import { mediaTypes, routeMediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId } from '@services/helpers';
import { getDetailMovie } from '@services/movies/get-detail-movie';

import { getIdFromParams } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@pages/Movies/MoviesPage.module.css';

const MoviesDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { data: movie, loading } = useFetch(
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
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const { credits, videos, backdrops, recommendations } = movie || {};

  const sections = [
    {
      key: 'general',
      heading: 'Vista general',
      data: { ...movie },
      Element: MediaDetailGeneral
    },
    {
      key: 'videos',
      heading: `Videos (${videos && videos.length})`,
      to: `/${routeMediaTypes.movie}/${id}/videos`,
      data: videos && !isEmptyArray(videos) && { videos },
      Element: MediaDetailVideos
    },
    {
      key: 'images',
      heading: `Imágenes (${backdrops && backdrops.length})`,
      to: `/${routeMediaTypes.movie}/${id}/images`,
      data: backdrops && !isEmptyArray(backdrops) && { images: backdrops },
      Element: MediaDetailImages
    },
    {
      key: 'credits',
      heading: 'Reparto principal',
      data: { credits },
      to: `/${routeMediaTypes.movie}/${id}/credits`,
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
          sections={sections}
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
