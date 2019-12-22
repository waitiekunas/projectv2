import { combineReducers } from 'redux';
import languageRed from './languageRed';
import loginRegister from './loginRegister'

export const allReducers = combineReducers(
    {
        language: languageRed,
        isLoggedIn: loginRegister
    }
)