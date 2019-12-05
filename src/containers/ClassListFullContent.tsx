import React from 'react';

import ClassList from './ClassList';
import Button from '../components/Button';

const ClassListFullContent = (props: any) => {
    return (
        <div className={'max-height-40-proc flex justify-center flex-col'}>
            <div className={'flex justify-center flex-row'}>
                <h2>Our products</h2>
            </div>

            <ClassList />
            <Button
                classNames={'p-12'}
                buttonText={'Subscriptions'}
                className={"w-64 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />


        </div>
    )
}

export default ClassListFullContent;