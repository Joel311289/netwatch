import { Link as LinkRouter } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { CgCross } from 'react-icons/cg';

import { useVibrantColor } from '@hooks/useVibrantColor';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Space from '@components/Layout/Space/Space';
import Skeleton from '@components/UI/Skeleton/Skeleton';
import Link from '@components/UI/Link/Link';
import Separator from '@components/UI/Separator/Separator';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { MediaPropTypes } from '@utils/constants/proptypes';
import { backgroundImageUrl } from '@utils/helpers/strings';

import styles from '@components/Media/MediaResume/MediaResume.module.css';

const MediaResume = ({
  skeleton,
  image,
  backdrop,
  title,
  date,
  date_death,
  age,
  duration,
  to,
  route,
  linkName,
  season
}) => {
  const { tablet } = useBreakpointViewport();
  const ratio = 1.5;
  const { hex: vibrantColor } = useVibrantColor(image);
  const subheadings = [
    ...(date ? (date_death ? [`${date} - ${date_death}`] : [date]) : []),
    ...(date && duration ? [duration] : []),
    ...(date && age ? [`${age} años`] : [])
  ];

  if (skeleton) {
    return <Skeleton width="100%" height={235} />;
  }

  return (
    <div className={`media-resume-wrapper ${styles.wrapper}`}>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: backgroundImageUrl(backdrop),
          backgroundColor: vibrantColor
        }}
      ></div>

      <Space nowrap gap={25} className={styles.content}>
        {image && (
          <div className={styles.image} style={{ width: 160 / ratio, minWidth: 160 / ratio }}>
            <MediaItemImage image={image} ratio={ratio} />
          </div>
        )}

        <Space direction="column" gap={5}>
          <Space gap={10}>
            {season && (
              <>
                <span className={styles.title}>{season}</span>
                {!tablet && <span className={styles.title}>•</span>}
              </>
            )}
            {title && (
              <LinkRouter to={route} className={styles.link}>
                <span className={styles.title}>{title}</span>
              </LinkRouter>
            )}
          </Space>

          <Space gap={2} align="center" className={styles.subheadings}>
            <Separator items={subheadings} />
            {date_death && <CgCross className={styles.death} />}
          </Space>

          {linkName && (
            <Link to={to} className={styles.back}>
              <FiArrowLeft />
              {linkName}
            </Link>
          )}
        </Space>
      </Space>

      <div className={styles['gradient-bottom']}></div>
    </div>
  );
};

MediaResume.propTypes = MediaPropTypes;

export default MediaResume;
