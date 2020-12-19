import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Pagination} from 'swiper';


// Import Swiper styles
import 'swiper/swiper-bundle.css';

// install Swiper components
SwiperCore.use([Pagination]);

function Slider() {

    return (
        <>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                wrapperTag="ul"
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide tag="li" key={`slide-${1}`}>Slide 1</SwiperSlide>
                <SwiperSlide tag="li" key={`slide-${2}`}>Slide 2</SwiperSlide>
                <SwiperSlide tag="li" key={`slide-${3}`}>Slide 3</SwiperSlide>
                <SwiperSlide tag="li" key={`slide-${4}`}>Slide 4</SwiperSlide>
            </Swiper>
        </>
    )
}

export default Slider
