import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Toggle.module.css';

const Toggle = ({ checked, onChange }) => {
  const [state, setState] = useState(checked);
  const handleOnChange = (e) => {
    const value = e.target.checked;

    setState(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input type="checkbox" id="switch" checked={Boolean(state)} onChange={handleOnChange}></input>
      <label htmlFor="switch"></label>
    </div>
  );
};

Toggle.defaultProps = {
  checked: false
};

Toggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default Toggle;
