import { RootState } from './../reducers/allReducers';

export const selectUserId = (state:RootState)=>state.userInformation.userId
export const selectLanguage = (state:RootState)=>state.userInformation.language
export const selectStripeCustomerId = (state:RootState)=>state.userInformation.userInfo.stripeCustomerId
export const selectLoginStatus = (state:RootState)=>state.userInformation.userInfo.isLoggedIn
export const selectStripeSubscriptionId = (state:RootState)=>state.userInformation.userInfo.subscriptionId
export const selectCustomerEmail = (state:RootState)=>state.userInformation.userInfo.email
export const selectUserInfo = (state:RootState)=>state.userInformation.userInfo
export const selectRegisterStatus = (state:RootState)=>state.userInformation.registerSuccess
export const selectIsAuthorInfoExists = (state:RootState)=> state.userInformation.userInfo.authorDescription && state.userInformation.userInfo.authorImageUrl?true:false