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
  to,
  lazy,
  listable,
  watchable,
  ...item
}) => {
  const [fetchModalData, setFetchModalData] = useState({});

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
      <div className={`media-item-wrapper ${styles.wrapper}`} style={{ width }}>
        {!skeleton && <MediaItemImage image={image} ratio={ratio} to={to} lazy={lazy} />}

        {title && (
          <Link to={to} className={styles.info}>
            <span className={styles.title}>{title}</span>
            <span className={styles.date}>{date || 'Por determinar'}</span>
          </Link>
        )}

        <Space gap={10} className={styles.actions}>
          {actions.map(({ key, icon, onClick }) => (
            <button key={key} onClick={onClick} className={styles.action}>
              {icon}
            </button>
          ))}
        </Space>
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
