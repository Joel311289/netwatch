import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PropTypes from 'prop-types';
import styles from './Slider.module.css';

import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);

const Slider = ({ children, slidesPerView, spaceBetween, navigation, pagination, speed }) => {
  const [focused, setFocused] = useState(false);
  const [slidesPerGroup, setSlidesPerGroup] = useState(1);  
  const [sliderWidth, setSliderWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    if (sliderWidth && slideWidth) {
      const totalSpaces = spaceBetween * (Math.floor(sliderWidth / slideWidth) - 1);
      const slidesPerGroup = Math.floor((sliderWidth - totalSpaces) / slideWidth);
      setSlidesPerGroup(slidesPerGroup);
    }
  }, [sliderWidth, slideWidth])

  const renderPrevButton = () => {
    return (
      <div className={`${styles['button-navigation']} ${styles['button-prev']}`}>
        {focused && <div className={styles['button-navigation-icon']}><FiChevronLeft /></div>}
      </div>
    );
  };

  const renderNextButton = () => {
    return (
      <div className={`${styles['button-navigation']} ${styles['button-next']}`}>
        {focused && <div className={styles['button-navigation-icon']}><FiChevronRight /></div>}
      </div>
    );
  };

  const onMouseEnter = () => setFocused(true);
  const onMouseLeave = () => setFocused(false);

  const onSliderResize = ({ size }) => setSliderWidth(size);
  const onSliderAfterInit = ({ slides }) => setSlideWidth(slides[0].swiperSlideSize);

  const settings = {
    speed,
    spaceBetween,
    slidesPerView,
    navigation: navigation && {
      prevEl: `.${styles['button-prev']}`,
      nextEl: `.${styles['button-next']}`,
      disabledClass: styles['button-navigation-disabled'],
    },
    cssMode: true,
    pagination,
    slidesPerGroup,
    onAfterInit: onSliderAfterInit,
    onResize: onSliderResize,
    // onActiveIndexChange: (e) => console.log('activeIndexChange', e),
    // onAfterInit: (e) => console.log('afterInit', e),
    // onImagesReady: (e) => console.log('imagesReady', e),
    // onInit: onSliderAfterInit,
    // onBreakpoint: (e) => console.log('breakpoint', e),
    // onObserverUpdate: (e) => console.log('observerUpdate', e),
  };

  return children.length > 0 && (
    <div
      className={styles.wrapper} 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}>
      <Swiper {...settings}>
        {renderPrevButton()}
        {renderNextButton()}
        {children.map((element, index) => (
          <SwiperSlide 
            key={index}
            className={styles.item}>
            {element}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

Slider.defaultProps = {
  spaceBetween: 10,
  speed: 500,
  slidesPerView: 'auto',
  navigation: true,
  pagination: false,
};

Slider.propTypes = {
  spaceBetween: PropTypes.number,
  speed: PropTypes.number,
  slidesPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  navigation: PropTypes.oneOfType([PropTypes.bool, PropTypes.objectOf()]),
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.objectOf()]),
};

export default Slider;
