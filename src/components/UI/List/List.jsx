import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Space from '@components/Layout/Space/Space';

import styles from '@components/UI/List/List.module.css';

const List = ({ children, divider }) => {
  const classes = classNames.bind(styles)({
    divider
  });

  return (
    <Space direction="column" className={`${styles.wrapper} ${classes}`}>
      {children.map((element, index) => (
        <Space align="center" key={index} className={styles.item}>
          {element}
        </Space>
      ))}
    </Space>
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
