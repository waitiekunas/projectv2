import { createReducer } from '@reduxjs/toolkit';

import { setLessonsAction } from '../actions/actions';

export interface ApiDataState {
    lessons:any[];
}
export const initialLessonsState:ApiDataState = {
    lessons:[]
  }
  
  export const apiReducer = createReducer<ApiDataState>(
    initialLessonsState,
    (builder)=>{
      builder
        .addCase(setLessonsAction, (state, {payload})=>({
          ...state,
          lessons:payload,
        }))
    }
  )