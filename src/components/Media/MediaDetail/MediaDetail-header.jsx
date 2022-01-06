import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@components/UI/Chip/Chip';
import Separator from '@components/UI/Separator/Separator';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';

const MediaDetailHeader = ({ styles, title, date, duration, number_seasons, genres, children }) => {
  const subheadings = [
    date,
    duration,
    ...(number_seasons ? [`${number_seasons} temporada(s)`] : [])
  ];

  return (
    <Space align="center" gap={[0, 10]} className={`media-detail-header ${styles.header}`}>
      {children || <h2 className={styles.heading}>{title}</h2>}
      <div className={styles.subheadings}>
        <Separator items={subheadings} />
      </div>

      <Space align="center" gap={5} className={styles.genres}>
        {(genres || []).map((genre) => (
          <Chip key={genre} text={genre} />
        ))}
      </Space>
    </Space>
  );
};

MediaDetailHeader.defaultProps = MediaDefaultProps;
MediaDetailHeader.propTypes = {
  styles: PropTypes.object,
  children: PropTypes.node,
  ...MediaPropTypes
};

export default MediaDetailHeader;
