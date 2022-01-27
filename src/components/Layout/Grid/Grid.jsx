import React from 'react';
import PropTypes from 'prop-types';

import styles from '@components/Layout/Grid/Grid.module.css';

const Grid = ({ children }) => {
  return (
    <div className={`grid-wrapper ${styles.wrapper}`}>
      {children.map((element, index) => (
        <div key={index} className={styles.item}>
          {React.cloneElement(element, { ...element.props })}
        </div>
      ))}
    </div>
  );
};

Grid.defaultProps = {
  children: []
};
Grid.propTypes = {
  children: PropTypes.array
};

export default Grid;
