import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay, Virtual } from "swiper";
import "swiper/swiper-bundle.css";
import { BackdropLoading } from "../../../../../shared/presentation/pages/loading.page";
import { useResize } from "../../../../../../hooks/resize";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

interface ShopProductsCarouselProps {
  facilities: Array<any>;
}

SwiperCore.use([Navigation, Pagination]);

export function SliderImageComponent(props: ShopProductsCarouselProps) {
  const {width} = useResize()
  const slides = [];


  for (let i = 0; i < props?.facilities?.length; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <div className="flex justify-center ">
          <img
          className="w-full h-auto"
            src={
              process.env.REACT_APP_UPLOAD_URL +
              props?.facilities[i].facilityimage
            }
            alt={props?.facilities[i].facilityname}
          />
        </div>
      </SwiperSlide>
    );
  }

  return (
    <div className="w-[100%] h-auto ">
      <Swiper
        id="swiper"
        virtual
        slidesPerView={width <= 768 ? 1 :3}
        spaceBetween={30}
        autoplay={{
          delay: 2000,
        }}
        onReachEnd={() => {
          const tmp = slides.unshift();
          slides.push(tmp);
        }}
        navigation
        pagination
        className="gap-2 flex"
      >
        {slides}
      </Swiper>
    </div>
  );
}
