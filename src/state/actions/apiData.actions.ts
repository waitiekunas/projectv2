import { createAction } from '@reduxjs/toolkit';

import { LessonMaterial } from '../../interfaces/lesson/ILessonMaterial';
import {
  AuthorInfo,
  AuthorLessonsInfo,
  AuthorLessonsListReq,
  CreateStripeSubscription,
  DeleteLesson,
  RegisterView,
} from '../../types/apiData';
import { LoginData, RegisterBody } from '../../types/userData';
import { ResetPasswordValues } from './../../containers/ResetPassword/ResetPassword';
import { EditPasswordFormValues } from './../../containers/UserInfo/UserInfo';
import { CancelSubscription, CreateStripeCustomerPayload, RetryCreateStripeSubscription } from './../../types/apiData';

export const loadLessonsAction = createAction<LoginData>("LOAD_LESSONS")
export const registerUserAction = createAction<RegisterBody>("REGISTER_USER")
export const loadLessonsMaterialAction = createAction<FormData>("GET_MATERIAL")
export const setLessonsMaterialAction = createAction<LessonMaterial[]>(
  "SET_MATERIAL"
)
export const uploadLessonAction = createAction<FormData>("UPLOAD_LESSON")
export const getAuthorInfoAction = createAction<FormData>("GET_AUTHOR_INFO")
export const setAuthorInfoAction = createAction<AuthorInfo>("SET_AUTHOR_INFO")
export const editPasswordAction = createAction<EditPasswordFormValues>(
  "EDIT_PASSWORD"
)
export const editAuthorAction = createAction<FormData>("EDIT_AUTHOR")
export const resetPasswordAction = createAction<ResetPasswordValues>(
  "RESET_PASSWORD"
)
export const cancelSubscriptionAction = createAction<CancelSubscription>(
  "CANCEL_SUBSCRIPTION"
)
export const createStripeCustomerAction = createAction<
  CreateStripeCustomerPayload
>("CREATE_STRIPE_CUSTOMER")

export const createStripeSubscriptionAction = createAction<
  CreateStripeSubscription
>("CREATE_STRIPE_SUBSCRIPTION")

export const retryStripeSubscriptionAction = createAction<
  RetryCreateStripeSubscription
>("RETRY_STRIPE_SUBSCRIPTION")

export const registerViewAction = createAction<RegisterView>("REGISTER_VIEW")

export const getAuthorLessonsAction = createAction<AuthorLessonsListReq>(
  "GET_AUTHOR_LESSONS"
)
export const setAuthorLessons = createAction<AuthorLessonsInfo[]>(
  "SETTING_AUTHOR_LESSONS"
)
export const deleteLessonAction = createAction<DeleteLesson>("DELETE_LESSON")
