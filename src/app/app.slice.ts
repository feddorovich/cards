import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { authApi, ProfileType } from "features/auth/auth.api"
import { changeProfileName, login, logout, register, reset, setNewPassword } from "features/auth/auth.slice"

export const initialize = createAppAsyncThunk<{ profile: ProfileType }>("auth/me", async () => {
  const res = await authApi.me()
  return { profile: res.data }
})

const appInitialState = {
  error: null as string | null,
  isLoading: false,
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
      .addCase(initialize.pending, (state) => {
        state.isAppInitialized = false
      })
      .addCase(initialize.fulfilled, (state) => {
        state.isAppInitialized = true
      })
      .addCase(initialize.rejected, (state) => {
        state.isAppInitialized = true
      })
    // .addCase(login.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(login.fulfilled, (state, action) => {
    //   state.isLoading = false
    // })
    // .addCase(login.rejected, (state) => {
    //   state.isLoading = false
    // })
    // .addCase(logout.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(logout.fulfilled, (state, action) => {
    //   state.isLoading = false
    // })
    // .addCase(logout.rejected, (state) => {
    //   state.isLoading = false
    // })
    // .addCase(register.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(register.fulfilled, (state, action) => {
    //   state.isLoading = false
    // })
    // .addCase(register.rejected, (state) => {
    //   state.isLoading = false
    // })
    // .addCase(reset.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(reset.fulfilled, (state, action) => {
    //   state.isLoading = false
    // })
    // .addCase(reset.rejected, (state) => {
    //   state.isLoading = false
    // })
    // .addCase(setNewPassword.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(setNewPassword.fulfilled, (state, action) => {
    //   state.isLoading = false
    // })
    // .addCase(setNewPassword.rejected, (state) => {
    //   state.isLoading = false
    // })
    // .addCase(changeProfileName.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(changeProfileName.fulfilled, (state, action) => {
    //   state.isLoading = false
    // })
    // .addCase(changeProfileName.rejected, (state) => {
    //   state.isLoading = false
    // })
    //.addMatcher()
  },
})

export type AppInitilaState = typeof appInitialState

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunks = { initialize }
