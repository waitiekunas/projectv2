import React from 'react';

import ClassTicket from '../components/ClassTicket';
import logo from '/images/logo192.png';
import { classes } from '../mockData/classDescriptions/classes';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ClassList extends React.Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false,
            autoplaySpeed: 3000,
            draggable: true,
            initialSlide: 0
        };
        return (
            <div className={'flex justify-center'}>
                <div className={'w-2/3 max-height-10-proc'}>
                    <Slider {...settings}>
                        {classes.map((value, index) =>
                            <ClassTicket
                                key={index}
                                text={value.name}
                                imageUri={"/images/logo192.png"} />)}
                    </Slider>
                </div>

            </div>
        )
    }
}
export default ClassList;