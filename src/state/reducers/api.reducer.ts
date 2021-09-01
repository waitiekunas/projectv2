import { createReducer } from "@reduxjs/toolkit"

import { LessonMaterial } from "../../interfaces/lesson/ILessonMaterial"
import { AuthorInfo, AuthorLessonsInfo } from "../../types/apiData"
import { setLessonsAction } from "../actions/actions"
import {
  setAuthorInfoAction,
  setAuthorLessons,
  setLessonsMaterialAction,
} from "./../actions/apiData.actions"

export interface ApiDataState {
  lessons: any[]
  lessonsMaterial: LessonMaterial[]
  authorInfo: AuthorInfo
  authorLessonsInfo: AuthorLessonsInfo[]
}
export const initialLessonsState: ApiDataState = {
  lessons: [],
  lessonsMaterial: [],
  authorInfo: {
    description: "",
    photo_url: "",
  },
  authorLessonsInfo: [],
}

export const apiReducer = createReducer<ApiDataState>(
  initialLessonsState,
  builder => {
    builder
      .addCase(setLessonsAction, (state, { payload }) => ({
        ...state,
        lessons: payload,
      }))
      .addCase(setLessonsMaterialAction, (state, { payload }) => ({
        ...state,
        lessonsMaterial: payload,
      }))
      .addCase(setAuthorInfoAction, (state, { payload }) => ({
        ...state,
        authorInfo: payload,
      }))
      .addCase(setAuthorLessons, (state, { payload }) => ({
        ...state,
        authorLessonsInfo: payload,
      }))
  }
)
