import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Space from '@components/Layout/Space/Space';

import { string } from '@utils/helpers/strings';

import styles from '@components/UI/Input/Input.module.css';

const Input = ({
  name,
  value,
  placeholder,
  icon,
  clear,
  focused,
  disabled,
  onChange,
  onClickIcon
}) => {
  const [inputValue, setInputValue] = useState(string(value));
  const [inputFocused, setInputFocused] = useState(Boolean(focused));
  const inputRef = useRef(null);

  const classes = classNames.bind(styles)({
    'has-value': inputValue,
    'has-focus': inputFocused,
    disabled: disabled
  });

  useEffect(() => {
    if (inputFocused) {
      inputRef.current.focus();
    }
  }, [inputFocused, inputValue, inputRef]);

  const handleFocus = (value) => setInputFocused(value);

  const handleChange = (e) => {
    const val = e.target.value;
    handleFocus(true);
    setInputValue(val);
    onChange && onChange(val);
  };
  const handleReset = () => {
    handleFocus(true);
    setInputValue('');
    onChange && onChange('');
  };

  return (
    <Space nowrap className={`input-wrapper ${styles.wrapper} ${classes}`}>
      {icon && (
        <div
          className={styles.icon}
          onClick={onClickIcon}
          style={onClickIcon && { cursor: 'pointer' }}>
          {icon}
        </div>
      )}
      {clear && (
        <button className={styles.clear} onClick={handleReset}>
          CLEAR
        </button>
      )}
      <input
        ref={inputRef}
        className={styles.input}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
        value={inputValue}
        disabled={disabled}
        onMouseEnter={() => handleFocus(true)}
        onMouseLeave={() => handleFocus(false)}
      />
    </Space>
  );
};

Input.propTypes = {
  ref: PropTypes.object,
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
