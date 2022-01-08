import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Lazy, Mousewheel, Navigation } from 'swiper';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Button from '@components/UI/Button/Button';

import styles from '@components/Layout/Slider/Slider.module.css';

SwiperCore.use([Lazy, Mousewheel, Navigation]);

const Slider = ({ children, navigation, lazy, sliderPerRow }) => {
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
    slidesPerGroup: sliderPerRow || slidesPerView,
    spaceBetween,
    navigation: navigation && {
      prevEl: `.${styles['button-prev']}`,
      nextEl: `.${styles['button-next']}`,
      disabledClass: styles['button-navigation-disabled']
    },
    lazy: lazy && {
      loadOnTransitionStart: true
    },
    watchSlidesProgress: true,
    mousewheel: {
      forceToAxis: true
    }
  };

  return (
    <div className={styles.wrapper}>
      <Swiper {...settings}>
        {navigation && renderNavigationButton('prev', <FiChevronLeft />)}
        {navigation && renderNavigationButton('next', <FiChevronRight />)}
        {children.map((element, index) => (
          <SwiperSlide key={index} className={!sliderPerRow && styles.item}>
            <div style={{ margin: 1 }}>
              {React.cloneElement(element, { ...element.props, width: '100%', lazy })}
            </div>
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
  navigation: PropTypes.bool,
  lazy: PropTypes.bool,
  sliderPerRow: PropTypes.number
};

export default Slider;
