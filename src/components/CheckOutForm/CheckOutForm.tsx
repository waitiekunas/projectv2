import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createSubscription, retryInvoiceWithNewPaymentMethod } from '../../utils/paymentUtils';
import CardSection from '../CardSection/CardSection';
import { Modal } from '../Modal/Modal';

const CheckoutForm = ({ customerId }) => {
  const [showCard, setShowCard] = useState<boolean>(true)
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
        retryInvoiceWithNewPaymentMethod({
          customerId,
          paymentMethodId,
          invoiceId,
          priceId,
        })
      } else {
        // Create the subscription
        createSubscription({ customerId, paymentMethodId, priceId })
      }
    }
  }
  return (
    <>
      {showCard ? (
        <Modal onCloseClick={() => setShowCard(false)}>
          <form onSubmit={handleSubmit}>
            <CardSection />
            <button disabled={!stripe}>Confirm order</button>
          </form>
        </Modal>
      ) : null}
    </>
  )
}
const mapStateToProps = state => ({
  customerId: state.isLoggedIn.stripeCustomerId,
})
export default connect(mapStateToProps)(CheckoutForm)
