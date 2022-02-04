import { get } from 'lodash';

import MediaDetailGeneral from '@components/Media/MediaDetail/MediaDetail-general';
import MediaDetailImages from '@components/Media/MediaDetail/MediaDetail-images';
import MediaDetailVideos from '@components/Media/MediaDetail/MediaDetail-videos';
import MediaSeasons from '@components/Media/MediaSeasons/MediaSeasons';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';
import MediaDetailRecommendations from '@components/Media/MediaDetail/MediaDetail-recommendations';

import { mediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId, routeMediaDetail } from '@services/helpers';

const appendToResponsesMedia = {
  [mediaTypes.MOVIE]: 'watch/providers,credits,external_ids,images,videos,recommendations',
  [mediaTypes.TV]: 'watch/providers,aggregate_credits,external_ids,images,videos,recommendations',
  [mediaTypes.PERSON]: 'external_ids,images,tagged_images,combined_credits,movie_credits,tv_credits'
};

const pathImagesMedia = {
  [mediaTypes.MOVIE]: 'images.backdrops',
  [mediaTypes.TV]: 'images.backdrops',
  [mediaTypes.PERSON]: 'images.combined'
};

const propsImagesMedia = {
  [mediaTypes.MOVIE]: {},
  [mediaTypes.TV]: {},
  [mediaTypes.PERSON]: { type: 'poster' }
};

const sectionsMedia = {
  [mediaTypes.MOVIE]: ['general', 'videos', 'images', 'credits', 'recommendations'],
  [mediaTypes.TV]: ['general', 'seasons', 'videos', 'images', 'credits', 'recommendations'],
  [mediaTypes.PERSON]: ['medias', 'images']
};

const sectionsDetail = (detail, mediaType) => {
  const number_seasons = get(detail, 'number_seasons');
  const seasons = get(detail, 'seasons', []);
  const videos = get(detail, 'videos', []);
  const images = get(detail, pathImagesMedia[mediaType], []);
  const credits = get(detail, 'credits', {});
  const recommendations = get(detail, 'recommendations', []);
  const combined_credits = get(detail, 'combined_credits', []);

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
      props: propsImagesMedia[mediaType],
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
    },
    medias: {
      heading: `Conocido por`,
      data: { recommendations: combined_credits },
      Element: MediaDetailRecommendations,
      visible: Boolean(combined_credits.length)
    }
  };
};

export const getTrailer = (detail) => getVideoTrailerYoutubeId(get(detail, 'videos', []));

export const detailProps = (mediaType) => ({
  append_to_response: appendToResponsesMedia[mediaType].split(','),
  sections: (detail) =>
    sectionsMedia[mediaType]
      .filter((section) => sectionsDetail(detail, mediaType)[section].visible)
      .map((section) => ({
        key: section,
        ...sectionsDetail(detail, mediaType)[section]
      }))
});
