import { createReducer } from '@reduxjs/toolkit';

import { IUserState } from '../../interfaces/state/IState';
import {
  changeLoginStatusAction,
  loginAction,
  setLanguageAction,
  setLookupsAction,
  setStripeCustomerIdAction,
  setUserIdAction,
} from '../actions/actions';
import { Languages } from './../../enums/languages/languages';
import { lookups } from './../initialState';

export interface UserState {
  userInfo:IUserState,
  userId:number,
  language:Languages
  lookups:any[]
}

export const initialUserState:UserState = {
    userInfo: {
      isLoggedIn: false,
    canUpload: false,
    email: "",
    subscribed: false,
    stripeCustomerId: "",
    subscriptionId: "",
    },
    userId:0,
    language: Languages.LITHUANIA,
    lookups:[]
  }

  export const userReducer = createReducer<UserState>(
    initialUserState,
    (builder)=>{
      builder
        .addCase(loginAction, (state, {payload})=>({
          ...state,
          userInfo:payload,
        }))
        .addCase(setLanguageAction, (state, {payload})=>({
          ...state,
          language:payload,
        }))
        .addCase(setUserIdAction, (state, {payload})=>({
          ...state,
          userId:payload,
        }))
        .addCase(setStripeCustomerIdAction,(state,{payload})=>({
          ...state,
          userInfo:{
            ...state.userInfo,
            stripeCustomerId:payload
          }
        }))
        .addCase(changeLoginStatusAction, (state, {payload})=>({
          ...state,
          userInfo:{
            ...state.userInfo,
            isLoggedIn:payload,
          }
        }))
        .addCase(setLookupsAction, (state, {payload})=>({
          ...state,
          lookups:payload
        }))
    }
  )