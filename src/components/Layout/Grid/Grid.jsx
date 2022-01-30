import React from 'react';
import PropTypes from 'prop-types';

import styles from '@components/Layout/Grid/Grid.module.css';

const Grid = ({ children, itemsPerRow, gap }) => {
  return (
    <div
      className={`grid-wrapper ${styles.wrapper} ${itemsPerRow && styles.gridable}`}
      style={itemsPerRow && { gridGap: gap, gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }}
    >
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
  children: PropTypes.array,
  gap: PropTypes.string,
  itemsPerRow: PropTypes.number
};

export default Grid;
