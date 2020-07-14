import { LOGIN } from '../actions/actions';
import { isLoggedIn } from '../initialState';

export default (state = isLoggedIn, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        canUpload: action.payload.canUpload,
      }
    default:
      return state
  }
}
