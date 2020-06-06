import { combineReducers } from 'redux';

import languageRed from './languageRed';
import loginRegister from './loginRegister';
import userRed from './userRed';

export const allReducers = combineReducers({
  language: languageRed,
  isLoggedIn: loginRegister,
  userId: userRed,
})
