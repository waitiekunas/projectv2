import React from 'react';

import Button from './Button';
import { Property } from '@babel/types';
import Link from './Link';

type MyProps = {};
type MyState = {

};

class DropDown extends React.Component<MyProps, MyState> {
    // TODO: create interface for props
    constructor(props: Property) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className='flex-col flex justify-center h-full'>
                <div className='dropdown'>
                    <Button
                        className={'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'}
                        buttonText={'Trainings'} />
                    <div className="dropdown-content flex justify-around flex-col">
                        <Link class={"dropdown-link"} href="#" linkText={"Link 1"} searchFilter={{}} />
                        <Link class={"dropdown-link"} href="#" linkText={"Link 2"} searchFilter={{}} />
                        <Link class={"dropdown-link"} href="#" linkText={"Link 3"} searchFilter={{}} />
                    </div>
                </div>
            </div>
        )
    }
}

export default DropDown;