import React from 'react';

import Button from '../components/Button';
import Logo from '../components/Logo';
import DropDown from '../components/DropDown';
import { Languages } from '../enums/languages/languages';
import translations from '../resources/translations/translations.json';
import LoginRegister from './LoginRegister'
import { tryLogin } from '../state/actions/loginRegister';


import { connect } from 'react-redux';


type MyProps = {
    language: Languages
    dispatch: any
};
type MyState = {
    loginRegisterShow: boolean
    isLoggedIn: boolean
};

class NavBar extends React.Component<MyProps, MyState> {
    // TODO: create interface for props
    constructor(props: MyProps) {
        super(props);
        this.state = {
            loginRegisterShow: false,
            isLoggedIn: false
        };
    }
    handleClick = (e) => {
        e.preventDefault();
        console.log('clicked')
    }
    handleLoginRegisterView = (e) => {
        e.preventDefault();
        this.handleChange('loginRegisterShow', !this.state.loginRegisterShow)
    }
    handleChange = (state, value) => {
        this.setState({
            [state]: value
        } as MyState)
    }
    handleLogout = () => {
        this.handleChange('isLoggedIn', false);
        this.props.dispatch(
            tryLogin(false))
    }
    render() {
        const { language, dispatch } = this.props;
        const { loginRegisterShow, isLoggedIn } = this.state
        const translation = translations.buttons
        const btnClasses = 'navbar-btn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
        return (
            <div className='flex justify-center max-height-10-proc'>
                <div className='nav_bar flex justify-around w-full py-5'>
                    <DropDown />
                    <Button
                        handleClick={this.handleClick}
                        classButtonDiv={'flex-col navbar-btn-cont'}
                        buttonTexts={translation}
                        label={'subscriptions'}
                        language={language}
                        classButton={btnClasses} />
                    <Logo />

                    <Button
                        handleClick={this.handleClick}
                        classButtonDiv={'flex-col navbar-btn-cont'}
                        buttonTexts={translation}
                        label={'contacts'}
                        language={language}
                        classButton={btnClasses} />
                    <Button
                        handleClick={isLoggedIn ? this.handleLogout : this.handleLoginRegisterView}
                        classButtonDiv={'flex-col navbar-btn-cont'}
                        buttonTexts={translation}
                        label={isLoggedIn ? 'logout' : 'signUp-signIn'}
                        language={language}
                        classButton={btnClasses} />

                    <LoginRegister
                        show={loginRegisterShow}
                        handleClick={this.handleChange}
                        dispatch={dispatch}
                    />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    language: state.language.language
});
export default connect(mapStateToProps)(NavBar)