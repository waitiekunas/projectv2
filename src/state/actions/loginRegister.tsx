import { LOGIN } from './actions'

export const tryLogin = (isLoggedIn: boolean) => ({
    type: LOGIN, payload: isLoggedIn
})