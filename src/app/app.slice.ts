import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authApi, ProfileType } from "features/auth/auth.api"
import { authActions } from "features/auth/auth.slice"
import { createAppAsyncThunk } from "common/utils"
import { AxiosError, isAxiosError } from "axios"

export const initialize = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/me",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const res = await authApi.me()
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(authActions.setProfile({ profile: res.data }))
      return { profile: res.data }
    } catch (e: any) {
      const error = e.response ? e.response.data.error : e.message
      return rejectWithValue(error)
    }
  }
)

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
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
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
      .addMatcher(
        (action) => {
          if (action.type === "auth/me/pending") return false
          return action.type.endsWith("/pending")
        },
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => {
          if (action.type === "auth/me/rejected") return false
          return action.type.endsWith("/rejected")
        },
        (state, action) => {
          const err = action.payload as Error | AxiosError<{ error: string }>
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message
          } else {
            state.error = `Native error ${err.message}`
          }
          state.isLoading = false
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/fulfilled")
        },
        (state) => {
          state.isLoading = false
        }
      )
  },
})

export type AppInitilaState = typeof appInitialState

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunks = { initialize }
