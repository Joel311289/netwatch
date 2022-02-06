import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Tooltip from '@components/UI/Tooltip/Tooltip';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/UI/Button/Button.module.css';

const Button = ({
  children,
  className,
  size,
  secondary,
  rounded,
  clear,
  disabled,
  role,
  href,
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

  const handleClick = (e) => {
    if (role === 'link') {
      window.open(href, '_blank').focus();
    } else {
      onClick && onClick(e);
    }
  };

  const Content = () => (
    <button
      className={`${styles.wrapper} ${classes}`}
      onClick={handleClick}
      disabled={Boolean(disabled)}
    >
      {children}
    </button>
  );

  if (!tooltip) {
    return Content();
  }

  return <Tooltip text={tooltip}>{Content()}</Tooltip>;
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
  href: PropTypes.string,
  role: PropTypes.oneOf(['button', 'link', '']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', '']).isRequired,
  secondary: PropTypes.bool,
  clear: PropTypes.bool,
  rounded: PropTypes.bool
};

export default Button;
