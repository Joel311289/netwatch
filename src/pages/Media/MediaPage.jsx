import { useMediaPath } from '@hooks/useMediaPath';
import { useServiceMedia } from '@hooks/useServiceMedia';

import Button from '@components/UI/Button/Button';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaGrid from '@components/Media/MediaGrid/MediaGrid';

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

      <MediaGrid items={items} />

      {!loading && !paginationEnd && (
        <div className="block">
          <Button onClick={onLoadMore}>Mostrar más</Button>
        </div>
      )}
    </div>
  );
};

export default MediaPage;
