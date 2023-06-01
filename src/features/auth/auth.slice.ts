import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  ArgLoginType,
  ArgNewPasswordType,
  ArgRegisterType,
  authApi,
  NewPasswordResponseType,
  ProfileType,
  ResetResponseType,
} from "features/auth/auth.api"
import { createAppAsyncThunk } from "common/utils"

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, { rejectWithValue }) => {
  try {
    await authApi.register(arg)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await authApi.login(arg)
      return { profile: res.data }
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
const logout = createAppAsyncThunk<void>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authApi.logout()
  } catch (e) {
    return rejectWithValue(e)
  }
})
const reset = createAppAsyncThunk<ResetResponseType, string>("auth/reset", async (email, { rejectWithValue }) => {
  try {
    const res = await authApi.resetPassword(email)
    return res.data
  } catch (e) {
    return rejectWithValue(e)
  }
})
const setNewPassword = createAppAsyncThunk<NewPasswordResponseType, ArgNewPasswordType>(
  "auth/setNewPassword",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await authApi.setNewPassword(arg)
      return res.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
const changeProfileName = createAppAsyncThunk<{ updatedUser: ProfileType }, string>(
  "auth/changeProfileName",
  async (name, { rejectWithValue }) => {
    try {
      const res = await authApi.changeProfileData({ name })
      return { updatedUser: res.data.updatedUser }
    } catch (e) {
      return rejectWithValue(e)
    }
    // dispatch(appActions.setIsLoading({ isLoading: true }))
    // try {
    //   const res = await authApi.changeProfileData({ name })
    //   return { updatedUser: res.data.updatedUser }
    // } catch (e) {
    //   const err = e as Error | AxiosError<{ error: string }>
    //   if (isAxiosError(err)) {
    //     const error = err.response ? err.response.data.error : err.message
    //     dispatch(appActions.setError({ error }))
    //   } else {
    //     dispatch(appActions.setError({ error: `Native error ${err.message}` }))
    //   }
    //   return rejectWithValue(null)
    // } finally {
    //   dispatch(appActions.setIsLoading({ isLoading: false }))
    // }
  }
)

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    redirectPath: null as string | null,
    isLoggedIn: false,
  },
  reducers: {
    setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
      state.profile = action.payload.profile
    },
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setRedirectPath: (state, action: PayloadAction<{ redirectPath: string }>) => {
      state.redirectPath = action.payload.redirectPath
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile
        state.isLoggedIn = true
        state.redirectPath = "/"
      })
      .addCase(logout.fulfilled, (state) => {
        state.redirectPath = "/login"
        state.isLoggedIn = false
      })
      .addCase(register.fulfilled, (state) => {
        state.redirectPath = "/login"
        // Добавить уведомление об успешной регистрации
      })
      .addCase(reset.fulfilled, (state, action) => {
        state.redirectPath = "/check-email"
      })
      .addCase(setNewPassword.fulfilled, (state) => {
        state.redirectPath = "/login"
        // Добавить уведомление о смене пароля
      })
      .addCase(changeProfileName.fulfilled, (state, action) => {
        state.profile = action.payload.updatedUser
        // Добавить уведомление о смене имени
      })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login, reset, setNewPassword, logout, changeProfileName }
