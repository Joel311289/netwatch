import React from 'react';
import PropTypes from 'prop-types';

import styles from '@components/UI/Separator/Separator.module.css';

const Separator = ({ items, separator }) => {
  return (
    <div className={styles.wrapper}>
      {items.map((label, index) => (
        <React.Fragment key={index}>
          <span>{label}</span>
          <span className={styles.separator}>{separator}</span>
        </React.Fragment>
      ))}
    </div>
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
