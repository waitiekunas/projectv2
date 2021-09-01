import { combineReducers } from "redux"

import { ApiDataState, apiReducer } from "./api.reducer"
import { appReducer, AppState } from "./app.reducers"
import { userReducer, UserState } from "./user.reducer"

export interface RootState {
  userInformation: UserState
  apiData: ApiDataState
  appState: AppState
}

const allReducers = combineReducers({
  userInformation: userReducer,
  apiData: apiReducer,
  appState: appReducer,
})
export default allReducers
