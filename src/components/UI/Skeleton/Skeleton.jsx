import { useMemo } from 'react';
import { Skeleton as SkeletonMUI } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './Skeleton.module.css';

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
      default:
        return height;
    }
  }, [variant]);

  return (
    <div style={style} className={`${styles.wrapper} ${styles[variant] || ''}`}>
      <SkeletonMUI className={styles.skeleton} animation="wave" width={width} height={getHeight} />
    </div>
  );
};

Skeleton.defaultProps = {
  width: 'auto',
  height: 'auto',
  variant: ''
};

Skeleton.propTypes = {
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  variant: PropTypes.oneOf(['heading', 'text', 'action', 'chip', 'default', ''])
};

export default Skeleton;
