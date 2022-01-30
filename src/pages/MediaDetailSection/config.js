import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';
import MediaItem from '@components/Media/MediaItem/MediaItem';

const itemsPerRowBackdrop = ({ mobile, tablet, smallDesktop }) => {
  if (mobile) return 2;
  if (tablet) return 3;
  if (smallDesktop) return 3;
  return 4;
};

const itemsPerRowPoster = ({ mobile, tablet, smallDesktop }) => {
  if (mobile) return 3;
  if (tablet) return 4;
  if (smallDesktop) return 5;
  return 6;
};

const labelImages = {
  backdrops: 'Imágenes de fondo',
  posters: 'Pósteres'
};

export const sectionProps = {
  videos: {
    label: 'Vídeos',
    sections: (detail) => [
      {
        gridProps: (props) => ({
          gap: '0 10px',
          itemsPerRow: itemsPerRowBackdrop(props)
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
      Object.keys(data).map((key) => ({
        gridProps: (props) => ({
          gap: '20px 10px',
          itemsPerRow: key === 'backdrops' ? itemsPerRowBackdrop(props) : itemsPerRowPoster(props)
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
    label: 'Temporadas'
  },
  credits: {
    label: 'Reparto'
  }
};
