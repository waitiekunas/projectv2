import React from 'react'
import { connect, useDispatch } from 'react-redux';

import Button from '../components/Button'
import Login from '../components/Login'
import Register from '../components/Register'
import translations from '../resources/translations/translations.json'
import { Languages } from '../enums/languages/languages';
import { loginUser } from '../backEnd/LoginUtils'
import { tryLogin } from '../state/actions/loginRegister';
import { bindActionCreators } from 'redux';



type MyProps = {
    language: Languages
    show: boolean,
    handleClick: Function
    dispatch: any
}
type MyState = {
    showLogin: boolean
    showRegister: boolean
    loginName: string
    password: string
}
class LoginRegister extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            showLogin: true,
            showRegister: false,
            loginName: '',
            password: ''
        }
    }


    handleParentClick = (e) => {
        e.preventDefault();
        this.props.handleClick('loginRegisterShow', false);
        this.setState({
            showLogin: true,
            showRegister: false
        })
    }
    handleChildClick = (e) => {
        e.stopPropagation();
    }
    handleViewChange = (e) => {
        e.preventDefault();
        this.setState({
            showLogin: !this.state.showLogin,
            showRegister: this.state.showRegister
        })
    }
    handleChange = (state, value) => {
        this.setState({
            [state]: value
        } as MyState)
    }
    handleLogin = () => {
        this.props.dispatch(
            tryLogin(loginUser({
                username: this.state.loginName,
                password: this.state.password
            })))
    }
    render() {

        const translation = translations.buttons
        const { language, show, handleClick } = this.props
        const { showLogin } = this.state
        const styleClasses = 'flex justify-center fixed z-10'
        return (
            <div className={show ? styleClasses : 'hidden'} style={show ? { width: '100vw', height: '120%', backgroundColor: 'rgba(0,0,0,0.5)', top: '0%' } : {}} onClick={this.handleParentClick}>
                <div className="w-full max-w-lg flex justify-center">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 fixed w-1/2 max-w-lg" style={{ top: '25%' }} onClick={this.handleChildClick}>
                        {
                            showLogin ?
                                <Login handleChange={this.handleChange} /> :
                                <Register handleChange={this.handleChange} />
                        }
                        <div className="flex items-center justify-center">
                            <div className='flex justify-around w-full py-5'>
                                <Button
                                    handleClick={showLogin ? this.handleLogin : this.handleViewChange}
                                    classButtonDiv='flex-col'
                                    classButton={'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'}
                                    buttonTexts={translation}
                                    label={showLogin ? 'login' : 'toLogin'}
                                    language={language} />
                                <Button
                                    handleClick={showLogin ? this.handleViewChange : handleClick}
                                    classButtonDiv='flex-col'
                                    classButton={'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'}
                                    buttonTexts={translation}
                                    label={showLogin ? 'toRegister' : 'register'}
                                    language={language} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.language
});

export default connect(mapStateToProps)(LoginRegister)