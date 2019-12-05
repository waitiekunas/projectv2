import React from 'react';

const Button = (props:any) =>{
    return (
        <div className={`${props.classNames} flex justify-center`}>
            <button className={props.className}>{props.buttonText}</button>
        </div>
    )
}

export default Button;