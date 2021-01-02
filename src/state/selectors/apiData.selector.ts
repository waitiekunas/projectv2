import { RootState } from './../reducers/allReducers';

export const selectLessons = (state:RootState)=>state.apiData.lessons
export const selectState = (state:RootState)=>state
export const selectLessonsMaterial = (state:RootState)=>state.apiData.lessonsMaterial
export const selectAuthorInfo = (state:RootState)=>state.apiData.authorInfo