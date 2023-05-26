import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AuthApi } from "features/app/auth/auth.api"

const register = createAsyncThunk("auth/register", (arg, thunkAPI) => {
  const { dispatch, getState } = thunkAPI
  AuthApi.register({ email: "", password: "" }).then(() => {})
})

const slice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
})

export const authReducer = slice.reducer
export const authThunks = { register }
