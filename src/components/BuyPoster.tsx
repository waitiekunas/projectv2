import React from 'react';
import Button from '../components/Button'
import translations from '../resources/translations/translations.json';

const BuyPoster = (props: any) => {
    const btnClasses = 'button-navbar-padding navbar-btn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded'
    const translation = translations.buttons
    const handleClick = (e) => {
        e.preventDefault()
        alert("Buy! should appear register or login info or buy window")
    }
    return (
        <div className={`${props.additionalClass} relative`}>
            <img src={props.imageUri} alt={'description'} />
            {props.showText &&
                <div className="image-text-block flex justify-center flex-col opacity-50">
                    <h4 className={'pt-4'}>{props.imgHeader}</h4>
                    <p>{props.imgText}</p>
                    <Button
                        handleClick={handleClick}
                        classButtonDiv={'flex-col'}
                        buttonTexts={translation}
                        label={'starLesson'}
                        language={props.language}
                        classButton={btnClasses}
                    />
                </div>}
        </div>
    )

}
export default BuyPoster;