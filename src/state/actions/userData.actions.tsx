import { createAction } from "@reduxjs/toolkit"

import { AuthorInfo } from "../../types/apiData"

export const setRegisterStatus = createAction<boolean>("REGISTER_STATUS")
export const setUpdatedUserAuthorInfo = createAction<AuthorInfo>(
  "UPDATE_AUTHOR_USER_INFO"
)
