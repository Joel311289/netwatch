import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
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
      disabled={Boolean(disabled)}>
      {tooltip && (
        <Tooltip
          title={tooltip}
          className="test"
          classes={{ tooltip: styles.tooltip }}
          PopperProps={{
            disablePortal: true
          }}
          arrow>
          <div className={styles.content}>{children}</div>
        </Tooltip>
      )}

      {!tooltip && <div className={styles.content}>{children}</div>}
    </button>
  );
};

Button.defaultProps = {
  size: '',
  secondary: false,
  clear: false,
  rounded: false,
  disabled: false
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  className: PropTypes.string,
  tooltip: PropTypes.string,
  size: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  clear: PropTypes.bool,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
