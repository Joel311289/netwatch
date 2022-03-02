import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import Skeleton from '@components/UI/Skeleton/Skeleton';
import Separator from '@components/UI/Separator/Separator';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItemSeason = ({
  skeleton,
  route,
  image,
  title,
  description,
  date,
  season_number,
  episodes
}) => {
  const subheadings = [...(date ? [date] : []), ...(episodes ? [`${episodes} episodios`] : [])];

  if (skeleton) {
    return (
      <div className={styles.season}>
        <div className={`${styles.image} ${styles.skeleton}`}>
          <Skeleton height={165} width={110} />
        </div>

        <Space direction="column" gap={5} className="full">
          <Skeleton className={styles.title} height={20} width={100} />
          <Skeleton className={styles.date} height={16} width={200} />
          <Skeleton className={styles.description} height={16} width="50%" />
          <Skeleton className={styles.description} height={16} width="50%" />
        </Space>
      </div>
    );
  }

  return (
    <Link to={`${route}/seasons/${season_number}`} className={styles.season}>
      <div className={styles.image}>
        <MediaItemImage image={image} ratio={1.5} type="poster" />
      </div>

      <Space direction="column" gap={3}>
        <span className={`${styles.title}`}>{title}</span>
        <div className={styles.date}>
          <Separator items={subheadings} />
        </div>
        {description && <span className={styles.description}>{description}</span>}
      </Space>
    </Link>
  );
};

MediaItemSeason.propTypes = {
  skeleton: PropTypes.bool,
  route: PropTypes.string,
  id: PropTypes.number,
  season_number: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  episodes: PropTypes.number
};

export default MediaItemSeason;
