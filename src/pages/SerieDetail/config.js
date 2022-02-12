import { get } from 'lodash';

import MediaDetailGeneral from '@components/Media/MediaDetail/MediaDetail-general';
import MediaDetailImages from '@components/Media/MediaDetail/MediaDetail-images';
import MediaDetailVideos from '@components/Media/MediaDetail/MediaDetail-videos';
import MediaSeasons from '@components/Media/MediaDetail/MediaDetail-seasons';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';
import MediaDetailRecommendations from '@components/Media/MediaDetail/MediaDetail-recommendations';

import { getVideoTrailerYoutubeId, routeMediaDetail } from '@services/helpers';

const sectionsDetail = (detail) => {
  const number_seasons = get(detail, 'number_seasons');
  const seasons = get(detail, 'seasons', []);
  const videos = get(detail, 'videos', []);
  const images = get(detail, 'images.backdrops', []);
  const credits = get(detail, 'credits', {});
  const recommendations = get(detail, 'recommendations', []);

  return {
    general: {
      heading: 'Vista general',
      data: { ...detail },
      Element: MediaDetailGeneral,
      visible: true
    },
    seasons: {
      heading: `Temporadas (${number_seasons})`,
      data: { seasons },
      to: `${routeMediaDetail(detail)}/seasons`,
      Element: MediaSeasons,
      visible: Boolean(number_seasons)
    },
    videos: {
      heading: `Vídeos (${videos.length})`,
      to: `${routeMediaDetail(detail)}/videos`,
      data: { videos },
      Element: MediaDetailVideos,
      visible: Boolean(videos.length)
    },
    images: {
      heading: `Imágenes (${images.length})`,
      to: `${routeMediaDetail(detail)}/images`,
      data: { images },
      Element: MediaDetailImages,
      visible: Boolean(images.length)
    },
    credits: {
      heading: `Reparto principal`,
      to: `${routeMediaDetail(detail)}/credits`,
      data: { credits },
      Element: MediaCredits,
      visible: true
    },
    recommendations: {
      heading: `Recomendaciones`,
      data: { recommendations },
      Element: MediaDetailRecommendations,
      visible: Boolean(recommendations.length)
    }
  };
};

export const sections = (detail) =>
  Object.keys(sectionsDetail(detail)).map((key) => ({ key, ...sectionsDetail(detail)[key] }));

export const getTrailer = (detail) => getVideoTrailerYoutubeId(get(detail, 'videos', []));
