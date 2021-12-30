import { useState } from 'react';
import { ElementDefaultProps, ElementPropTypes } from '../../../utils/constants';
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

Toggle.defaultProps = ElementDefaultProps;
Toggle.propTypes = ElementPropTypes;

export default Toggle;
