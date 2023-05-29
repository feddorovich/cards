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
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { appActions } from "app/app.slice"

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI
  dispatch(appActions.setIsLoading({ isLoading: true }))
  await authApi.register(arg)
  dispatch(appActions.setIsLoading({ isLoading: false }))
})
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI
  dispatch(appActions.setIsLoading({ isLoading: true }))
  const res = await authApi.login(arg)
  dispatch(appActions.setIsLoading({ isLoading: false }))
  return { profile: res.data }
})
const logout = createAppAsyncThunk<void>("auth/logout", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI
  dispatch(appActions.setIsLoading({ isLoading: true }))
  await authApi.logout()
  dispatch(appActions.setIsLoading({ isLoading: false }))
})
const reset = createAppAsyncThunk<ResetResponseType, string>("auth/reset", async (email, thunkAPI) => {
  const { dispatch } = thunkAPI
  dispatch(appActions.setIsLoading({ isLoading: true }))
  const res = await authApi.resetPassword(email)
  dispatch(appActions.setIsLoading({ isLoading: false }))
  return res.data
})
const setNewPassword = createAppAsyncThunk<NewPasswordResponseType, ArgNewPasswordType>(
  "auth/setNewPassword",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    dispatch(appActions.setIsLoading({ isLoading: true }))
    const res = await authApi.setNewPassword(arg)
    dispatch(appActions.setIsLoading({ isLoading: false }))
    return res.data
  }
)
const changeProfileName = createAppAsyncThunk<{ updatedUser: ProfileType }, string>(
  "auth/changeProfileName",
  async (name, thunkAPI) => {
    const { dispatch } = thunkAPI
    dispatch(appActions.setIsLoading({ isLoading: true }))
    const res = await authApi.changeProfileData({ name })
    dispatch(appActions.setIsLoading({ isLoading: false }))
    return { updatedUser: res.data.updatedUser }
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
      .addCase(login.rejected, () => {
        alert("Error sign in")
      })
      .addCase(logout.fulfilled, (state) => {
        state.redirectPath = "/login"
        state.isLoggedIn = false
      })
      .addCase(logout.rejected, () => {
        alert("Error logout")
      })
      .addCase(register.fulfilled, (state) => {
        state.redirectPath = "/login"
        // Добавить уведомление об успешной регистрации
      })
      .addCase(register.rejected, (state, action) => {
        alert("Error registration")
      })
      .addCase(reset.fulfilled, (state, action) => {
        state.redirectPath = "/check-email"
      })
      .addCase(reset.rejected, () => {
        alert("Invalid email")
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.redirectPath = "/login"
        // Добавить уведомление о смене пароля
      })
      .addCase(setNewPassword.rejected, () => {
        alert("Password changed problem")
      })
      .addCase(changeProfileName.fulfilled, (state, action) => {
        state.profile = action.payload.updatedUser
        // alert("Change name success")
      })
      .addCase(changeProfileName.rejected, () => {
        alert("Change name error")
      })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login, reset, setNewPassword, logout, changeProfileName }
