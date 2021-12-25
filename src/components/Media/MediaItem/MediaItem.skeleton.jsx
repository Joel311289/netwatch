import PropTypes from 'prop-types';
import { getHeightRatio } from '../../../utils/helpers';

const MediaItemSkeleton = ({ width, ratio }) => {
  return (
    <div style={{ width }}>
      <div className="skeleton" style={{ width, height: getHeightRatio(width, ratio) }}></div>
    </div>
  );
};

MediaItemSkeleton.defaultProps = {
  width: 'auto',
  ratio: 1,
};

MediaItemSkeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratio: PropTypes.number,
};

export default MediaItemSkeleton;
