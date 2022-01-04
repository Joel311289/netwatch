import { Link as LinkRouter } from 'react-router-dom';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';

import Link from '@components/UI/Link/Link';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { truncatedText } from '@utils/helpers';
import { ElementPropTypes, MediaPropTypes } from '@utils/constants';

import desktopStyles from '@components/Media/MediaModalDetail/MediaModalDetail.module.css';
import mobileStyles from '@components/Media/MediaModalDetail/MediaModalDetail-mobile.module.css';

const MediaModalDetail = ({ to, image, title, description, date, backdrop }) => {
  const styles = useBreakpointStyles(desktopStyles, mobileStyles);

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <MediaItem image={image} width={200} ratio={1.5} />
      </div>
      <div className={styles.background} style={{ backgroundImage: `url(${backdrop})` }}></div>

      <div className={styles.data}>
        <LinkRouter to={to}>
          <span className={styles.title}>{title}</span>
        </LinkRouter>
        <p className={styles.subtitle}>{date}</p>
        <p className={styles.description}>{truncatedText(description, 400)}</p>

        <div className={styles.more}>
          <Link to={to}>Ver más</Link>
        </div>
      </div>
    </div>
  );
};

MediaModalDetail.propTypes = {
  ...ElementPropTypes,
  ...MediaPropTypes
};

export default MediaModalDetail;
