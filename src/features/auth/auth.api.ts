import { instance } from "common/api/common.api"

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
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href="http://localhost:3000/#/set-new-password/$token$">
link</a>
</div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    })
  },
  setNewPassword: (arg: any) => {
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
