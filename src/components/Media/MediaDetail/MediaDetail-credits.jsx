import React from 'react';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import List from '@components/UI/List/List';
import Separator from '@components/UI/Separator/Separator';

import { isEmptyArray, truncateArray } from '@utils/helpers/arrays';

const MediaDetailCredits = ({ styles, credits }) => {
  const { directors, writers, creators, cast } = credits || {};
  const sections = [
    { id: 'crew', label: 'Director', data: truncateArray(directors, 3) },
    { id: 'crew', label: 'Escritores', data: truncateArray(writers, 3) },
    { id: 'crew', label: 'Creadores', data: truncateArray(creators, 3) },
    { id: 'cast', label: 'Actores', data: truncateArray(cast, 3) }
  ];

  return (
    <List divider>
      {sections
        .filter(({ data }) => !isEmptyArray(data))
        .map(({ label, data }) => (
          <Space key={label} gap={[5, 20]} className={styles.credit}>
            <span>{label}</span>

            <Separator items={data.map(({ name }) => name)} />
          </Space>
        ))}
    </List>
  );
};

MediaDetailCredits.defaultProps = {
  credit: {}
};
MediaDetailCredits.propTypes = {
  styles: PropTypes.object,
  credits: PropTypes.object
};

export default MediaDetailCredits;
