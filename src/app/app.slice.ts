import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const appInitialState = {
  error: null as string | null,
  isLoading: true,
  isAppInitialized: false,
}

export type AppInitilaState = typeof appInitialState

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
      // console.log(current(state))
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
