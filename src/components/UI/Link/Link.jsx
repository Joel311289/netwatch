import { Link as LinkRouter } from 'react-router-dom';
import { ElementDefaultProps, ElementPropTypes } from '../../../utils/constants';
import styles from './Link.module.css';

const Link = ({ children, to }) => {
  return (
    <LinkRouter to={to} className={styles.wrapper}>
      <div className={styles.text}>{children}</div>
    </LinkRouter>
  );
};

Link.defaultProps = ElementDefaultProps;
Link.propTypes = ElementPropTypes;

export default Link;
