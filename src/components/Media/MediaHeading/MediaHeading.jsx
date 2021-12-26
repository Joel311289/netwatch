import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiChevronRight } from 'react-icons/fi';
import Skeleton from '../../UI/Skeleton/Skeleton';
import { showSkeleton } from '../../../utils/helpers';
import styles from './MediaHeading.module.css';

const MediaHeading = ({ skeleton, text, to }) => {
  const Content = () => (
    <div className={styles.wrapper}>
      <span className={styles.text}>{text}</span>
      {to && <FiChevronRight className={styles.icon} />}
    </div>
  );

  if (showSkeleton(skeleton)) {
    return <Skeleton variant="heading" width={200} />
  }

  return (
    <>
      {!to && Content()}

      {to && <Link to={to}>{Content()}</Link>}
    </>
  );
};

MediaHeading.defaultProps = {
  skeleton: false,
  text: '',
  to: '',
};

MediaHeading.propTypes = {
  skeleton: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MediaHeading;
