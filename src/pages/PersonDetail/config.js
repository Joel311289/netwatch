import { get } from 'lodash';

import MediaDetailImages from '@components/Media/MediaDetail/MediaDetail-images';
import MediaDetailRecommendations from '@components/Media/MediaDetail/MediaDetail-recommendations';

import { routeMediaDetail } from '@services/helpers';

const sectionsDetail = (detail) => {
  const images = get(detail, 'images.combined', []);
  const combined_credits = get(detail, 'combined_credits', []);

  return {
    images: {
      heading: `Imágenes (${images.length})`,
      to: `${routeMediaDetail(detail)}/images`,
      data: { images },
      props: { type: 'poster' },
      Element: MediaDetailImages,
      visible: Boolean(images.length)
    },
    medias: {
      heading: `Conocido por`,
      data: { recommendations: combined_credits },
      Element: MediaDetailRecommendations,
      visible: Boolean(combined_credits.length)
    }
  };
};

export const sections = (detail) =>
  Object.keys(sectionsDetail(detail)).map((key) => ({ key, ...sectionsDetail(detail)[key] }));
