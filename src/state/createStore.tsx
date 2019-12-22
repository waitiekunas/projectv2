import { createStore } from 'redux';
import { allReducers } from '../state/reducers';
import initialState from './initialState'


// preloadedState will be passed in by the plugin
export default store => {
    return createStore(allReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};