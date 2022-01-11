import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Separator from '@components/UI/Separator/Separator';
import List from '@components/UI/List/List';
import Space from '@components/Layout/Space/Space';
import Slider from '@components/Layout/Slider/Slider';

import { MediaPropTypes } from '@utils/constants/proptypes';
import { isEmptyArray, truncateArray } from '@utils/helpers/arrays';

import mobileStyles from '@components/Media/MediaCredits/MediaCredits-mobile.module.css';
import desktopStyles from '@components/Media/MediaCredits/MediaCredits.module.css';

const MediaCredits = ({ to, credits }) => {
  const styles = useBreakpointStyles({
    desktopStyles,
    mobileStyles,
    smallDesktopStyles: mobileStyles
  });
  const { smallDesktop } = useBreakpointViewport();
  const { cast, directors, creators, writers } = credits || {};
  const sections = [
    { id: 'crew', label: 'Director', data: truncateArray(directors, 3) },
    { id: 'crew', label: 'Escritores', data: truncateArray(writers, 3) },
    { id: 'crew', label: 'Creadores', data: truncateArray(creators, 3) }
  ];

  const filteredSections = () => sections.filter(({ data }) => !isEmptyArray(data));

  // eslint-disable-next-line react/prop-types
  const Cast = ({ id, characters, image, name }) => (
    <Link key={id} to={`${to}/${id}`} className={styles.item}>
      <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>
      <Space direction="column" gap={3}>
        <span className={`${styles.name}`}>{name}</span>
        <span className={`${styles.characters}`}>{(characters || []).join('/')}</span>
      </Space>
    </Link>
  );

  return (
    <div className={`media-credits-wrapper ${styles.wrapper}`}>
      <Space align="center" className={`${styles.credits} ${styles.cast}`}>
        {smallDesktop && (
          <Slider sliderPerRow="auto">
            {truncateArray(cast, 10).map((credit) => Cast(credit))}
          </Slider>
        )}
        {!smallDesktop && truncateArray(cast, 10).map((credit) => Cast(credit))}
      </Space>

      {!isEmptyArray(filteredSections()) && (
        <List divider>
          {filteredSections().map(({ label, data }) => (
            <Space key={label} gap={[5, 20]} className={styles.credit}>
              <span>{label}</span>

              <Separator items={data.map(({ name }) => name)} />
            </Space>
          ))}
        </List>
      )}
    </div>
  );
};

MediaCredits.propTypes = {
  to: PropTypes.string.isRequired,
  ...MediaPropTypes
};

export default MediaCredits;
