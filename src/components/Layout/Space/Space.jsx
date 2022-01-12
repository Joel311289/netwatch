import PropTypes from 'prop-types';

import { string } from '@utils/helpers/strings';

import styles from '@components/Layout/Space/Space.module.css';

const positions = {
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  baseline: 'baseline'
};

const Space = ({ children, className, direction, gap, justify, align, nowrap }) => {
  return (
    <div
      className={`${styles.wrapper} ${string(className)}`}
      style={{
        ...(nowrap && { flexWrap: nowrap ? 'nowrap' : 'wrap' }),
        ...(direction && { flexDirection: direction }),
        ...(justify && { justifyContent: positions[justify] }),
        ...(align && { alignItems: positions[align] }),
        ...(gap && { gap: Array.isArray(gap) ? gap.map((s) => `${s}px`).join(' ') : gap })
      }}>
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
  nowrap: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
  justify: PropTypes.oneOf(['start', 'end', 'between', 'center']),
  align: PropTypes.oneOf(['start', 'end', 'baseline', 'center']),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
};

export default Space;
