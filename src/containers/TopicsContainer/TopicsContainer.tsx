import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { ClassTicket } from '../../components/ClassTicket/ClassTicket';
import { selectLessons } from '../../state/selectors/apiData.selector';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const TopicsBox = styled.div`
  width: 80%;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
`
const TopicWrapper = styled.div`
  width: 25%;
  margin: 0px;
`

const ButtonContainer = styled.div`
  width: 80%;
  .slick-prev:before,
  .slick-next:before {
    color: #3f51b5 !important;
  }
`

const TopicsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  width: min-content;
`

const ButtonsBox = styled.div`
  padding: 5%;
  display: flex;
  justify-content: center;
`
const TopicsContainer = () => {
  const lessons = useSelector(selectLessons)
  const [startIndex, setStartIndex] = useState<number>(0)
  const [endIndex, setEndIndex] = useState<number>(20)
  const pagesNo = Math.ceil(lessons?.length / 20)
  const [buttonArray, setButtonArray] = useState([])
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0)
  useEffect(() => {
    let arr = []
    for (let i = 0; i < pagesNo; i++) {
      arr.push(
        <ButtonWrapper>
          <Button
            label={`${i + 1}`}
            variant={activeButtonIndex === i ? "contained" : "outlined"}
            color="primary"
            handleClick={() => setIndexes(i)}
          />
        </ButtonWrapper>
      )
    }
    setButtonArray(arr)
  }, [pagesNo, activeButtonIndex])
  const setIndexes = (index: number) => {
    setStartIndex(index * 20)
    setEndIndex(index * 20 + 20)
    setActiveButtonIndex(index)
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 5,
    autoplay: false,
    arrows: true,
    draggable: true,
    initialSlide: 0,
  }
  return (
    <Wrapper>
      <TopicsWrapper>
        <TopicsBox className={"TopicsWrapper"}>
          {lessons.slice(startIndex, endIndex).map((value, index) => {
            if (!value) return
            return (
              <TopicWrapper key={index} className={"TopicWrapper"}>
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
              </TopicWrapper>
            )
          })}
        </TopicsBox>
      </TopicsWrapper>
      <ButtonsBox>
        <ButtonContainer>
          <Slider {...settings}>
            {buttonArray.length > 0 && buttonArray.map(button => button)}
          </Slider>
        </ButtonContainer>
      </ButtonsBox>
    </Wrapper>
  )
}

export default TopicsContainer
