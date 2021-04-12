import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BuyPoster from '../../components/BuyPosyer/BuyPoster';
import CheckoutForm from '../../components/CheckOutForm/CheckOutForm';
import { createStripeCustomerAction } from '../../state/actions/apiData.actions';
import { selectShowPaymentCard } from '../../state/selectors/appData.selector';
import { selectCustomerEmail, selectLoginStatus } from '../../state/selectors/userData.selector';

function CreateCustomerForm() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectLoginStatus)
  const email = useSelector(selectCustomerEmail)
  const showCard = useSelector(selectShowPaymentCard)
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(createStripeCustomerAction({ email: email }))
  }
  return (
    <>
      {showCard ? (
        <CheckoutForm />
      ) : (
        <BuyPoster
          additionalClass={""}
          imageUri={"/images/index-photo.png"}
          showText={true}
          imgHeader={"dont have?"}
          imgText={"Buy!"}
          handleClick={isLoggedIn ? handleSubmit : () => alert("Register")}
        />
      )}
    </>
  )
}

export default CreateCustomerForm
