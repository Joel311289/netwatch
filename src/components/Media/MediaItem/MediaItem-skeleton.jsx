import styled from '@emotion/styled';

import Skeleton from '@components/UI/Skeleton/Skeleton';
import Space from '@components/Layout/Space/Space';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const Image = styled.div`
  background-color: transparent;

  &:before {
    padding-top: ${({ ratio }) => `${100 * ratio}%`};
  }
`;

const MediaItemSkeleton = ({ width, ratio, body }) => {
  return (
    <div style={{ width }}>
      <Image className={`${styles.image} ${styles.skeleton}`} ratio={ratio}>
        <div className={styles.content}>
          <Skeleton height="100%" />
        </div>
      </Image>

      {body && (
        <Space direction="column" justify="between" className={`${styles.info} ${styles.skeleton}`}>
          <div>
            <Skeleton width="70%" height={18} />
            <Skeleton width="70%" height={18} style={{ marginTop: 3 }} />
          </div>
        </Space>
      )}
    </div>
  );
};

MediaItemSkeleton.defaultProps = ElementDefaultProps;
MediaItemSkeleton.propTypes = ElementPropTypes;

export default MediaItemSkeleton;
