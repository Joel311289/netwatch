import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Lazy, Mousewheel, Navigation, Pagination, EffectFade } from 'swiper';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Button from '@components/UI/Button/Button';

import { string } from '@utils/helpers/strings';

import styles from '@components/Layout/Slider/Slider.module.css';

SwiperCore.use([Lazy, Mousewheel, Navigation, Pagination, EffectFade]);

const Slider = ({
  children,
  navigation,
  pagination,
  lazy,
  sliderPerRow,
  sliderClass,
  slideClass,
  paginationBulletsClass,
  paginationBulletClass,
  effectFade,
  offset
}) => {
  const { slidesPerView, spaceBetween } = useBreakpointViewport();

  const renderNavigationButton = (state, icon) => {
    return (
      <Button className={`${styles['button-navigation']} ${styles['button-' + state]}`}>
        {icon}
      </Button>
    );
  };

  const settings = {
    speed: 500,
    slidesPerView: sliderPerRow || slidesPerView,
    slidesPerGroup:
      sliderPerRow === 'auto' ? 1 : !isNaN(sliderPerRow) ? sliderPerRow : slidesPerView,
    spaceBetween,
    navigation: navigation && {
      prevEl: `.${styles['button-prev']}`,
      nextEl: `.${styles['button-next']}`,
      disabledClass: styles['button-navigation-disabled']
    },
    pagination: pagination
      ? {
          clickable: true,
          ...(paginationBulletsClass && { clickableClass: paginationBulletsClass }),
          ...(paginationBulletClass && { bulletClass: paginationBulletClass }),
          bulletActiveClass: styles['pagination-bullet-active'],
          renderBullet: (_, className) => {
            console.log(className);
            return `<span class="${className} ${styles['pagination-bullet']}"></span>`;
          }
        }
      : false,
    lazy: lazy && {
      loadOnTransitionStart: true
    },
    ...(effectFade ? { effect: 'fade' } : {}),
    watchSlidesProgress: true,
    mousewheel: {
      forceToAxis: true
    }
  };

  return (
    <div className={styles.wrapper}>
      <Swiper
        {...settings}
        className={string(sliderClass)}
        style={{ padding: offset ? `0 ${offset}px` : 0 }}>
        {navigation && renderNavigationButton('prev', <FiChevronLeft />)}
        {navigation && renderNavigationButton('next', <FiChevronRight />)}
        {children.map((element, index) => (
          <SwiperSlide
            key={index}
            className={`${string(slideClass)} ${styles.item} ${
              !sliderPerRow && styles.breakpoint
            }`}>
            {React.cloneElement(element, { ...element.props, width: '100%', lazy })}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

Slider.defaultProps = {
  navigation: true
};
Slider.propTypes = {
  children: PropTypes.array,
  direction: PropTypes.oneOf(['horizontal', 'vertical', undefined]),
  navigation: PropTypes.bool,
  pagination: PropTypes.bool,
  lazy: PropTypes.bool,
  sliderPerRow: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sliderClass: PropTypes.string,
  slideClass: PropTypes.string,
  paginationBulletsClass: PropTypes.string,
  paginationBulletClass: PropTypes.string,
  effectFade: PropTypes.string,
  offset: PropTypes.number
};

export default Slider;
