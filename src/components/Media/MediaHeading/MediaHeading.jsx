import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiChevronRight } from 'react-icons/fi';
import styles from './MediaHeading.module.css';

const MediaHeading = ({ text, to }) => {
  const Content = () => (
    <div className={styles.wrapper}>
      <span className={styles.text}>{text}</span>
      {to && <FiChevronRight className={styles.icon} />}
    </div>
  );

  return (
    <>
      {!to && Content()}

      {to && <Link to={to}>{Content()}</Link>}
    </>
  );
};

MediaHeading.defaultProps = {
  text: '',
  to: '',
};

MediaHeading.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MediaHeading;
