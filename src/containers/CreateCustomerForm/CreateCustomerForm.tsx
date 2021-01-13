import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BuyPoster from '../../components/BuyPosyer/BuyPoster';
import CheckoutForm from '../../components/CheckOutForm/CheckOutForm';
import { setStripeCustomerIdAction } from '../../state/actions/actions';
import { selectCustomerEmail, selectLoginStatus } from '../../state/selectors/userData.selector';

function CreateCustomerForm() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectLoginStatus)
  const email = useSelector(selectCustomerEmail)
  const [showCard, setShowCard] = useState<boolean>(false)

  const handleSubmit = evt => {
    evt.preventDefault()
    return fetch(process.env.CREATE_CUSTOMER_STRIPE_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(result => {
        dispatch(setStripeCustomerIdAction(result.customer.id))
        setShowCard(true)
      })
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
