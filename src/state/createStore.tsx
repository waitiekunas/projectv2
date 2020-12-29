import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { allReducers } from '../state/reducers';

const sagaMiddleware = createSagaMiddleware()
export default store => configureStore({
    reducer:allReducers,
    middleware: [sagaMiddleware]
})
//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() process.env.REDUX_DEBUGGER,
