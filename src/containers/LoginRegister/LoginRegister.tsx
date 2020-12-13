import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { Languages } from '../../enums/languages/languages';
import { IUserState } from '../../interfaces/state/IState';
import { translations } from '../../resources/translations/translations';
import { setUserStatus } from '../../state/actions/loginRegister';
import { setUserId } from '../../state/actions/user';

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

type MyProps = {
  language?: Languages
  show: boolean
  handleLogin: (...args: any[]) => void
  dispatch: (...args: any[]) => void
  isLoggedIn?: boolean
  handleLoginRegisterShow: (...args: any[]) => void
}

const LoginRegister: React.FC<MyProps> = ({
  show,
  language,
  handleLogin,
  dispatch,
  isLoggedIn,
  handleLoginRegisterShow,
}) => {
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

  const handleLoggingIn = (login: IUserState, id: number) => {
    dispatch(setUserId(id))
    dispatch(setUserStatus(login))
    handleLogin(login.isLoggedIn)
    handleLoginRegisterShow(!login.isLoggedIn)
  }

  const handleRegister = (register: boolean) => 
    handleLoginRegisterShow(!register)

    return (
      <Wrapper
        show={show}
        onClick={handleParentClick}
      >
        <div className="w-full max-w-lg flex justify-center">
          <div
            className="login-register-component bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 fixed w-1/2 max-w-lg"
            style={{ top: "25%" }}
            onClick={handleChildClick}
          >
            {showLogin ? (
              <Login
                login={handleLoggingIn}
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
          </div>
        </div>
      </Wrapper>
    )
  }


const mapStateToProps = state => ({
  language: state.language.language,
  isLoggedIn: state.isLoggedIn.isLoggedIn,
})

export default connect(mapStateToProps)(LoginRegister)
