import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './List.module.css';

const List = ({ children, divider }) => {
  const classes = classNames.bind(styles)({
    divider
  });

  return (
    <div className={`${styles.wrapper} ${classes}`}>
      {children.map((element, index) => (
        <div key={index} className={styles.item}>
          {element}
        </div>
      ))}
    </div>
  );
};

List.defaultProps = {
  children: [],
  divider: false
};

List.propTypes = {
  children: PropTypes.array,
  divider: PropTypes.bool
};

export default List;
