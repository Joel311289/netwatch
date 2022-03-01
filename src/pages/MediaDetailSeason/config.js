import { get } from 'lodash';

import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';
import MediaItem from '@components/Media/MediaItem/MediaItem';
// import MediaItemCredit from '@components/Media/MediaItem/MediaItem-credit';
// import MediaItemSeason from '@components/Media/MediaItem/MediaItem-season';
import MediaItemEpisode from '@components/Media/MediaItem/MediaItem-episode';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getSeasonSerie } from '@services/series/get-season';
import { getSeasonEpisodeSerie } from '@services/series/get-episode';
import MediaItemCredit from '@components/Media/MediaItem/MediaItem-credit';
import { truncateArray } from '@utils/helpers/arrays';

const itemsPerRow = (breakpoint, { mobile, tablet, smallDesktop, defaultValue = 3 }) => {
  if (breakpoint.mobile) return mobile;
  if (breakpoint.tablet) return tablet;
  if (breakpoint.smallDesktop) return smallDesktop;
  return defaultValue;
};

const itemsPerRowCredit = (breakpoint) =>
  itemsPerRow(breakpoint, { mobile: 2, tablet: 3, smallDesktop: 4, defaultValue: 3 });

const itemsPerRowBackdrop = (breakpoint) =>
  itemsPerRow(breakpoint, { mobile: 1, tablet: 2, smallDesktop: 2, defaultValue: 3 });

const itemsPerRowPoster = (breakpoint) =>
  itemsPerRow(breakpoint, { mobile: 2, tablet: 3, smallDesktop: 4, defaultValue: 5 });

const labelImages = {
  backdrops: 'Imágenes de fondo',
  posters: 'Pósteres',
  profiles: 'Perfiles',
  tagged_images: 'Imágenes etiquetadas'
};
// const labelCredits = {
//   cast: 'Actores',
//   creators: 'Creadores',
//   directors: 'Directores',
//   writers: 'Escritores'
// };

export const getSection = ({ episode_number }) => {
  if (episode_number) return 'episodes/detail';
  return 'seasons/detail';
};

export const serviceSection = ({ id, season_number, episode_number }) => ({
  'seasons/detail': [
    season_number ? `/api/${mediaTypes.TV}/${id}/season/${season_number}` : null,
    getSeasonSerie
  ],
  'episodes/detail': [
    season_number && episode_number
      ? `/api/${mediaTypes.TV}/${id}/season/${season_number}/episode/${episode_number}`
      : null,
    getSeasonEpisodeSerie
  ]
});

export const resumeProps = (data, detail) => ({
  'seasons/detail': {
    to: `${routeMediaDetail(data)}/seasons`,
    linkName: 'Volver a temporadas',
    date: get(detail, 'date'),
    image: get(detail, 'image'),
    backdrop: get(data, 'backdrop'),
    title: get(data, 'title'),
    season: `T${get(detail, 'season_number')}`
  },
  'episodes/detail': {
    to: `${routeMediaDetail(data)}/seasons/${get(detail, 'season_number')}`,
    linkName: 'Volver a episodios',
    date: get(detail, 'date'),
    image: get(
      get(data, 'seasons', []).find(
        ({ season_number }) => season_number === get(detail, 'season_number')
      ),
      'image'
    ),
    backdrop: get(data, 'backdrop'),
    title: get(data, 'title'),
    season: `T${get(detail, 'season_number')}x${get(detail, 'episode_number')}`
  }
});

export const sectionProps = (data, detail) => {
  const title = get(data, 'title');
  const titleDetail = get(detail, 'title');

  return {
    'seasons/detail': {
      sections: [
        {
          heading: 'Episodios',
          length: get(detail, 'episodes', []).length,
          emptyMessage: `No se han encontrado episodios para "${titleDetail}" de ${title}`,
          gridProps: () => ({
            gap: '20px',
            itemsPerRow: 1
          }),
          Element: MediaItemEpisode,
          items: get(detail, 'episodes', []),
          props: (props) => ({ ...props })
        },
        {
          heading: 'Vídeos',
          gridProps: (breakpoint) => ({
            gap: '0 10px',
            itemsPerRow: itemsPerRowBackdrop(breakpoint)
          }),
          Element: MediaItem,
          items: get(detail, 'videos', null),
          props: ({ site, key, name }) => ({
            title: name,
            videoKey: key,
            videoSite: site
          })
        },
        {
          heading: labelImages.backdrops,
          gridProps: (breakpoint) => ({
            gap: '20px 10px',
            itemsPerRow: itemsPerRowBackdrop(breakpoint)
          }),
          Element: MediaItemImage,
          items: get(detail, 'images.backdrops', []),
          props: (item) => ({
            ...item,
            ratio: Math.max(...get(detail, 'images.backdrops', []).map(({ ratio }) => ratio)),
            zoom: true
          })
        },
        {
          heading: labelImages.posters,
          gridProps: (breakpoint) => ({
            gap: '20px 10px',
            itemsPerRow: itemsPerRowPoster(breakpoint)
          }),
          Element: MediaItemImage,
          items: get(detail, 'images.posters', []),
          props: (item) => ({
            ...item,
            ratio: Math.max(...get(detail, 'images.posters', []).map(({ ratio }) => ratio)),
            zoom: true
          })
        }
      ]
    },
    'episodes/detail': {
      sections: [
        {
          heading: 'Vídeos',
          gridProps: (breakpoint) => ({
            gap: '0 10px',
            itemsPerRow: itemsPerRowBackdrop(breakpoint)
          }),
          Element: MediaItem,
          items: get(detail, 'videos', []),
          props: ({ site, key, name }) => ({
            title: name,
            videoKey: key,
            videoSite: site
          })
        },
        {
          heading: 'Imágenes',
          gridProps: (breakpoint) => ({
            gap: '20px 10px',
            itemsPerRow: itemsPerRowBackdrop(breakpoint)
          }),
          Element: MediaItemImage,
          items: get(detail, 'images.stills', []),
          props: (item) => ({
            ...item,
            ratio: Math.max(...get(detail, 'images.stills', []).map(({ ratio }) => ratio)),
            zoom: true
          })
        },
        {
          heading: 'Artistas invitados',
          gridProps: (breakpoint) => ({
            gap: '20px 25px',
            itemsPerRow: itemsPerRowCredit(breakpoint)
          }),
          Element: MediaItemCredit,
          items: truncateArray(get(detail, 'credits.cast', []), 10),
          props: (item) => ({ ...item })
        }
      ]
    }
  };
};
