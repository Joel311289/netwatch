import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';

import Space from '@components/Layout/Space/Space';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import Slider from '@components/Layout/Slider/Slider';

import { formattedDate } from '@utils/helpers/strings';

import mobileStyles from '@components/Media/MediaSeasons/MediaSeasons-mobile.module.css';
import desktopStyles from '@components/Media/MediaSeasons/MediaSeasons.module.css';

const MediaSeasons = ({ to, seasons }) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });

  // eslint-disable-next-line react/prop-types
  const Season = ({ id, name, date, episodes, image }) => (
    <Link key={id} to={`${to}/${id}`} className={styles.item}>
      <div className={styles.image}>
        <MediaItem.Image image={image} width={200} ratio={1.5} />
      </div>
      <Space direction="column" gap={10}>
        <span className={styles.title}>{name}</span>
        <span className={styles.description}>{formattedDate(date)}</span>
        <span className={styles.description}>{episodes} episodio(s)</span>
      </Space>
    </Link>
  );

  return (
    <div className={`media-seasons-wrapper ${styles.wrapper}`}>
      <Slider sliderPerRow="auto" slideClass={styles['slide-season']}>
        {seasons.map((season) => Season(season))}
      </Slider>
    </div>
  );
};

MediaSeasons.propTypes = {
  to: PropTypes.string.isRequired,
  seasons: PropTypes.array
};

export default MediaSeasons;
