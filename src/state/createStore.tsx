import { createStore } from 'redux';

import { allReducers } from '../state/reducers';

// preloadedState will be passed in by the plugin
export default store => {
  return createStore(allReducers, process.env.REDUX_DEBUGGER)
}
//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
