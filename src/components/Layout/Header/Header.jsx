import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import styles from './Header.module.css';
import { getThemeMode } from '../../../utils/helpers';

const Header = ({ title, logoUrl, theme, onChangeTheme }) => {
  return (
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
        <Button clear size="small" className={styles.theme} onClick={onChangeTheme}>
          <img src={`/assets/icons/icon-${getThemeMode(theme.toUpperCase())}.svg`}></img>
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
  theme: PropTypes.string.isRequired,
  onChangeTheme: PropTypes.func
};

export default Header;
