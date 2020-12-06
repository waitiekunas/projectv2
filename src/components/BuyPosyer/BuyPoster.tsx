import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import styled from 'styled-components';

import { translations } from '../../resources/translations/translations';
import { Button } from '../Button/Button';

const TextBox = styled.div`
  display: flex;
  justify-center: center;
  flex-direction: column;
  padding-left: 1rem;
  max-height: 80%;
  max-width: 100%;
`

const BuyPoster = (props: any) => {
  const btnClasses =
    "button-navbar-padding navbar-btn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"
  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
      },
    ],
  }
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh")
  return (
    <div className={`${props.additionalClass} relative`}>
      <img src={props.imageUri} alt={"description"} />
      {props.showText && (
        <div className="image-text-block flex justify-center opacity-50 flex-row">
          <TextBox>
            <h4>{props.imgHeader}</h4>
            <p>{props.imgText}</p>
          </TextBox>
          <Button
            handleClick={props.handleClick}
            classButtonDiv={"flex-col"}
            buttonTexts={translations}
            label={"starLesson"}
            language={props.language}
            classButton={btnClasses}
          />
        </div>
      )}
      {/* <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm />
      </Elements> */}
    </div>
  )
}
export default BuyPoster
