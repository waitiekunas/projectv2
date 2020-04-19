import React from "react"
import { connect, useDispatch } from "react-redux"

import Button from "../../components/Button/Button"
import Login from "../../components/Login/Login"
import Register from "../../components/Register/Register"
import { translations } from "../../resources/translations/translations"
import { Languages } from "../../enums/languages/languages"
import { registerUser, checkIfUserNotEmpty } from "../../backEnd/LoginUtils"
import { tryLogin } from "../../state/actions/loginRegister"
import { IRegisterInput } from "../../interfaces/loginRegister/IRegister"

type MyProps = {
  language?: Languages
  show?: boolean
  handleClick?: Function
  dispatch?: any
  isLoggedIn?: any
}
type MyState = {
  showLogin: boolean
  showRegister: boolean
  isLoggedIn: boolean
}
class LoginRegister extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)
    this.state = {
      showLogin: true,
      showRegister: false,
      isLoggedIn: this.props.isLoggedIn,
    }
  }

  handleParentClick = e => {
    e.preventDefault()
    this.props.handleClick("loginRegisterShow", false)
    this.setState({
      showLogin: true,
      showRegister: false,
    })
  }
  handleChildClick = e => {
    e.stopPropagation()
  }
  handleViewChange = e => {
    e.preventDefault()
    this.setState({
      showLogin: !this.state.showLogin,
      showRegister: this.state.showRegister,
    })
  }
  handleChange = (state, value) => {
    this.setState({
      [state]: value,
    } as MyState)
  }
  handleLogin = (login: boolean) => {
    this.props.dispatch(tryLogin(login))
    this.props.handleClick("isLoggedIn", login)
    login && this.props.handleClick("loginRegisterShow", !login)
  }

  handleRegister = (register: boolean) => {
    this.props.handleClick("loginRegisterShow", !register)
    console.log("THE USER WAS REGISTERED: " + register)
  }

  render() {
    const translation = translations.buttons
    const { language, show } = this.props
    const { showLogin } = this.state
    const styleClasses = "flex justify-center fixed z-10"
    return (
      <div
        className={show ? styleClasses : "hidden"}
        style={
          show
            ? {
                width: "100vw",
                height: "120%",
                backgroundColor: "rgba(0,0,0,0.5)",
                top: "0%",
              }
            : {}
        }
        onClick={this.handleParentClick}
      >
        <div className="w-full max-w-lg flex justify-center">
          <div
            className="login-register-component bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 fixed w-1/2 max-w-lg"
            style={{ top: "25%" }}
            onClick={this.handleChildClick}
          >
            {showLogin ? (
              <Login
                login={this.handleLogin}
                translation={translation}
                language={language}
                handleViewChange={this.handleViewChange}
              />
            ) : (
              <Register
                register={this.handleRegister}
                translation={translation}
                language={language}
                handleViewChange={this.handleViewChange}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  language: state.language.language,
  isLoggedIn: state.isLoggedIn.isLoggedIn,
})

export default connect(mapStateToProps)(LoginRegister)
