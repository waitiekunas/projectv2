import React from 'react';
import { getTranslations } from '../utils/utils'

const Button = (props: any) => {
    debugger
    const { buttonTexts, language, label } = props
    return (
        <div className={`${props.classNames} flex justify-center`}>
            <button className={props.className}>{getTranslations(buttonTexts, language, label)}</button>
        </div>
    )
}

export default Button;