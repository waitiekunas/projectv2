import { IUserState } from '../../interfaces/state/IState';
import { LOGIN } from './actions';

export const setUserStatus = (data: IUserState) => ({
  type: LOGIN,
  payload: data,
})
