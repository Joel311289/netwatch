import { get } from 'lodash';

import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaItemCredit from '@components/Media/MediaItem/MediaItem-credit';
import MediaItemSeason from '@components/Media/MediaItem/MediaItem-season';

const itemsPerRow = (breakpoint, { mobile, tablet, smallDesktop, defaultValue = 3 }) => {
  if (breakpoint.mobile) return mobile;
  if (breakpoint.tablet) return tablet;
  if (breakpoint.smallDesktop) return smallDesktop;
  return defaultValue;
};

const itemsPerRowCredit = (breakpoint) =>
  itemsPerRow(breakpoint, { mobile: 2, tablet: 3, smallDesktop: 4, defaultValue: 3 });

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

export const sectionProps = (data, section) => {
  const title = get(data, 'title');
  const number_seasons = get(data, 'number_seasons');
  const detail = get(data, section);

  return (
    {
      videos: {
        label: 'Vídeos',
        length: (detail || []).length,
        sections: [
          {
            emptyMessage: `No se han encontrado vídeos para ${title}`,
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
            emptyMessage: `No se han encontrado ${(
              labelImages[key] || ''
            ).toLowerCase()} para ${get(data, 'title')}`,
            gridProps: (breakpoint) => ({
              gap: '20px 10px',
              itemsPerRow:
                key === 'backdrops'
                  ? itemsPerRowBackdrop(breakpoint)
                  : itemsPerRowPoster(breakpoint)
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
        length: number_seasons,
        sections: [
          {
            emptyMessage: `No se han encontrado temporadas para ${title}`,
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
            gap: '20px 25px',
            itemsPerRow: itemsPerRowCredit(breakpoint)
          }),
          heading: labelCredits[key],
          Element: MediaItemCredit,
          items: detail[key],
          props: (item) => ({ ...item })
        }))
      }
    }[section] || {}
  );
};
