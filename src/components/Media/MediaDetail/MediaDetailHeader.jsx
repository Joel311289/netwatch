import React from 'react';
import PropTypes from 'prop-types';
import Chip from '../../UI/Chip/Chip';
import { MediaDefaultProps, MediaPropTypes } from '../../../utils/constants';

const MediaDetailHeader = ({ styles, title, date, duration, number_seasons, genres }) => {
  const subheadings = [
    { label: date },
    { label: duration },
    ...(number_seasons ? [{ label: `${number_seasons} temporada(s)` }] : [])
  ];

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h2 className={styles.heading}>{title}</h2>
        <span className={styles.subheadings}>
          {subheadings.map(({ label }, index) => (
            <React.Fragment key={index}>
              {label}
              <span className={styles.separator}>•</span>
            </React.Fragment>
          ))}
        </span>
      </div>
      <div className={styles.genres}>
        {(genres || []).map((genre) => (
          <Chip key={genre} text={genre} />
        ))}
      </div>
    </div>
  );
};

MediaDetailHeader.defaultProps = MediaDefaultProps;
MediaDetailHeader.propTypes = {
  styles: PropTypes.object,
  ...MediaPropTypes
};

export default MediaDetailHeader;
