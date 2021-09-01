import { createReducer } from "@reduxjs/toolkit"

import { ResponseMessageInfo } from "../../types/appState"
import {
  setPaymentCardShowAction,
  setResetPasswordShow,
  setResponseMessageAction,
  setShowAuthorLessonsAction,
  setShowCancelSubscriptionAction,
  setShowLoginRegisterForm,
  setShowSpinner,
  setShowUserInfo,
} from "./../actions/actions"

export interface AppState {
  showLoginRegister: boolean
  showUserInfo: boolean
  responseMessageInfo: ResponseMessageInfo
  showResetPassword: boolean
  showSpinner: boolean
  showCancelSubscription: boolean
  showPaymentCard: boolean
  showAuthorLessons: boolean
  showAuthorDataMissing: boolean
}

export const initialAppState: AppState = {
  showLoginRegister: false,
  showUserInfo: false,
  responseMessageInfo: {
    text: "",
    show: false,
  },
  showResetPassword: false,
  showSpinner: false,
  showCancelSubscription: false,
  showPaymentCard: false,
  showAuthorLessons: false,
  showAuthorDataMissing: false,
}

export const appReducer = createReducer<AppState>(initialAppState, builder => {
  builder
    .addCase(setShowLoginRegisterForm, (state, { payload }) => ({
      ...state,
      showLoginRegister: payload,
    }))
    .addCase(setShowUserInfo, (state, { payload }) => ({
      ...state,
      showUserInfo: payload,
    }))
    .addCase(setResponseMessageAction, (state, { payload }) => ({
      ...state,
      responseMessageInfo: payload,
    }))
    .addCase(setResetPasswordShow, (state, { payload }) => ({
      ...state,
      showResetPassword: payload,
    }))
    .addCase(setShowSpinner, (state, { payload }) => ({
      ...state,
      showSpinner: payload,
    }))
    .addCase(setShowCancelSubscriptionAction, (state, { payload }) => ({
      ...state,
      showCancelSubscription: payload,
    }))
    .addCase(setPaymentCardShowAction, (state, { payload }) => ({
      ...state,
      showPaymentCard: payload,
    }))
    .addCase(setShowAuthorLessonsAction, (state, { payload }) => ({
      ...state,
      showAuthorLessons: payload,
    }))
})
