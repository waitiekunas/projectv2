import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ClassTicket from '../../components/ClassTicket/ClassTicket';
import { getClassesByTopic } from '../../utils/utils';

type MyProps = {
  topic: string
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const TopicsWrapper = styled.div`
  width: 80%;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
`
const TopicWrapper = styled.div`
  width: 25%;
  margin: 0px;
`
const TopicsContainer = (props: MyProps) => {
  const lessons = useSelector((state: any) => state.lessons.lessons)
  const classes = getClassesByTopic(lessons, props.topic)
  return (
    <Wrapper>
      <TopicsWrapper className={"TopicsWrapper"}>
        {classes.map((value, index) => (
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
        ))}
      </TopicsWrapper>
    </Wrapper>
  )
}

export default TopicsContainer
