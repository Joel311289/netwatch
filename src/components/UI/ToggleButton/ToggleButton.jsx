import { useState } from 'react';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import Button from '@components/UI/Button/Button';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from './ToggleButton.module.css';

const ToggleButton = ({ children, activeIndex, onChange }) => {
  const [selected, setSelected] = useState(activeIndex);

  const handleChange = (index) => {
    setSelected(index);
    onChange && onChange(index);
  };

  return (
    <Space align="center" className={styles.wrapper}>
      {children.map((element, index) => (
        <Button
          key={index}
          size="small"
          secondary={index !== selected}
          className={`${styles.button} ${index === selected ? styles.selected : ''}`}
          onClick={() => handleChange(index)}
        >
          {element}
        </Button>
      ))}
    </Space>
  );
};

ToggleButton.defaultProps = {
  ...ElementDefaultProps,
  activeIndex: 0
};
ToggleButton.propTypes = {
  ...ElementPropTypes,
  activeIndex: PropTypes.number
};

export default ToggleButton;
