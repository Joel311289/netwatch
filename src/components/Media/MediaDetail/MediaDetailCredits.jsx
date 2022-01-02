import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyArray } from '../../../utils/helpers';
import List from '../../UI/List/List';
import styles from './MediaDetailCredits.module.css';

const MediaDetailCredits = ({ credits }) => {
  return (
    <List divider>
      {(credits || [])
        .filter(({ data }) => !isEmptyArray(data))
        .map(({ label, data }) => (
          <div key={label} className={styles.credit}>
            <span>{label}</span>

            <div className={styles.data}>
              {data.map(({ name }) => (
                <React.Fragment key={name}>
                  <span>{name}</span>
                  <span className={styles.separator}>•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
    </List>
  );
};

MediaDetailCredits.defaultProps = {
  credit: []
};
MediaDetailCredits.propTypes = {
  credits: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.array
    })
  )
};

export default MediaDetailCredits;
