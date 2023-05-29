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

export const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg) => {
  await authApi.register(arg)
})
export const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg) => {
  const res = await authApi.login(arg)
  return { profile: res.data }
})
export const logout = createAppAsyncThunk<void>("auth/logout", async () => {
  await authApi.logout()
})
export const reset = createAppAsyncThunk<ResetResponseType, string>("auth/reset", async (email) => {
  const res = await authApi.resetPassword(email)
  return res.data
})
export const setNewPassword = createAppAsyncThunk<NewPasswordResponseType, ArgNewPasswordType>(
  "auth/setNewPassword",
  async (arg) => {
    const res = await authApi.setNewPassword(arg)
    return res.data
  }
)
export const changeProfileName = createAppAsyncThunk<{ updatedUser: ProfileType }, string>(
  "auth/changeProfileName",
  async (name) => {
    const res = await authApi.changeProfileData({ name })
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
