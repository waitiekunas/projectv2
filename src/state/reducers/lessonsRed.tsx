import { SET_LESSONS } from '../actions/actions';
import { lessons } from '../initialState';

export default (state = lessons, action: any) => {
  switch (action.type) {
    case SET_LESSONS:
      return { ...state, lessons: action.payload }
    default:
      return state
  }
}
