import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import BuyPoster from '../../components/BuyPosyer/BuyPoster';
import CheckoutForm from '../../components/CheckOutForm/CheckOutForm';
import { setUserStatus } from '../../state/actions/loginRegister';

function CreateCustomerForm(props) {
  const [email, setEmail] = useState("")
  const [customer, setCustomer] = useState(null)
  const [showCard, setShowCard] = useState<boolean>(false)
  const [showLogin, setShowLogin] = useState<boolean>(false)
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
          imageUri={"/images/wide-index-photo.jpg"}
          showText={true}
          imgHeader={"dont have?"}
          imgText={"Buy!"}
          handleClick={
            props.loginData.isLoggedIn ? handleSubmit : () => alert("Register")
          }
        />
      )}
    </>
  )
}
const mapStateToProps = state => ({
  loginData: state.isLoggedIn,
})
export default connect(mapStateToProps)(CreateCustomerForm)
