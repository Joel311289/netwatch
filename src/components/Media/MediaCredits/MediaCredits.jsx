import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Separator from '@components/UI/Separator/Separator';
import List from '@components/UI/List/List';
import ListItem from '@components/UI/List/List-item';
import Space from '@components/Layout/Space/Space';
import Slider from '@components/Layout/Slider/Slider';
import MediaItemCredit from '@components/Media/MediaItem/MediaItem-credit';

import { routePersonDetail } from '@services/helpers';

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
  const { mobile, smallDesktop } = useBreakpointViewport();
  const { cast, directors, creators, writers } = credits || {};
  const sections = [
    { id: 'crew', label: 'Director', data: truncateArray(directors, 3) },
    { id: 'crew', label: 'Escritor', data: truncateArray(writers, 3) },
    { id: 'crew', label: 'Creador', data: truncateArray(creators, 3) },
    { id: 'all', label: 'Ver todo el reparto', to }
  ];

  const sliderPerView = useMemo(() => {
    if (mobile) return 1;
    if (smallDesktop) return 2;
    return 2;
  }, [mobile, smallDesktop]);

  const filteredSections = () => sections.filter(({ to, data }) => to || !isEmptyArray(data));

  const Cast = (detail) => (
    <div className={styles.item} key={detail.id}>
      <MediaItemCredit {...detail} />
    </div>
  );

  return (
    <div className={`media-credits-wrapper ${styles.wrapper}`}>
      <Space align="center" className={`${styles.credits} ${styles.cast}`}>
        {smallDesktop && (
          <Slider sliderPerView={sliderPerView} spaceBetween={10}>
            {truncateArray(cast, 10).map((credit) =>
              Cast({ ...credit, url: routePersonDetail(credit) })
            )}
          </Slider>
        )}
        {!smallDesktop &&
          truncateArray(cast, 10).map((credit) =>
            Cast({ ...credit, url: routePersonDetail(credit) })
          )}
      </Space>

      {!isEmptyArray(filteredSections()) && (
        <List divider>
          {filteredSections().map(({ label, data, to }) => (
            <ListItem key={label} label={label} to={to}>
              {data && <Separator items={data.map(({ name }) => name)} />}
            </ListItem>
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
