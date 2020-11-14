import { LOGIN } from '../actions/actions';
import { isLoggedIn } from '../initialState';

export default (state = isLoggedIn, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        canUpload: action.payload.canUpload,
        subscribed: action.payload.subscribed,
        email: action.payload.email,
        stripeCustomerId: action.payload.stripeCustomerId,
        subscriptionId: action.payload.subscriptionId,
      }
    default:
      return state
  }
}
