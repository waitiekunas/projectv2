import React from 'react';

import ClassList from './ClassList';
import Button from '../components/Button';
import { Languages } from '../enums/languages/languages';
import translations from '../resources/translations/translations.json';

const handleClick = (e) => {
    e.preventDefault();
    console.log('clicked')

}
const ClassListFullContent = () => {

    const translation = translations.buttons
    return (
        <div className={'max-height-40-proc flex justify-center flex-col'}>
            <div className={'flex justify-center flex-row'}>
                <h2>Our products</h2>
            </div>

            <ClassList />
            <Button
                handleClick={handleClick}
                classButtonDiv={'p-12'}
                buttonTexts={translation}
                label={'subscriptions'}
                language={Languages.LITHUANIA}
                classButton={"w-64 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} />


        </div>
    )
}

export default ClassListFullContent;