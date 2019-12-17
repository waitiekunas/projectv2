import React from 'react'
import { connect } from 'react-redux';

import Button from '../components/Button'
import Login from '../components/Login'
import Register from '../components/Register'
import translations from '../resources/translations/translations.json'
import { Languages } from '../enums/languages/languages';

type MyProps = {
    language: Languages
    show: boolean,
    handleClick: Function
}
type MyState = {
    showLogin: boolean
    showRegister: boolean
}
class LoginRegister extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            showLogin: true,
            showRegister: false
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
                                <Login /> :
                                <Register />
                        }
                        <div className="flex items-center justify-center">
                            <div className='flex justify-around w-full py-5'>
                                <Button
                                    handleClick={showLogin ? handleClick : this.handleViewChange}
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
    language: state.languageRed.language
});
export default connect(mapStateToProps, null)(LoginRegister)