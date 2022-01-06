import React from 'react';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';

import styles from '@components/UI/Separator/Separator.module.css';

const Separator = ({ items, separator }) => {
  return (
    <Space align="center" className={`separator-wrapper ${styles.wrapper}`}>
      {items.map((label, index) => (
        <React.Fragment key={index}>
          <span>{label}</span>
          <span className={styles.separator}>{separator}</span>
        </React.Fragment>
      ))}
    </Space>
  );
};

Separator.defaultProps = {
  items: [],
  separator: '•'
};
Separator.propTypes = {
  items: PropTypes.array,
  separator: PropTypes.string
};

export default Separator;
