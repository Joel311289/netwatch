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

export const sectionProps = {
  videos: {
    label: 'Vídeos',
    sections: (detail) => [
      {
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
    sections: (data) =>
      Object.keys(data)
        .filter((key) => labelImages[key])
        .map((key) => ({
          gridProps: (breakpoint) => ({
            gap: '20px 10px',
            itemsPerRow:
              key === 'backdrops' ? itemsPerRowBackdrop(breakpoint) : itemsPerRowPoster(breakpoint)
          }),
          heading: labelImages[key],
          Element: MediaItemImage,
          items: data[key],
          props: (item) => ({
            ...item,
            ratio: Math.max(...data[key].map(({ ratio }) => ratio)),
            zoom: true
          })
        }))
  },
  seasons: {
    label: 'Temporadas',
    sections: (detail) => [
      {
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
    sections: (data) =>
      Object.keys(data).map((key) => ({
        gridProps: (breakpoint) => ({
          gap: '20px 10px',
          itemsPerRow: itemsPerRowCredit(breakpoint)
        }),
        heading: labelCredits[key],
        Element: MediaItemCredit,
        items: data[key],
        props: (item) => ({ ...item })
      }))
  }
};
