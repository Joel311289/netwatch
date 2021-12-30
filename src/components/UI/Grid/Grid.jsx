import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useBreakpointViewport } from '../../../hooks/useBreakpointViewport';
import { useResize } from '../../../hooks/useResize';
import { getBreakpointConfig } from '../../../utils/helpers';
import styles from './Grid.module.css';

const Grid = ({ children }) => {
  const breakpoint = useBreakpointViewport();
  const { spaceBetween: gap, itemsPerRow } = getBreakpointConfig(breakpoint);
  const [itemWidth, setItemWidth] = useState(null);
  const gridRef = useRef(null);
  const { width: gridWidth } = useResize(gridRef);

  useEffect(() => {
    if (gridWidth) {
      const totalSpaces = gap * (itemsPerRow - 1);
      setItemWidth((gridWidth - totalSpaces) / itemsPerRow);
    }
  }, [gridWidth, breakpoint]);

  return (
    <div className={styles.wrapper} style={{ gap }} ref={gridRef}>
      {Array.isArray(children) &&
        Boolean(itemWidth) &&
        children.map((element, index) => (
          <div className={styles.item} key={index}>
            {React.cloneElement(element, { ...element.props, width: itemWidth })}
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
