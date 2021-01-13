import React from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 25%;
  background-color: rgba(63, 81, 181, 1);
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  margin-top: 1%;
`
const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const CloseBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const ButtonWrapper = styled.div`
  width: min-content;
  margin-right: 5%;
`
type Props = {
  handleClick: () => void
}
export const Contacts: React.FC<Props> = ({ handleClick }) => {
  return (
    <Wrapper>
      <Content>
        <CloseBox>
          <ButtonWrapper>
            <Button
              label="X"
              variant="text"
              handleClick={handleClick}
              color="inherit"
            />
          </ButtonWrapper>
        </CloseBox>
        <Box>dddddd</Box>
        <Box>ddddd</Box>
        <Box>ddddd</Box>
      </Content>
    </Wrapper>
  )
}
