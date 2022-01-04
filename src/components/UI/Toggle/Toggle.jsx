import { useState } from 'react';

import Space from '@components/Layout/Space/Space';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants';

import styles from '@components/UI/Toggle/Toggle.module.css';

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
    <Space align="center" className={styles.wrapper}>
      <input type="checkbox" id="switch" checked={Boolean(state)} onChange={handleOnChange}></input>
      <label htmlFor="switch"></label>
    </Space>
  );
};

Toggle.defaultProps = ElementDefaultProps;
Toggle.propTypes = ElementPropTypes;

export default Toggle;
