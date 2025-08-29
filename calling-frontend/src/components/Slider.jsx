import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

const Slider = ({ children, handlePresent, present, call }) => {
  const [sliderHeight, setSliderHeight] = useState(0);
  const swiperRef = useRef(null); // Reference to the Swiper component

  const handleSlideNextTransitionEnd = (swiper) => {
    if (sliderHeight) {
      console.log("تماس");
      swiper.slideTo(0, 1000, false);
      call();
    }
  };

  useEffect(() => {
    const middleSlide = swiperRef.current.swiper.slides[1].offsetHeight;
    setSliderHeight(middleSlide.offsetHeight); // Set the height of the slider to the height of the middle slide

    console.log("set height");
    setSliderHeight(middleSlide);
  }, []);

  return (
    <div className="w-full mx-auto " style={{ height: `${sliderHeight}px` }}>
      <Swiper
        ref={swiperRef}
        onSlideNextTransitionEnd={handleSlideNextTransitionEnd}
        spaceBetween={10}
        initialSlide={0}
        speed={200}
      >
        <SwiperSlide className="h-32 flex flex-col inline-flex justify-stretch w-full inline-block">
          {children}
        </SwiperSlide>
        <SwiperSlide className="h-32">
          <div className="bg-yellow-300 text-2xl font-extrabold text-white rounded-xl h-full flex items-center px-5 justify-start">
            تماس
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
