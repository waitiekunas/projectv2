import { RootState } from './../reducers/allReducers';

export const selectLessons = (state:RootState)=>state.apiData.lessons
export const selectState = (state:RootState)=>state