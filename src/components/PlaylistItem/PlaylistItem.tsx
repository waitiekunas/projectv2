import React from 'react';
import styled from 'styled-components';

import { ActiveView } from '../../containers/LessonFlow/LessonFlow';
import { LessonMaterial } from '../../interfaces/lesson/ILessonMaterial';

type MyProps = {
  active: boolean
  lesson: LessonMaterial
  handeClick: (lessonInfo: ActiveView) => void
}
type WrapperProps = {
  active: boolean
}
const Wrapper = styled.div<WrapperProps>`
  width: 80%;
  display: flex;
  justify-content: left;
  flex-direction: row;
  background-color: ${props => (props.active ? `#3f51b5` : `transparent`)};
  :hover {
    border: 1px solid #3f51b5;
  }
  border: 1px solid transparent;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
`
const ImageWrapper = styled.div`
  max-width: 45px;
  align-self: center;
`
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  padding-left: 0.25rem;
`
const StyledImg = styled.img`
  margin: 0px;
`
export const PlaylistItem: React.FC<MyProps> = ({
  active,
  lesson,
  handeClick,
}) => (
  <Wrapper onClick={() => handeClick(lesson)} active={active}>
    <ImageWrapper>
      <StyledImg
        src={
          lesson.type.includes("pdf")
            ? `/images/document.png`
            : `/images/video-play-button.png`
        }
      />
    </ImageWrapper>
    <NameWrapper>{`${lesson.queue}. ${lesson.name}`}</NameWrapper>
  </Wrapper>
)
