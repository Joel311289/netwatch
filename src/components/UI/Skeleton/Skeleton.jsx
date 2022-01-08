import { useMemo } from 'react';
import { Skeleton as SkeletonMUI } from '@mui/material';
import PropTypes from 'prop-types';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/UI/Skeleton/Skeleton.module.css';

const Skeleton = ({ width, height, variant, style }) => {
  const getHeight = useMemo(() => {
    switch (variant) {
      case 'heading':
        return 35;
      case 'action':
        return 25;
      case 'text':
        return 20;
      case 'chip':
        return 27;
      case 'circular':
        return width;
      default:
        return height;
    }
  }, [variant]);

  return (
    <div
      style={{ ...style, width, height: getHeight }}
      className={`${styles.wrapper} ${styles[variant] || ''} fade-in-slow`}
    >
      <SkeletonMUI className={styles.skeleton} animation="wave" height={getHeight} />
    </div>
  );
};

Skeleton.defaultProps = ElementDefaultProps;
Skeleton.propTypes = {
  ...ElementPropTypes,
  variant: PropTypes.oneOf(['heading', 'text', 'action', 'chip', 'circular', 'default', ''])
};

export default Skeleton;
