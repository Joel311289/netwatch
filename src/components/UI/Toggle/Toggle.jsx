import { useState } from 'react';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/UI/Toggle/Toggle.module.css';
import { getElementArray } from '@utils/helpers/arrays';

const Toggle = ({ children, checked, labels, onChange }) => {
  const [state, setState] = useState(checked);
  const handleOnChange = (e) => {
    const value = e.target.checked;

    setState(value);
    if (onChange) {
      onChange(value);
    }
  };

  const getChildren = (checked) => {
    if (!children) {
      return '';
    }
    const childrenToggled = children.find((item) =>
      item.props.className.includes(checked ? 'content-checked' : 'content-no-checked')
    );
    return childrenToggled.props.children;
  };

  return (
    <Space align="center" gap={10} className={styles.wrapper}>
      {getElementArray(labels, 0) && <span className={styles['left-label']}>{labels[0]}</span>}
      <label>
        <input
          className={styles['toggle-checkbox']}
          type="checkbox"
          checked={state}
          onChange={handleOnChange}
        />
        <div className={styles['toggle-slot']}>
          <div className={styles['content-checked']}>{getChildren(true)}</div>
          <div className={styles['toggle-button']}></div>
          <div className={styles['content-no-checked']}>{getChildren(false)}</div>
        </div>
      </label>
      {getElementArray(labels, 1) && <span className={styles['right-label']}>{labels[1]}</span>}
    </Space>
  );
};

Toggle.defaultProps = ElementDefaultProps;
Toggle.propTypes = {
  ...ElementPropTypes,
  labels: PropTypes.arrayOf(PropTypes.string)
};

export default Toggle;
