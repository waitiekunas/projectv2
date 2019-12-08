import React from 'react';
import logo from '../../public/images/logo192.png';

const Logo = (props: any) => {
    return (
        <div>
            <img src={logo} className="logo" alt="logo" />
        </div>
    )
}

export default Logo;