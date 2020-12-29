import { Link } from 'gatsby';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { Logo } from '../../components/Logo/Logo';
import { changeLoginStatusAction, loginAction } from '../../state/actions/actions';
import { selectLanguage, selectLoginStatus } from '../../state/selectors/userData.selector';
import LoginRegister from '../LoginRegister/LoginRegister';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-height: 10%;
`
const Wrapper2 = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-bottom: 1.25rem;
  padding-top: 1.25rem;
`
const Box = styled.div`
  max-width: 200px;
  width: 25%;
  height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`
export const NavBar: React.FC = () => {
  const language = useSelector(selectLanguage)
  const dispatch = useDispatch()
  const [showLoginRegisterForm, setShowLoginRegisterForm] = useState<boolean>(
    false
  )
  const loggedIn = useSelector(selectLoginStatus)
  const handleLoginRegisterView = e => {
    e.preventDefault()
    setShowLoginRegisterForm(!showLoginRegisterForm)
  }
  const handleLogout = () => {
    dispatch(
      loginAction({
        isLoggedIn: false,
        canUpload: false,
        subscribed: false,
        email: "",
        stripeCustomerId: "",
        subscriptionId: "",
      })
    )
  }
  return (
    <Wrapper>
      <Wrapper2>
        <Box>
          <Link to={`/topics-screen/`}>
            <Button
              handleClick={() => null}
              label={"dropDownButton"}
              language={language}
              variant="contained"
              color="primary"
            />
          </Link>
        </Box>
        <Logo src={"/images/logo192.png"} link="/" />
        <Box>
          <Button
            handleClick={loggedIn ? handleLogout : handleLoginRegisterView}
            label={loggedIn ? "logout" : "signUp-signIn"}
            language={language}
            variant="contained"
            color="primary"
          />
        </Box>
        {showLoginRegisterForm && (
          <LoginRegister
            show={showLoginRegisterForm}
            handleLoginRegisterShow={value => setShowLoginRegisterForm(value)}
            handleLogin={value => dispatch(changeLoginStatusAction(value))}
          />
        )}
      </Wrapper2>
    </Wrapper>
  )
}

export default NavBar
