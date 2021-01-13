import { createReducer } from '@reduxjs/toolkit';

import { LessonMaterial } from '../../interfaces/lesson/ILessonMaterial';
import { setLessonsAction } from '../actions/actions';
import { setAuthorInfoAction, setLessonsMaterialAction } from './../actions/apiData.actions';

export interface ApiDataState {
    lessons:any[];
    lessonsMaterial:LessonMaterial[];
    authorInfo:any[];
}
export const initialLessonsState:ApiDataState = {
    lessons:[],
    lessonsMaterial:[],
    authorInfo:[]
  }
  
  export const apiReducer = createReducer<ApiDataState>(
    initialLessonsState,
    (builder)=>{
      builder
        .addCase(setLessonsAction, (state, {payload})=>({
          ...state,
          lessons:payload,
        }))
        .addCase(setLessonsMaterialAction,(state,{payload})=>({
          ...state,
          lessonsMaterial:payload
        }))
        .addCase(setAuthorInfoAction,(state,{payload})=>({
          ...state,
          authorInfo:payload
        }))
    }
  )