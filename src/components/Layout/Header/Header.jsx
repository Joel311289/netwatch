import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiSun, BiMoon } from 'react-icons/bi';
import { THEMES } from '../../../utils/constants';
import styles from './Header.module.css';

const Header = ({ title, logoUrl, theme, onChangeTheme }) => {
  const ToggleTheme = () => {
    return (
      <label>
        <input
          className={styles['toggle-checkbox']}
          type="checkbox"
          checked={theme === THEMES.DARK}
          onChange={onChangeTheme}
        ></input>
        <div className={styles['toggle-slot']}>
          <div className={styles['sun-icon-wrapper']}>
            <BiSun className={styles['sun-icon']} />
          </div>
          <div className={styles['toggle-button']}></div>
          <div className={styles['moon-icon-wrapper']}>
            <BiMoon className={styles['moon-icon']} />
          </div>
        </div>
      </label>
    );
  };

  return (
    theme && (
      <div className={styles.wrapper}>
        <Link to="/" className={styles.brand}>
          <img
            className={styles.logo}
            src={logoUrl || `/assets/images/logo-${theme}.png`}
            alt="logo"
          ></img>
          <p className={styles.title}>{title}</p>
        </Link>

        <div className={styles.actions}>
          <div className={styles['theme-action']}>
            <span>{theme.toUpperCase()}</span>
            {ToggleTheme(onChangeTheme)}
          </div>
        </div>
      </div>
    )
  );
};

Header.defaultProps = {
  title: 'Title'
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark', false]).isRequired,
  onChangeTheme: PropTypes.func
};

export default Header;
