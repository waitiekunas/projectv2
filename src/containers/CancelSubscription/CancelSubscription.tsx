import React from 'react';
import { connect } from 'react-redux';

const CancelSubscription = (props: any) => {
  const handleClick = evt => {
    evt.preventDefault()
    return fetch(process.env.CANCEL_SUBSCRIPTION_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionId: props.stripeId,
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

const mapStateToProps = state => ({
  stripeId: state.isLoggedIn.subscriptionId,
})
export default connect(mapStateToProps)(CancelSubscription)
