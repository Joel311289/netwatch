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

const Slider = ({ children, navigation }) => {
  const breakpoint = useBreakpointViewport();
  const [focused, setFocused] = useState(false);
  const [slidesPerGroup, setSlidesPerGroup] = useState(1);
  const sliderRef = useRef(null);
  const { width: sliderWidth } = useResize(sliderRef);
  const [slideWidth, setSlideWidth] = useState(0);
  const [navigationWidth, setNavigationWidth] = useState(0);

  useEffect(() => {
    if (sliderWidth) {
      const { slidesPerView, spaceBetween } = getBreakpointConfig(breakpoint);
      const itemWidth = parseInt(sliderWidth / slidesPerView) - (spaceBetween / 2);
      
      setSlideWidth(itemWidth - spaceBetween);
      setSlidesPerGroup(slidesPerView);
      setNavigationWidth(sliderWidth - (itemWidth * slidesPerView) + spaceBetween); 
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
  };

  return  (
    <div
      ref={sliderRef}
      className={styles.wrapper} 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}>
      {Array.isArray(children) && children.length > 0 && <Swiper {...settings}>
        {navigation && renderNavigationButton('prev', <FiChevronLeft />)}
        {navigation && renderNavigationButton('next', <FiChevronRight />)}
        {children.map((element, index) => (
          <SwiperSlide 
            key={index}
            className={styles.item}>
            {slideWidth && React.cloneElement(element, {...element.props, width: slideWidth})}
          </SwiperSlide>
        ))}
      </Swiper>}
    </div>
  );
};

Slider.defaultProps = {
  navigation: true,
};

Slider.propTypes = {
  navigation: PropTypes.bool,
};

export default Slider;
