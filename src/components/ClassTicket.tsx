import React from 'react';

import Image from './Image copy';

const ClassTicket = (props: any) => {
    return (
        <div>
            <div className={'max-height-10-proc'}>
                <Image
                    additionalClass={'m-1 max-height-80-proc flex justify-center'}
                    imageUri={props.imageUri}
                    showText={false} />
                <div className={'flex justify-center m-1'}>
                    <h4>{props.text}</h4>
                </div>

            </div>
        </div>
    )
}

export default ClassTicket;