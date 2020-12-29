import { createAction } from '@reduxjs/toolkit';

import { Languages } from '../../enums/languages/languages';
import { IUserState } from '../../interfaces/state/IState';

export const setLanguageAction = createAction<Languages>("GET_LANGUAGE")
export const loginAction = createAction<IUserState>("LOGIN")
export const setUserIdAction = createAction<number>("SET_USER_ID")
export const setLookupsAction = createAction<any[]>("SET_LOOKUPS")
export const setLessonsAction = createAction<any[]>("SET_LESSONS")
export const setStripeCustomerIdAction = createAction<string>("SET_STRIPE_CUSTOMER_ID")
export const changeLoginStatusAction = createAction<boolean>("CHANGING_LOGIN_STATUS")