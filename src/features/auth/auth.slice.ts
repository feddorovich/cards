import { createSlice } from "@reduxjs/toolkit"
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "features/auth/auth.api"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg: ArgRegisterType) => {
  const res = await authApi.register(arg)
  console.log("register:", res.data)
})

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg) => {
  const res = await authApi.login(arg)
  return { profile: res.data }
})

// const login = createAsyncThunk("auth/login", (arg: ArgLoginType, thunkAPI) => {
//   const { dispatch } = thunkAPI
//   return authApi.login(arg).then((res) => {
//     console.log("login:", res.data)
//     // dispatch(authActions.setProfile({ profile: res.data }))
//     return { profile: res.data }
//   })
// })

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
  },
  reducers: {
    // setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
    //   state.profile = action.payload.profile
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile
        alert("success login")
      })
      .addCase(login.rejected, () => {
        alert("error")
      })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login }
