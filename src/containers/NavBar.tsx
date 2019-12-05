import React from 'react';

import Button from '../components/Button';
import { Property } from '@babel/types';
import Logo from '../components/Logo';
import DropDown from '../components/DropDown';


type MyProps = {};
type MyState = {
    navBarItemsRight: Array<string>,
    navBarItemsLeft: Array<string>
};

class NavBar extends React.Component<MyProps, MyState> {
    // TODO: create interface for props
    constructor(props: Property) {
        super(props);
        this.state = {
            navBarItemsRight: ['text3', 'text4'],
            navBarItemsLeft: ['text2'],
        };
    }

    render() {
        const { navBarItemsRight, navBarItemsLeft } = this.state;
        return (
            <div className='flex justify-center max-height-10-proc'>
                <div className='nav_bar flex justify-around w-2/3 py-5'>
                    <DropDown />
                    {navBarItemsLeft.map(
                        (text: string, index: number) =>
                            <Button
                                key={index}
                                classNames={'flex-col'}
                                buttonText={text}
                                className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />
                    )}
                    <Logo />
                    {navBarItemsRight.map(
                        (text: string, index: number) =>
                            <Button
                                key={index}
                                classNames={'flex-col'}
                                buttonText={text}
                                className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />
                    )}
                </div>
            </div>
        )
    }
}

export default NavBar