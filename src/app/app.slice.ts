import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { authApi, ProfileType } from "features/auth/auth.api"
import { authActions } from "features/auth/auth.slice"

const initialize = createAppAsyncThunk<{ profile: ProfileType }>("auth/me", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI

  const res = await authApi.me()
  dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
  dispatch(authActions.setProfile({ profile: res.data }))
  return { profile: res.data }
})

const appInitialState = {
  error: null as string | null,
  isLoading: true,
  isAppInitialized: false,
}

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialize.fulfilled, (state) => {
        state.isAppInitialized = true
      })
      .addCase(initialize.rejected, (state) => {
        state.isAppInitialized = true
      })
  },
})

export type AppInitilaState = typeof appInitialState

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunks = { initialize }
