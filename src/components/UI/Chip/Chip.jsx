import PropTypes from 'prop-types';
import styles from './Chip.module.css';

const Chip = ({ text }) => {
  return <div className={styles.wrapper}>{text}</div>;
};

Chip.propTypes = {
  text: PropTypes.string
};

export default Chip;
