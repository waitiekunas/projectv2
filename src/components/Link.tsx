import React from 'react';

const Link = (props:any) =>{
    return (
        <div>
           <a className={props.class} href={props.href}>{props.linkText}</a>
        </div>
    )
}

export default Link;