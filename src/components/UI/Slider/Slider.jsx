import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useBreakpointViewport } from '../../../hooks/useBreakpointViewport';
import { useResize } from '../../../hooks/useResize';
import { getBreakpointConfig } from '../../../utils/helpers';
import styles from './Slider.module.css';

import SwiperCore, { Lazy, Mousewheel, Navigation } from 'swiper';
SwiperCore.use([Lazy, Mousewheel, Navigation]);

const Slider = ({ children, navigation, onPrev, onNext }) => {
  const breakpoint = useBreakpointViewport();
  const navigationWidth = 40;
  const [focused, setFocused] = useState(false);
  const [slidesPerGroup, setSlidesPerGroup] = useState(1);
  const sliderRef = useRef(null);
  const { width: sliderWidth } = useResize(sliderRef);
  const [slideWidth, setSlideWidth] = useState(0);
  
  useEffect(() => {
    if (sliderWidth) {
      const { slidesPerView, spaceBetween } = getBreakpointConfig(breakpoint);
      const totalWidth = (sliderWidth - 2 * navigationWidth) -  ((slidesPerView - 1) * spaceBetween);
      const itemWidth = totalWidth / slidesPerView;
      setSlideWidth(itemWidth);
      setSlidesPerGroup(slidesPerView);
    }
  }, [sliderWidth, breakpoint]);

  const renderNavigationButton = (state, icon) => {
    return (
      <div className={`${styles['button-navigation']} ${styles['button-' + state]}`} style={{ width: navigationWidth }}>
        {focused && icon}
      </div>
    );
  };

  const onMouseEnter = () => setFocused(true);
  const onMouseLeave = () => setFocused(false);

  const settings = {
    speed: 500,
    slidesPerView: 'auto',
    spaceBetween: getBreakpointConfig(breakpoint).spaceBetween,
    navigation: navigation && {
      prevEl: `.${styles['button-prev']}`,
      nextEl: `.${styles['button-next']}`,
      disabledClass: styles['button-navigation-disabled'],
    },
    lazy: true,
    mousewheel: true,
    slidesPerGroup,
    slidesOffsetBefore: navigationWidth,
    slidesOffsetAfter: navigationWidth,
    onSlidePrevTransitionStart: onPrev,
    onSlidePrevTransitionEnd: onPrev,
    onSlideNextTransitionStart: onNext,
    onSlideNextTransitionEnd: onNext,
  };

  return  (
    <div
      ref={sliderRef}
      style={{ marginLeft: -1 * navigationWidth, width: `calc(100% + ${2 * navigationWidth}px)` }}
      className={styles.wrapper} 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}>
      {Array.isArray(children) && children.length > 0 && 
      <Swiper {...settings}>
        {navigation && renderNavigationButton('prev', <FiChevronLeft />)}
        {navigation && renderNavigationButton('next', <FiChevronRight />)}
        {children.map((element, index) => (
          <SwiperSlide 
            key={index}
            className={styles.item}>
            {Boolean(slideWidth) && React.cloneElement(element, {...element.props, width: slideWidth})}
          </SwiperSlide>
        ))}
      </Swiper>}
    </div>
  );
};

Slider.defaultProps = {
  navigation: true,
  onPrev: () => {},
  onNext: () => {},
};

Slider.propTypes = {
  navigation: PropTypes.bool,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

export default Slider;
