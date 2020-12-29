import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import styled from 'styled-components';

import { ClassTicket } from '../../components/ClassTicket/ClassTicket';
import { setLessonsAction, setLookupsAction } from '../../state/actions/actions';
import { selectLessons } from '../../state/selectors/apiData.selector.ts';

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
`
const Content = styled.div`
  width: 66%;
  max-height: 10%;
`
export const ClassList = () => {
  const lessons = useSelector(selectLessons)
  const dispatch = useDispatch()
  useEffect(() => {
    axios
      .get(process.env.GET_ALL_LESSONS_URL)
      .then((res: any) => dispatch(setLessonsAction(res.data)))
  }, [])
  useEffect(() => {
    dispatch(setLookupsAction(getTopics(lessons)))
  }, [lessons])
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
  const getTopics = (lessons: any[]) => {
    let topics = []
    lessons &&
      lessons.forEach(lesson => {
        if (!topics.includes(lesson.topic)) {
          topics.push(lesson.topic)
        }
      })
    return topics
  }

  return (
    <Wrapper>
      <Content>
        <Slider {...settings}>
          {lessons &&
            lessons.map((value, index) => (
              <ClassTicket
                key={index}
                text={value.lesson_name}
                id={value.id}
                description={value.lesson_description}
                imageUri={
                  value.image_url ? value.image_url : "/images/logo192.png"
                }
                authorId={value.lesson_author}
              />
            ))}
        </Slider>
      </Content>
    </Wrapper>
  )
}

export default ClassList
