import { useMediaPath } from '@hooks/useMediaPath';
import { useServiceMedia } from '@hooks/useServiceMedia';

import Grid from '@components/Layout/Grid/Grid';
import Button from '@components/UI/Button/Button';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { routeMediaDetail } from '@services/helpers';

import { discoverProps } from '@pages/Media/config';
import styles from '@pages/MediaDetailSection/MediaDetailSectionPage.module.css';

const MediaPage = () => {
  const { mediaType } = useMediaPath('/:mediaType');
  const { data: items, loading, onLoadMore, paginationEnd } = useServiceMedia(mediaType);

  const { heading } = discoverProps(mediaType);

  return (
    <div className={`App-container App-content ${styles.wrapper}`}>
      <h2 className="heading">{heading}</h2>

      <div className="sub-heading">
        <MediaHeading text="Más populares" />
      </div>

      <Grid>
        {items.map((item, index) => (
          <MediaItem
            key={index}
            ratio={1.5}
            skeleton={!item}
            listable
            to={routeMediaDetail(item)}
            {...item}
          />
        ))}
      </Grid>

      {!loading && !paginationEnd && (
        <div className="block">
          <Button onClick={onLoadMore}>Mostrar más</Button>
        </div>
      )}
    </div>
  );
};

export default MediaPage;
