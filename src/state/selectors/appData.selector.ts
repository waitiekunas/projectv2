import { RootState } from './../reducers/allReducers';

export const selectLoginRegisterFormShow = (state: RootState) =>
  state.appState.showLoginRegister
export const selectUserInfoShow = (state: RootState) =>
  state.appState.showUserInfo
export const selectResponseMsgStatus = (state: RootState) =>
  state.appState.responseMessageInfo
export const selectResetPasswordShow = (state: RootState) =>
  state.appState.showResetPassword
export const selectSpinnerState = (state: RootState) =>
  state.appState.showSpinner
export const selectShowCancelSubscription = (state: RootState) =>
  state.appState.showCancelSubscription
export const selectShowPaymentCard = (state: RootState) =>
  state.appState.showPaymentCard
export const selectAuthorLessonsShow = (state: RootState) =>
  state.appState.showAuthorLessons
