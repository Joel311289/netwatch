import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Lazy, Autoplay, Mousewheel, Navigation, Pagination, EffectFade } from 'swiper';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Button from '@components/UI/Button/Button';

import { string } from '@utils/helpers/strings';

import styles from '@components/Layout/Slider/Slider.module.css';

SwiperCore.use([Lazy, Autoplay, Mousewheel, Navigation, Pagination, EffectFade]);

const Slider = ({
  children,
  navigation,
  pagination,
  lazy,
  autoplay,
  sliderPerView,
  spaceBetween,
  sliderClass,
  slideClass,
  navigationClass,
  paginationBulletsClass,
  paginationBulletClass,
  paginationBulletActiveClass,
  effectFade,
  onPrev,
  onNext
}) => {
  const { slidesPerView: slidesPerViewBrk, spaceBetween: spaceBetweenBrk } =
    useBreakpointViewport();

  const renderNavigationButton = (state, icon) => {
    return (
      <Button
        className={`${styles['button-navigation']} ${string(navigationClass)} ${
          styles['button-' + state]
        }`}
      >
        {icon}
      </Button>
    );
  };

  const settings = {
    speed: 500,
    allowTouchMove: false,
    slidesPerView: sliderPerView || slidesPerViewBrk,
    slidesPerGroup:
      sliderPerView === 'auto' ? 1 : !isNaN(sliderPerView) ? sliderPerView : slidesPerViewBrk,
    spaceBetween: spaceBetween || spaceBetweenBrk,
    navigation: navigation && {
      prevEl: `.${styles['button-prev']}`,
      nextEl: `.${styles['button-next']}`,
      disabledClass: styles['button-navigation-disabled']
    },
    pagination: pagination
      ? {
          clickable: true,
          ...(paginationBulletsClass && { clickableClass: string(paginationBulletsClass) }),
          ...(paginationBulletClass && { bulletClass: string(paginationBulletClass) }),
          ...(paginationBulletActiveClass && {
            bulletActiveClass: string(paginationBulletActiveClass)
          }),
          renderBullet: (_, className) => {
            return `<span class="${className} ${styles['pagination-bullet']}"></span>`;
          }
        }
      : false,
    lazy: lazy && {
      loadOnTransitionStart: true
    },
    autoplay: autoplay && {
      delay: 5000,
      pauseOnMouseEnter: true
    },
    ...(effectFade ? { effect: 'fade' } : {}),
    watchSlidesProgress: true,
    mousewheel: {
      forceToAxis: true
    },
    onSlidePrevTransitionStart: onPrev,
    onSlideNextTransitionStart: onNext
  };

  return (
    <div className={`slider-wrapper ${styles.wrapper}`}>
      <Swiper {...settings} className={string(sliderClass)}>
        {navigation && renderNavigationButton('prev', <FiChevronLeft />)}
        {navigation && renderNavigationButton('next', <FiChevronRight />)}
        {children.map((element, index) => (
          <SwiperSlide
            key={index}
            className={`${string(slideClass)} ${styles.item} ${
              !sliderPerView && styles.breakpoint
            }`}
          >
            {React.cloneElement(element, { ...element.props })}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

Slider.defaultProps = {
  navigation: true,
  onPrev: () => {},
  onNext: () => {}
};
Slider.propTypes = {
  children: PropTypes.array,
  direction: PropTypes.oneOf(['horizontal', 'vertical', undefined]),
  navigation: PropTypes.bool,
  pagination: PropTypes.bool,
  autoplay: PropTypes.bool,
  lazy: PropTypes.bool,
  sliderPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spaceBetween: PropTypes.number,
  sliderClass: PropTypes.string,
  slideClass: PropTypes.string,
  navigationClass: PropTypes.string,
  paginationBulletsClass: PropTypes.string,
  paginationBulletClass: PropTypes.string,
  paginationBulletActiveClass: PropTypes.string,
  effectFade: PropTypes.bool,
  onPrev: PropTypes.func,
  onNext: PropTypes.func
};

export default Slider;
