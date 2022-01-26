import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import Button from '@components/UI/Button/Button';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';
import { isEmptyArray } from '@utils/helpers/arrays';

import styles from './ToggleButton.module.css';

const ToggleButton = ({ buttons, activeKey, onChange }) => {
  const [selected, setSelected] = useState(activeKey);

  useEffect(() => !isEmptyArray(buttons) && setSelected(buttons[0].key), [buttons]);

  const handleChange = (index) => {
    setSelected(index);
    onChange && onChange(index);
  };

  return (
    <Space align="center" className={styles.wrapper}>
      {buttons.map(({ key, label }) => (
        <Button
          key={key}
          size="small"
          secondary={key !== selected}
          className={`${styles.button} ${key === selected ? styles.selected : ''}`}
          onClick={() => handleChange(key)}
        >
          {label}
        </Button>
      ))}
    </Space>
  );
};

ToggleButton.defaultProps = {
  ...ElementDefaultProps,
  activeKey: '',
  buttons: []
};
ToggleButton.propTypes = {
  ...ElementPropTypes,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string
    })
  ),
  activeKey: PropTypes.string
};

export default ToggleButton;
