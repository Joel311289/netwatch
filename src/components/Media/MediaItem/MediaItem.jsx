import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';
import Space from '@components/Layout/Space/Space';

const MediaItem = ({
  width,
  ratio,
  skeleton,
  image,
  title,
  date,
  vote_average,
  to,
  lazy,
  listable,
  watchable,
  ...item
}) => {
  const [focused, setFocused] = useState(false);
  const [fetchModalData, setFetchModalData] = useState({});

  const onFocus = () => setFocused((prev) => !prev);
  const onWatch = () => setFetchModalData({ ...item, mode: 'video' });

  const actions = [
    ...(watchable ? [{ key: 'watch', onClick: onWatch, icon: <RiPlayFill /> }] : []),
    ...(listable
      ? [
          {
            key: 'list',
            onClick: () => console.log(`Add to list the item ${item.id}`),
            icon: <IoMdAdd />
          }
        ]
      : [])
  ];

  return (
    <>
      <div
        className={`media-item-wrapper ${styles.wrapper} ${focused && styles.focused}`}
        style={{ width }}
      >
        {!skeleton && (
          <div onMouseEnter={onFocus} onMouseLeave={onFocus}>
            <MediaItemImage image={image} ratio={ratio} to={to} lazy={lazy} />

            <Space gap={10} className={styles.actions}>
              {actions.map(({ key, icon, onClick }) => (
                <button key={key} onClick={onClick} className={styles.action}>
                  {icon}
                </button>
              ))}
            </Space>
          </div>
        )}

        {!skeleton && vote_average && (
          <Space align="center" justify="center" className={styles.vote}>
            {vote_average}
          </Space>
        )}

        {title && (
          <Space direction="column" className={styles.info}>
            <Link to={to} className={styles.title}>
              {title}
            </Link>
            <span className={styles.date}>{date || 'Por determinar'}</span>
          </Space>
        )}
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}

      {skeleton && <MediaItemSkeleton width={width} ratio={ratio} />}
    </>
  );
};

MediaItem.defaultProps = ElementDefaultProps;
MediaItem.propTypes = ElementPropTypes;

export default MediaItem;
