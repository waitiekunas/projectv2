import React from 'react';
import { connect } from 'react-redux';

import { Box } from '../../components/Box/Box';
import Button from '../../components/Button/Button';
import DropDown from '../../components/DropDown/DropDown';
import Logo from '../../components/Logo/Logo';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
import { tryLogin } from '../../state/actions/loginRegister';
import LoginRegister from '../LoginRegister/LoginRegister';

type MyProps = {
  language: Languages
  dispatch: any
}
type MyState = {
  loginRegisterShow: boolean
  isLoggedIn: boolean
}

class NavBar extends React.Component<MyProps, MyState> {
  // TODO: create interface for props
  constructor(props: MyProps) {
    super(props)
    this.state = {
      loginRegisterShow: false,
      isLoggedIn: false,
    }
  }
  handleClick = e => {
    e.preventDefault()
    console.log("clicked")
  }
  handleLoginRegisterView = e => {
    e.preventDefault()
    this.handleChange("loginRegisterShow", !this.state.loginRegisterShow)
  }
  handleChange = (state, value) => {
    this.setState({
      [state]: value,
    } as MyState)
  }
  handleLogout = () => {
    this.handleChange("isLoggedIn", false)
    this.props.dispatch(tryLogin(false))
  }
  render() {
    const { language, dispatch } = this.props
    const { loginRegisterShow, isLoggedIn } = this.state
    return (
      <div className="flex justify-center max-height-10-proc">
        <div className="nav_bar flex justify-around w-full py-5">
          <DropDown />

          <Logo class={"navbar-btn-cont flex justify-center"} />
          <Box
            size={{
              maxWidth: "200px",
              width: "25%",
              height: "42px",
            }}
            flex={{
              direction: "column",
              justify: "center",
            }}
            align={{ self: "center" }}
          >
            <Button
              handleClick={
                isLoggedIn ? this.handleLogout : this.handleLoginRegisterView
              }
              buttonTexts={translations}
              label={isLoggedIn ? "logout" : "signUp-signIn"}
              language={language}
              classButton={DEFAULT_BUTTON_CLASSES}
            />
          </Box>
          {this.state.loginRegisterShow && (
            <LoginRegister
              show={loginRegisterShow}
              handleClick={this.handleChange}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  language: state.language.language,
})
export default connect(mapStateToProps)(NavBar)
