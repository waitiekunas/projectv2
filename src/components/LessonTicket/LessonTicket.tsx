import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { Image } from '../Image/Image';

const ImageWrapper = styled.div`
  max-height: 10%;
`
const HeaderWrapper = styled.div`
  margin: 0.25rem;
  display: flex;
  justify-content: center;
`
const StyledP = styled.p`
  overflow-wrap: anywhere;
`

type Props = {
  text: string
  id: string
  description: string
  imageUri: string
  authorId: string
}

export const LessonTicket: React.FC<Props> = props => {
  return (
    <>
      <Link
        className={"class-ticket"}
        to={`/topic-view/`}
        state={{ classInfo: props }}
      >
        <ImageWrapper>
          <Image imageUri={props.imageUri} showText={false} />
          <HeaderWrapper>
            <StyledP>{props.text}</StyledP>
          </HeaderWrapper>
          <HeaderWrapper>
            <StyledP>{props.description}</StyledP>
          </HeaderWrapper>
        </ImageWrapper>
      </Link>
    </>
  )
}
