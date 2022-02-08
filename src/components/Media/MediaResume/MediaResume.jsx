import { Link as LinkRouter } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { CgCross } from 'react-icons/cg';

import Space from '@components/Layout/Space/Space';
import Link from '@components/UI/Link/Link';
import Separator from '@components/UI/Separator/Separator';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { MediaPropTypes } from '@utils/constants/proptypes';
import { backgroundImageUrl } from '@utils/helpers/strings';

import styles from '@components/Media/MediaResume/MediaResume.module.css';

const MediaResume = ({
  image,
  backdrop,
  title,
  date,
  date_death,
  age,
  duration,
  to,
  route,
  linkName
}) => {
  const subheadings = [
    ...(date ? (date_death ? [`${date} - ${date_death}`] : [date]) : []),
    ...(date && duration ? [duration] : []),
    ...(date && age ? [`${age} años`] : [])
  ];

  return (
    <div className={`media-resume-wrapper ${styles.wrapper}`}>
      <div
        className={styles.backdrop}
        style={{ backgroundImage: backgroundImageUrl(backdrop) }}></div>

      <Space nowrap gap={25} className={styles.content}>
        {image && (
          <div className={styles.image} style={{ width: 100, minWidth: 100 }}>
            <MediaItemImage image={image} ratio={1.5} />
          </div>
        )}

        <Space direction="column" gap={5}>
          <Space>
            <LinkRouter to={route}>
              <span className={styles.title}>{title}</span>
            </LinkRouter>
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

      {backdrop && <div className={styles['gradient-bottom']}></div>}
    </div>
  );
};

MediaResume.propTypes = MediaPropTypes;

export default MediaResume;
