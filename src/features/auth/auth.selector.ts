import { RootState } from "app/store"

export const selectProfile = (state: RootState) => state.auth.profile
export const selectRedirectPath = (state: RootState) => state.auth.redirectPath
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectId = (state: RootState) => (state.auth.profile ? state.auth.profile._id : "")
