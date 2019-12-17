import React from 'react'
import { connect } from 'react-redux';

import Button from '../components/Button'
import translations from '../resources/translations/translations.json'
import { Languages } from '../enums/languages/languages';

type MyProps = {
    language: Languages
    show: boolean,
    handleClick: Function
}
class LoginRegister extends React.Component<MyProps> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            showLogin: true,
            showRegister: false
        }
    }

    handleParentClick = (e) => {
        e.preventDefault();
        this.props.handleClick('loginRegisterShow', false)
    }
    handleChildClick = (e) => {
        e.stopPropagation();
    }

    render() {
        const translation = translations.buttons
        const { language, show, handleClick } = this.props
        const styleClasses = 'flex justify-center absolute z-10'
        return (
            <div className={show ? styleClasses : 'hidden'} style={show ? { width: '100vw', height: '120%', backgroundColor: 'rgba(0,0,0,0.5)' } : {}} onClick={this.handleParentClick}>
                <div className="w-full max-w-lg flex justify-center">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 fixed w-1/2 max-w-lg" style={{ top: '25%' }} onClick={this.handleChildClick}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Username</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
                            </input>
                        </div>
                        <div className="mb-6">
                            <div className="block text-gray-700 text-sm font-bold mb-2">
                                Password</div>
                            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
                            <p className="text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className='flex justify-around w-full py-5'>
                                <Button
                                    handleClick={handleClick}
                                    classButtonDiv='flex-col'
                                    classButton={'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'}
                                    buttonTexts={translation}
                                    label={'login'}
                                    language={language} />
                                <Button
                                    handleClick={handleClick}
                                    classButtonDiv='flex-col'
                                    classButton={'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'}
                                    buttonTexts={translation}
                                    label={'register'}
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