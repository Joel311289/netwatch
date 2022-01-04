import { Link as LinkRouter } from 'react-router-dom';

import Space from '@components/Layout/Space/Space';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants';

import styles from '@components/UI/Link/Link.module.css';

const Link = ({ children, to }) => {
  return (
    <LinkRouter to={to} className={styles.wrapper}>
      <Space align="center" gap={10} className={styles.text}>
        {children}
      </Space>
    </LinkRouter>
  );
};

Link.defaultProps = ElementDefaultProps;
Link.propTypes = ElementPropTypes;

export default Link;
