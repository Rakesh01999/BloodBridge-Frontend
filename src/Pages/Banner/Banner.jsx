import React, { useRef } from "react";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div>
            {/* <h3 className='text-center font-bold text-3xl'> This Is Banner</h3> */}
            <Slider {...settings}>
                <div>
                    <h3>Slide 1</h3>
                </div>
                <div><h3>Slide 2</h3></div>
                <div><h3>Slide 3</h3></div>
            </Slider>
        </div>
    );
};

export default Banner;