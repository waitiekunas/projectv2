import React from 'react';
import { Link } from "gatsby";
import logo from '/images/logo192.png';

const Logo = (props: any) => {
    return (
        <div className={props.class}>
            <Link to='/'>
                <img src={'/images/logo192.png'} className="logo" alt="logo" />
            </Link>
        </div>
    )
}

export default Logo;