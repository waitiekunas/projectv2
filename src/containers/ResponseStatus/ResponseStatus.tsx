import React from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { Languages } from '../../enums/languages/languages';

const Wrapper = styled.div`
  position:fixed;
  background-color: rgba(0,0,0,0.5);
  height: 100%;
  width: 100%;
  top:0%;
  left:0%;
  display:flex;
  flex-direction:column;
  justify-content:center;
`

const Content = styled.div`
  position:relative;
  background-color: aliceblue;
  width: 50%;
  height: 50%;
  top: 0%;
  display:flex;
  justify-content: center;
  flex-direction:column;
  align-self: center;
`
const TextBox = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:row;
`
const ButtonWrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  flex-direction:row;
  padding-top:1.5rem;
`

const ButtonBox = styled.div`
  width:25%;
`

interface MyProps {
  text: string
  handleClick: () => void
  language: Languages
}

export const ResponseStatus: React.FC<MyProps> = ({
  text,
  handleClick,
  language,
}) => {
  return (
    <Wrapper>
      <Content>
        <TextBox>
          <p>{text}</p>
        </TextBox>

        <ButtonWrapper>
          <ButtonBox>
            <Button
              handleClick={() => handleClick()}
              label={"close"}
              language={language}
              variant="contained"
              color="primary"
            />
          </ButtonBox>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  )
}
