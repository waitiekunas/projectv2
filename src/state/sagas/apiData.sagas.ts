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
    setShowSpinner,
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
    yield put(setShowSpinner(true))

    try{
        const {data}= yield call(axios.get, process.env.GET_ALL_LESSONS_URL);
        yield put(setLessonsAction(data))

    } catch (e){
        console.log(e)
    }
    yield put(setShowSpinner(false))

}

export function* loginUserSaga({payload}:PayloadAction<LoginData>){
    yield put(setShowSpinner(true))

    try{
        const {data}= yield call(()=>
        axios.post(process.env.LOGIN_URL, payload))
        yield put (loginAction(data.loginData))
        yield put(setUserIdAction(data.id))
        yield put(setShowSpinner(false))

    } catch(e){
        console.log(e)
        
    }
    yield put(setShowSpinner(false))

}

export function* registerUserSaga({payload}:PayloadAction<RegisterBody>){
    yield put(setShowSpinner(true))

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
    yield put(setShowSpinner(false))

}

export function* loadLessonMaterialSaga({payload}:PayloadAction<FormData>){
    yield put(setShowSpinner(true))

    try{
        const {data}=yield call(()=>
            axios.post(process.env.GET_LESSON_URL, payload)
        )
        let decoded = data;
        decoded.forEach((lesson)=>lesson.resource_id = atob(lesson.resource_id))
        yield put(setLessonsMaterialAction(decoded))
    } catch(e){
        console.log(e)
    }
    yield put(setShowSpinner(false))

}

export function* uploadLessonSaga({payload}:PayloadAction<FormData>){
    yield put(setShowSpinner(true))

    try{
        const {data} = yield call(()=>
            axios.post(process.env.UPLOAD_URL, payload)
        )
        yield put(loadLessonsAction)
        yield put(setResponseMessageAction(data))
        
    } catch (e){
        console.log(e)
    }
    yield put(setShowSpinner(false))

}

export function* getAuthorInfoSaga({payload}:PayloadAction<FormData>){
    yield put(setShowSpinner(true))

    try{
        const {data} = yield call(()=>
            axios.post(process.env.GET_AUTHOR_INFO_URL, payload)
        )
        yield put(setAuthorInfoAction(data))
    } catch(e){
        console.log(e)
    }
    yield put(setShowSpinner(false))

}

export function* updatePasswordSaga({payload}:PayloadAction<EditPasswordFormValues>){
    yield put(setShowSpinner(true))

    try{
        const {data} = yield call(()=>axios.post(process.env.EDIT_PASSWORD, payload))
        yield put(setResponseMessageAction({text:data.text, show:true}))
    } catch(e){
        console.log(e)
    }
    yield put(setShowSpinner(false))

}

export function* updateAuthorSaga({payload}:PayloadAction<FormData>){
    yield put(setShowSpinner(true))

    try{
        const {data} = yield call(()=>axios.post(process.env.EDIT_AUTHOR, payload))
        
        yield put(setResponseMessageAction(data))
        yield put(setUpdatedUserAuthorInfo(data))
    } catch(e){
        console.log(e)
    }
    yield put(setShowSpinner(false))
 
}

export function* resetPasswordSaga({payload}:PayloadAction<ResetPasswordValues>){
    yield put(setShowSpinner(true))

    try{
        const {data} = yield call(()=>axios.post(process.env.RESET_PASSWORD, payload))
        yield put(setResponseMessageAction({text:data.text, show:true}))
    } catch(e){
        console.log(e)
    }
    yield put(setShowSpinner(false))

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