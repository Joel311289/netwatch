import { Link } from 'react-router-dom';
import { BiSun, BiMoon } from 'react-icons/bi';
import PropTypes from 'prop-types';

import styles from '@components/Layout/Header/Header.module.css';
import Space from '@components/Layout/Space/Space';

import { THEMES } from '@utils/constants';
import Toggle from '@components/UI/Toggle/Toggle';

const Header = ({ title, logoUrl, theme, onChangeTheme }) => {
  const ToggleTheme = () => {
    return (
      <Toggle
        labels={[theme]}
        checked={theme === THEMES.DARK}
        onChange={() => onChangeTheme(theme)}
      >
        <div className="content-no-checked">
          <BiSun className={styles['sun-icon']} />
        </div>
        <div className="content-checked">
          <BiMoon className={styles['moon-icon']} />
        </div>
      </Toggle>
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

      <Space align="center" gap={10} className={styles.actions}>
        <Space align="center" gap={10} className={styles['theme-action']}>
          {ToggleTheme()}
        </Space>
      </Space>
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
