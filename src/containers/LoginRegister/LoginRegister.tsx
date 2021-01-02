import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
import { selectLanguage } from '../../state/selectors/userData.selector';

type WrapperProps = {
  show:boolean
}

const Wrapper = styled.div`
  display:${(props:WrapperProps)=>props.show?`flex`:`hidden`};
  justify-content:center;
  position: fixed;
  z-index:10;
  width:100vw;
  height:120%;
  background-color:rgba(0,0,0,0.5);
  top:0%;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const StyledDiv = styled.div`
  width:50%;
  position: fixed;
  margin-bottom:1rem;
  padding-bottom: 2rem;
  padding-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  @media (max-width : 760px){
    width:90%;
  }
  top:25%;
`

type MyProps = {
  language?: Languages
  show: boolean
  isLoggedIn?: boolean
  handleLoginRegisterShow: (...args: any[]) => void
}

const LoginRegister: React.FC<MyProps> = ({
  show,
  handleLoginRegisterShow,
}) => {
  const language = useSelector(selectLanguage)
  const [showLogin, setShowLogin] = useState<boolean>(true)
  const [showRegister, setShowRegister] = useState<boolean>(false)
  const handleParentClick = e => {
    e.preventDefault()
    handleLoginRegisterShow(false)
  }
  const handleChildClick = e => {
    e.stopPropagation()
  }
  const handleViewChange = e => {
    e.preventDefault()
    setShowLogin(!showLogin)
    setShowRegister(!showRegister)
  }

  

  const handleRegister = (register: boolean) => 
    handleLoginRegisterShow(!register)

    return (
      <Wrapper
        show={show}
        onClick={handleParentClick}
      >
        <Container>
          <StyledDiv onClick={handleChildClick}
          >
            {showLogin ? (
              <Login
                translation={translations}
                language={language}
                handleViewChange={handleViewChange}
              />
            ) : (
              <Register
                register={handleRegister}
                translation={translations}
                language={language}
                handleViewChange={handleViewChange}
              />
            )}
          </StyledDiv>
        </Container>
      </Wrapper>
    )
  }

export default LoginRegister
