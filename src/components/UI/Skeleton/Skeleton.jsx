import { useMemo } from 'react';
import { Skeleton as SkeletonMUI } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './Skeleton.module.css';

const Skeleton = ({ width, height, variant }) => {
  const getHeight = useMemo(() => {
    switch (variant) {
      case 'heading':
        return 35;
      case 'action':
        return 25;
      case 'text':
        return 20;
      default:
        return height;
    }
  }, [variant]);

  return (
    <SkeletonMUI
      className={`${styles.skeleton} ${styles[variant]}`}
      animation="wave"
      width={width}
      height={getHeight}
    />
  );
};

Skeleton.defaultProps = {
  width: 'auto',
  height: 'auto',
  variant: ''
};

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  variant: PropTypes.oneOf(['heading', 'text', 'action', 'default', ''])
};

export default Skeleton;
