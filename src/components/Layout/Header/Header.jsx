import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import { getThemeMode } from '../../../utils/helpers';
import styles from './Header.module.css';

const Header = ({ title, logoUrl, theme, onChangeTheme }) => {
  return theme && (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.brand}>
        <img
          className={styles.logo}
          src={logoUrl || `/assets/images/logo-${theme}.png`}
          alt="logo"></img>
        <p className={styles.title}>{title}</p>
      </Link>

      <div className={styles.actions}>
        <Button clear size="small" className={styles.theme} onClick={onChangeTheme}>
          <img src={`/assets/icons/icon-${getThemeMode(theme)}.svg`}></img>
          {theme.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: 'Title',
  theme: '',
  logoUrl: ''
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark', false]).isRequired,
  onChangeTheme: PropTypes.func
};

export default Header;
