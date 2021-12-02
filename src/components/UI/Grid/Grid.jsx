import React, { useEffect, useRef, useState } from 'react';
import { useResize } from '../../../hooks/useResize';
import styles from './Grid.module.css';

const MediaGrid = ({ children, itemsPerRow = 1, gap }) => {
  const [itemSize, setItemSize] = useState(0);
  const gridRef = useRef(null);
  const [gridWidth] = useResize(gridRef);
  
  useEffect(() => {
    const totalSpaces = gap * (itemsPerRow - 1);
    const size = Math.floor((gridWidth - totalSpaces) / itemsPerRow);
    setItemSize(size);
  }, [gridRef, gridWidth])

  return (
    <div className={styles.wrapper} style={{ gap }} ref={gridRef}>
      {children && itemSize && children.map((element, index) => (
        <div className={styles.item} key={index}>
          {React.cloneElement(element, {...element.props, size: itemSize})}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
