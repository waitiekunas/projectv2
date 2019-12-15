import { createStore } from 'redux';
import reducer from '../state/reducers/index';
import initialState from './initialState'


// preloadedState will be passed in by the plugin
export default initialState => {
    return createStore(reducer, initialState);
};