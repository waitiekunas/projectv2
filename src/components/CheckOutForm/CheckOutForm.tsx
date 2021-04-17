import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setPaymentCardShowAction } from '../../state/actions/actions';
import { createStripeSubscriptionAction, retryStripeSubscriptionAction } from '../../state/actions/apiData.actions';
import { selectShowPaymentCard } from '../../state/selectors/appData.selector';
import { selectStripeCustomerId } from '../../state/selectors/userData.selector';
import { Button } from '../Button/Button';
import { CardDetails } from '../CardDetails/CardDetails';
import CardSection from '../CardSection/CardSection';

const StyledDiv = styled.div`
  width: 50%;
  position: fixed;
  margin-bottom: 1rem;
  padding-bottom: 2rem;
  padding-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  @media (max-width: 760px) {
    width: 90%;
  }
  top: 25%;
`

const StyledRight = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`
const CheckoutForm = () => {
  const dispatch = useDispatch()
  const customerId = useSelector(selectStripeCustomerId)
  const showCard = useSelector(selectShowPaymentCard)
  const priceId = "price_1HLREkJtXEcPW0ZhZRnicWYk"
  const stripe = useStripe()
  const elements = useElements()
  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)
    // If a previous payment was attempted, get the latest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      "latestInvoicePaymentIntentStatus"
    )
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })
    if (error) {
      console.log("[createPaymentMethod error]", error)
    } else {
      console.log("[PaymentMethod]", paymentMethod)
      const paymentMethodId = paymentMethod.id
      if (latestInvoicePaymentIntentStatus === "requires_payment_method") {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem("latestInvoiceId")
        dispatch(
          retryStripeSubscriptionAction({
            customerId,
            paymentMethodId,
            invoiceId,
            priceId,
          })
        )
      } else {
        // Create the subscription
        dispatch(
          createStripeSubscriptionAction({
            customerId,
            paymentMethodId,
            priceId,
          })
        )
      }
    }
  }
  return (
    <>
      {showCard ? (
        <CardDetails
          onCloseClick={() => dispatch(setPaymentCardShowAction(false))}
        >
          <StyledDiv>
            <StyledRight
              onClick={() => dispatch(setPaymentCardShowAction(false))}
            >
              x
            </StyledRight>
            <form onSubmit={handleSubmit}>
              <CardSection />
              <Button
                color="primary"
                variant="contained"
                disabled={!stripe}
                type="submit"
              >
                Confirm order
              </Button>
            </form>
          </StyledDiv>
        </CardDetails>
      ) : null}
    </>
  )
}

export default CheckoutForm
