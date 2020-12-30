import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { loadLessonsAction, setLessonsAction } from '../actions/actions';

export function* loadAllLessonsSaga():SagaIterator{
    try{
        const {data}= yield call(axios.get, process.env.GET_ALL_LESSONS_URL);
        yield put(setLessonsAction(data))
    } catch (e){
        console.log(e)
    }
}

export function* apiDataSagas(){
    yield all([takeLatest(loadLessonsAction,loadAllLessonsSaga)])
}