import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import styles from './Header.module.css';
import { getThemeMode } from '../../../utils/helpers';

const Header = ({ title, logoUrl, actions, theme, onChangeTheme }) => {
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.brand}>
        <img className={styles.logo} src={logoUrl || `/assets/images/logo-${theme}.png`} alt="logo"></img>
        <p className={styles.title}>{title}</p>
      </Link>

      <div className={styles.actions}>
        <Button clear onClick={onChangeTheme}>
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
  logoUrl: '',
  actions: [],
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.bool)),
};

export default Header;
