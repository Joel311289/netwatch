import Space from '@components/Layout/Space/Space';
import Skeleton from '@components/UI/Skeleton/Skeleton';

import { MediaPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaResume/MediaResume.module.css';

const MediaResumeSkeleton = () => {
  const ratio = 1.5;

  return (
    <div className={`media-resume-wrapper ${styles.wrapper}`}>
      <Space nowrap gap={25} className={styles.content}>
        <Skeleton className={styles.image} width={160 / ratio} height={160} />

        <Space direction="column" gap={5}>
          <Skeleton height={26} width={150} />

          <Space gap={2} align="center" className={styles.subheadings}>
            <Skeleton height={19} width={100} />
            <Skeleton height={19} width={100} />
          </Space>

          <Skeleton className={styles.back} height={23} width={202} />
        </Space>
      </Space>
    </div>
  );
};

MediaResumeSkeleton.propTypes = MediaPropTypes;

export default MediaResumeSkeleton;
