import React from 'react';
import { Link } from "gatsby"

import Image from './Image copy';

const ClassTicket = (props: any) => {
    const handleClick = (e) => {
        e.preventDefault()
        props.handleChange('loginName', e.target.value)
    }
    return (
        <div>
            <Link className={"class-ticket"} to={`/topic-view/`} state={{ classInfo: props }}>
                <div className={'max-height-10-proc'}>
                    <Image
                        additionalClass={'m-1 max-height-80-proc flex justify-center'}
                        imageUri={props.imageUri}
                        showText={false} />
                    <div className={'flex justify-center m-1'}>
                        <h4>{props.text}</h4>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default ClassTicket;