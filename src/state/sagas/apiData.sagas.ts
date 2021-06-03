import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ResetPasswordValues } from '../../containers/ResetPassword/ResetPassword';
import {
  AuthorLessonsListReq,
  CancelSubscription,
  CreateStripeCustomerPayload,
  CreateStripeSubscription,
  DeleteLesson,
  RegisterView,
} from '../../types/apiData';
import { LoginData, RegisterBody } from '../../types/userData';
import {
  loginAction,
  loginUserAction,
  setLessonsAction,
  setPaymentCardShowAction,
  setShowLoginRegisterForm,
  setUserIdAction,
} from '../actions/actions';
import {
  cancelSubscriptionAction,
  createStripeCustomerAction,
  createStripeSubscriptionAction,
  deleteLessonAction,
  editAuthorAction,
  editPasswordAction,
  getAuthorLessonsAction,
  loadLessonsAction,
  registerUserAction,
  registerViewAction,
  resetPasswordAction,
  retryStripeSubscriptionAction,
  setAuthorLessons,
  uploadLessonAction,
} from '../actions/apiData.actions';
import { EditPasswordFormValues } from './../../containers/UserInfo/UserInfo';
import { RetryCreateStripeSubscription } from './../../types/apiData';
import { setResponseMessageAction, setShowSpinner, setStripeCustomerIdAction } from './../actions/actions';
import {
  getAuthorInfoAction,
  loadLessonsMaterialAction,
  setAuthorInfoAction,
  setLessonsMaterialAction,
} from './../actions/apiData.actions';
import { setRegisterStatus, setUpdatedUserAuthorInfo } from './../actions/userData.actions';

export function* loadAllLessonsSaga(): SagaIterator {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(axios.get, process.env.GET_ALL_LESSONS_URL)
    yield put(setLessonsAction(data))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* loginUserSaga({ payload }: PayloadAction<LoginData>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.LOGIN_URL, payload)
    )
    yield put(loginAction(data.loginData))
    yield put(setUserIdAction(data.id))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* registerUserSaga({ payload }: PayloadAction<RegisterBody>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.REGISTER_URL, payload)
    )
    yield put(setRegisterStatus(data?.success))
    yield put(setShowLoginRegisterForm(false))
    yield put(setResponseMessageAction(data))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* loadLessonMaterialSaga({ payload }: PayloadAction<FormData>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.GET_LESSON_URL, payload)
    )
    let decoded = data
    decoded.forEach(lesson => (lesson.resource_id = atob(lesson.resource_id)))
    yield put(setLessonsMaterialAction(decoded))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* uploadLessonSaga({ payload }: PayloadAction<FormData>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.UPLOAD_URL, payload)
    )
    yield put(loadLessonsAction)
    yield put(setResponseMessageAction(data))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* getAuthorInfoSaga({ payload }: PayloadAction<FormData>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.GET_AUTHOR_INFO_URL, payload)
    )
    yield put(setAuthorInfoAction(data))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* updatePasswordSaga({
  payload,
}: PayloadAction<EditPasswordFormValues>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.EDIT_PASSWORD, payload)
    )
    yield put(setShowSpinner(false))

    yield put(setResponseMessageAction({ text: data.text, show: true }))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* updateAuthorSaga({ payload }: PayloadAction<FormData>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.EDIT_AUTHOR, payload)
    )

    yield put(setResponseMessageAction(data))
    yield put(setUpdatedUserAuthorInfo(data))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* resetPasswordSaga({
  payload,
}: PayloadAction<ResetPasswordValues>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.RESET_PASSWORD, payload)
    )
    yield put(setResponseMessageAction({ text: data.text, show: true }))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))

    console.log(e)
  }
}

export function* cancelSubscriptionSaga({
  payload,
}: PayloadAction<CancelSubscription>) {
  yield put(setShowSpinner(true))
  try {
    const { data } = yield call(() =>
      axios.post(process.env.CANCEL_SUBSCRIPTION_URL, payload)
    )
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction(data))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))
  }
}

export function* createStripeCustomerSaga({
  payload,
}: PayloadAction<CreateStripeCustomerPayload>) {
  yield put(setShowSpinner(true))
  try {
    const { data } = yield call(() =>
      axios.post(process.env.CREATE_CUSTOMER_STRIPE_URL, payload)
    )
    yield put(setStripeCustomerIdAction(data.customer.id))
    yield put(setPaymentCardShowAction(true))
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Technical error", show: true }))
  }
}

export function* createStripeSubscriptionSaga({
  payload,
}: PayloadAction<CreateStripeSubscription>) {
  yield put(setShowSpinner(true))
  try {
    const { data } = yield call(() =>
      axios.post(process.env.CREATE_SUBSCRIPTION_STRIPE_URL, payload)
    )
    if (data.error) {
      yield put(setShowSpinner(false))
      yield put(
        setResponseMessageAction({ text: "Technical error", show: true })
      )
    }
    if (data.status === "active") {
      yield put(setShowSpinner(false))
      yield put(setResponseMessageAction({ text: "Subscribed", show: true }))
    }
    let paymentIntent = data.invoice
      ? data.invoice.payment_intent
      : data.subscription.latest_invoice.payment_intent
    if (
      paymentIntent.status === "requires_action" ||
      (data.isRetry === true &&
        paymentIntent.status === "requires_payment_method")
    ) {
      yield put(setShowSpinner(false))
      yield put(
        setResponseMessageAction({ text: "Technical error", show: true })
      )
      // Some payment methods require a customer to be on session
      // to complete the payment process. Check the status of the
      // payment intent to handle these actions.
      // stripe
      // .confirmCardPayment(paymentIntent.client_secret, {
      //   payment_method: paymentMethodId,
      // })
      // .then(result => {
      //   if (result.error) {
      //     // Start code flow to handle updating the payment details.
      //     // Display error message in your UI.
      //     // The card was declined (i.e. insufficient funds, card has expired, etc).
      //     throw result
      //   } else {
      //     if (result.paymentIntent.status === "succeeded") {
      //       // Show a success message to your customer.
      //       // There's a risk of the customer closing the window before the callback.
      //       // We recommend setting up webhook endpoints later in this guide.
      //       return {
      //         priceId: priceId,
      //         subscription: subscription,
      //         invoice: invoice,
      //         paymentMethodId: paymentMethodId,
      //       }
      //     }
      //   }
      // })
      // .catch(error => {
      //   console.error(error)
      // })
    }
    // If attaching this card to a Customer object succeeds,
    // but attempts to charge the customer fail, you
    // get a requires_payment_method error.
    if (
      data.latest_invoice.payment_intent.status === "requires_payment_method"
    ) {
      // Using localStorage to manage the state of the retry here,
      // feel free to replace with what you prefer.
      // Store the latest invoice ID and status.
      localStorage.setItem("latestInvoiceId", data.latest_invoice.id)
      localStorage.setItem(
        "latestInvoicePaymentIntentStatus",
        data.latest_invoice.payment_intent.status
      )
      yield put(setShowSpinner(false))
      yield put(
        setResponseMessageAction({
          text: "Card declined, try again",
          show: true,
        })
      )
    }
  } catch (e) {
    yield put(setShowSpinner(false))
    setResponseMessageAction({
      text: "Technical error",
      show: true,
    })
  }
}

export function* retryStripeSubscriptionSaga({
  payload,
}: PayloadAction<RetryCreateStripeSubscription>) {
  yield put(setShowSpinner(true))
  try {
    const { data } = yield call(() =>
      axios.post(process.env.CREATE_RETRY_INVOICE_URL, payload)
    )
    if (data.error) {
      yield put(setShowSpinner(false))
      setResponseMessageAction({
        text: "Technical error",
        show: true,
      })
    }
    // Some payment methods require a customer to be on session
    // to complete the payment process. Check the status of the
    // payment intent to handle these actions.
    // stripe
    // .confirmCardPayment(paymentIntent.client_secret, {
    //   payment_method: paymentMethodId,
    // })
    // .then(result => {
    //   if (result.error) {
    //     // Start code flow to handle updating the payment details.
    //     // Display error message in your UI.
    //     // The card was declined (i.e. insufficient funds, card has expired, etc).
    //     throw result
    //   } else {
    //     if (result.paymentIntent.status === "succeeded") {
    //       // Show a success message to your customer.
    //       // There's a risk of the customer closing the window before the callback.
    //       // We recommend setting up webhook endpoints later in this guide.
    //       return {
    //         priceId: priceId,
    //         subscription: subscription,
    //         invoice: invoice,
    //         paymentMethodId: paymentMethodId,
    //       }
    //     }
    //   }
    // })
    // .catch(error => {
    //   console.error(error)
    // })

    if (data.status === "active") {
      yield put(setShowSpinner(false))
      yield put(setResponseMessageAction({ text: "Subscribed", show: true }))
    }
  } catch (e) {
    yield put(setShowSpinner(false))
    setResponseMessageAction({
      text: "Technical error",
      show: true,
    })
  }
}

export function* registerViewSaga({ payload }: PayloadAction<RegisterView>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.REGISTER_VIEW, payload)
    )
    yield put(setShowSpinner(false))
  } catch (e) {
    yield put(setShowSpinner(false))
  }
}

export function* getAuthorLessonsSaga({
  payload,
}: PayloadAction<AuthorLessonsListReq>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.GET_AUTHOR_LESSONS, payload)
    )
    yield put(setAuthorLessons(data))
    yield put(setShowSpinner(false))
  } catch (error) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Error", show: true }))
  }
}

export function* deleteLessonSaga({ payload }: PayloadAction<DeleteLesson>) {
  yield put(setShowSpinner(true))

  try {
    const { data } = yield call(() =>
      axios.post(process.env.DELETE_LESSON, payload)
    )
    yield put(setShowSpinner(false))
    yield put(getAuthorLessonsAction(payload))
  } catch (error) {
    yield put(setShowSpinner(false))
    yield put(setResponseMessageAction({ text: "Error", show: true }))
  }
}

export function* apiDataSagas() {
  yield all([takeLatest(loadLessonsAction, loadAllLessonsSaga)])
  yield all([takeLatest(loginUserAction, loginUserSaga)])
  yield all([takeLatest(registerUserAction, registerUserSaga)])
  yield all([takeLatest(loadLessonsMaterialAction, loadLessonMaterialSaga)])
  yield all([takeLatest(getAuthorInfoAction, getAuthorInfoSaga)])
  yield all([takeLatest(editPasswordAction, updatePasswordSaga)])
  yield all([takeLatest(editAuthorAction, updateAuthorSaga)])
  yield all([takeLatest(uploadLessonAction, uploadLessonSaga)])
  yield all([takeLatest(resetPasswordAction, resetPasswordSaga)])
  yield all([takeLatest(cancelSubscriptionAction, cancelSubscriptionSaga)])
  yield all([takeLatest(createStripeCustomerAction, createStripeCustomerSaga)])
  yield all([
    takeLatest(createStripeSubscriptionAction, createStripeSubscriptionSaga),
  ])
  yield all([
    takeLatest(retryStripeSubscriptionAction, retryStripeSubscriptionSaga),
  ])
  yield all([takeLatest(registerViewAction, registerViewSaga)]),
    yield all([takeLatest(getAuthorLessonsAction, getAuthorLessonsSaga)]),
    yield all([takeLatest(deleteLessonAction, deleteLessonSaga)])
}
