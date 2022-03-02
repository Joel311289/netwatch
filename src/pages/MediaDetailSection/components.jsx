/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Grid from '@components/Layout/Grid/Grid';
import SkeletonUI from '@components/UI/Skeleton/Skeleton';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaItemCredit from '@components/Media/MediaItem/MediaItem-credit';
import MediaItemSeason from '@components/Media/MediaItem/MediaItem-season';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { getEmptyArray } from '@utils/helpers/arrays';

import { itemsPerRowBackdrop, itemsPerRowCredit } from '@pages/MediaDetailSection/config';
import styles from '@pages/MediaDetailSection/MediaDetailSectionPage.module.css';

const Template = ({ children, heading }) => (
  <div className={`App-container App-content ${styles.body}`}>
    <h2 className="heading">{heading}</h2>

    <div className="sub-heading">
      <SkeletonUI height={28} width={200} />
    </div>

    {children}
  </div>
);

const Skeleton = ({ heading, gridProps, itemProps, size, Element }) => {
  return (
    <Template heading={heading}>
      <Grid {...gridProps}>
        {getEmptyArray(size).map((_, index) => (
          <Element key={index} skeleton {...(itemProps || {})} />
        ))}
      </Grid>
    </Template>
  );
};

export const skeleton = (breakpoint, section) => {
  return {
    videos: () => (
      <Skeleton
        heading="Vídeos"
        gridProps={{ gap: '10px 20px', itemsPerRow: itemsPerRowBackdrop(breakpoint) }}
        itemProps={{ ratio: 0.5 }}
        size={6}
        Element={MediaItem}
      />
    ),
    images: () => (
      <Skeleton
        heading="Imágenes"
        gridProps={{ gap: '20px', itemsPerRow: itemsPerRowBackdrop(breakpoint) }}
        itemProps={{ ratio: 0.5 }}
        size={8}
        Element={MediaItemImage}
      />
    ),
    seasons: () => (
      <Skeleton
        heading="Temporadas"
        gridProps={{ gap: '20px', itemsPerRow: 1 }}
        size={3}
        Element={MediaItemSeason}
      />
    ),
    credits: () => (
      <Skeleton
        heading="Reparto"
        gridProps={{ gap: '20px 25px', itemsPerRow: itemsPerRowCredit(breakpoint) }}
        size={15}
        Element={MediaItemCredit}
      />
    )
  }[section];
};
