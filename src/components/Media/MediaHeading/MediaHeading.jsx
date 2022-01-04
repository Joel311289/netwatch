import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import Skeleton from '@components/UI/Skeleton/Skeleton';
import Space from '@components/Layout/Space/Space';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaHeading/MediaHeading.module.css';

const MediaHeading = ({ skeleton, text, to }) => {
  const Content = () => (
    <Space align="center" className={styles.wrapper}>
      <span className={styles.text}>{text}</span>
      {to && <FiChevronRight className={styles.icon} />}
    </Space>
  );

  if (skeleton) {
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
