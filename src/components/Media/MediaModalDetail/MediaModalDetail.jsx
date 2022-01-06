import { Link as LinkRouter } from 'react-router-dom';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';

import Link from '@components/UI/Link/Link';
import Space from '@components/Layout/Space/Space';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModalDetailSkeleton from '@components/Media/MediaModalDetail/MediaModalDetail-skeleton';

import { truncatedText } from '@utils/helpers/strings';
import { ElementPropTypes, MediaPropTypes } from '@utils/constants/proptypes';

import desktopStyles from '@components/Media/MediaModalDetail/MediaModalDetail.module.css';
import mobileStyles from '@components/Media/MediaModalDetail/MediaModalDetail-mobile.module.css';

const MediaModalDetail = ({
  to,
  image,
  title,
  description,
  date,
  backdrop,
  duration,
  genres,
  number_seasons,
  skeleton
}) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });

  if (skeleton) {
    return <MediaModalDetailSkeleton styles={styles} />;
  }

  return (
    <Space gap={25} className={styles.wrapper}>
      <div className={styles.image}>
        <MediaItem image={image} width={200} ratio={1.5} />
      </div>
      <div className={styles.background} style={{ backgroundImage: `url(${backdrop})` }}></div>

      <div className={styles.data}>
        <MediaDetail.Header
          styles={styles}
          date={date}
          duration={duration}
          number_seasons={number_seasons}
          genres={genres}>
          <LinkRouter to={to}>
            <span className={styles.title}>{title}</span>
          </LinkRouter>
        </MediaDetail.Header>

        <div className={styles.description}>{truncatedText(description, 400)}</div>

        <div className={styles.more}>
          <Link to={to}>Ver más</Link>
        </div>
      </div>
    </Space>
  );
};

MediaModalDetail.propTypes = {
  ...ElementPropTypes,
  ...MediaPropTypes
};

MediaDetail.Skeleton = MediaModalDetailSkeleton;

export default MediaModalDetail;
