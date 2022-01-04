import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@components/UI/Chip/Chip';
import Separator from '@components/UI/Separator/Separator';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants';

const MediaDetailHeader = ({ styles, title, date, duration, number_seasons, genres }) => {
  const subheadings = [
    date,
    duration,
    ...(number_seasons ? [`${number_seasons} temporada(s)`] : [])
  ];

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h2 className={styles.heading}>{title}</h2>
        <Separator items={subheadings} />
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
