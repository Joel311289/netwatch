import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSun, BiMoon } from 'react-icons/bi';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Input from '@components/UI/Input/Input';
import Toggle from '@components/UI/Toggle/Toggle';
import Space from '@components/Layout/Space/Space';

import { THEMES } from '@utils/constants';
import { string } from '@utils/helpers/strings';

import styles from '@components/Layout/Header/Header.module.css';

const Header = ({ title, logoUrl, theme, onChangeTheme }) => {
  const { tablet } = useBreakpointViewport();
  const [searchOpened, setSearchOpened] = useState(!tablet);

  const onSearchOpened = () => setSearchOpened((prev) => !prev);

  const ToggleTheme = () => {
    return (
      <Toggle
        labels={[theme]}
        checked={theme === THEMES.DARK}
        onChange={() => onChangeTheme(theme)}>
        <div className="content-no-checked">
          <BiSun className={styles['sun-icon']} />
        </div>
        <div className="content-checked">
          <BiMoon className={styles['moon-icon']} />
        </div>
      </Toggle>
    );
  };

  const InputSearch = (icon, className) => {
    return (
      <div className={`${styles['input-search']} ${string(className)}`}>
        <Input
          name="search"
          placeholder="Busca una película, serie..."
          clear
          icon={icon}
          {...{ focused: tablet && searchOpened }}
          onClickIcon={onSearchOpened}
        />
      </div>
    );
  };

  const ButtonSearch = () => {
    return (
      <button className={styles['button-search']} onClick={onSearchOpened}>
        <FiSearch />
      </button>
    );
  };

  return (
    <Space justify="between" align="center" className={styles.wrapper}>
      <Link to="/" className={styles.brand}>
        <img
          className={styles.logo}
          src={logoUrl || `/assets/images/logo-${theme}.png`}
          alt="logo"
        />
        <p className={styles.title}>{title}</p>
      </Link>

      <Space
        direction={tablet ? 'row-reverse' : 'row'}
        align="center"
        justify="end"
        gap={tablet ? 5 : 30}
        className={styles.actions}>
        {!tablet && InputSearch(<FiSearch />)}

        {tablet && ButtonSearch()}

        <Space align="center" gap={10} className={styles['theme-action']}>
          {ToggleTheme()}
        </Space>
      </Space>

      {tablet && searchOpened && InputSearch(<FiArrowLeft />, styles.full)}
    </Space>
  );
};

Header.defaultProps = {
  title: 'Title',
  theme: THEMES.LIGHT
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark', false]).isRequired,
  onChangeTheme: PropTypes.func
};

export default Header;
