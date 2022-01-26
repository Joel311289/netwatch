import PropTypes from 'prop-types';

import Separator from '@components/UI/Separator/Separator';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';

const MediaDetailHeader = ({ styles, title, date, duration, age, number_seasons, children }) => {
  const subheadings = [
    date,
    ...(duration ? [duration] : []),
    ...(age ? [`${age} años`] : []),
    ...(number_seasons ? [`${number_seasons} temporada(s)`] : [])
  ];

  return (
    <Space direction="column" gap={[5, 10]} className={`media-detail-header ${styles.header}`}>
      <Space direction="column" className={styles.headings}>
        {children || <h2 className={styles.heading}>{title}</h2>}
        <div className={styles.subheadings}>
          <Separator items={subheadings} />
        </div>
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
