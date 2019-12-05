import React from 'react';

import Copyright from '../components/Copyright';

const Footer = (props: any) => {
    return (
        <div className={'flex justify-center'}>
            <div className={'flex-col'}>
                <Copyright />
            </div>

        </div>
    )
}

export default Footer;