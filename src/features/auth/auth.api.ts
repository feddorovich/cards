import { instance } from "common/api/common.api"

const messageBody = () => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Password Reset</h2>
    <p>Hello,</p>
    <p>You are receiving this email because you requested a password reset.</p>
    <p>To create a new password, please click on the link below:</p>
    <p><a href="http://localhost:3000/set-new-password/$token$">Create New Password</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best regards,<br>Your Team</p>
  </div>
`
}

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseUserType>("auth/register", arg)
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg)
  },
  reset: (email: string) => {
    return instance.post("auth/forgot", {
      email: email,
      from: "test-front-admin <ai73a@yandex.by>",
      message: messageBody(),
    })
  },
  setNewPassword: (arg: ArgNewPasswordType) => {
    return instance.post("auth/set-new-password", arg)
  },
}

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">
export type ArgLoginType = {
  email: string
  password: string
  rememberMe: boolean
}
export type RegisterResponseUserType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">
}
export type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
}
export type ResetResponseType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
}
export type ArgNewPasswordType = {
  password: string
  resetPasswordToken: string
}
export type NewPasswordResponseType = {
  info: string
}
