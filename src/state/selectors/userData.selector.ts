import { RootState } from './../reducers';

export const selectUserId = (state:RootState)=>state.userInformation.userId
export const selectLanguage = (state:RootState)=>state.userInformation.language
export const selectStripeCustomerId = (state:RootState)=>state.userInformation.userInfo.stripeCustomerId
export const selectLoginStatus = (state:RootState)=>state.userInformation.userInfo.isLoggedIn
export const selectStripeSubscriptionId = (state:RootState)=>state.userInformation.userInfo.subscriptionId
export const selectCustomerEmail = (state:RootState)=>state.userInformation.userInfo.email
export const selectUserInfo = (state:RootState)=>state.userInformation.userInfo