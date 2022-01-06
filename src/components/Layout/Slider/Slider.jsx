import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Lazy, Mousewheel, Navigation } from 'swiper';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';
import { useResize } from '@hooks/useResize';

import Button from '@components/UI/Button/Button';

import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@components/Layout/Slider/Slider.module.css';

SwiperCore.use([Lazy, Mousewheel, Navigation]);

const Slider = ({ children, navigation, onPrev, onNext }) => {
  const { slidesPerView, spaceBetween } = useBreakpointViewport();
  const sliderRef = useRef(null);
  const { width: sliderWidth } = useResize(sliderRef);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    if (sliderWidth) {
      const totalWidth = sliderWidth - (slidesPerView - 1) * spaceBetween;
      setSlideWidth(totalWidth / slidesPerView);
    }
  }, [sliderWidth, slidesPerView, spaceBetween]);

  const renderNavigationButton = (state, icon) => {
    return (
      <Button className={`${styles['button-navigation']} ${styles['button-' + state]}`}>
        {icon}
      </Button>
    );
  };

  const settings = {
    speed: 500,
    slidesPerView: 'auto',
    spaceBetween,
    navigation: navigation && {
      prevEl: `.${styles['button-prev']}`,
      nextEl: `.${styles['button-next']}`,
      disabledClass: styles['button-navigation-disabled']
    },
    lazy: {
      loadOnTransitionStart: true
    },
    watchSlidesProgress: true,
    mousewheel: {
      forceToAxis: true
    },
    slidesPerGroup: slidesPerView,
    onSlidePrevTransitionStart: onPrev,
    onSlidePrevTransitionEnd: onPrev,
    onSlideNextTransitionStart: onNext,
    onSlideNextTransitionEnd: onNext
  };

  return (
    <div ref={sliderRef} className={styles.wrapper}>
      {!isEmptyArray(children) && Boolean(slideWidth) && (
        <Swiper {...settings}>
          {navigation && renderNavigationButton('prev', <FiChevronLeft />)}
          {navigation && renderNavigationButton('next', <FiChevronRight />)}
          {children.map((element, index) => (
            <SwiperSlide key={index} className={styles.item}>
              {React.cloneElement(element, { ...element.props, width: slideWidth, lazy: true })}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
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
  navigation: PropTypes.bool,
  onPrev: PropTypes.func,
  onNext: PropTypes.func
};

export default Slider;
