import React from 'react';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import List from '@components/UI/List/List';
import Separator from '@components/UI/Separator/Separator';

import { isEmptyArray } from '@utils/helpers';

const MediaDetailCredits = ({ styles, credits }) => {
  return (
    <List divider>
      {(credits || [])
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
  credit: []
};
MediaDetailCredits.propTypes = {
  styles: PropTypes.object,
  credits: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.array
    })
  )
};

export default MediaDetailCredits;
