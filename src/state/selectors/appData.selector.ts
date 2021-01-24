import { RootState } from './../reducers/allReducers';

export const selectLoginRegisterFormShow = (state:RootState)=>state.appState.showLoginRegister
export const selectUserInfoShow = (state:RootState)=>state.appState.showUserInfo
export const selectResponseMsgStatus = (state:RootState)=>state.appState.responseMessageInfo