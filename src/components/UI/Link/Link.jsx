import { Link as LinkRouter } from 'react-router-dom';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';
import { string } from '@utils/helpers/strings';

import styles from '@components/UI/Link/Link.module.css';

const Link = ({ children, to, className }) => {
  return (
    <LinkRouter to={to} className={`link-wrapper ${styles.wrapper} ${string(className)}`}>
      {children}
    </LinkRouter>
  );
};

Link.defaultProps = ElementDefaultProps;
Link.propTypes = ElementPropTypes;

export default Link;
