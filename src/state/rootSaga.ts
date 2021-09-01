import { all } from "redux-saga/effects"

import { apiDataSagas } from "./sagas/apiData.sagas"

export default function* rootSaga(): Generator {
  yield all([apiDataSagas()])
}
