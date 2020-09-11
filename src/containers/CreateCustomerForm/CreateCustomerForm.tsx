import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { setUserStatus } from '../../state/actions/loginRegister';

function CreateCustomerForm(props) {
  const [email, setEmail] = useState("")
  const [customer, setCustomer] = useState(null)
  useEffect(() => {
    setEmail(props.loginData.email)
  }, [])
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
        setCustomer(result.customer)
        let updatedLoginData = props.loginData
        updatedLoginData.stripeCustomerId = result.customer.id
        props.dispatch(setUserStatus(updatedLoginData))
      })
  }
  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <div>
        <input
          id="email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
      </div>
      ​
      <button id="email-submit" type="submit">
        <span id="button-text">Sign up</span>
      </button>
    </form>
  )
}
const mapStateToProps = state => ({
  loginData: state.loginData.isLoggedIn,
})
export default connect(mapStateToProps)(CreateCustomerForm)
