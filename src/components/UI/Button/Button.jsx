import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ElementDefaultProps, ElementPropTypes } from '../../../utils/constants';
import styles from './Button.module.css';

const Button = ({
  children,
  className,
  size,
  secondary,
  rounded,
  clear,
  disabled,
  tooltip,
  onClick
}) => {
  const classes = classNames.bind(styles)({
    [size]: size || undefined,
    clear: clear,
    rounded: rounded,
    secondary: secondary,
    [className]: Boolean(className)
  });

  return (
    <button
      className={`${styles.wrapper} ${classes}`}
      onClick={onClick}
      disabled={Boolean(disabled)}
    >
      {tooltip && (
        <Tooltip
          title={tooltip}
          className="test"
          classes={{ tooltip: styles.tooltip }}
          PopperProps={{
            disablePortal: true
          }}
          arrow
        >
          <div className={styles.content}>{children}</div>
        </Tooltip>
      )}

      {!tooltip && <div className={styles.content}>{children}</div>}
    </button>
  );
};

Button.defaultProps = {
  ...ElementDefaultProps,
  size: '',
  secondary: false,
  clear: false,
  rounded: false
};
Button.propTypes = {
  ...ElementPropTypes,
  tooltip: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', '']).isRequired,
  secondary: PropTypes.bool,
  clear: PropTypes.bool,
  rounded: PropTypes.bool
};

export default Button;
