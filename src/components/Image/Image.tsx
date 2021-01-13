import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin: 0.25rem;
  display: flex;
  justify-content: center;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 10%;
  left: 10%;
  background-color: black;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  opacity: 0.5;
`
const StyledHeader = styled.h4`
  padding-top: 1rem;
`

type Props = {
  imageUri?: string
  imgHeader?: string
  imgText?: string
  showText: boolean
}

export const Image: React.FC<Props> = ({
  imageUri,
  imgHeader,
  imgText,
  showText,
}) => {
  return (
    <Wrapper>
      <img src={imageUri} alt={"description"} />
      {showText && (
        <Content>
          <StyledHeader>{imgHeader}</StyledHeader>
          <p>{imgText}</p>
        </Content>
      )}
    </Wrapper>
  )
}
