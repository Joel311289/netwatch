import PropTypes from 'prop-types';
import List from '../../UI/List/List';
import styles from './MediaDetailCredits.module.css';

const limitCredits = (credits) => (Array.isArray(credits) ? credits.slice(0, 3) : []);

const MediaDetailCredits = ({ cast, directors, writers }) => {
  const items = [
    { label: 'Director', data: limitCredits(directors) },
    { label: 'Writers', data: limitCredits(writers) },
    { label: 'Stars', data: limitCredits(cast) }
  ];

  return (
    <List divider>
      {items.map(({ label, data }) => (
        <div key={label} className={styles.credit}>
          <span className={styles.label}>{label}</span>
          <div className={styles.data}>
            {(data || []).map(({ name }, index) => (
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

MediaDetailCredits.propTypes = {
  cast: PropTypes.array,
  directors: PropTypes.array,
  writers: PropTypes.array
};

export default MediaDetailCredits;
