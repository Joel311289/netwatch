import { useContext, useEffect, useMemo, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FiChevronDown } from 'react-icons/fi';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import Button from '@components/UI/Button/Button';

import { string } from '../../../utils/helpers/strings';

import styles from '@components/UI/Select/Select.module.css';
import { ThemeContext } from '@contexts/ThemeContext';

const Select = ({
  items,
  identifierSelected,
  identifierKey,
  displayKey,
  hideArrow,
  className,
  onChange
}) => {
  const { theme } = useContext(ThemeContext);
  const isUniqueItem = items && items.length === 1;
  const [selected, setSelected] = useState(identifierSelected);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const itemSelected = useMemo(
    () =>
      items
        ? items.find(({ [identifierKey]: identifier }) => String(identifier) === String(selected))
        : {},
    [identifierKey, items, selected]
  );

  const handleClick = (event) => {
    if (!isUniqueItem) setAnchorEl(event.currentTarget);
  };
  const handleClickItem = (identifier) => {
    setSelected(identifier);
    setAnchorEl(null);

    onChange &&
      onChange(items.find(({ [identifierKey]: id }) => String(id) === String(identifier)));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (identifierKey && items) {
      setSelected(isUniqueItem ? items[0][identifierKey] : identifierSelected);
    }
  }, [identifierKey, identifierSelected, isUniqueItem, items]);

  return (
    <>
      <Button
        size="small"
        secondary
        rounded
        className={`select-wrapper ${string(className)} ${styles.button}`}
        id="selector-button"
        aria-controls={open ? 'selector-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Space align="center" gap={5}>
          <span className={styles.label}>{itemSelected && itemSelected[displayKey]}</span>
          {!isUniqueItem && !hideArrow && <FiChevronDown className={styles.arrow} />}
        </Space>
      </Button>

      <Menu
        id="selector-menu"
        aria-labelledby="selector-button"
        classes={{ paper: styles.paper, list: `${styles.menu} theme-${theme}` }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {items.map(({ [identifierKey]: identifier, [displayKey]: display }) => (
          <MenuItem
            key={identifier}
            onClick={() => handleClickItem(identifier)}
            className={`${styles.item} ${
              Number(identifier) === Number(selected) ? styles.selected : ''
            }`}
          >
            {display}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

Select.defaultProps = {
  items: [],
  identifierKey: 'id',
  displayKey: 'name',
  onChange: () => {}
};

Select.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  identifierKey: PropTypes.string,
  displayKey: PropTypes.string,
  identifierSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideArrow: PropTypes.bool,
  onChange: PropTypes.func
};

export default Select;
