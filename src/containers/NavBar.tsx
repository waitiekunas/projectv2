import React from 'react';

import Button from '../components/Button';
import Logo from '../components/Logo';
import DropDown from '../components/DropDown';
import { Languages } from '../enums/languages/languages';
import translations from '../resources/translations/translations.json';
import LoginRegister from './LoginRegister'

import { connect } from 'react-redux';


type MyProps = {
    language: Languages
};
type MyState = {
    loginRegisterShow: boolean
};

class NavBar extends React.Component<MyProps, MyState> {
    // TODO: create interface for props
    constructor(props: MyProps) {
        super(props);
        this.state = {
            loginRegisterShow: false
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
    render() {
        const { language } = this.props;
        const { loginRegisterShow } = this.state
        const translation = translations.buttons
        return (
            <div className='flex justify-center max-height-10-proc'>
                <div className='nav_bar flex justify-around w-2/3 py-5'>
                    <DropDown />
                    <Button
                        handleClick={this.handleClick}
                        classButtonDiv={'flex-col'}
                        buttonTexts={translation}
                        label={'subscriptions'}
                        language={language}
                        classButton={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />
                    <Logo />

                    <Button
                        handleClick={this.handleClick}
                        classButtonDiv={'flex-col'}
                        buttonTexts={translation}
                        label={'contacts'}
                        language={language}
                        classButton={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />
                    <Button
                        handleClick={this.handleLoginRegisterView}
                        classButtonDiv={'flex-col'}
                        buttonTexts={translation}
                        label={'signUp-signIn'}
                        language={language}
                        classButton={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />

                    <LoginRegister
                        show={loginRegisterShow}
                        handleClick={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    language: state.languageRed.language
});
export default connect(mapStateToProps, null)(NavBar)