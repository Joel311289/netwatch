import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FiChevronRight } from 'react-icons/fi';

import Space from '@components/Layout/Space/Space';

import styles from '@components/UI/List/List.module.css';
import { Link } from 'react-router-dom';

const ListItem = ({ children, label, to }) => {
  const classes = classNames.bind(styles)({
    link: to,
    [styles.item]: true
  });

  const Content = () => (
    <>
      <Space align="center" gap={[5, 20]}>
        <span className={styles.label}>{label}</span>

        {children}
      </Space>

      {to && <FiChevronRight className={styles.icon} />}
    </>
  );

  return (
    <>
      {to && (
        <Link to={to} className={`list-item-wrapper ${classes}`}>
          {Content()}
        </Link>
      )}

      {!to && <div className={`list-item-wrapper ${classes}`}>{Content()}</div>}
    </>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  to: PropTypes.string
};

export default ListItem;
