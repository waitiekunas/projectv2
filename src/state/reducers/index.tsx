import { combineReducers } from 'redux';

import languageRed from './languageRed';
import lessonRed from './lessonsRed';
import loginRegister from './loginRegister';
import lookupsRed from './lookupsRed';
import userRed from './userRed';

export const allReducers = combineReducers({
  language: languageRed,
  isLoggedIn: loginRegister,
  userId: userRed,
  lookups: lookupsRed,
  lessons: lessonRed,
})
