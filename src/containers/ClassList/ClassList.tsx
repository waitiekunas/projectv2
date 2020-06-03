import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import ClassTicket from '../../components/ClassTicket/ClassTicket';

export const ClassList = () => {
  const [lessons, setLessons] = useState<any>()
  useEffect(() => {
    axios
      .get("http://localhost:5000/lesson/getAll")
      .then((res: any) => setLessons(res.data))
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    draggable: true,
    initialSlide: 0,
  }
  // TODO assign correct values to classticket
  return (
    <div className={"flex justify-center"}>
      <div className={"w-2/3 max-height-10-proc"}>
        <Slider {...settings}>
          {lessons &&
            lessons.map((value, index) => (
              <ClassTicket
                key={index}
                text={value.lesson_name}
                id={value.id}
                description={value.lesson_description}
                authorDesc={{
                  photo: "/images/logo192.png",
                  description:
                    "Suspendisse volutpat cursus nisi eget egestas. Suspendisse nunc dui, ultricies at felis sit amet, blandit pulvinar risus. Fusce laoreet velit neque, ac imperdiet magna facilisis in. Ut sed bibendum leo. Cras consequat eleifend augue, et laoreet libero cursus in. Praesent euismod purus libero, non vehicula nibh fringilla dapibus. Nunc sed nulla sit amet nibh dignissim ornare.",
                }}
                imageUri={"/images/logo192.png"}
              />
            ))}
        </Slider>
      </div>
    </div>
  )
}
export default ClassList
