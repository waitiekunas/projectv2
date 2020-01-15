import React from 'react';
import logo from '/images/logo192.png';

const Logo = (props: any) => {
    return (
        <div className={props.class}>
            <img src={'/images/logo192.png'} className="logo" alt="logo" />
        </div>
    )
}

export default Logo;