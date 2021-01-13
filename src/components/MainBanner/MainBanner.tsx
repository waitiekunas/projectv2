import { Link } from 'gatsby';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setShowLoginRegisterForm } from '../../state/actions/actions';
import { selectLoginStatus } from '../../state/selectors/userData.selector';
import { Button } from '../Button/Button';

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
  cursor: pointer;
`

type Props = {
  imageUri?: string
}

export const MainBanner: React.FC<Props> = ({ imageUri }) => {
  const dispatch = useDispatch()
  const loggedIn = useSelector(selectLoginStatus)

  return (
    <Wrapper>
      <img src={imageUri} alt={"description"} />
      <Content>
        {loggedIn ? (
          <Link to={`/topics-screen/`}>
            <StyledHeader>Checkout our lessons</StyledHeader>
          </Link>
        ) : (
          <StyledHeader>
            <Button
              color="inherit"
              handleClick={() => dispatch(setShowLoginRegisterForm(true))}
              variant="text"
              label="Check out our content login now. Click here"
            />
          </StyledHeader>
        )}
      </Content>
    </Wrapper>
  )
}
