import React, { useRef } from "react";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ban1 from "../../assets/images/1.jpg"
import ban2 from "../../assets/images/Blood-donation.jpg"
import ban3 from "../../assets/images/3.jpg"
import ban4 from "../../assets/images/4.jpg"
import ban5 from "../../assets/images/5.jpg"

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
                    <img src={ban1} alt="" />
                </div>
                <div>
                    <img src={ban3} alt="" />
                </div>
                <div>
                    <img src={ban5} alt="" />
                </div>
                <div>
                    <img src={ban4} alt="" />
                </div>
                {/* <div><h3>Slide 2</h3></div>
                <div><h3>Slide 3</h3></div> */}
            </Slider>
        </div>
    );
};

export default Banner;