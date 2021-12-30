import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Skeleton from '../../UI/Skeleton/Skeleton';
import { showSkeleton } from '../../../utils/helpers';
import { ElementDefaultProps, ElementPropTypes } from '../../../utils/constants';
import styles from './MediaHeading.module.css';

const MediaHeading = ({ skeleton, text, to }) => {
  const Content = () => (
    <div className={styles.wrapper}>
      <span className={styles.text}>{text}</span>
      {to && <FiChevronRight className={styles.icon} />}
    </div>
  );

  if (showSkeleton(skeleton)) {
    return <Skeleton variant="heading" width={200} />;
  }

  return (
    <>
      {!to && Content()}

      {to && <Link to={to}>{Content()}</Link>}
    </>
  );
};

MediaHeading.defaultProps = ElementDefaultProps;
MediaHeading.propTypes = ElementPropTypes;

export default MediaHeading;
