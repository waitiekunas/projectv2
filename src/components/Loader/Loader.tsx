import React from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

import { selectSpinnerState } from '../../state/selectors/appData.selector';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0%;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const LoaderContainer = styled.div`
  align-self: center;
`
export const Spinner = () => {
  const show = useSelector(selectSpinnerState)
  return (
    <Wrapper>
      <Container>
        <LoaderContainer>
          <ClipLoader loading={show} color="#00bfff" size={60} />
        </LoaderContainer>
      </Container>
    </Wrapper>
  )
}
