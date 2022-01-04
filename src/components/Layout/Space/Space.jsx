import PropTypes from 'prop-types';

import styles from '@components/Layout/Space/Space.module.css';

const positions = {
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  baseline: 'baseline'
};

const Space = ({ children, className, direction, gap, justify, align }) => {
  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={{
        ...(direction && { flexDirection: direction }),
        ...(justify && { justifyContent: positions[justify] }),
        ...(align && { alignItems: positions[align] }),
        ...(gap && { gap: Array.isArray(gap) ? gap.map((s) => `${s}px`).join(' ') : gap })
      }}
    >
      {children}
    </div>
  );
};

Space.defaultProps = {
  children: PropTypes.node,
  className: '',
  direction: 'row'
};
Space.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
  justify: PropTypes.oneOf(['start', 'end', 'between', 'center']),
  align: PropTypes.oneOf(['start', 'end', 'baseline', 'center']),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
};

export default Space;
