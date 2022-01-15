import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSun, BiMoon } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Toggle from '@components/UI/Toggle/Toggle';
import Space from '@components/Layout/Space/Space';
import Input from '@components/UI/Input/Input';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { THEMES } from '@utils/constants';

import styles from '@components/Layout/Header/Header.module.css';

const Header = ({ title, logoUrl, theme, onChangeTheme }) => {
  const { tablet } = useBreakpointViewport();
  const [openedSearch, setOpenedSearch] = useState(false);

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

  const Search = () => {
    return (
      <>
        {!tablet && (
          <div className={styles['input-search']} onClick={() => setOpenedSearch(true)}>
            <Input name="search" placeholder="Buscar..." clear icon={<FiSearch />} />
          </div>
        )}
        {tablet && (
          <div className={styles['button-search']}>
            <FiSearch />
          </div>
        )}
      </>
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
        {Search()}

        <Space align="center" gap={10} className={styles['theme-action']}>
          {ToggleTheme()}
        </Space>
      </Space>

      <MediaModal
        opened={openedSearch}
        size="auto"
        mode="search"
        onClose={() => setOpenedSearch(false)}
      />
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
