export const retrieveCustomerPaymentMethod = paymentMethodId => {
  return fetch(process.env.CHANGE_CARD_URL, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      paymentMethodId: paymentMethodId,
    }),
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      return response
    })
}
