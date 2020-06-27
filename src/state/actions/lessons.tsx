import { SET_LESSONS } from './actions';

export const setLessons = (lessons: any) => ({
  type: SET_LESSONS,
  payload: lessons,
})
