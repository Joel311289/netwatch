import styles from './Button.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const Button = ({ children, size, secondary, rounded, clear, disabled, onClick }) => {
  const classes = classNames.bind(styles)({
    [size]: size || undefined,
    clear: clear,
    rounded: rounded,
    secondary: secondary
  });

  return (
    <button
      className={`${styles.wrapper} ${classes}`}
      onClick={onClick}
      disabled={Boolean(disabled)}
    >
      {children}
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
  size: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  clear: PropTypes.bool,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
