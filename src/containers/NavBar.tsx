import React from 'react';

import Button from '../components/Button';
import { Property } from '@babel/types';
import Logo from '../components/Logo';
import DropDown from '../components/DropDown';
import { Languages } from '../enums/languages/languages';
import translations from '../resources/translations/translations.json';

import { connect } from 'react-redux';


type MyProps = {
    language: Languages
};
type MyState = {
    navBarItemsRight: Array<string>,
    navBarItemsLeft: Array<string>,
};

class NavBar extends React.Component<MyProps, MyState> {
    // TODO: create interface for props
    constructor(props: MyProps) {
        super(props);
        this.state = {
            navBarItemsRight: ['text3', 'text4'],
            navBarItemsLeft: ['text2'],
        };
    }

    render() {
        const { language } = this.props;
        const translation = translations.layoutComponenents.buttons
        return (
            <div className='flex justify-center max-height-10-proc'>
                <div className='nav_bar flex justify-around w-2/3 py-5'>
                    <DropDown />
                    <Button
                        classNames={'flex-col'}
                        buttonTexts={translation}
                        label={'subscriptions'}
                        language={language}
                        className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />
                    <Logo />

                    <Button
                        classNames={'flex-col'}
                        buttonTexts={translation}
                        label={'contacts'}
                        language={language}
                        className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />
                    <Button
                        classNames={'flex-col'}
                        buttonTexts={translation}
                        label={'signUp-signIn'}
                        language={language}
                        className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    language: state.languageRed.language
});
export default connect(mapStateToProps, null)(NavBar)