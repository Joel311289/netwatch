import React, { useEffect, useRef, useState } from 'react';
import { useResize } from '../../../hooks/useResize';
import styles from './Grid.module.css';

const MediaGrid = ({ children, itemsPerRow = 1, gap }) => {
  const [itemSize, setItemSize] = useState(null);
  const gridRef = useRef(null);
  const { width: gridWidth } = useResize(gridRef);
  
  useEffect(() => {
    const totalSpaces = gap * (itemsPerRow - 1);
    const size = Math.floor((gridWidth - totalSpaces - 5) / itemsPerRow);
    setItemSize(size);
  }, [gridRef, gridWidth]);

  return (
    <div className={styles.wrapper} style={{ gap }} ref={gridRef}>
      {Array.isArray(children) && itemSize && children.map((element, index) => (
        <div className={styles.item} key={index}>
          {React.cloneElement(element, {...element.props, width: itemSize})}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
