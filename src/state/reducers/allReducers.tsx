import { combineReducers } from 'redux';

import { ApiDataState, apiReducer } from './api.reducer';
import { userReducer, UserState } from './user.reducer';

export interface RootState{
  userInformation:UserState,
  apiData:ApiDataState,
}

const allReducers = combineReducers({
  userInformation: userReducer,
  apiData: apiReducer,
})
export default allReducers