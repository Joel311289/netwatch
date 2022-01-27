import { CgCross } from 'react-icons/cg';
import PropTypes from 'prop-types';

import Separator from '@components/UI/Separator/Separator';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';

const MediaDetailHeader = ({
  styles,
  title,
  date,
  duration,
  date_death,
  age,
  children
}) => {
  const subheadings = [
    ...(date_death ? [`${date} - ${date_death}`] : [date]),
    ...(duration ? [duration] : []),
    ...(age ? [`${age} años`] : [])
  ];

  return (
    <Space direction="column" gap={[5, 10]} className={`media-detail-header ${styles.header}`}>
      <Space direction="column" className={styles.headings}>
        {children || <h2 className={styles.heading}>{title}</h2>}
        <Space gap={2} align="center" className={styles.subheadings}>
          <Separator items={subheadings} />
          {date_death && <CgCross className={styles.death} />}
        </Space>
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
