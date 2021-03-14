import React from 'react';
import Loader from 'react-loader';
import { useSelector } from 'react-redux';
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
const StyledLoader = styled(Loader)`
  align-self: center;
`
export const Spinner = () => {
  const show = useSelector(selectSpinnerState)
  return (
    show && (
      <Wrapper>
        <Container>
          <StyledLoader color="#00bfff" scale={2.0} />
        </Container>
      </Wrapper>
    )
  )
}
