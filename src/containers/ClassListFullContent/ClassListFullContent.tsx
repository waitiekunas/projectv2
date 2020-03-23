import React from 'react';

import ClassList from '../ClassList/ClassList';
import Button from '../../components/Button/Button';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Box } from '../../components/Box/Box';

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
            <Box size={{
                maxWidth: "200px",
                width: "25%",
                height: "42px"
            }}
                flex={{
                    direction: "column",
                    justify: "center"
                }}
                align={{ self: "center" }}
            >
                <Button
                    handleClick={handleClick}
                    buttonTexts={translation}
                    label={'subscriptions'}
                    language={Languages.LITHUANIA}
                    classButton={DEFAULT_BUTTON_CLASSES} />
            </Box>

        </div>
    )
}

export default ClassListFullContent;