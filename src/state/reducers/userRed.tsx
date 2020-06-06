import { SET_USER_ID } from '../actions/actions';
import { userId } from '../initialState';

export default (state = userId, action: any) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.payload }
    default:
      return state
  }
}
