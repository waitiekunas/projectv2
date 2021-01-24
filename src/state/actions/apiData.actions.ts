import { createAction } from '@reduxjs/toolkit';

import { LessonMaterial } from '../../interfaces/lesson/ILessonMaterial';
import { LoginData, RegisterBody } from '../../types/userData';
import { EditPasswordFormValues } from './../../containers/UserInfo/UserInfo';

export const loadLessonsAction = createAction<LoginData>('LOAD_LESSONS')
export const registerUserAction = createAction<RegisterBody>('REGISTER_USER')
export const loadLessonsMaterialAction = createAction<FormData>('GET_MATERIAL')
export const setLessonsMaterialAction = createAction<LessonMaterial[]>('SET_MATERIAL')
export const uploadLessonAction = createAction<FormData>('UPLOAD_LESSON')
export const getAuthorInfoAction = createAction<FormData>('GET_AUTHOR_INFO')
export const setAuthorInfoAction = createAction<any>('SET_AUTHOR_INFO')
export const editPasswordAction = createAction<EditPasswordFormValues>('EDIT_PASSWORD')