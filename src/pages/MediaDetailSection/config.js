import { get } from 'lodash';

import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaItemCredit from '@components/Media/MediaItem/MediaItem-credit';
import MediaItemSeason from '@components/Media/MediaItem/MediaItem-season';
import MediaItemEpisode from '@components/Media/MediaItem/MediaItem-episode';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getSeasonSerie } from '@services/series/get-season';
import { getSeasonEpisodeSerie } from '@services/series/get-episode';

const itemsPerRow = (breakpoint, { mobile, tablet, smallDesktop, defaultValue = 3 }) => {
  if (breakpoint.mobile) return mobile;
  if (breakpoint.tablet) return tablet;
  if (breakpoint.smallDesktop) return smallDesktop;
  return defaultValue;
};

const itemsPerRowCredit = (breakpoint) =>
  itemsPerRow(breakpoint, { mobile: 1, tablet: 2, smallDesktop: 2, defaultValue: 3 });

const itemsPerRowBackdrop = (breakpoint) =>
  itemsPerRow(breakpoint, { mobile: 2, tablet: 3, smallDesktop: 3, defaultValue: 4 });

const itemsPerRowPoster = (breakpoint) =>
  itemsPerRow(breakpoint, { mobile: 3, tablet: 4, smallDesktop: 5, defaultValue: 6 });

const labelImages = {
  backdrops: 'Imágenes de fondo',
  posters: 'Pósteres',
  profiles: 'Perfiles',
  tagged_images: 'Imágenes etiquetadas'
};
const labelCredits = {
  cast: 'Actores',
  creators: 'Creadores',
  directors: 'Directores',
  writers: 'Escritores'
};

export const apiSectionDetail = (mediaId, params) => ({
  'seasons/detail': `/api/${mediaTypes.TV}/${mediaId}/season/${get(params, 'number_season')}`,
  'episodes/detail': `/api/${mediaTypes.TV}/${mediaId}/season/${get(
    params,
    'number_season'
  )}/episode/${get(params, 'number_episode')}`
});
export const fetcherSectionDetail = {
  'seasons/detail': getSeasonSerie,
  'episodes/detail': getSeasonEpisodeSerie
};

export const resumeProps = ({ data, detailSection }) => ({
  'seasons/detail': {
    to: `${routeMediaDetail(data)}/seasons`,
    seasons: get(data, 'seasons'),
    numberSeasonActive: get(detailSection, 'season_number'),
    linkName: 'Volver a temporadas',
    date: get(detailSection, 'date'),
    image: get(detailSection, 'image')
  }
});

export const sectionProps = ({ data, detail, detailSection }) => ({
  videos: {
    label: 'Vídeos',
    length: (detail || []).length,
    sections: [
      {
        emptyMessage: `No se han encontrado vídeos para ${get(data, 'title')}`,
        gridProps: (breakpoint) => ({
          gap: '0 10px',
          itemsPerRow: itemsPerRowBackdrop(breakpoint)
        }),
        Element: MediaItem,
        items: detail,
        props: ({ site, key, name }) => ({
          title: name,
          videoKey: key,
          videoSite: site
        })
      }
    ]
  },
  images: {
    label: 'Imágenes',
    sections: Object.keys(detail || {})
      .filter((key) => labelImages[key])
      .map((key) => ({
        emptyMessage: `No se han encontrado ${(labelImages[key] || '').toLowerCase()} para ${get(
          data,
          'title'
        )}`,
        gridProps: (breakpoint) => ({
          gap: '20px 10px',
          itemsPerRow:
            key === 'backdrops' ? itemsPerRowBackdrop(breakpoint) : itemsPerRowPoster(breakpoint)
        }),
        heading: `${labelImages[key]} (${detail[key].length})`,
        Element: MediaItemImage,
        items: detail[key],
        props: (item) => ({
          ...item,
          ratio: Math.max(...detail[key].map(({ ratio }) => ratio)),
          zoom: true
        })
      }))
  },
  seasons: {
    label: 'Temporadas',
    length: get(data, 'number_seasons'),
    sections: [
      {
        emptyMessage: `No se han encontrado temporadas para ${get(data, 'title')}`,
        gridProps: () => ({
          gap: '20px',
          itemsPerRow: 1
        }),
        Element: MediaItemSeason,
        items: detail,
        props: (props) => ({ ...props })
      }
    ]
  },
  credits: {
    label: 'Reparto',
    sections: Object.keys(detail || {}).map((key) => ({
      emptyMessage: `No se han encontrado ${(labelCredits[key] || '').toLowerCase()} para ${get(
        data,
        'title'
      )}`,
      gridProps: (breakpoint) => ({
        gap: '20px 10px',
        itemsPerRow: itemsPerRowCredit(breakpoint)
      }),
      heading: labelCredits[key],
      Element: MediaItemCredit,
      items: detail[key],
      props: (item) => ({ ...item })
    }))
  },
  'seasons/detail': {
    // label: `${get(detailSection, 'title')}`,
    // length: get(detailSection, 'episodes', []).length,
    sections: [
      {
        heading: 'Episodios',
        emptyMessage: `No se han encontrado episodios para "${get(
          detailSection,
          'title'
        )}" de ${get(data, 'title')}`,
        gridProps: () => ({
          gap: '20px',
          itemsPerRow: 1
        }),
        Element: MediaItemEpisode,
        items: get(detailSection, 'episodes', []),
        props: (props) => ({ ...props })
      },
      {
        heading: 'Vídeos',
        gridProps: (breakpoint) => ({
          gap: '0 10px',
          itemsPerRow: itemsPerRowBackdrop(breakpoint)
        }),
        Element: MediaItem,
        items: get(detailSection, 'videos', null),
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
        items: get(detailSection, 'images.backdrops', []),
        props: (item) => ({
          ...item,
          ratio: Math.max(...get(detailSection, 'images.backdrops', []).map(({ ratio }) => ratio)),
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
        items: get(detailSection, 'images.posters', []),
        props: (item) => ({
          ...item,
          ratio: Math.max(...get(detailSection, 'images.posters', []).map(({ ratio }) => ratio)),
          zoom: true
        })
      }
    ]
  }
});
