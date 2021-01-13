import React from 'react';
import { useSelector } from 'react-redux';

import { selectStripeSubscriptionId } from '../../state/selectors/userData.selector';

const CancelSubscription = (props: any) => {
  const stripeSubscriptionId = useSelector(selectStripeSubscriptionId)
  const handleClick = evt => {
    evt.preventDefault()
    return fetch(process.env.CANCEL_SUBSCRIPTION_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionId: stripeSubscriptionId,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(result => {
        console.log(result)
        alert("Subscription canceled")
      })
  }

  return (
    <div>
      <button onClick={handleClick}>CANCEL subscription</button>
    </div>
  )
}

export default CancelSubscription
