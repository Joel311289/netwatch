import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Space from '@components/Layout/Space/Space';
import Slider from '@components/Layout/Slider/Slider';

import { MediaPropTypes } from '@utils/constants/proptypes';
import { truncateArray } from '@utils/helpers/arrays';
import { isMobileTablet } from '@utils/helpers/breakpoints';

import mobileStyles from '@components/Media/MediaCredits/MediaCredits-mobile.module.css';
import desktopStyles from '@components/Media/MediaCredits/MediaCredits.module.css';

const MediaCredits = ({ to, credits }) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });
  const { breakpoint } = useBreakpointViewport();
  const { cast } = credits || {};

  // eslint-disable-next-line react/prop-types
  const Cast = ({ id, characters, image, name }) => (
    <Link key={id} to={`${to}/${id}`} className={styles.item}>
      <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>
      <Space direction="column" gap={3}>
        <span className={`${styles.name}`}>{name}</span>
        <span className={`${styles.characters}`}>{(characters || []).join('/')}</span>
      </Space>
    </Link>
  );

  return (
    <div className={`media-credits-wrapper ${styles.wrapper}`}>
      <Space align="center" className={styles.credits}>
        {isMobileTablet(breakpoint) && (
          <Slider>{truncateArray(cast, 10).map((credit) => Cast(credit))}</Slider>
        )}
        {!isMobileTablet(breakpoint) && truncateArray(cast, 10).map((credit) => Cast(credit))}
      </Space>
    </div>
  );
};

MediaCredits.propTypes = {
  to: PropTypes.string.isRequired,
  ...MediaPropTypes
};

export default MediaCredits;
