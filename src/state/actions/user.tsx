import { SET_USER_ID } from './actions';

export const setUserId = (userId: number) => ({
  type: SET_USER_ID,
  payload: userId,
})
