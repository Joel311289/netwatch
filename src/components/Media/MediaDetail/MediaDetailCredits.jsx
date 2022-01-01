import PropTypes from 'prop-types';
import { isEmptyArray } from '../../../utils/helpers';
import List from '../../UI/List/List';
import styles from './MediaDetailCredits.module.css';

const MediaDetailCredits = ({ credits }) => {
  return (
    <List divider>
      {(credits || [])
        .filter((item) => !isEmptyArray(item.data))
        .map(({ label, data }) => (
          <div key={label} className={styles.credit}>
            <span className={styles.label}>{label}</span>

            <div className={styles.data}>
              {data.map(({ name }, index) => (
                <div key={name} className={styles.item}>
                  <span>{name}</span>
                  {index !== data.length - 1 && <span className={styles.separator}>•</span>}
                </div>
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
