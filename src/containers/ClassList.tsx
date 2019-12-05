import React from 'react';

import ClassTicket from '../components/ClassTicket';
import Image from '../resources/logo.svg';
import Classes from '../mockData/classDescriptions/classes.json';
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
            draggable: false,
            initialSlide: 0
        };
        return (
            <div className={'flex justify-center'}>
                <div className={'w-2/3 max-height-10-proc'}>
                    <Slider {...settings}>
                        {Classes.map((value, index) =>
                            <ClassTicket
                                key={index}
                                text={value.name}
                                imageUri={Image} />)}
                    </Slider>
                </div>

            </div>
        )
    }
}
export default ClassList;