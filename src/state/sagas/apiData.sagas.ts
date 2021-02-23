import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ResetPasswordValues } from '../../containers/ResetPassword/ResetPassword';
import { LoginData, RegisterBody } from '../../types/userData';
import {
    loginAction,
    loginUserAction,
    setLessonsAction,
    setShowLoginRegisterForm,
    setUserIdAction,
} from '../actions/actions';
import {
    editAuthorAction,
    editPasswordAction,
    loadLessonsAction,
    registerUserAction,
    resetPasswordAction,
    uploadLessonAction,
} from '../actions/apiData.actions';
import { EditPasswordFormValues } from './../../containers/UserInfo/UserInfo';
import { setResponseMessageAction } from './../actions/actions';
import {
    getAuthorInfoAction,
    loadLessonsMaterialAction,
    setAuthorInfoAction,
    setLessonsMaterialAction,
} from './../actions/apiData.actions';
import { setRegisterStatus, setUpdatedUserAuthorInfo } from './../actions/userData.actions';

export function* loadAllLessonsSaga():SagaIterator{
    try{
        const {data}= yield call(axios.get, process.env.GET_ALL_LESSONS_URL);
        yield put(setLessonsAction(data))
    } catch (e){
        console.log(e)
    }
}

export function* loginUserSaga({payload}:PayloadAction<LoginData>){
    try{
        const {data}= yield call(()=>
        axios.post(process.env.LOGIN_URL, payload))
        yield put (loginAction(data.loginData))
        yield put(setUserIdAction(data.id))
    } catch(e){
        console.log(e)
    }
}

export function* registerUserSaga({payload}:PayloadAction<RegisterBody>){
    try{
        const {data}=yield call(()=>
        axios.post(process.env.REGISTER_URL, payload)
        )
        yield put(setRegisterStatus(data?.success))
        yield put(setShowLoginRegisterForm(false))
        yield put(setResponseMessageAction(data))
    } catch(e){
        console.log(e)
    }
}

export function* loadLessonMaterialSaga({payload}:PayloadAction<FormData>){
    try{
        const {data}=yield call(()=>
            axios.post(process.env.GET_LESSON_URL, payload)
        )
        yield put(setLessonsMaterialAction(data))
    } catch(e){
        console.log(e)
    }
}

export function* uploadLessonSaga({payload}:PayloadAction<FormData>){
    try{
        const {data} = yield call(()=>
            axios.post(process.env.UPLOAD_URL, payload)
        )
        yield put(loadLessonsAction)
        yield put(setResponseMessageAction(data))
        
    } catch (e){
        console.log(e)
    }
}

export function* getAuthorInfoSaga({payload}:PayloadAction<FormData>){
    try{
        const {data} = yield call(()=>
            axios.post(process.env.GET_AUTHOR_INFO_URL, payload)
        )
        yield put(setAuthorInfoAction(data))
    } catch(e){
        console.log(e)
    }
}

export function* updatePasswordSaga({payload}:PayloadAction<EditPasswordFormValues>){
    try{
        const {data} = yield call(()=>axios.post(process.env.EDIT_PASSWORD, payload))
        yield put(setResponseMessageAction({text:data.text, show:true}))
    } catch(e){
        console.log(e)
    }
}

export function* updateAuthorSaga({payload}:PayloadAction<FormData>){
    try{
        const {data} = yield call(()=>axios.post(process.env.EDIT_AUTHOR, payload))
        
        yield put(setResponseMessageAction(data))
        yield put(setUpdatedUserAuthorInfo(data))
    } catch(e){
        console.log(e)
    }
 
}

export function* resetPasswordSaga({payload}:PayloadAction<ResetPasswordValues>){
    try{
        const {data} = yield call(()=>axios.post(process.env.RESET_PASSWORD, payload))
        yield put(setResponseMessageAction({text:data.text, show:true}))
    } catch(e){
        console.log(e)
    }
}

export function* apiDataSagas(){
    yield all([takeLatest(loadLessonsAction,loadAllLessonsSaga)])
    yield all([takeLatest(loginUserAction, loginUserSaga)])
    yield all([takeLatest(registerUserAction, registerUserSaga)])
    yield all([takeLatest(loadLessonsMaterialAction,loadLessonMaterialSaga)])
    yield all([takeLatest(getAuthorInfoAction, getAuthorInfoSaga)])
    yield all([takeLatest(editPasswordAction,updatePasswordSaga)])
    yield all([takeLatest(editAuthorAction,updateAuthorSaga)])
    yield all([takeLatest(uploadLessonAction, uploadLessonSaga)])
    yield all([takeLatest(resetPasswordAction,resetPasswordSaga)])
}