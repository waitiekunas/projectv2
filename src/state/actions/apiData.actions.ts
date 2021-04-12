import { createAction } from '@reduxjs/toolkit';

import { LessonMaterial } from '../../interfaces/lesson/ILessonMaterial';
import { AuthorInfo } from '../../types/apiData';
import { LoginData, RegisterBody } from '../../types/userData';
import { ResetPasswordValues } from './../../containers/ResetPassword/ResetPassword';
import { EditPasswordFormValues } from './../../containers/UserInfo/UserInfo';
import { CancelSubscription, CreateStripeCustomerPayload } from './../../types/apiData';

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
