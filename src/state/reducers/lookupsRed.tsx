import { SET_LOOKUPS } from '../actions/actions';
import { lookups } from '../initialState';

export default (state = lookups, action: any) => {
  switch (action.type) {
    case SET_LOOKUPS:
      return { ...state, lookups: action.payload }
    default:
      return state
  }
}
