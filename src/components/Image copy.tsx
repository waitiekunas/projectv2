import React from 'react';


const Image = (props: any) => {
    return (
        <div className={`${props.additionalClass} relative`}>
            <img src={props.imageUri} alt={'description'} />
            {props.showText &&
                <div className="image-text-block flex justify-center flex-col">
                    <h4 className={'pt-4'}>{props.imgHeader}</h4>
                    <p>{props.imgText}</p>
                </div>}
        </div>
    )

}
export default Image;