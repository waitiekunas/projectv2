import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { setShowUserInfo } from '../../state/actions/actions';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 9;
  width: 100vw;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const StyledDiv = styled.div`
  width: 50%;
  position: fixed;
  margin-bottom: 1rem;
  padding-bottom: 2rem;
  padding-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  @media (max-width: 760px) {
    width: 90%;
  }
  top: 25%;
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 1rem;
`
export const AuthorDataIsMissing: React.FC = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setShowUserInfo(true))
  }
  return (
    <Wrapper>
      <Container>
        <StyledDiv>
          <ContentWrapper>
            <h3>
              Trūksta autoriaus informacijos. Prašome ją užpildyti prieš keliant
              pamokos medžiagą
            </h3>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              handleClick={handleClick}
              variant="contained"
              color="primary"
            >
              Pildyti info
            </Button>
          </ContentWrapper>
        </StyledDiv>
      </Container>
    </Wrapper>
  )
}
