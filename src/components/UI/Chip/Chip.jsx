import PropTypes from 'prop-types';

import { string } from '@utils/helpers/strings';

import styles from '@components/UI/Chip/Chip.module.css';

const Chip = ({ text, className }) => {
  return <div className={`${styles.wrapper} ${string(className)}`}>{text}</div>;
};

Chip.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default Chip;
