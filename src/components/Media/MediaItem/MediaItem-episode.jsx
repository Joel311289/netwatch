import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Space from '@components/Layout/Space/Space';
import Separator from '@components/UI/Separator/Separator';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItemEpisode = ({
  route,
  image,
  title,
  description,
  date,
  season_number,
  episode_number
}) => {
  const subheadings = [...(date ? [date] : [])];
  const { tablet } = useBreakpointViewport();

  return (
    <Link to={`${route}/seasons/${season_number}/episodes/${episode_number}`}>
      <Space
        direction={tablet ? 'column' : 'row'}
        align={tablet ? 'start' : 'center'}
        className={`${styles.season} ${styles.episode}`}
      >
        <div className={styles.image}>
          <MediaItemImage image={image} ratio={0.5} type="backdrop" />
        </div>

        <Space direction="column" gap={3}>
          <span className={`${styles.title}`}>
            {episode_number}. {title}
          </span>
          <div className={styles.date}>
            <Separator items={subheadings} />
          </div>
          {description && <span className={styles.description}>{description}</span>}
        </Space>
      </Space>
    </Link>
  );
};

MediaItemEpisode.propTypes = {
  route: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  season_number: PropTypes.number,
  episode_number: PropTypes.number
};

export default MediaItemEpisode;
