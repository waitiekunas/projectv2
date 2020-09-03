import stripe from '@stripe/react-stripe-js';

export const createSubscription = ({
  customerId,
  paymentMethodId,
  priceId,
}) => {
  return (
    fetch(process.env.CREATE_SUBSCRIPTION_STRIPE_URL, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        customerId: customerId,
        paymentMethodId: paymentMethodId,
        priceId: priceId,
      }),
    })
      .then(response => {
        return response.json()
      })
      // If the card is declined, display an error to the user.
      .then(result => {
        if (result.error) {
          // The card had an error when trying to attach it to a customer.
          throw result
        }
        return result
      })
      // Normalize the result to contain the object returned by Stripe.
      // Add the additional details we need.
      .then(result => {
        return {
          paymentMethodId: paymentMethodId,
          priceId: priceId,
          subscription: result,
        }
      })
      // Some payment methods require a customer to be on session
      // to complete the payment process. Check the status of the
      // payment intent to handle these actions.
      .then(handlePaymentThatRequiresCustomerAction)
      // If attaching this card to a Customer object succeeds,
      // but attempts to charge the customer fail, you
      // get a requires_payment_method error.
      .then(handleRequiresPaymentMethod)
      // No more actions required. Provision your service for the user.
      .then(onSubscriptionComplete)
      .catch(error => {
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
        showCardError(error)
      })
  )
}

const onSubscriptionComplete = result => {
  // Payment was successful.
  if (result.subscription.status === "active") {
    // Change your UI to show a success message to your customer.
    // Call your backend to grant access to your service based on
    // `result.subscription.items.data[0].price.product` the customer subscribed to.
  }
}

const handlePaymentThatRequiresCustomerAction = ({
  subscription,
  invoice,
  priceId,
  paymentMethodId,
  isRetry,
}) => {
  if (subscription && subscription.status === "active") {
    // Subscription is active, no customer actions required.
    return { subscription, priceId, paymentMethodId }
  }

  // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
  // If it's a retry, the payment intent will be on the invoice itself.
  let paymentIntent = invoice
    ? invoice.payment_intent
    : subscription.latest_invoice.payment_intent

  if (
    paymentIntent.status === "requires_action" ||
    (isRetry === true && paymentIntent.status === "requires_payment_method")
  ) {
    return stripe
      .confirmCardPayment(paymentIntent.client_secret, {
        payment_method: paymentMethodId,
      })
      .then(result => {
        if (result.error) {
          // Start code flow to handle updating the payment details.
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc).
          throw result
        } else {
          if (result.paymentIntent.status === "succeeded") {
            // Show a success message to your customer.
            // There's a risk of the customer closing the window before the callback.
            // We recommend setting up webhook endpoints later in this guide.
            return {
              priceId: priceId,
              subscription: subscription,
              invoice: invoice,
              paymentMethodId: paymentMethodId,
            }
          }
        }
      })
      .catch(error => {
        displayError(error)
      })
  } else {
    // No customer action needed.
    return { subscription, priceId, paymentMethodId }
  }
}

const handleRequiresPaymentMethod = ({
  subscription,
  paymentMethodId,
  priceId,
}) => {
  if (subscription.status === "active") {
    // subscription is active, no customer actions required.
    return { subscription, priceId, paymentMethodId }
  } else if (
    subscription.latest_invoice.payment_intent.status ===
    "requires_payment_method"
  ) {
    // Using localStorage to manage the state of the retry here,
    // feel free to replace with what you prefer.
    // Store the latest invoice ID and status.
    localStorage.setItem("latestInvoiceId", subscription.latest_invoice.id)
    localStorage.setItem(
      "latestInvoicePaymentIntentStatus",
      subscription.latest_invoice.payment_intent.status
    )
    throw { error: { message: "Your card was declined." } }
  } else {
    return { subscription, priceId, paymentMethodId }
  }
}

export const retryInvoiceWithNewPaymentMethod = ({
  customerId,
  paymentMethodId,
  invoiceId,
  priceId,
}) => {
  return (
    fetch("/retry-invoice", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        customerId: customerId,
        paymentMethodId: paymentMethodId,
        invoiceId: invoiceId,
      }),
    })
      .then(response => {
        return response.json()
      })
      // If the card is declined, display an error to the user.
      .then(result => {
        if (result.error) {
          // The card had an error when trying to attach it to a customer.
          throw result
        }
        return result
      })
      // Normalize the result to contain the object returned by Stripe.
      // Add the additional details we need.
      .then(result => {
        return {
          // Use the Stripe 'object' property on the
          // returned result to understand what object is returned.
          invoice: result,
          paymentMethodId: paymentMethodId,
          priceId: priceId,
          isRetry: true,
        }
      })
      // Some payment methods require a customer to be on session
      // to complete the payment process. Check the status of the
      // payment intent to handle these actions.
      .then(handlePaymentThatRequiresCustomerAction)
      // No more actions required. Provision your service for the user.
      .then(onSubscriptionComplete)
      .catch(error => {
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
        displayError(error)
      })
  )
}
