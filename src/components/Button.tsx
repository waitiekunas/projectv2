import React from 'react';
import { getTranslations } from '../utils/utils'
import { TranslationItem } from '../interfaces/translations/ITranslations'
import { Languages } from '../enums/languages/languages';

type MyProps = {
    buttonTexts: Array<TranslationItem>
    language: Languages
    label: string
    classButtonDiv: string
    classButton: string,
    handleClick: any
}
const Button = (props: MyProps) => {
    const { buttonTexts, language, label, handleClick } = props
    return (
        <div className={`${props.classButtonDiv} flex justify-center`}>
            <button className={props.classButton} onClick={handleClick}>{getTranslations(buttonTexts, language, label)}</button>
        </div>
    )
}

export default Button;