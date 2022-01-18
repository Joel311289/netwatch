import { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Space from '@components/Layout/Space/Space';

import { string } from '@utils/helpers/strings';

import styles from '@components/UI/Input/Input.module.css';

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  (
    {
      name,
      value,
      placeholder,
      icon,
      clear,
      focused,
      disabled,
      onChange,
      onClickIcon,
      ...restProps
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(string(value));
    const [inputFocused, setInputFocused] = useState(Boolean(focused));

    const classes = classNames.bind(styles)({
      'has-value': inputValue,
      'has-focus': inputFocused,
      disabled: disabled
    });

    useEffect(() => {
      if (inputFocused && ref) {
        setTimeout(() => {
          ref.current && ref.current.focus();
        }, 100);
      }
    }, [inputFocused, inputValue, ref]);

    const handleFocus = (value) => setInputFocused(value);

    const handleChange = (e) => {
      const val = e.target.value;
      handleFocus(true);
      setInputValue(val);
      onChange && onChange(e);
    };
    const handleReset = (e) => {
      handleFocus(true);
      setInputValue('');
      onChange && onChange(e);
    };

    return (
      <Space nowrap className={`input-wrapper ${styles.wrapper} ${classes}`}>
        {icon && (
          <div
            className={styles.icon}
            onClick={onClickIcon}
            style={onClickIcon && { cursor: 'pointer' }}
          >
            {icon}
          </div>
        )}
        {clear && (
          <button className={styles.clear} onClick={handleReset}>
            CLEAR
          </button>
        )}
        <input
          ref={ref}
          className={styles.input}
          name={name}
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleChange}
          value={inputValue}
          disabled={disabled}
          onMouseEnter={() => handleFocus(true)}
          onMouseLeave={() => handleFocus(false)}
          {...restProps}
        />
      </Space>
    );
  }
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  clear: PropTypes.bool,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onClickIcon: PropTypes.func
};

export default Input;
