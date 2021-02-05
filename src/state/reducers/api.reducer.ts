import { createReducer } from '@reduxjs/toolkit';

import { LessonMaterial } from '../../interfaces/lesson/ILessonMaterial';
import { AuthorInfo } from '../../types/apiData';
import { setLessonsAction } from '../actions/actions';
import { setAuthorInfoAction, setLessonsMaterialAction } from './../actions/apiData.actions';

export interface ApiDataState {
    lessons:any[];
    lessonsMaterial:LessonMaterial[];
    authorInfo:AuthorInfo;
}
export const initialLessonsState:ApiDataState = {
    lessons:[],
    lessonsMaterial:[],
    authorInfo:{
      description:'',
      photo_url:''
    }
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