import { Link as LinkRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Link.module.css';

const Link = ({ children, to }) => {
  return (
    <LinkRouter to={to} className={styles.wrapper}>
      <div className={styles.text}>{children}</div>
    </LinkRouter>
  );
};

Link.defaultProps = {
  to: '',
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Link;
